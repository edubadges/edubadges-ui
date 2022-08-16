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