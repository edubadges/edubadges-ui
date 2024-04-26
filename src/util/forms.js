import I18n from "i18n-js";
import {isEmpty} from "./utils";

const urlRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const emailRegExp = /^.+@.+\..+$/;

export const fallBackValue = val => {
    return val || I18n.t("models.badgeclass.notSet");
}

export const addProtocolToURL = url => {
    if (!isEmpty(url) && !url.startsWith("http")) {
        return "https://" + url;
    }
    return url;
}

export const validUrl = val => urlRegExp.test(val);

export const validEmail = val => emailRegExp.test(val);

export const validEppn = (val, badgeClass) => {
    const {eppnRegExpFormat} = badgeClass.issuer.faculty.institution;
    return isEmpty(eppnRegExpFormat) || new RegExp(eppnRegExpFormat, "i").test(val);
}

export function stopEvent(e) {
    if (e !== undefined && e !== null) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    return true;
}
