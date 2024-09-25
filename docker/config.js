export const config = {
  local: true,
  serverUrl: "http://localhost:8000",
  studentDomain: "edu_id",
  teacherDomain: "surf_conext",
  extensionsRootUrl: "http://localhost:8000/static",
  eduId: "https://mijn.test.eduid.nl",
  isDemoEnvironment: true,
  importBadgeAllowed: true,
  welcomeBadgeClassName: "Edubadge account complete",
  features: {
    endorsements: true
  },
  hostname: "localhost" // Used in info. Not the devserver hostname!
};
