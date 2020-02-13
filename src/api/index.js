import {get} from "svelte/store";
import {authToken} from "../stores/user";
import {config} from "../util/config";

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

// User
export function requestUser(slug) {
  const path = `${serverUrl}/v1/user/users/${slug}`;
  return validFetch(path, {}, true);
}

export function requestUsersWithinScope() {
  const path = `${serverUrl}/v1/user/users`;
  return validFetch(path, {}, true);
}

export function editUser(userSlug, userToEdit) {
  return methodFetch(`/v1/user/users/${userSlug}`, "PUT", userToEdit)
}

export function requestFaculties() {
  const path = `${serverUrl}/v1/user/faculties`;
  return validFetch(path, {}, true);
}

export function requestSocialAccounts() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path, {}, true);
}

export function fetchEmails() {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(path);
}

export function addEmail(email) {
  const path = `${serverUrl}/v1/user/emails`;
  return methodFetch(path, "post", { 'email': email });
}

export function removeEmail(email_id) {
  return methodFetch('/v1/user/emails/' + email_id, "DELETE");
}

export function setPrimaryEmail(email_id) {
  return methodFetch('/v1/user/emails/' + email_id, "PUT", { 'primary': true });
}

export function resendVerificationEmail(emailIdToVerify) {
  return methodFetch('/v1/user/emails/' + emailIdToVerify, "PUT", { 'resend': true });
}

// Badges
export function getBadges() {
  const path = `${serverUrl}/v1/earner/badges`;
  return validFetch(path, {}, true);
}

function parseLinkHeader(link_header) {
  const re = /<([^>]+)>; rel="([^"]+)"/g;
  let match;
  do {
    match = re.exec(link_header);
    if (match) {
      this._links[match[2]] = match[1];
    }
  } while (match);
}

const handleAssertionResult = (r) => {
  let resultset = {};
  if (r.headers && r.headers.has('link')) {
    let link = r.headers.get('link');
    resultset.links = new PaginationResults(link);
  }
  resultset.instances = r.json();
  return resultset;
};

export function listBadgeInstances(issuerSlug, badgeSlug, query, num) {
  if(!num) {
    num = 100;
  }
  let path = `${serverUrl}/v1/issuer/issuers/${issuerSlug}/badges/${badgeSlug}/assertions?num=${num}`;
  if (query) {
    path += `&recipient=${query}`
  }

}

// Issuer
export function createIssuer(creationIssuer) {
  return methodFetch(`/v1/issuer/issuers`, "PUT", creationIssuer);
}

export function editIssuer(issuerSlug, editingIssuer) {
  return methodFetch(`/v1/issuer/issuers/${issuerSlug}`, "PUT", editingIssuer);
}

export function listIssuers() {
  return validFetch(`/v1/issuer/issuers`, {},true);
}

export function getIssuer(issuerSlug) {
  return validFetch(`/v1/issuer/issuers/${issuerSlug}`, {}, true);
}

export function updateStaff(issuerSlug, updateOp) {
  return methodFetch(`/v1/issuer/issuers/${issuerSlug}/staff`, "POST", updateOp);
}

// Mock API
