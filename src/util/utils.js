import I18n from "i18n-js";
import {config} from "../util/config";
import {badgeClassFilterTypes, educationalLevels} from "./catalogFilters";
import {badgeClassTypes} from "./badgeClassTypes";

const serverMediaUrl = `${config.serverUrl}/media`;

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

//The properties from graphene are different from the properties from the public endpoints
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
export const translatePropertiesRawQueriesDirectAward = obj => {
    if (!obj) {
        return;
    }
    const isEnglish = I18n.locale === "en";
    ["name", "description", "image", "url"].forEach(attr => {
        ["", "i_", "f_", "ins_"].forEach(prefix => {
            if (obj[`${prefix}${attr}_english`] || obj[`${prefix}${attr}_dutch`]) {
                obj[prefix + attr] = translateProperty(obj, prefix, attr, isEnglish)
            }
        })
    });
    if (obj.image) {
        obj.image = `${serverMediaUrl}/${obj.image}`;
    }
    return obj;
}

const translateProperty = (obj, prefix, attr, isEnglish) => {
    if (obj[`${prefix}${attr}_english`] || obj[`${prefix}${attr}_dutch`]) {
        return isEnglish ? (obj[`${prefix}${attr}_english`] || obj[`${prefix}${attr}_dutch`])
            : (obj[`${prefix}${attr}_dutch`] || obj[`${prefix}${attr}_english`]);
    }
    return null;
}

/*
 * See edubadges-server/apps/queries/api.py. For now - ideally we'll change this in the future - we mimic the original
 * structure for backward compatibility
 */
export const translatePropertiesRawQueriesBadgeClass = badgeClasses => {
    const isEnglish = I18n.locale === "en";

    const issuers = [];
    const faculties = [];
    const institutions = [];

    badgeClasses.forEach(badgeClass => {
            badgeClass.types = [];
            if (badgeClass.archived) {
                badgeClass.types.push(badgeClassFilterTypes.ARCHIVED);
            } else if (badgeClass.isPrivate) {
                badgeClass.types.push(badgeClassFilterTypes.DRAFT);
            } else if (badgeClass.isMicroCredentials) {
                badgeClass.types.push(badgeClassFilterTypes.MICRO_CREDENTIALS);
            } else if (badgeClass.typeBadgeClass.toLowerCase() === badgeClassTypes.REGULAR) {
                badgeClass.types.push(badgeClassFilterTypes.REGULAR);
            } else {
                badgeClass.types.push(badgeClassFilterTypes.EXTRA_CURRICULAR);
            }

            if (badgeClass.image) {
                badgeClass.image = `${serverMediaUrl}/${badgeClass.image}`;
            }
            const issuer = issuers.find(iss => iss.entityId === badgeClass.i_entity_id);
            if (issuer) {
                ++issuer.count;
                badgeClass.issuer = issuer;
            } else {
                badgeClass.issuer = issuers.find(issuer => issuer.entityId === badgeClass.i_entity_id) || {
                    name: translateProperty(badgeClass, "i_", "name", isEnglish),
                    description: translateProperty(badgeClass, "i_", "description", isEnglish),
                    url: translateProperty(badgeClass, "i_", "url", isEnglish),
                    image: translateProperty(badgeClass, "i_", "image", isEnglish),
                    entityId: badgeClass.i_entity_id,
                    count: 0
                }
                if (badgeClass.issuer.image) {
                    badgeClass.issuer.image = `${serverMediaUrl}/${badgeClass.issuer.image}`;
                }
                issuers.push(badgeClass.issuer)
            }
            const faculty = faculties.find(fac => fac.entityId === badgeClass.f_entity_id);
            if (faculty) {
                ++faculty.count;
                badgeClass.issuer.faculty = faculty;
            } else {
                badgeClass.issuer.faculty = {
                    name: translateProperty(badgeClass, "f_", "name", isEnglish),
                    description: translateProperty(badgeClass, "f_", "description", isEnglish),
                    image: translateProperty(badgeClass, "f_", "image", isEnglish),
                    entityId: badgeClass.f_entity_id,
                    onBehalfOf: badgeClass.onBehalfOf,
                    facultyType: badgeClass.facultyType,
                    count: 0
                }
                if (badgeClass.issuer.faculty.image) {
                    badgeClass.issuer.faculty.image = `${serverMediaUrl}/${badgeClass.issuer.faculty.image}`;
                }
                faculties.push(badgeClass.issuer.faculty);
            }
            const institution = institutions.find(ins => ins.entityId === badgeClass.ins_entity_id);
            if (institution) {
                ++institution.count;
                badgeClass.issuer.faculty.institution = institution;
            } else {
                badgeClass.issuer.faculty.institution = {
                    name: translateProperty(badgeClass, "ins_", "name", isEnglish),
                    description: translateProperty(badgeClass, "ins_", "description", isEnglish),
                    image: translateProperty(badgeClass, "ins_", "image", isEnglish),
                    entityId: badgeClass.ins_entity_id,
                    institutionType: badgeClass.institutionType,
                    count: 0
                }
                if (badgeClass.issuer.faculty.institution.image) {
                    badgeClass.issuer.faculty.institution.image = `${serverMediaUrl}/${badgeClass.issuer.faculty.institution.image}`;
                }
                institutions.push(badgeClass.issuer.faculty.institution);
            }
            if (!badgeClass.issuer.image) {
                if (badgeClass.issuer.faculty.image) {
                    badgeClass.issuer.image = badgeClass.issuer.faculty.image;
                } else {
                    badgeClass.issuer.image = badgeClass.issuer.faculty.institution.image;
                }
            }

            if (badgeClass.issuer?.faculty?.institution?.institutionType === "HBO/MBO") {
                badgeClass.institutionType = badgeClass.issuer.faculty.facultyType || educationalLevels.NONE;
            } else {
                badgeClass.institutionType = badgeClass.issuer?.faculty?.institution?.institutionType;
            }
        }
    )
}



