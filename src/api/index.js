import { get } from "svelte/store";
import { authToken } from "../stores/user";
import { config } from "../util/config";

//Internal API
const serverUrl = config.serverUrl;

function validateResponse(res) {
  if (res.ok) return res.json();

  if (res.status === 400) throw res.json();
}

function validFetch(path, options = {}, method = "GET") {
  const token = get(authToken);
  if (!token) {
    return Promise.reject("no token");
  }
  const fetchOptions = {
    ...options,
    method,
    credentials: "same-origin",
    redirect: "manual",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return fetch(path, fetchOptions).then((res) => validateResponse(res));
}

// External API
// Token and Profile
export function requestLoginToken(service, isRegistration) {
  window.location.href = `${serverUrl}/account/sociallogin?provider=${service}&isRegistration=${isRegistration}`;
}

export function verifyUserIdentity() {
  window.location.href = config.alaUrl;
}

export function getProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path);
}

export function getSocialAccount() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path);
}

export function getEmails() {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(path);
}

export function addEmail(newEmail) {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(
    path,
    { body: JSON.stringify({ email: newEmail }) },
    "POST"
  );
}

export function setPrimaryEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetch(path, { body: JSON.stringify({ primary: true }) }, "PUT");
}

export function deleteEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetch(path, {}, "DELETE");
}

// Badges
export function getBadges() {
  const path = `${serverUrl}/v1/earner/badges`;
  return validFetch(path);
}

export function getSocialAccounts() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path);
}

export function requestBadge(id) {
  const path = `${serverUrl}/lti_edu/enroll`;
  return validFetch(
    path,
    { body: JSON.stringify({ badgeclass_slug: id }) },
    "POST"
  );
}

export function withdrawRequestBadge(enrollmentID) {
  const path = `${serverUrl}/lti_edu/withdraw`;
  return validFetch(
    path,
    { body: JSON.stringify({ enrollmentID: enrollmentID }) },
    "DELETE"
  );
}

export function getUnearnedBadges(eduId) {
  const path = `${serverUrl}/lti_edu/student/${eduId}/enrollments`;
  return validFetch(path);
}

// Institution
export function editInstitution(entityId, institution) {
  const path = `${serverUrl}/institution/edit/${entityId}`;
  return validFetch(path, { body: JSON.stringify(institution) }, "PUT");
}

// Faculty
export function editFaculty(entityId, faculty) {
  const path = `${serverUrl}/institution/faculties/edit/${entityId}`;
  return validFetch(path, { body: JSON.stringify(faculty) }, "PUT");
}

export function createFaculty(faculty) {
  const path = `${serverUrl}/institution/faculties/create`;
  return validFetch(path, { body: JSON.stringify(faculty) }, "POST");
}

// Issuer
export function editIssuer(entityId, issuer) {
  const path = `${serverUrl}/issuer/edit/${entityId}`;
  return validFetch(path, { body: JSON.stringify(issuer) }, "PUT");
}

export function createIssuer(issuer) {
  const path = `${serverUrl}/issuer/create`;
  return validFetch(path, { body: JSON.stringify(issuer) }, "POST");
}

// Badgeclass
export function editBadgeclass(entityId, badgeclass) {
  const path = `${serverUrl}/issuer/badgeclasses/edit/${entityId}`;
  return validFetch(path, { body: JSON.stringify(badgeclass) }, "PUT");
}

export function createBadgeclass(badgeclass) {
  const path = `${serverUrl}/issuer/badgeclasses/create`;
  return validFetch(path, { body: JSON.stringify(badgeclass) }, "POST");
}
