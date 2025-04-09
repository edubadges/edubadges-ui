import {isEmpty, translatePropertiesRawQueries} from "./utils";
import {staffType} from "./staffTypes";

const transformUsername = (firstName, lastName) => {
    const lastIndexOf = lastName.lastIndexOf(",");
    if (lastIndexOf === -1) {
        return `${firstName || ""} ${lastName || ""}`.trim() || "-";
    }
    const insertion = lastName.substring(lastIndexOf + 1).trim();
    const firstPart = lastName.substring(0, lastIndexOf).trim();
    return `${firstName || ""} ${insertion} ${firstPart}`;
}

export const validatedUserName = validatedName => {
    const indexOfSpace = validatedName.indexOf(" ");
    return constructUserName({
        user: {
            firstName: validatedName.substring(0, indexOfSpace),
            lastName: validatedName.substring(indexOfSpace).trim()
        }
    })
}

export const constructUserName = obj => {
    if (obj.user) {
        return transformUsername(obj.user.firstName, obj.user.lastName);
    }
    return "-";
}

export const userNameCreatedBy = obj => {
    if (obj.createdBy) {
        return transformUsername(obj.createdBy.firstName, obj.createdBy.lastName);
    }
    return "-";
}

export const constructUserEmail = assertion => {
    return assertion.recipientEmail ? assertion.recipientEmail : (assertion.user ? assertion.user.email : "")
}

export const addPermissions = user => {
    const permission = user.permissions.find(permission => permission.highest);
    user.level = permission.level
    switch (permission.permission) {
        case "institution": {
            user.role = staffType.INSTITUTION_STAFF;
            user.unit_name = user.institution_name;
            break;
        }
        case "faculty": {
            user.unit_name = permission.faculty.name;
            if (permission.level === "awarder") {
                user.role = staffType.ISSUER_GROUP_AWARDER;
            } else {
                user.role = staffType.ISSUER_GROUP_ADMIN;
            }
            break;
        }
        case "issuer": {
            user.unit_name = permission.issuer.name;
            if (permission.level === "awarder") {
                user.role = staffType.ISSUER_AWARDER;
            } else {
                user.role = staffType.ISSUER_ADMIN;
            }
            break;
        }
        case "badge_class": {
            user.unit_name = permission.badge_class.name;
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

}

export const addUserPermissions = (user, attributes = ["name"], prefixes = [""]) => {
    user.full_name = `${user.first_name} ${user.last_name}`
    translatePropertiesRawQueries(user, ["institution_name"], prefixes)
    user.permissions.forEach(permission => {
        translatePropertiesRawQueries(permission.institution, attributes, prefixes)
        translatePropertiesRawQueries(permission.faculty, attributes, prefixes)
        translatePropertiesRawQueries(permission.issuer, attributes, prefixes)
        translatePropertiesRawQueries(permission.badge_class, attributes, prefixes)
    });
    if (isEmpty(user.permissions)) {
        user.role = staffType.VIEWER;
        user.unit_name = user.institution_name;
        return;
    }
    addPermissions(user);
    return user;

}
