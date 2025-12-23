import { userRole } from "../stores/user";
import { getService } from "./getService";
import { requestLoginToken } from "../api";

/**
 * Initiates the login flow for a given role
 * @param {string} chosenRole - The role to log in as (role.STUDENT or role.TEACHER)
 */
export const logIn = (chosenRole, validateName, forceLogin) => {
  const service = getService(chosenRole);
  userRole.set(chosenRole);

  requestLoginToken(service, validateName, forceLogin);
};
