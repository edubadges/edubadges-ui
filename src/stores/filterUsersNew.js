import {writable, derived} from "svelte/store";
import {staffType} from "../util/staffTypes";
import {isEmpty} from "../util/utils";

export const users = writable([]);
export const userSearch = writable();
export const selectedRole = writable([]);
export const facultyIds = writable([]);
export const issuerIds = writable([]);

const userSearchAttributes = ["first_name", "last_name", "email", "role", "unit_name"];

export function filterBySearch(users, search, searchAttributes = userSearchAttributes) {
    if (search && search.length > 0) {
        return users.filter(user => {
            const lowerSearch = search.toLowerCase();
            return searchAttributes.some(attr => user[attr] && user[attr].toLowerCase().indexOf(lowerSearch) > -1)
        })
    }
    return users;
}

function findFacultiesByIssuerEntityId(allUsers, issuerEntityId) {
    const permission = allUsers.map(u => u.permissions).flat().find(permission => permission.issuer?.entity_id === issuerEntityId);
    return permission?.faculty;
}

function findIssuersByFacultyEntityId(allUsers, facultyEntityId) {
    const permissions = allUsers
        .map(u => u.permissions)
        .flat()
        .filter(permission => permission.faculty?.entity_id === facultyEntityId && permission.issuer)
    return permissions.map(permission => permission.issuer.entity_id)
}

function sort(collection, count = false) {
    return collection.sort((a, b) => {
        if (!count) {
            return a.name.localeCompare(b.name);
        }
        return b.count - a.count || a.name.localeCompare(b.name);
    });
}

export const userTree = derived(
    [userSearch, selectedRole, users, facultyIds, issuerIds],
    ([userSearch, selectedRole, users, facultyIds, issuerIds]) => {

        let faculties = {};
        let issuers = {};

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

        if (selectedRole.length > 0) {
            users = users.filter(user => user.role === selectedRole[0]);
        }

        users = filterBySearch(users, userSearch);

        //If the users are limited by faculty, then we also filter on all issuers of that faculty
        const newFacultyIds = [...facultyIds];
        const newIssuerIds = [...issuerIds];
        if (newFacultyIds.length > 0 && newIssuerIds.length === 0) {
            const issuersByFaculty = findIssuersByFacultyEntityId(users, newFacultyIds[0]);
            issuersByFaculty.forEach(entityId => newIssuerIds.push(entityId));
        }
        if (newFacultyIds.length === 0 && newIssuerIds.length > 0) {
            const facultyByIssuer = findFacultiesByIssuerEntityId(users, newIssuerIds[0]);
            newFacultyIds.push(facultyByIssuer?.entity_id || "nope")
        }

        const hasFilters = newFacultyIds.length > 0 || newIssuerIds.length > 0;

        users = users.filter(user => {
            if (isEmpty(user.permissions)) {
                if (hasFilters) {
                    return false;
                }
                roles.find(el => el.role === staffType.VIEWER).count++
                return true;
            }
            let includeUser = false;
            user.permissions.forEach(permission => {
                if (permission.permission === "institution") {
                    includeUser = true;
                }
                const facultyEntityId = permission.faculty?.entity_id;
                if (facultyEntityId && (newFacultyIds.length === 0 || newFacultyIds.includes(facultyEntityId))) {
                    faculties[facultyEntityId] = faculties[facultyEntityId] || {...permission.faculty, count: 0};
                    faculties[facultyEntityId].count++;
                    includeUser = true;
                }
                const issuerEntityId = permission.issuer?.entity_id;
                    if (issuerEntityId && (newIssuerIds.length === 0 || newIssuerIds.includes(issuerEntityId))) {
                        issuers[issuerEntityId] = issuers[issuerEntityId] || {
                            ...permission.issuer,
                            count: 0,
                            f_entity_id: permission.faculty.entity_id
                        };
                        issuers[issuerEntityId].count++;
                        includeUser = true;
                    }
            });
            if (includeUser) {
                roles.find(el => el.role === user.role).count++
            }
            return includeUser;
        });

        const allFaculties = Object.values(faculties);
        const allIssuers = Object.values(issuers);

        //And institution admins can access everything
        const institutionAdminCount = users.filter(user => user.permissions.some(p => p.permission === "institution")).length;
        allFaculties.forEach(faculty => faculty.count += institutionAdminCount);
        allIssuers.forEach(issuer => issuer.count += institutionAdminCount);

        return {
            faculties: sort(allFaculties, true),
            issuers: sort(allIssuers, true),
            roles: roles,
            users: users
        };
    },
    {faculties: {}, issuers: {}, roles: [], users: []}
);
