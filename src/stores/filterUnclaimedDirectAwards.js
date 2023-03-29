import {derived, writable} from "svelte/store";
import {filterBySearch, sort} from "./filterBadges";
import {searchMultiple} from "../util/searchData";


export const directAwards = writable([]);

export const search = writable("");
export const facultySelected = writable([]);
export const issuerSelected = writable([]);
export const badgeClassSelected = writable([]);

export const tree = derived(
    [directAwards, search, facultySelected, issuerSelected, badgeClassSelected],
    ([directAwards, search, facultySelected, issuerSelected, badgeClassSelected]) => {
        const searchedDirectAwardsIds = searchMultiple(directAwards, search, "entityId",
        "eppn", "recipientEmail", "badgeclass.name", "badgeclass.issuer.name", "badgeclass.issuer.faculty.name");
        const filteredDirectAwards = directAwards
            .filter(el => searchedDirectAwardsIds.includes(el.entityId))
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
            search: search,
            faculties: sort(faculties, true),
            issuers: sort(issuers, true),
            badgeClasses: sort(badgeClasses, true)
        };
    });
