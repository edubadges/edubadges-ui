import {get} from "svelte/store";
import {authToken} from "../stores/user";
import {config} from "../util/config";

//Internal API
const serverUrl = config.serverUrl;

function validateResponse(res, method) {
  if (res.ok && method === "DELETE") {
    //Stupid backend API returns 200 but no content
    return Promise.resolve({});
  }
  if (res.ok && res.status !== 204) {
    return res.json();
  }

  const status = res.status.toString();
  if (status.startsWith("4") || status.startsWith("5")) {
    throw res.json();
  }
}

function validFetch(path, options = {}, method = "GET", useToken = true) {
  const fetchOptions = {
    ...options,
    method,
    credentials: "same-origin",
    redirect: "manual",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (useToken) {
    const token = get(authToken);
    if (!token) {
      return Promise.reject("no token");
    }
    fetchOptions.headers.Authorization = "Bearer " + token;
  }

  return fetch(path, fetchOptions).then(res => validateResponse(res, method));
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

export function deleteProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path, {}, "DELETE");
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
    {body: JSON.stringify({email: newEmail})},
    "POST"
  );
}

export function setPrimaryEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetch(path, {body: JSON.stringify({primary: true})}, "PUT");
}

export function deleteEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetch(path, {}, "DELETE");
}

export function getSocialAccounts() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path);
}

// Student badges
export function requestBadge(id) {
  const path = `${serverUrl}/lti_edu/enroll`;
  return validFetch(
    path,
    {body: JSON.stringify({badgeclass_slug: id})},
    "POST"
  );
}

export function withdrawRequestBadge(enrollmentID) {
  const path = `${serverUrl}/lti_edu/student/enrollments`;
  return validFetch(
    path,
    {body: JSON.stringify({enrollmentID: enrollmentID})},
    "DELETE"
  );
}

// Teacher badges
export function awardBadges(badgeId, enrollmentIds) {
  const path = `${serverUrl}/issuer/badgeclasses/award-enrollments/${badgeId}`;
  return validFetch(
    path,
    {
      body: JSON.stringify({
        "issue_signed": false,
        "create_notification": true,
        "enrollments": enrollmentIds.map(el => {
          return {"enrollment_entity_id": el}
        })
      })
    },
    "POST"
  )
}

export function denyBadge(enrollmentEntityId) {
  const path = `${serverUrl}/lti_edu/enrollment/${enrollmentEntityId}/deny`;
  return validFetch(path, {body: "{}"}, "PUT");

}

export function revokeAssertion(issuerEntityId, badgeEntityId, assertionEntityId, revocationReason) {
  const path = `${serverUrl}/issuer/issuers/${issuerEntityId}/badges/${badgeEntityId}/assertions/${assertionEntityId}`;
  return validFetch(
    path,
    {body: JSON.stringify({revocation_reason: revocationReason})},
    "DELETE"
  );
}

export function deleteAssertion(assertionEntityId) {
  const path = `${serverUrl}/v1/earner/badges/${assertionEntityId}`;
  return validFetch(
    path,
    {body: JSON.stringify({})},
    "DELETE"
  );
}

export function publicAssertion(assertionEntityId, isPublic) {
  const path = `${serverUrl}/v1/earner/badges/${assertionEntityId}`;
  return validFetch(
    path,
    {body: JSON.stringify({"public": isPublic})},
    "PUT"
  );
}

// Institution
export function editInstitution(entityId, institution) {
  const path = `${serverUrl}/institution/edit/${entityId}`;
  return validFetch(path, {body: JSON.stringify(institution)}, "PUT");
}

// Faculty
export function editFaculty(entityId, faculty) {
  const path = `${serverUrl}/institution/faculties/edit/${entityId}`;
  return validFetch(path, {body: JSON.stringify(faculty)}, "PUT");
}

export function createFaculty(faculty) {
  const path = `${serverUrl}/institution/faculties/create`;
  return validFetch(path, {body: JSON.stringify(faculty)}, "POST");
}

// Issuer
export function editIssuer(entityId, issuer) {
  const path = `${serverUrl}/issuer/edit/${entityId}`;
  return validFetch(path, {body: JSON.stringify(issuer)}, "PUT");
}

export function createIssuer(issuer) {
  const path = `${serverUrl}/issuer/create`;
  return validFetch(path, {body: JSON.stringify(issuer)}, "POST");
}

// Badgeclass
export function editBadgeclass(entityId, badgeclass) {
  const path = `${serverUrl}/issuer/badgeclasses/edit/${entityId}`;
  return validFetch(path, {body: JSON.stringify(badgeclass)}, "PUT");
}

export function createBadgeclass(badgeclass) {
  const path = `${serverUrl}/issuer/badgeclasses/create`;
  return validFetch(path, {body: JSON.stringify(badgeclass)}, "POST");
}

// Public
export function getPublicBadgeClass(badgeId) {
  const path = `${serverUrl}/public/badges/${badgeId}?expand=issuer`;
  return validFetch(path, {}, "GET", false);
}

export function getPublicBadge(entityId) {
  const path = `${serverUrl}/public/assertions/${entityId}?expand=badge&expand=badge.issuer`;
  return validFetch(path, {}, "GET", false);
}

export function validateBadge(entityId) {
  const path = `${serverUrl}/public/assertions/validate/${entityId}`;
  return validFetch(path, {}, "GET", false);

}