import I18n from "i18n-js";

export const isObject = val => {
    if (val === null || val === undefined) {
        return false;
    }
    return ((typeof val === "function") || (typeof val === "object"));
}

export const formatDate = iso => {
    const date = new Date(iso);
    const translation = I18n.locale === 'en' ? I18n.translations.en : I18n.translations.nl;
    return `${date.getDate()} ${translation.monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const formatOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

export const formatCreateDate = iso => {
    const date = new Date(iso);
    const locale = I18n.locale === "en" ? "en-US" : "nl-NL";
    const datePart = date.toLocaleDateString(locale, formatOptions);
    let minutes = date.getMinutes().toString();
    minutes = minutes.length === 2 ? minutes : "0" + minutes;
    return {date: datePart, hours: date.getHours(), minutes: minutes};
};

export const flatten = arr => arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);

//The properties from graphene are different from the properties from the public endpoints
export const translateProperties = obj => {
    if (!obj) {
        return;
    }
    const isEnglish = I18n.locale === "en";
    ["name", "description", "image", "url"].forEach(attr => {
        if (obj[`${attr}English`] || obj[`${attr}Dutch`]) {
            obj[attr] = isEnglish ? (obj[`${attr}English`] || obj[`${attr}Dutch`]) : (obj[`${attr}Dutch`] || obj[`${attr}English`]);
        }
        if (obj[`${attr}_english`] || obj[`${attr}_dutch`]) {
            obj[attr] = isEnglish ? (obj[`${attr}_english`] || obj[`${attr}_dutch`]) : (obj[`${attr}_dutch`] || obj[`${attr}_english`]);
        }
    });
    return obj;
}

//The properties from graphene are different then the properties from the public endpoints
export const translateBadgeClassProperties = badgeClass => {
    translateProperties(badgeClass);
    if (badgeClass.issuer) {
        translateProperties(badgeClass.issuer);
        if (badgeClass.issuer.faculty) {
            translateProperties(badgeClass.issuer.faculty);
            if (badgeClass.issuer.faculty.institution) {
                translateProperties(badgeClass.issuer.faculty.institution);
            }
        }
    }
}

export function isEmpty(obj) {
    if (obj === undefined || obj === null) {
        return true;
    }
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    if (typeof obj === "string") {
        return obj.trim().length === 0;
    }
    if (obj && obj.getTime) {
        return obj.getTime() !== obj.getTime();
    }
    if (typeof obj === "object") {
        return Object.keys(obj).length === 0;
    }
    return false;
}

export const splitListSemantically = (arr, lastSeparator) => {
    return [arr.slice(0, -1).join(", "), arr.slice(-1)[0]].join(arr.length < 2 ? "" : ` ${lastSeparator} `);
}

//See edubadges-server/apps/queries/api.py
export const translatePropertiesRawQueries = obj => {
    if (!obj) {
        return;
    }
    const isEnglish = I18n.locale === "en";
    ["name", "description", "image", "url"].forEach(attr => {
        ["i_", "f_", "ins_"].forEach(prefix => {
        if (obj[`${prefix}${attr}_english`] || obj[`${prefix}${attr}_dutch`]) {
            obj[prefix + attr] = isEnglish ? (obj[`${prefix}${attr}_english`] || obj[`${prefix}${attr}_dutch`])
                : (obj[`${prefix}${attr}_dutch`] || obj[`${prefix}${attr}_english`]);
        }

        })
    });
    return obj;
}


