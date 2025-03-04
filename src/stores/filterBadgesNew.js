import {derived, writable} from "svelte/store";
import {badgeClassFilterTypes, sortTargetOptions} from "../util/catalogFilters";
import I18n from "i18n-js";
import {catalogPageCount} from "../util/pagination";
import {badgeClassTypes as allBadgeClassTypes} from "../util/badgeClassTypes";

export const sortTarget = writable();
export const badgeClasses = writable([]);

export const search = writable("");
export const facultyIds = writable([]);
export const issuerIds = writable([]);
export const awardFilter = writable(true);
export const typeBadgeClassSelected = writable([]);
export const tagBadgeClassSelected = writable([]);
export const page = writable(1);

export const filterBySearch = (badgeclasses, search) => {
    if (!search || search.trim().length === 0) {
        return badgeclasses;
    }

    return badgeclasses.filter(({name}) =>
        name.toLowerCase().includes(search.toLowerCase())
    );
}

export const sort = (collection, count = false) => {
    return !collection ? [] : collection.sort((a, b) => count ? b.count - a.count : a.name.localeCompare(b.name));
}

export const sortCreatedAt = collection => !collection ? [] : collection.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const sortBadgeAssertionsDirectAwarded = collection => {
    return !collection ? [] : collection.sort((a, b) => b.directAwardedAssertionsCount - a.directAwardedAssertionsCount)
}

export const sortBadgeAssertionsSelfRequested = collection => {
    return !collection ? [] : collection.sort((a, b) => b.selfRequestedAssertionsCount - a.selfRequestedAssertionsCount)
}

// Be sure to read up on derived stores as this is essential to understand this (and remember: Premature optimization is the root of all evil)
export const tree = derived(
    [badgeClasses, awardFilter, search, page, facultyIds, issuerIds, typeBadgeClassSelected, tagBadgeClassSelected, sortTarget],
    ([badgeClasses, awardFilter, search, page, facultyIds, issuerIds, typeBadgeClassSelected, tagBadgeClassSelected, sortTarget]) => {
        const filterArchived = typeBadgeClassSelected.includes(badgeClassFilterTypes.ARCHIVED);
        typeBadgeClassSelected = typeBadgeClassSelected.filter(typeBadge => typeBadge !== badgeClassFilterTypes.ARCHIVED);
        let sortedBadgeClasses = filterBySearch(badgeClasses, search)
            .filter(badgeClass => !awardFilter || (awardFilter && badgeClass.mayAward))
            .filter(badgeClass => !facultyIds.length || facultyIds.includes(badgeClass.issuer.faculty.entityId))
            .filter(badgeClass => !issuerIds.length || issuerIds.includes(badgeClass.issuer.entityId))
            .filter(badge => !typeBadgeClassSelected.length || typeBadgeClassSelected.find(typeBadge => badge.types.includes(typeBadge)));

        if (sortTarget?.value === "request") {
            sortedBadgeClasses = sortBadgeAssertionsSelfRequested(sortedBadgeClasses);
        } else if (sortTarget?.value === "awarded") {
            sortedBadgeClasses = sortBadgeAssertionsDirectAwarded(sortedBadgeClasses);
        } else {
            sortedBadgeClasses = sortCreatedAt(sortedBadgeClasses);
        }

        sortedBadgeClasses = sortedBadgeClasses.filter(badge => {
            return !tagBadgeClassSelected.length || tagBadgeClassSelected
                .map(tag => tag.value)
                .every(tag => badge.tags.some(t => t === tag))
        });

        const badgeClassTypes = sortedBadgeClasses.reduce((acc, badge) => {
                if (badge.archived) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.ARCHIVED);
                    if (item) {
                        ++item.count;
                    }
                } else if (badge.isPrivate) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.DRAFT);
                    if (item) {
                        ++item.count;
                    }
                } else if (badge.isMicroCredentials) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.MICRO_CREDENTIALS);
                    if (item) {
                        ++item.count;
                    }
                } else if (badge.typeBadgeClass.toLowerCase() === allBadgeClassTypes.REGULAR) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.REGULAR);
                    if (item) {
                        ++item.count;
                    }
                } else {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.EXTRA_CURRICULAR);
                    if (item) {
                        ++item.count;
                    }
                }
                return acc;
            },
            Object.keys(badgeClassFilterTypes).map(badgeClassType => ({
                name: I18n.t(`catalog.badgeClassType.${badgeClassType}`),
                value: badgeClassType,
                count: 0
            })));

        const allUniqueTags = sortedBadgeClasses.reduce((acc, badgeClass) => {
            badgeClass.tags.forEach(tag => acc.add({name: tag, count: 0}))
            return acc;
        }, new Set());
        const badgeClassTags = sortedBadgeClasses.reduce((acc, badge) => {
                badge.tags.map(tag => tag)
                    .forEach(name => {
                        const item = acc.find(v => v.name === name);
                        if (item) {
                            ++item.count;
                        }
                    });
                return acc;
            }, [...allUniqueTags]
        );

        const minimalPage = Math.min(page, Math.ceil(sortedBadgeClasses.length / catalogPageCount))

        const issuers = [];
        sortedBadgeClasses.reduce((acc, badgeClass) => {
            if (acc.has(badgeClass.issuer.entityId)) {
                ++badgeClass.issuer.count;
            } else {
                badgeClass.issuer.count = 1;
                issuers.push(badgeClass.issuer);
                acc.add(badgeClass.issuer.entityId);
            }

            return acc;
        }, new Set())

        const faculties = [];
        sortedBadgeClasses.reduce((acc, badgeClass) => {
            if (acc.has(badgeClass.issuer.faculty.entityId)) {
                ++badgeClass.issuer.faculty.count;
            } else {
                badgeClass.issuer.faculty.count = 1;
                faculties.push(badgeClass.issuer.faculty);
                acc.add(badgeClass.issuer.faculty.entityId);
            }
            return acc;
        }, new Set());

        sortedBadgeClasses = sortedBadgeClasses.filter(badge => filterArchived ? badge.archived : !badge.archived);
        const results = {
            faculties: sort(faculties, true),
            issuers: sort(issuers, true),
            badgeClasses: sortedBadgeClasses,
            paginatedBadges: sortedBadgeClasses.slice((minimalPage - 1) * catalogPageCount, minimalPage * catalogPageCount),
            page: minimalPage,
            badgeClassTypes: sort(badgeClassTypes, true),
            badgeClassTags: sort(badgeClassTags, true)
        };
        return results;
    },
    {
        faculties: [],
        issuers: [],
        badgeClasses: [],
        paginatedBadges: [],
        page: 0,
        badgeClassTypes: [],
        badgeClassTags: []
    }
);
