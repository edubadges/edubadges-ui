export const staffType = {
    INSTITUTION_STAFF: "institution_staff",
    ISSUER_GROUP_STAFF: "issuer_group_staff",
    ISSUER_STAFF: "issuer_staff",
    BADGE_CLASS_STAFF: "badge_class_staff",
    USER_PROVISIONMENT: "user_provisionment",
    ISSUER_GROUP_ADMIN: "issuer_group_admin",
    ISSUER_GROUP_AWARDER: "issuer_group_awarder",
    ISSUER_ADMIN: "issuer_admin",
    ISSUER_AWARDER: "issuer_awarder",
    BADGE_CLASS_OWNER: "badge_class_owner",
    BADGE_CLASS_EDITOR: "badge_class_editor",
    BADGE_CLASS_AWARDER: "badge_class_awarder",
    VIEWER: "viewer"
};

export const addStaffType = (staffUsers, type) => staffUsers.map(user => {
    user._staffType = type;
    return user;
});

export const expandStaffsBadgeClass = (institutionStaff, issuerGroupStaffs = [], issuerStaffs = [], badgeClassStaffs = []) => {
    let staffs = [];

    if (institutionStaff != null && institutionStaff.length > 0) {
        institutionStaff[0].institution.faculties.forEach(faculty =>
            faculty.issuers.forEach(issuer =>
                issuer.badgeclasses.forEach(badgeClass =>
                    staffs.push({
                        badgeClass,
                        _staffType: staffType.INSTITUTION_STAFF,
                        mayUpdate: true,
                        role: staffType.INSTITUTION_STAFF
                    }))));
    }

    issuerGroupStaffs.forEach(issuerGroupStaff =>
        issuerGroupStaff.faculty.issuers.forEach(issuer =>
            issuer.badgeclasses.forEach(badgeClass => staffs.push({
                badgeClass,
                _staffType: staffType.ISSUER_GROUP_STAFF,
                mayUpdate: issuerGroupStaff.mayUpdate,
                role: issuerGroupStaff.mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER
            }))
        ))

    issuerStaffs.forEach(issuerStaff =>
        issuerStaff.issuer.badgeclasses.forEach(badgeClass =>
            staffs.push({
                    badgeClass,
                    _staffType: staffType.ISSUER_STAFF,
                    mayUpdate: issuerStaff.mayUpdate,
                    role: issuerStaff.mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER
                })
        )
    );
    badgeClassStaffs.forEach(badgeClassStaff =>
        staffs.push({
                badgeClass: badgeClassStaff.badgeclass,
                _staffType: staffType.BADGE_CLASS_STAFF,
                mayAdministrateUsers: badgeClassStaff.mayAdministrateUsers,
                mayUpdate: badgeClassStaff.mayUpdate,
                mayAward: badgeClassStaff.mayAward,
                staffId: badgeClassStaff.entityId,
                role: badgeClassStaff.mayAdministrateUsers ? staffType.BADGE_CLASS_OWNER :
                    badgeClassStaff.mayUpdate ? staffType.BADGE_CLASS_EDITOR :
                        badgeClassStaff.mayAward ? staffType.BADGE_CLASS_AWARDER : '',
            })
    );

    return staffs;
};

export const expandStaffsIssuer = (institutionStaff, issuerGroupStaffs, issuerStaffs) => {
    let staffs = [];
    if (institutionStaff.length > 0) {
        for (const faculty of institutionStaff[0].institution.faculties) {
            for (const issuer of faculty.issuers) {
                staffs = [{
                    issuer,
                    _staffType: staffType.INSTITUTION_STAFF,
                    role: staffType.INSTITUTION_STAFF
                }, ...staffs];
            }
        }
    }

    if (issuerGroupStaffs.length > 0) {
        for (const issuerGroupStaff of issuerGroupStaffs) {
            for (const issuer of issuerGroupStaff.faculty.issuers) {
                staffs = [{
                    issuer: issuer,
                    _staffType: staffType.ISSUER_GROUP_STAFF,
                    mayUpdate: issuerGroupStaff.mayUpdate,
                    role: issuerGroupStaff.mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER,
                    staffId: issuerGroupStaff.entityId
                }, ...staffs];
            }
        }
    }

    if (issuerStaffs.length > 0) {
        for (const issuerStaff of issuerStaffs) {
            staffs = [{
                issuer: issuerStaff.issuer,
                _staffType: staffType.ISSUER_STAFF,
                mayUpdate: issuerStaff.mayUpdate,
                role: issuerStaff.mayUpdate ? staffType.ISSUER_ADMIN : staffType.ISSUER_AWARDER,
                staffId: issuerStaff.entityId
            }, ...staffs];
        }
    }
    return staffs;
};

export const expandStaffsIssuerGroup = (institutionStaff, issuerGroupStaffs) => {
    let staffs = [];

    if (institutionStaff.length > 0) {
        for (const faculty of institutionStaff[0].institution.faculties) {
            staffs = [{
                issuerGroup: faculty,
                _staffType: staffType.INSTITUTION_STAFF,
                role: staffType.INSTITUTION_STAFF
            }, ...staffs];
        }
    }

    if (issuerGroupStaffs.length > 0) {
        for (const issuerGroupStaff of issuerGroupStaffs) {
            staffs = [{
                issuerGroup: issuerGroupStaff.faculty,
                _staffType: staffType.ISSUER_GROUP_STAFF,
                mayUpdate: issuerGroupStaff.mayUpdate,
                role: issuerGroupStaff.mayUpdate ? staffType.ISSUER_GROUP_ADMIN : staffType.ISSUER_GROUP_AWARDER,
                staffId: issuerGroupStaff.entityId
            }, ...staffs];
        }
    }

    return staffs;
};
