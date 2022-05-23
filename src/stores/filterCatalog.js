import {derived, writable} from "svelte/store";
import {filterBySearch, sort, sortBadgeAssertions, sortCreatedAt} from "./filterBadges";
import {badgeClassFilterTypes, badgeClassTypes, educationalLevels, studyLoadCategories} from "../util/catalogFilters";
import I18n from "i18n-js";

export const sortTarget = writable();
export const badgeClasses = writable([]);
export const search = writable();

export const educationalLevelSelected = writable([]);
export const institutionSelected = writable([]);
export const facultySelected = writable([]);
export const issuerSelected = writable([]);
export const studyLoadSelected = writable([]);
export const eqfLevelSelected = writable([]);
export const typeBadgeClassSelected = writable([]);

export const tree = derived(
    [badgeClasses, search, educationalLevelSelected, institutionSelected, facultySelected, issuerSelected,
        studyLoadSelected, eqfLevelSelected, typeBadgeClassSelected, sortTarget],
    ([badgeClasses, search, educationalLevelSelected, institutionSelected, facultySelected, issuerSelected,
         studyLoadSelected, eqfLevelSelected, typeBadgeClassSelected, sortTarget]) => {
        const filteredBadgeClasses = filterBySearch(badgeClasses, search)
            .filter(badge => {
                return !educationalLevelSelected.length || educationalLevelSelected.includes(badge.institutionType);
            })
            .filter(badge => {
                return !institutionSelected.length || institutionSelected.includes(badge.institution.entityId);
            })
            .filter(badge => {
                return !facultySelected.length || facultySelected.includes(badge.issuer.faculty.entityId);
            })
            .filter(badge => {
                return !issuerSelected.length || issuerSelected.includes(badge.issuer.entityId);
            })
            .filter(badge => {
                return !studyLoadSelected.length || studyLoadSelected.includes(badge.studyLoadType);
            })
            .filter(badge => {
                return !eqfLevelSelected.length || eqfLevelSelected.includes(badge.eqf);
            })
            .filter(badge => {
                return !typeBadgeClassSelected.length || typeBadgeClassSelected.find(typeBadge => badge.types.includes(typeBadge))
            });
        const educationLevels = filteredBadgeClasses.reduce((acc, badge) => {
                const item = acc.find(v => v.value === badge.institutionType);
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
            const item = acc.find(v => v.entityId === badge.institution.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: badge.institution.name,
                    entityId: badge.institution.entityId,
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

        const studyLoads = filteredBadgeClasses.reduce((acc, badge) => {
                const item = acc.find(v => v.value === badge.studyLoadType);
                if (item) {
                    ++item.count;
                }
                return acc;
            },
            Object.keys(studyLoadCategories).map(level => ({
                name: I18n.t(`catalog.studyLoad.${level}`),
                value: studyLoadCategories[level],
                count: 0
            })));

        const eqfLevels = filteredBadgeClasses.reduce((acc, badge) => {
                const item = acc.find(v => v.value === badge.eqf);
                if (item) {
                    ++item.count;
                }
                return acc;
            },
            Array(8).fill(0).map((v, i) => ({
                name: I18n.t(`catalog.eqf.eqf${i === 0 ? "None" : ""}`, {level: i + 1}),
                value: i === 0 ? null : i + 1,
                count: 0
            })));

        const badgeClassTypes = filteredBadgeClasses.reduce((acc, badge) => {
                let isOther = true;
                if (badge.archived) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.ARCHIVED);
                    if (item) {
                        ++item.count;
                    }
                    isOther = false
                }
                if (badge.isMicroCredentials) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.MICRO_CREDENTIALS);
                    if (item) {
                        ++item.count;
                    }
                    isOther = false
                }
                if (isOther) {
                    const item = acc.find(v => v.value === badgeClassFilterTypes.OTHER);
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

        const tree = {
            filteredBadgeClasses,
            educationLevels,
            institutions,
            faculties,
            issuers,
            studyLoads,
            eqfLevels,
            badgeClassTypes
        };
        const sortedBadgeClasses = (sortTarget && sortTarget.value === "recent") ? sortCreatedAt(tree.filteredBadgeClasses) : sortBadgeAssertions(tree.filteredBadgeClasses);

        return {
            badgeClasses: sortedBadgeClasses,
            educationLevels: sort(tree.educationLevels, true),
            institutions: sort(tree.institutions, true),
            faculties: sort(tree.faculties, true),
            issuers: sort(tree.issuers, true),
            studyLoads: sort(tree.studyLoads, true),
            eqfLevels: sort(tree.eqfLevels, true),
            badgeClassTypes: sort(tree.badgeClassTypes, true)
        };
    });
