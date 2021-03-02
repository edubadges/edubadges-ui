import I18n from "i18n-js";

const urlRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

export const fallBackValue = val => val || I18n.t("models.badgeclass.notSet");

export const validUrl = val => urlRegExp.test(val);