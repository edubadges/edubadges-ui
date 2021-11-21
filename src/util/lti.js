export const roles = allRoles => {
    return Array.from(new Set(allRoles.map(role => role.substring(role.indexOf("#") + 1)))).join(", ");
}

