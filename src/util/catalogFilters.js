import I18n from "i18n-js";

export const sortTargetOptions = () => [
    {value: "awarded", name: I18n.t("teacher.badgeclasses.mostAwarded")},
    {value: "request", name: I18n.t("teacher.badgeclasses.mostRequested")},
    {value: "recent", name: I18n.t("teacher.badgeclasses.mostRecent")}
];

export const educationalLevels = {
    WO: "WO",
    HBO: "HBO",
    MBO: "MBO",
    NONE: "NONE"
}

export const badgeClassFilterTypes = {
    MICRO_CREDENTIALS: "MICRO_CREDENTIALS",
    REGULAR: "REGULAR",
    EXTRA_CURRICULAR: "EXTRA_CURRICULAR",
    ARCHIVED: "ARCHIVED",
    DRAFT: "DRAFT",
    ALL: "ALL",
}

export const uniqueBadgesByNameAndLatestCreatedAt = (arr, attribute, dateField, uniqueContainerAttribute) => {
    const uniqueMap = new Map();

    for (const obj of arr) {
        const attributeValue = obj[attribute].toLowerCase() + obj[uniqueContainerAttribute].toLowerCase();

        const currentDate = new Date(obj[dateField]); // Convert date field to Date object for reliable comparison

        if (uniqueMap.has(attributeValue)) {
            // If we've seen this attribute value before, compare dates
            const existingObj = uniqueMap.get(attributeValue);
            const existingDate = new Date(existingObj[dateField]);

            if (currentDate > existingDate) {
                // Current object has a later date, so replace the existing one
                uniqueMap.set(attributeValue, obj);
            }
            // If currentDate is not later, we do nothing (keep the existing one)
        } else {
            // First time seeing this attribute value, so add it
            uniqueMap.set(attributeValue, obj);
        }
    }

    // Convert the Map values back to an array
    return Array.from(uniqueMap.values());
}
