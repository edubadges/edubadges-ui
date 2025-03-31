import env from "env-var";

export const config = {
    local: env.get("LOCAL").default("true").asBool(),
    serverUrl: env.get("SERVER_URL").default("http://localhost:8000").asUrlString(),
    studentDomain: env.get("STUDENT_DOMAIN").default("edu_id").asString(),
    teacherDomain: env.get("TEACHER_DOMAIN").default("surf_conext").asString(),
    extensionsRootUrl: env.get("EXTENSIONS_ROOT_URL").default("http://localhost:8000/static").asUrlString(),
    eduId: env.get("EDU_ID").default("https://mijn.test.eduid.nl").asUrlString(),
    isProdEnvironment: env.get("IS_PROD_ENVIRONMENT").default("false").asBool(),
    isDemoEnvironment: env.get("IS_DEMO_ENVIRONMENT").default("true").asBool(),
    importBadgeAllowed: env.get("IMPORT_BADGE_ALLOWED").default("true").asBool(),
    welcomeBadgeClassName: env.get("WELCOME_BADGE_CLASS_NAME").default("Edubadge account complete").asString(),
    features: {
        endorsements: env.get("FEATURES_ENDORSEMENTS").default("true").asBool(),
    },
    hostname: env.get("HOSTNAME").default("localhost").asString(),
};
