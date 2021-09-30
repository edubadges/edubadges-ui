import {staffType} from "./staffTypes";
import {entityType} from "./entityTypes";
import {isEmpty} from "lodash";

export const enrichUser = (institution, institutionStaffMemberships, issuerGroupStaffMemberships, issuerStaffMemberships, badgeClassStaffMemberships) => {
    const _issuerGroupStaffMemberships = [...issuerGroupStaffMemberships];
    const _issuerStaffMemberships = [...issuerStaffMemberships];
    const _badgeClassStaffMemberships = [...badgeClassStaffMemberships];

    if (!isEmpty(institutionStaffMemberships)) {
        for (const faculty of institution.faculties) {
            issuerGroupStaffMemberships.push({
                faculty: {name: faculty.name, entityId: faculty.entityId},
                _staffType: staffType.INSTITUTION_STAFF, role: staffType.INSTITUTION_STAFF
            });

            for (const issuer of faculty.issuers) {
                issuerStaffMemberships.push({
                    issuer: {
                        name: issuer.name, entityId: issuer.entityId,
                        faculty: {name: faculty.name, entityId: faculty.entityId}
                    },
                    _staffType: staffType.INSTITUTION_STAFF, role: staffType.INSTITUTION_STAFF
                });

                for (const badgeClass of issuer.badgeclasses) {
                    badgeClassStaffMemberships.push({
                        badgeclass: {
                            issuer: {
                                name: issuer.name,
                                faculty: {name: faculty.name}, entityId: issuer.entityId
                            },
                            name: badgeClass.name, entityId: badgeClass.entityId
                        },
                        _staffType: staffType.INSTITUTION_STAFF, role: staffType.INSTITUTION_STAFF
                    });
                }
            }
        }
    }

    if (!isEmpty(issuerGroupStaffMemberships)) {
        const allFaculties = institution.faculties;
        issuerGroupStaffMemberships.forEach(issuerGroupStaffMembership => {
            issuerGroupStaffMembership.role = issuerGroupStaffMembership.mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER;
            const faculty = allFaculties.find(faculty => issuerGroupStaffMembership.faculty.entityId === faculty.entityId);
            faculty.issuers.forEach(issuer => {
                issuerStaffMemberships.push({
                    issuer: {
                        name: issuer.name, entityId: issuer.entityId,
                        faculty: {name: faculty.name, entityId: faculty.entityId}
                    },
                    _staffType: staffType.ISSUER_GROUP_STAFF,
                    role: issuerGroupStaffMembership.mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER
                });
            })
        })
    }

    if (!isEmpty(issuerStaffMemberships)) {
        const allIssuers = [];
        institution.faculties.forEach(faculty => faculty.issuers.forEach(issuer => allIssuers.push(issuer)));
        issuerStaffMemberships.forEach(issuerStaffMembership => {
            issuerStaffMembership.role = issuerStaffMembership.mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER;
            const issuer = allIssuers.find(issuer => issuerStaffMembership.issuer.entityId === issuer.entityId);
            issuer.badgeclasses.forEach(badgeClass => {
                badgeClassStaffMemberships.push({
                    badgeclass: {
                        issuer: {name: issuer.name, faculty: {name: issuer.faculty.name}},
                        name: badgeClass.name, entityId: badgeClass.entityId
                    },
                    _staffType: staffType.ISSUER_STAFF,
                    role: issuerStaffMembership.mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER
                });
            })
        })
    }

    for (const badgeClassStaffMembership of _badgeClassStaffMemberships) {
        if (badgeClassStaffMembership.mayAdministrateUsers) {
            Object.assign(badgeClassStaffMembership, {role: staffType.BADGE_CLASS_OWNER});
        } else if (badgeClassStaffMembership.mayUpdate) {
            Object.assign(badgeClassStaffMembership, {role: staffType.BADGE_CLASS_EDITOR});
        } else if (badgeClassStaffMembership.mayAward) {
            Object.assign(badgeClassStaffMembership, {role: staffType.BADGE_CLASS_AWARDER});
        }
    }
};

export const userHasPermissions = (entity, _entityType, institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs, anyAllowed = false) => {
    if (!isEmpty(institutionStaffs)) {
        return true;
    }
    let permitted = false;
    switch (_entityType) {
        case entityType.ISSUER_GROUP:
            permitted = issuerGroupStaffs.some(iGS => iGS.faculty.entityId === entity.entityId && (anyAllowed || (iGS.mayAdministrateUsers || iGS.mayUpdate)));
            break;
        case entityType.ISSUER:
            permitted = issuerStaffs.some(iS => iS.issuer.entityId === entity.entityId && (anyAllowed || (iS.mayAdministrateUsers || iS.mayUpdate))) ||
                issuerGroupStaffs.some(iGS => iGS.faculty.issuers.some(issuer => issuer.entityId === entity.entityId) && (anyAllowed || (iGS.mayAdministrateUsers || iGS.mayUpdate)));
            break;
        case entityType.BADGE_CLASS:
            const foundBadgeClassStaff = badgeClassStaffs.find(bCS => bCS.badgeclass.entityId === entity.entityId && (anyAllowed || (bCS.mayAdministrateUsers || bCS.mayUpdate)));
            const foundIssuerStaff = issuerStaffs.find(iS => iS.issuer.badgeclasses.find(badgeClass => badgeClass.entityId === entity.entityId) && (anyAllowed || (iS.mayAdministrateUsers || iS.mayUpdate)));
            const foundIssuerGroupStaff = issuerGroupStaffs.find(iGS => iGS.faculty.issuers.find(issuer => issuer.badgeclasses.find(badgeClass => badgeClass.entityId === entity.entityId))
                && (anyAllowed || (iGS.mayAdministrateUsers || iGS.mayUpdate)));
            permitted = foundBadgeClassStaff || foundIssuerStaff || foundIssuerGroupStaff;
    }
    return permitted;
};
