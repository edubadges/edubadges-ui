import { get } from "svelte/store";
import { authToken } from "../stores/user";
import { config } from "../util/config";

//Internal API
const serverUrl = config.serverUrl;

function validateResponse(res) {
  if (!res.ok) {
    if (res.type === "opaqueredirect") {
      setTimeout(() => window.location.reload(), 100);
      return res;
    }
    throw res;
  }
  return res.json();
}

function validFetch(path, options, requiresToken) {
  const token = get(authToken);
  if (requiresToken && !token) {
    return Promise.reject("no token");
  }
  const fetchOptions = {
    ...options,
    credentials: "same-origin",
    redirect: "manual",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  };
  if (requiresToken) {
    fetchOptions.headers.Authorization = 'Bearer ' + token;
  }
  return fetch(path, fetchOptions).then(res => validateResponse(res));
}

function methodFetch(path, method, body) {
  return validFetch(path, { method, body: JSON.stringify(body) }, true);
}

// External API
// Token and Profile
export function requestLoginToken(service) {
  window.location.href = `${serverUrl}/account/sociallogin?provider=${service}`;
}

export function requestProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path, {}, true);
}

export function getEmails() {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(path, {}, true);
}

export function addEmail(newEmail) {
  const path = `${serverUrl}/v1/user/emails`;
  return methodFetch(path, "POST", { 'email': newEmail });
}

export function setPrimaryEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return methodFetch(path, "PUT", { 'primary': true });
}

export function deleteEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return methodFetch(path, "DELETE", {});
}

// User
export function requestUser(slug) {
  const path = `${serverUrl}/v1/user/users/${slug}`;
  return validFetch(path, {}, true);
}

// Badges
export function getBadges() {
  const path = `${serverUrl}/v1/earner/badges`;
  return validFetch(path, {}, true);
}

export function getSocialAccounts() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path, {}, true);
}

export function requestBadge(url) {
  const path = `${serverUrl}/lti_edu/enroll`;
  return methodFetch(path, "POST", {"badgeclass_slug": url});
}

export function withdrawRequestBadge(url) {
  const path = `${serverUrl}/lti_edu/withdraw`;
  return methodFetch(path, "DELETE", {"enrollmentID": url});
}

export function getUnearnedBadges(eduId) {
  const path = `${serverUrl}/lti_edu/student/${eduId}/enrollments`;
  return validFetch(path, {}, true);
}

// Teacher
export function getTeacherBadges() {
  const path = `${serverUrl}/v1/issuer/all-badges`;
  return validFetch(path, {}, true);
}

export function getTeacherBadge(slug) {
  const path = `${serverUrl}/v1/issuer/all-badges/find?identifier=${slug}`;
  return validFetch(path, {}, true);
}

export function getIssuers() {
  const path = `${serverUrl}/v1/issuer/issuers`;
  return validFetch(path, {}, true);
}

export function getIssuer(slug) {
  const path = `${serverUrl}/v1/issuer/issuers/${slug}`;
  return validFetch(path, {}, true);
}

export function getIssuerBadges(slug) {
  const path = `${serverUrl}/v1/issuer/issuers/${slug}/badges`;
  return validFetch(path, {}, true);
}

export function getIssuerStaff(slug) {
  const path = `${serverUrl}/v1/issuer/issuers/${slug}/staff`;
  return validFetch(path, {}, true);
}
