import {derived, writable} from "svelte/store";
import {filterBySearch, sort} from "./filterBadges";


export const directAwards = writable([]);

export const facultySelected = writable([]);
export const issuerSelected = writable([]);
export const badgeClassSelected = writable([]);

export const tree = derived(
    [directAwards, facultySelected, issuerSelected, badgeClassSelected],
    ([directAwards, facultySelected, issuerSelected, badgeClassSelected]) => {
        const filteredDirectAwards = directAwards
            .filter(directAward => {
                return !facultySelected.length || facultySelected.includes(directAward.badgeclass.issuer.faculty.entityId);
            })
            .filter(directAward => {
                return !issuerSelected.length || issuerSelected.includes(directAward.badgeclass.issuer.entityId);
            })
            .filter(directAward => {
                return !badgeClassSelected.length || badgeClassSelected.includes(directAward.badgeclass.entityId);
            });

        const faculties = filteredDirectAwards.reduce((acc, directAward) => {
            const item = acc.find(v => v.entityId === directAward.badgeclass.issuer.faculty.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: directAward.badgeclass.issuer.faculty.name,
                    entityId: directAward.badgeclass.issuer.faculty.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        const issuers = filteredDirectAwards.reduce((acc, directAward) => {
            const item = acc.find(v => v.entityId === directAward.badgeclass.issuer.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: directAward.badgeclass.issuer.name,
                    entityId: directAward.badgeclass.issuer.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        const badgeClasses = filteredDirectAwards.reduce((acc, directAward) => {
            const item = acc.find(v => v.entityId === directAward.badgeclass.entityId);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: directAward.badgeclass.name,
                    entityId: directAward.badgeclass.entityId,
                    count: 1
                })
            }
            return acc;
        }, []);

        return {
            directAwards: filteredDirectAwards,
            faculties: sort(faculties, true),
            issuers: sort(issuers, true),
            badgeClasses: sort(badgeClasses, true)
        };
    });
