import {derived, writable} from "svelte/store";
import {sort} from "./filterBadges";
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
            "eppn", "recipientEmail", "name", "i_name", "f_name");
        const filteredDirectAwards = directAwards
            .filter(el => searchedDirectAwardsIds.includes(el.entityId))
            .filter(directAward => {
                return !facultySelected.length || facultySelected.includes(directAward.f_entity_id);
            })
            .filter(directAward => {
                return !issuerSelected.length || issuerSelected.includes(directAward.i_entity_id);
            })
            .filter(directAward => {
                return !badgeClassSelected.length || badgeClassSelected.includes(directAward.bc_entity_id);
            });

        const faculties = filteredDirectAwards.reduce((acc, directAward) => {
            const item = acc.find(v => v.entityId === directAward.f_entity_id);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: directAward.f_name,
                    entityId: directAward.f_entity_id,
                    count: 1
                })
            }
            return acc;
        }, []);

        const issuers = filteredDirectAwards.reduce((acc, directAward) => {
            const item = acc.find(v => v.entityId === directAward.i_entity_id);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: directAward.i_name,
                    entityId: directAward.i_entity_id,
                    count: 1
                })
            }
            return acc;
        }, []);

        const badgeClasses = filteredDirectAwards.reduce((acc, directAward) => {
            const item = acc.find(v => v.entityId === directAward.bc_entity_id);
            if (item) {
                ++item.count;
            } else {
                acc.push({
                    name: directAward.name,
                    entityId: directAward.bc_entity_id,
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
