export const config = {
    serverUrl: globalThis.SERVER_URL || "https://api-edubadges.dev.sdp.surf.nl",
    studentDomain: globalThis.STUDENT_DOMAIN || "edu_id",
    teacherDomain: globalThis.TEACHER_DOMAIN || "surf_conext",
    extensionsRootUrl: globalThis.EXTENSIONS_ROOT_URL || "https://api-edubadges.dev.sdp.surf.nl",
    eduId: globalThis.EDU_ID || "https://mijn.test.eduid.nl/personal",
    runtimeEnvironment: globalThis.RUNTIME_ENVIRONMENT || "production",
    importBadgeAllowed: globalThis.IMPORT_BADGE_ALLOWED || true,
    welcomeBadgeClassName: globalThis.WELCOME_BADGE_CLASS_NAME || "Edubadge account complete",
    features: {
        endorsements: globalThis.FEATURES_ENDORSEMENTS || true,
    },
};
