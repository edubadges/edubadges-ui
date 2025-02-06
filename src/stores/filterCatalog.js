import {derived, writable} from "svelte/store";
import {
    filterBySearch,
    sort,
    sortBadgeAssertionsDirectAwarded,
    sortBadgeAssertionsSelfRequested,
    sortCreatedAt
} from "./filterBadges";
import {badgeClassFilterTypes, educationalLevels} from "../util/catalogFilters";
import I18n from "i18n-js";
import {catalogPageCount} from "../util/pagination";
import {badgeClassTypes as allBadgeClassTypes} from "../util/badgeClassTypes";

export const sortTarget = writable();
export const badgeClasses = writable([]);
export const search = writable();
export const page = writable(1);

export const educationalLevelSelected = writable([]);
export const institutionSelected = writable([]);
export const facultySelected = writable([]);
export const issuerSelected = writable([]);
export const virtualOrganisationSelected = writable([]);
export const typeBadgeClassSelected = writable([]);

export const tree = derived(
    [badgeClasses, search, page, educationalLevelSelected, institutionSelected, facultySelected, issuerSelected,
        virtualOrganisationSelected, typeBadgeClassSelected, sortTarget],
    ([badgeClasses, search, page, educationalLevelSelected, institutionSelected, facultySelected, issuerSelected,
          virtualOrganisationSelected,
         typeBadgeClassSelected, sortTarget]) => {
        const filteredBadgeClasses = filterBySearch(badgeClasses, search)
            .filter(badge => {
                return !educationalLevelSelected.length || educationalLevelSelected.includes(badge.issuer.faculty.institution.institutionType);
            })
            .filter(badge => {
                return !institutionSelected.length || institutionSelected.includes(badge.issuer.faculty.institution.entityId);
            })
            .filter(badge => {
                return !facultySelected.length || facultySelected.includes(badge.issuer.faculty.entityId);
            })
            .filter(badge => {
                return !issuerSelected.length || issuerSelected.includes(badge.issuer.entityId);
            })
            .filter(badge => {
                return !virtualOrganisationSelected.length || virtualOrganisationSelected.includes(badge.issuer.faculty.entityId);
            })
            .filter(badge => {
                return !typeBadgeClassSelected.length || typeBadgeClassSelected.find(typeBadge => badge.types.includes(typeBadge))
            });
        const educationLevels = filteredBadgeClasses.reduce((acc, badge) => {
                const item = acc.find(v => v.value === badge.issuer.faculty.institution.institutionType);
                if (item) {
                    ++item.count;
                }
                return acc;
            },
            Object.keys(educationalLevels).map(level => ({
                name: I18n.t(`catalog.education.${level}`),
                value: educationalLevels[level],
                count: 0
            })));

        const institutions = filteredBadgeClasses.reduce((acc, badge) => {
            const item = acc.find(v => v.entityId === badge.issuer.faculty.institution.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: badge.issuer.faculty.institution.name,
                    entityId: badge.issuer.faculty.institution.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        const virtualOrganisations = filteredBadgeClasses
            .filter(badge => badge.issuer.faculty.onBehalfOf)
            .reduce((acc, badge) => {
            const item = acc.find(v => v.entityId === badge.issuer.faculty.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: badge.issuer.faculty.name,
                    entityId: badge.issuer.faculty.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        const faculties = filteredBadgeClasses.reduce((acc, badge) => {
            const item = acc.find(v => v.entityId === badge.issuer.faculty.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: badge.issuer.faculty.name,
                    entityId: badge.issuer.faculty.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        const issuers = filteredBadgeClasses.reduce((acc, badge) => {
            const item = acc.find(v => v.entityId === badge.issuer.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: badge.issuer.name,
                    entityId: badge.issuer.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        const badgeClassTypes = filteredBadgeClasses.reduce((acc, badge) => {
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

        const sortedBadgeClasses = (sortTarget && sortTarget.value === "recent") ? sortCreatedAt(filteredBadgeClasses) :
            (sortTarget && sortTarget.value === "awarded") ? sortBadgeAssertionsDirectAwarded(filteredBadgeClasses) : sortBadgeAssertionsSelfRequested(filteredBadgeClasses);

        const minimalPage = Math.min(page, Math.ceil(sortedBadgeClasses.length / catalogPageCount))

        //Default we do not show the archived
        const sortedBadgeClassesFiltered = sortedBadgeClasses.filter(badge => {
            if (!typeBadgeClassSelected.includes(badgeClassFilterTypes.ARCHIVED)) {
                return !badge.archived;
            }
            return true
        });

        return {
            badgeClasses: sortedBadgeClassesFiltered,
            paginatedBadges: sortedBadgeClassesFiltered.slice((minimalPage - 1) * catalogPageCount, minimalPage * catalogPageCount),
            page: minimalPage,
            educationLevels: sort(educationLevels, true),
            institutions: sort(institutions, true),
            faculties: sort(faculties, true),
            issuers: sort(issuers, true),
            virtualOrganisations: sort(virtualOrganisations, true),
            badgeClassTypes: sort(badgeClassTypes, true)
        };
    });
