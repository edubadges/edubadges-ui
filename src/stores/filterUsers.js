import {writable, derived} from "svelte/store";
import {staffType} from "../util/staffTypes";

export const institution = writable();
export const users = writable([]);
export const userSearch = writable();
export const selectedRole = writable([]);
export const facultyIds = writable([]);
export const issuerIds = writable([]);

const userSearchAttributes = ["firstName", "lastName", "email", "roleAt"];

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
    [userSearch, selectedRole, institution, users, facultyIds, issuerIds],
    ([userSearch, selectedRole, institution, users, facultyIds, issuerIds]) => {

        let tree = {
            issuers: [],
            faculties: [],
            roles: [
                {'role': staffType.INSTITUTION_STAFF, count: 0},
                {'role': staffType.ISSUER_GROUP_ADMIN, count: 0},
                {'role': staffType.ISSUER_GROUP_AWARDER, count: 0},
                {'role': staffType.ISSUER_ADMIN, count: 0},
                {'role': staffType.ISSUER_AWARDER, count: 0},
                {'role': staffType.BADGE_CLASS_OWNER, count: 0},
                {'role': staffType.BADGE_CLASS_EDITOR, count: 0},
                {'role': staffType.BADGE_CLASS_AWARDER, count: 0},
                {'role': staffType.VIEWER, count: 0}
            ],
            users: []
        };

        if (!institution) {
            return tree;
        }

        for (const faculty of institution.faculties) {
            faculty.users = [];
            for (const issuer of faculty.issuers) {
                issuer.users = [];
            }
        }

        for (const {user} of institution.staff) {
            user.role = staffType.INSTITUTION_STAFF;
            tree.users = [user, ...tree.users];

            tree.roles.find(el => el.role === staffType.INSTITUTION_STAFF).count++;

            for (const faculty of institution.faculties) {
                faculty.users = [...faculty.users, user];
                for (const issuer of faculty.issuers) {
                    issuer.users = [...issuer.users, user];
                }
            }
        }

        for (const faculty of institution.faculties) {
            if (issuerIds.length > 0 && !faculty.issuers.some(iss => iss.entityId === issuerIds[0])) {
                continue;
            }

            if (facultyIds.length > 0 && facultyIds[0] !== faculty.entityId) {
                continue;
            }

            for (const {user, mayUpdate} of faculty.staff) {
                if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                    user.role = mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER;
                    tree.users = [user, ...tree.users];
                    tree.roles.find(el => el.role === (mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER)).count++;
                }

                if (!faculty.users.some(_user => user.entityId === _user.entityId)) {
                    faculty.users = [...faculty.users, user];
                }
                for (const issuer of faculty.issuers) {
                    if (!issuer.users.some(_user => user.entityId === _user.entityId)) {
                        issuer.users = issuer.users = [...issuer.users, user];
                    }
                }
            }
        }

        for (const faculty of institution.faculties) {
            if (facultyIds.length > 0 && facultyIds[0] !== faculty.entityId) {
                continue;
            }

            for (const issuer of faculty.issuers) {
                if (issuerIds.length > 0 && issuerIds[0] !== issuer.entityId) {
                    continue;
                }

                for (const {user, mayUpdate} of issuer.staff) {
                    if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                        user.role = mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER;
                        tree.users = [user, ...tree.users];
                        tree.roles.find(el => el.role === (mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER)).count++;
                    }
                    if (!faculty.users.some(_user => user.entityId === _user.entityId)) {
                        faculty.users = [...faculty.users, user];
                    }
                    if (!issuer.users.some(_user => user.entityId === _user.entityId)) {
                        issuer.users = issuer.users = [...issuer.users, user];
                    }
                }
            }
        }

        for (const faculty of institution.faculties) {
            if (facultyIds.length > 0 && facultyIds[0] !== faculty.entityId) {
                continue;
            }

            for (const issuer of faculty.issuers) {
                if (issuerIds.length > 0 && issuer.entityId !== issuerIds[0]) {
                    continue;
                }

                for (const badgeClass of issuer.badgeclasses) {
                    for (const {user, mayAdministrateUsers, mayUpdate, mayAward} of badgeClass.staff) {
                        if (mayAdministrateUsers) {
                            if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                                user.role = staffType.BADGE_CLASS_OWNER;
                                tree.users = [user, ...tree.users];
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_OWNER).count++;
                            } else if (tree.users.find(_user => _user.entityId === user.entityId).role === staffType.BADGE_CLASS_EDITOR) {
                                tree.users.find(_user => _user.entityId === user.entityId).role = staffType.BADGE_CLASS_OWNER;
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_EDITOR).count--;
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_OWNER).count++;
                            } else if (tree.users.find(_user => _user.entityId === user.entityId).role === staffType.BADGE_CLASS_AWARDER) {
                                tree.users.find(_user => _user.entityId === user.entityId).role = staffType.BADGE_CLASS_OWNER;
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_AWARDER).count--;
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_OWNER).count++;
                            }
                        } else if (mayUpdate) {
                            if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                                user.role = staffType.BADGE_CLASS_EDITOR;
                                tree.users = [user, ...tree.users];
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_EDITOR).count++;
                            } else if (tree.users.find(_user => _user.entityId === user.entityId).role === staffType.BADGE_CLASS_AWARDER) {
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_AWARDER).count--;
                                tree.users.find(_user => _user.entityId === user.entityId).role = staffType.BADGE_CLASS_EDITOR;
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_EDITOR).count++;
                            } else {
                            }
                        } else if (mayAward) {
                            if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                                user.role = staffType.BADGE_CLASS_AWARDER;
                                tree.users = [user, ...tree.users];
                                tree.roles.find(el => el.role === staffType.BADGE_CLASS_AWARDER).count++;
                            }
                        }
                        if (!faculty.users.some(_user => user.entityId === _user.entityId)) {
                            faculty.users = [...faculty.users, user];
                        }
                        if (!issuer.users.some(_user => user.entityId === _user.entityId)) {
                            issuer.users = issuer.users = [...issuer.users, user];
                        }
                    }
                }
            }
        }

        if (!issuerIds.length > 0 && !facultyIds.length > 0) {
            for (const user of users) {
                if (!user.institutionStaff && user.facultyStaffs.length === 0 && user.issuerStaffs.length === 0 && user.badgeclassStaffs.length === 0) {
                    user.role = staffType.VIEWER;
                    if (!tree.users.some(_user => _user.entityId === user.entityId)) {
                        tree.users = [user, ...tree.users];
                        tree.roles.find(el => el.role === staffType.VIEWER).count++;
                    }
                }
            }
        }

        if (selectedRole.length > 0) {
            tree.users = tree.users.filter(user => user.role === selectedRole[0]);
        }

        let issuers = [];
        for (const faculty of institution.faculties) {
            faculty.count = faculty.users.length;
            for (const issuer of faculty.issuers) {
                issuer.count = issuer.users.length;
                issuers = [issuer, ...issuers];
            }
        }

        tree.users = filterBySearch(tree.users, userSearch);

        return {
            faculties: sort(institution.faculties, true).filter(fac => fac.count - tree.roles.find(el => el.role === staffType.INSTITUTION_STAFF).count),
            issuers: sort(issuers, true).filter(iss => iss.count - tree.roles.find(el => el.role === staffType.INSTITUTION_STAFF).count),
            roles: tree.roles,
            users: tree.users
        };
    },
    {faculties: [], issuers: [], roles: [], users: []}
);
