import { role } from "../util/role";

/**
 * Route to role mapping
 * Maps route paths to their required role
 */
const routeRoles = {
  // Student routes
  "/backpack": role.STUDENT,
  "/badge-requests": role.STUDENT,
  "/collections": role.STUDENT,
  "/import": role.STUDENT,
  "/edit-collection": role.STUDENT,
  "/archived": role.STUDENT,
  "/direct-awards": role.STUDENT,
  "/enrollment": role.STUDENT,
  "/details": role.STUDENT,
  "/direct-award": role.STUDENT,

  // Teacher routes
  "/users": role.TEACHER,
  "/notifications": role.TEACHER,
  "/manage": role.TEACHER,
  "/badgeclass": role.TEACHER,
  "/invite-enrollements": role.TEACHER,
  "/permissions": role.TEACHER,
  "/impersonate": role.TEACHER,
  "/management-queries": role.TEACHER,
  "/insights": role.TEACHER,
  "/launch/lti": role.TEACHER,
  "/lti": role.TEACHER,

  // Note, /profile is excluded, as both teacher and student have their own route for this.
};

/**
 * Get the required role for a given pathname
 * @param {string} pathname - The path to check (e.g. "/backpack" or "/details/12345")
 * @returns {string|null} - The required role (role.STUDENT or role.TEACHER), or null if public
 */
export const getRequiredRole = (pathname) => {
  // Exact match first
  if (routeRoles[pathname]) {
    return routeRoles[pathname];
  }

  // Pattern match for dynamic segments (e.g. /details/:id)
  for (const [route, requiredRole] of Object.entries(routeRoles)) {
    if (pathname.startsWith(route + "/") || pathname.startsWith(route)) {
      return requiredRole;
    }
  }

  // No match - public route
  return null;
};

/**
 * Check if a path is public (doesn't require authentication)
 * @param {string} path - The path to check
 * @returns {boolean} - True if the path is public
 */
export const isPublic = (path) => {
  // "/" is always public
  if (path === "/") return true;

  const publicPaths = [
    "public",
    "login",
    "auth/login",
    "signup",
    "validate",
    "version/info",
    "launch/lti",
    "terms",
    "privacy",
  ];
  return publicPaths.some((p) => path.includes(p));
};
