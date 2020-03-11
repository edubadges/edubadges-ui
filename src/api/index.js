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
    return res;
  }
  return res.json();
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

// Badges
export function requestBadge(url) {
  const path = `${serverUrl}/lti_edu/enroll`;
  return validFetch(path, { body: JSON.stringify({ 'badgeclass_slug': url }) }, "POST");
}

export function withdrawRequestBadge(enrollmentID) {
  const path = `${serverUrl}/lti_edu/withdraw`;
  return validFetch(path, { body: JSON.stringify({ 'enrollmentID': enrollmentID }) }, "DELETE");
}

export function getUnearnedBadges(eduId) {
  const path = `${serverUrl}/lti_edu/student/${eduId}/enrollments`;
  return validFetch(path);
}