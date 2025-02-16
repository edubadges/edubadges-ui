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
    const permission = allUsers.map(u => u.permissions).flat().find(permission => permission.faculty?.entity_id === facultyEntityId);
    return permission?.issuer;
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
            const findIssuerByFaculty = findIssuersByFacultyEntityId(users, newFacultyIds[0]);
            newIssuerIds.push(findIssuerByFaculty?.entity_id || "nope")}
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
            let includeByFaculty = false;
            let includeByIssuer = false;
            user.permissions.forEach(permission => {
                if (permission.permission === "institution") {
                    includeByFaculty = true;
                    includeByIssuer = true;
                } else {
                    const facultyEntityId = permission.faculty?.entity_id;
                    if (newFacultyIds.length === 0 || newFacultyIds.includes(facultyEntityId)) {
                        faculties[facultyEntityId] = faculties[facultyEntityId] || {...permission.faculty, count: 0};
                        faculties[facultyEntityId].count++;
                        includeByFaculty = true;
                    }
                    const issuerEntityId = permission.issuer?.entity_id;
                    if (issuerEntityId && (newIssuerIds.length === 0 || newIssuerIds.includes(issuerEntityId))) {
                        issuers[issuerEntityId] = issuers[issuerEntityId] || {...permission.issuer, count: 0};
                        issuers[issuerEntityId].count++;
                        includeByIssuer = true;
                    }
                }
            });
            if (includeByFaculty && includeByIssuer) {
                roles.find(el => el.role === user.role).count++
            }
            return includeByFaculty && includeByIssuer
        });

        const allFaculties = Object.values(faculties);
        const allIssuers = Object.values(issuers);

        const superUserCount = users.filter(user => user.permissions.some(permission => permission.permission === "institution")).length;

        allFaculties.forEach(faculty => faculty.count += superUserCount);
        allIssuers.forEach(issuer => issuer.count += superUserCount);

        return {
            faculties: sort(allFaculties, true),
            issuers: sort(allIssuers, true),
            roles: roles,
            users: users
        };
    },
    {faculties: {}, issuers: {}, roles: [], users: []}
);
