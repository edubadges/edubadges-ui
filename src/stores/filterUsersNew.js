import {writable, derived} from "svelte/store";
import {staffType} from "../util/staffTypes";
import {isEmpty} from "../util/utils";

export const users = writable([]);
export const userSearch = writable();
export const selectedRole = writable([]);
export const facultyIds = writable([]);
export const issuerIds = writable([]);

const userSearchAttributes = ["first_name", "last_name", "email", "roleAt"];

export function filterBySearch(users, search) {
    if (search && search.length > 0) {
        return users.filter(user => {
            const lowerSearch = search.toLowerCase();
            return userSearchAttributes.some(attr => user[attr] && user[attr].toLowerCase().indexOf(lowerSearch) > -1)
        })
    }
    return users;
}

function sort(collection, count = false) {
    return collection.sort((a, b) => {
        if (!count) return a.name.localeCompare(b.name);
        return b.count - a.count || a.name.localeCompare(b.name);
    });
}

export const userTree = derived(
    [userSearch, selectedRole, users, facultyIds, issuerIds],
    ([userSearch, selectedRole, users, facultyIds, issuerIds]) => {

        let institutions = {};
        let faculties = {};
        let issuers = {};
        let badge_classes = {};

        let roles = [
                {'role': staffType.INSTITUTION_STAFF, count: 0},
                {'role': staffType.ISSUER_GROUP_ADMIN, count: 0},
                {'role': staffType.ISSUER_GROUP_AWARDER, count: 0},
                {'role': staffType.ISSUER_ADMIN, count: 0},
                {'role': staffType.ISSUER_AWARDER, count: 0},
                {'role': staffType.BADGE_CLASS_OWNER, count: 0},
                {'role': staffType.BADGE_CLASS_EDITOR, count: 0},
                {'role': staffType.BADGE_CLASS_AWARDER, count: 0},
                {'role': staffType.VIEWER, count: 0}
            ];

        users.forEach(user => {
            if (isEmpty(user.permissions)) {
                user.role = staffType.VIEWER;
                //nothing to do further
                roles.find(el => el.role === staffType.VIEWER).count++
                return;
            }
            const permission = user.permissions.find(permission => permission.highest);
            switch (permission.permission) {
                case "institution": {
                    user.role = staffType.INSTITUTION_STAFF;
                    break;
                }
                case "faculty": {
                    if (permission.level === "awarder") {
                        user.role = staffType.ISSUER_GROUP_AWARDER;
                    } else  {
                        user.role = staffType.ISSUER_GROUP_ADMIN;
                    }
                    break;
                }
                case "issuer": {
                    if (permission.level === "awarder") {
                        user.role = staffType.ISSUER_AWARDER;
                    } else  {
                        user.role = staffType.ISSUER_ADMIN;
                    }
                    break;
                }
                case "badge_class": {
                    if (permission.level === "awarder") {
                        user.role = staffType.BADGE_CLASS_AWARDER;
                    } else if (permission.level === "admin") {
                        user.role = staffType.BADGE_CLASS_OWNER;
                    } else {
                        user.role = staffType.BADGE_CLASS_EDITOR;
                    }
                    break;
                }
            }
            roles.find(el => el.role === user.role).count++
            //Now get all the counts for faculties and issuers
            user.permissions.forEach(permission => {
                if (permission.institution) {
                    institutions[permission.institution.entity_id] = institutions[permission.institution.entity_id] || {...permission.institution, count: 0};
                    institutions[permission.institution.entity_id].count++;
                }
                if (permission.faculty) {
                    faculties[permission.faculty.entity_id] = faculties[permission.faculty.entity_id] || {...permission.faculty, count: 0};
                    faculties[permission.faculty.entity_id].count++;
                }
                if (permission.issuer) {
                    issuers[permission.issuer.entity_id] = issuers[permission.issuer.entity_id] || {...permission.issuer, count: 0};
                    issuers[permission.issuer.entity_id].count++;
                }
                if (permission.badge_class) {
                    badge_classes[permission.badge_class.entity_id] = badge_classes[permission.badge_class.entity_id] || {...permission.badge_class, count: 0};
                    badge_classes[permission.badge_class.entity_id].count++;
                }
            })

        })

        // if (!issuerIds.length > 0 && !facultyIds.length > 0) {
        //     users = users.filter(user => {
        //         return user.permissions.some(permission => permission.issuer && issuerIds.includes(permision.issuer.entity_id)) &&
        //     })
        // }

        if (selectedRole.length > 0) {
            users = users.filter(user => user.role === selectedRole[0]);
        }

        users = filterBySearch(users, userSearch);
        debugger;
        return {
            faculties: sort(Object.values(faculties), true),
            issuers: sort(Object.values(issuers), true),
            roles: roles,
            users: users
        };
    },
    {faculties: [], issuers: [], roles: [], users: []}
);
