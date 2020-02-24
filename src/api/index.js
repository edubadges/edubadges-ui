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

// External API
// Token and Profile
export function requestLoginToken(service) {
  window.location.href = `${serverUrl}/account/sociallogin?provider=${service}`;
}

export function requestProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path, {}, true);
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

// Teacher
export function getTeacherBadges() {
  const path = `${serverUrl}/v1/issuer/all-badges`;
  return validFetch(path, {}, true);
}

export function getFaculties() {
  const path = `${serverUrl}/institution/faculties`;
  return validFetch(path, {}, true);
}
