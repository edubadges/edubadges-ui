import mockIssuer from '../mockJsons/issuers.json';
import {get} from "svelte/store";
import {authToken} from "../stores/user";
import {config} from "../stores/config";

//Internal API
let csrfToken = null;
let serverUrl = get(config).serverUrl;
let token = get(authToken);

function validateResponse(res) {
  if (!res.ok) {
    if (res.type === "opaqueredirect") {
      setTimeout(() => window.location.reload(), 100);
      return res;
    }
    throw res;
  }
  csrfToken = res.headers.get("x-csrf-token");
  return res.json();
}

function validFetch(path, options, requiresToken) {
  if (requiresToken && !token) {
    setTimeout(() => window.location.reload(), 100);
  }
  const fetchOptions = {
    ...options,
    credentials: "same-origin",
    redirect: "manual",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "X-CSRF-TOKEN": csrfToken TODO
    }
  };
  if (requiresToken) {
    fetchOptions.headers.Authorization = 'Bearer ' + token;
  }
  return fetch(path, fetchOptions).then(res => validateResponse(res));
}

function fetchDelete(path) {
  return validFetch(path, { method: "delete" }, false);
}

function fetchJson(path, options = {}) {
  return validFetch(path, options, false);
}

function postPutJson(path, body, method) {
  return fetchJson(path, { method, body: JSON.stringify(body) });
}

//Base
export function me() {
  return fetchJson("/myconext/api/sp/me");
}

export function configuration() {
  return fetchJson("/config");
}

export function updateUser(user) {
  return postPutJson("/myconext/api/sp/update", user, "PUT");
}

export function updateSecurity(userId, currentPassword, newPassword) {
  const body = { userId, currentPassword, newPassword };
  return postPutJson("/myconext/api/sp/security", body, "PUT");
}

export function deleteUser(user) {
  return fetch("/Shibboleth.sso/Logout").then(() =>
    fetchDelete(`/myconext/api/sp/delete/${user.id}`)
  );
}

export function logout() {
  return fetch("/Shibboleth.sso/Logout").then(() =>
    fetchJson("/myconext/api/sp/logout")
  );
}

export function forgetMe() {
  return fetchDelete("/myconext/api/sp/forget");
}

export function requestProfile(authToken) {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path, {}, true);
}

export function requestUserData(slug) {
  const path = `${serverUrl}/v1/user/users/${slug}`;
  return validFetch(path, {}, true);
}

export function requestSocialAccounts() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path, {}, true);
}

export function forgotPassword() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path, {}, true);
}

// mockJsons payloads
export function issuers() {
    return new Promise((resolve, reject) => {
      resolve(mockIssuer);
    });
}