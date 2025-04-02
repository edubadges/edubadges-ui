export const config = {
    local: window.LOCAL || "true",
    serverUrl: window.SERVER_URL || "http://localhost",
    studentDomain: window.STUDENT_DOMAIN || "edu_id",
    teacherDomain: window.TEACHER_DOMAIN || "surf_conext",
    extensionsRootUrl: window.EXTENSIONS_ROOT_URL || "http://localhost:8000/static",
    eduId: window.EDU_ID || "https://mijn.test.eduid.nl",
    isProdEnvironment: window.IS_PROD_ENVIRONMENT || false,
    isDemoEnvironment: window.IS_DEMO_ENVIRONMENT || true,
    importBadgeAllowed: window.IMPORT_BADGE_ALLOWED || true,
    welcomeBadgeClassName: window.WELCOME_BADGE_CLASS_NAME || "Edubadge account complete",
    features: {
        endorsements: window.FEATURES_ENDORSEMENTS || true,
    },
    hostname: window.HOSTNAME || "http://localhost",
};
