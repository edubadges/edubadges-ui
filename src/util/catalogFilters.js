import I18n from "i18n-js";

export const sortTargetOptions = () => [
    {value: "request", name: I18n.t("teacher.badgeclasses.mostRequested")},
    {value: "recent", name: I18n.t("teacher.badgeclasses.mostRecent")},
    {value: "awarded", name: I18n.t("teacher.badgeclasses.mostAwarded")},
];


export const studyLoadCategories = {
    NO_STUDYLOAD: "no_studyload",
    ECTS_0_5: "ects_0_5",
    ECTS_6_10: "ects_6_10",
    ECTS_10_MORE: "ects_10_more",
    HOURS_0_60: "hours_0_60",
    HOURS_61_120: "hours_61_120",
    HOURS_120_MORE: "hours_120_more"
}

export const educationalLevels = {
    WO: "WO",
    HBO: "HBO",
    MBO: "MBO",
    NONE: "NONE"
}

export const badgeClassFilterTypes = {
    MICRO_CREDENTIALS: "MICRO_CREDENTIALS",
    ARCHIVED: "ARCHIVED",
    OTHER: "OTHER",
    ALL: "ALL",
}

export const assignFilterTypes = badgeClass => {
    if (badgeClass.studyLoad) {
        const studyLoad = badgeClass.studyLoad;
        if (studyLoad < 61) {
            badgeClass.studyLoadType = studyLoadCategories.HOURS_0_60;
        } else if (studyLoad < 121) {
            badgeClass.studyLoadType = studyLoadCategories.HOURS_61_120;
        } else {
            badgeClass.studyLoadType = studyLoadCategories.HOURS_120_MORE;
        }
    } else if (badgeClass.ects) {
        const ects = badgeClass.ects;
        if (ects < 6) {
            badgeClass.studyLoadType = studyLoadCategories.ECTS_0_5;
        } else if (ects < 11) {
            badgeClass.studyLoadType = studyLoadCategories.ECTS_6_10;
        } else {
            badgeClass.studyLoadType = studyLoadCategories.ECTS_10_MORE;
        }
    } else {
        badgeClass.studyLoadType = studyLoadCategories.NO_STUDYLOAD;
    }
    let isOther = true;
    badgeClass.types = [];
    if (badgeClass.archived) {
        badgeClass.types.push(badgeClassFilterTypes.ARCHIVED);
        isOther = false
    }
    if (badgeClass.isMicroCredentials) {
        badgeClass.types.push(badgeClassFilterTypes.MICRO_CREDENTIALS);
        isOther = false
    }
    if (isOther) {
        badgeClass.types.push(badgeClassFilterTypes.OTHER);
    }

    badgeClass.institutionType = badgeClass.institution.institutionType || educationalLevels.NONE;


}