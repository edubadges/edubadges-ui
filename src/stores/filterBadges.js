import {derived, writable} from "svelte/store";
import {badgeClassFilterTypes} from "../util/catalogFilters";
import I18n from "i18n-js";
import {catalogPageCount} from "../util/pagination";

export const sortTarget = writable();
export const faculties = writable([]);

export const search = writable("");
export const facultyIds = writable([]);
export const issuerIds = writable([]);
export const awardFilter = writable(true);
export const typeBadgeClassSelected = writable([]);
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
    return !collection ? [] : collection.sort((a, b) => count ? b.count - a.count || a.name.localeCompare(b.name) : a.name.localeCompare(b.name));
}

export const sortCreatedAt = collection => !collection ? [] : collection.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const sortBadgeAssertionsDirectAwarded = collection => {
    return !collection ? [] : collection.sort((a, b) => b.directAwardedAssertionsCount - a.directAwardedAssertionsCount)
}

export const sortBadgeAssertionsSelfRequested = collection => {
    return !collection ? [] : collection.sort((a, b) => b.selfRequestedAssertionsCount - a.selfRequestedAssertionsCount)
}

export const sortBadgePendingEnrollments = collection => {
    return !collection ? [] : collection.sort((a, b) => b.pendingEnrollmentCount - a.pendingEnrollmentCount)
}

export const selectedEntity = derived(
    [faculties, facultyIds, issuerIds],
    ([faculties, facultyIds, issuerIds]) => {
        if (issuerIds.length) {
            const issuers = faculties.flatMap((fac) => fac.issuers);
            return issuers.find((iss) => issuerIds.includes(iss.entityId));
        }

        if (facultyIds.length) {
            return faculties.find((fac) => facultyIds.includes(fac.entityId));
        }
    }
);

export const tree = derived(
    [faculties, awardFilter, search, page, facultyIds, issuerIds, typeBadgeClassSelected, sortTarget],
    ([faculties, awardFilter, search, page, facultyIds, issuerIds, typeBadgeClassSelected, sortTarget]) => {
        const tree = faculties.filter(
            ({entityId}) => !facultyIds.length || facultyIds.includes(entityId)
        ).reduce(
            (acc, cur) => {
                let issuers = cur.issuers.filter(
                    ({entityId}) => !issuerIds.length || issuerIds.includes(entityId)
                );

                let badgeClasses = [];
                const enrichedIssuers = issuers.map(
                    ({badgeclasses, entityId, name}) => {
                        const _badgeClasses = filterBySearch(badgeclasses, search).filter(badgeClass => !awardFilter || (awardFilter && badgeClass.permissions.mayAward));
                        badgeClasses.push(_badgeClasses);

                        return {
                            name,
                            entityId,
                            count: _badgeClasses ? _badgeClasses.length : 0,
                        };
                    }
                );

                acc.issuers.push(...enrichedIssuers);
                acc.badgeClasses.push(...badgeClasses.flat());

                const enrichedFaculty = {
                    name: cur.name,
                    entityId: cur.entityId,
                    count: enrichedIssuers.reduce((acc, cur) => acc + cur.count, 0),
                };

                acc.faculties.push(enrichedFaculty);

                return acc;
            },
            {faculties: [], issuers: [], badgeClasses: [], badgeClassTypes: []}
        );
        let sortedBadgeClasses = tree.badgeClasses;
        if (sortTarget) {
            if (sortTarget.value === "recent") {
                sortedBadgeClasses = sortCreatedAt(tree.badgeClasses);
            } else if (sortTarget.value === "awarded") {
                sortedBadgeClasses = sortBadgeAssertionsDirectAwarded(tree.badgeClasses);
            } else {
                sortedBadgeClasses = sortBadgeAssertionsSelfRequested(tree.badgeClasses);
            }
        }
        sortedBadgeClasses = sortedBadgeClasses.filter(badge => {
            return !typeBadgeClassSelected.length || typeBadgeClassSelected.find(typeBadge => badge.types.includes(typeBadge))
        });
        const badgeClassTypes = tree.badgeClasses.reduce((acc, badge) => {
                if (badge.archived) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.ARCHIVED);
                    ++item.count;
                } else if (badge.isMicroCredentials) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.MICRO_CREDENTIALS);
                    ++item.count;
                } else {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.OTHER);
                    ++item.count;
                }
                return acc;
            },
            Object.keys(badgeClassFilterTypes).map(badgeClassType => ({
                name: I18n.t(`catalog.badgeClassType.${badgeClassType}`),
                value: badgeClassType,
                count: 0
            })));

        tree.badgeClassTypes = badgeClassTypes;
        const minimalPage = Math.min(page, Math.ceil(sortedBadgeClasses.length / catalogPageCount))

        //Default we do not show the archived
        const sortedBadgeClassesFiltered = sortedBadgeClasses.filter(badge => {
            if (!typeBadgeClassSelected.includes(badgeClassFilterTypes.ARCHIVED)) {
                return !badge.archived;
            }
            return true;
        });

        return {
            faculties: sort(tree.faculties, true),
            issuers: sort(tree.issuers, true),
            badgeClasses: sortedBadgeClassesFiltered,
            paginatedBadges: sortedBadgeClassesFiltered.slice((minimalPage - 1) * catalogPageCount, minimalPage * catalogPageCount),
            page: minimalPage,
            badgeClassTypes: sort(tree.badgeClassTypes, true)
        };
    },
    {faculties: [], issuers: [], badgeClasses: [], badgeClassTypes: []}
);
