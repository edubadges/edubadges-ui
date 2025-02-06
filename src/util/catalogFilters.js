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
