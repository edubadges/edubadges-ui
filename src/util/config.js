export const config = {
    serverUrl: window.SERVER_URL || "https://api.edubadges.dev.sdp.surf.nl",
    studentDomain: window.STUDENT_DOMAIN || "edu_id",
    teacherDomain: window.TEACHER_DOMAIN || "surf_conext",
    extensionsRootUrl: window.EXTENSIONS_ROOT_URL || "https://api.edubadges.dev.sdp.surf.nl",
    eduId: window.EDU_ID || "https://mijn.test.eduid.nl/personal",
    isProdEnvironment: window.IS_PROD_ENVIRONMENT || false,
    isDemoEnvironment: window.IS_DEMO_ENVIRONMENT || true,
    importBadgeAllowed: window.IMPORT_BADGE_ALLOWED || true,
    welcomeBadgeClassName: window.WELCOME_BADGE_CLASS_NAME || "Edubadge account complete",
    features: {
        endorsements: window.FEATURES_ENDORSEMENTS || true,
    }
};
