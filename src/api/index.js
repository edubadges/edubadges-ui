import mockIssuer from '../mockJsons/issuers.json';
import {get} from "svelte/store";
import {authToken} from "../stores/user";
import {config} from "../util/config";

//Internal API
let csrfToken = null;
const serverUrl = config.serverUrl;

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

export function requestLoginToken(service) {
  window.location.href = `${serverUrl}/account/sociallogin?provider=${service}`;
}

export function requestProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path, {}, true);
}

export function requestUserData(slug) {
  const path = `${serverUrl}/v1/user/users/${slug}`;
  return validFetch(path, {}, true);
}