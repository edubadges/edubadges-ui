import { get } from "svelte/store";
import { authToken } from "../stores/user";
import { config } from "../util/config";

//Internal API
const serverUrl = config.serverUrl;

function validateResponse(res) {
  if (res.ok) return res.json();

  throw res.json();
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
      Authorization: "Bearer " + token
    }
  };
  return fetch(path, fetchOptions).then(res => validateResponse(res));
}

// External API
// Token and Profile
export function requestLoginToken(service) {
  window.location.href = `${serverUrl}/account/sociallogin?provider=${service}`;
}

export function getProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path);
}

export function getEmails() {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(path);
}

export function addEmail(newEmail) {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(path, { body: JSON.stringify({ 'email': newEmail }) }, "POST");
}

export function setPrimaryEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetch(path, { body: JSON.stringify({ 'primary': true }) }, "PUT");
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

export function requestBadge(url) {
  const path = `${serverUrl}/lti_edu/enroll`;
  return validFetch(
    path,
    { body: JSON.stringify({ badgeclass_slug: url }) },
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
