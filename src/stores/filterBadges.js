import {derived, writable} from "svelte/store";
import {badgeClassFilterTypes} from "../util/catalogFilters";
import I18n from "i18n-js";

export const sortTarget = writable();
export const faculties = writable([]);

export const search = writable("");
export const facultyIds = writable([]);
export const issuerIds = writable([]);
export const awardFilter = writable(true);
export const typeBadgeClassSelected = writable([]);


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

export const sortBadgeAssertions = collection => {
    return !collection ? [] : collection.sort((a, b) => b.assertionsCount !== undefined ? b.assertionsCount - a.assertionsCount : b.badgeAssertions.length - a.badgeAssertions.length)
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
    [faculties, awardFilter, search, facultyIds, issuerIds, typeBadgeClassSelected, sortTarget],
    ([faculties, awardFilter, search, facultyIds, issuerIds, typeBadgeClassSelected, sortTarget]) => {
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
                sortedBadgeClasses = sortBadgeAssertions(tree.badgeClasses);
            } else {
                sortedBadgeClasses = sortBadgePendingEnrollments(tree.badgeClasses);
            }
        }
        sortedBadgeClasses = sortedBadgeClasses.filter(badge => {
            return !typeBadgeClassSelected.length || typeBadgeClassSelected.find(typeBadge => badge.types.includes(typeBadge))
        });
        const badgeClassTypes = tree.badgeClasses.reduce((acc, badge) => {
                let isOther = true;
                if (badge.archived) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.ARCHIVED);
                    ++item.count;
                    isOther = false
                }
                if (badge.isMicroCredentials) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.MICRO_CREDENTIALS);
                    ++item.count;
                    isOther = false
                }
                if (isOther) {
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
        return {
            faculties: sort(tree.faculties, true),
            issuers: sort(tree.issuers, true),
            badgeClasses: sortedBadgeClasses,
            badgeClassTypes: sort(tree.badgeClassTypes, true)
        };
    },
    {faculties: [], issuers: [], badgeClasses: [], badgeClassTypes: []}
);
