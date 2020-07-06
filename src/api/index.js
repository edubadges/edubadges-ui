import {get} from "svelte/store";
import {authToken, showMainErrorDialog} from "../stores/user";
import {config} from "../util/config";

//Internal API
const serverUrl = config.serverUrl;

function validateResponse(res, method, showErrorDialog) {
  if (res.ok && method === "DELETE") {
    //Stupid backend API returns 200 but no content
    return Promise.resolve({});
  }
  if (res.ok && res.status !== 204) {
    return res.json();
  }

  const status = res.status.toString();
  if (status.startsWith("4") || status.startsWith("5")) {
    if (showErrorDialog) {
      showMainErrorDialog.set(true);
    }
    throw res.json();
  }
}

function validFetchNoErrorDialog(path, options = {}, method = "GET", useToken = true) {
  return validFetch(path, options, method, useToken, false)
}

function validFetch(path, options = {}, method = "GET", useToken = true, showErrorDialog = true) {
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
      return Promise.reject("No token, but required in JS API. Please check the API call if a token is required");
    }
    fetchOptions.headers.Authorization = "Bearer " + token;
  }

  return fetch(path, fetchOptions).then(res => validateResponse(res, method, showErrorDialog));
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

export function deleteProfile() {
  const path = `${serverUrl}/v1/user/profile`;
  return validFetch(path, {}, "DELETE");
}

export function getSocialAccountsSafe() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path);
}

export function getSocialAccount() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetchNoErrorDialog(path);
}

export function getEmails() {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetch(path);
}

export function addEmail(newEmail) {
  const path = `${serverUrl}/v1/user/emails`;
  return validFetchNoErrorDialog(
    path,
    {body: JSON.stringify({email: newEmail})},
    "POST"
  );
}

export function setPrimaryEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify({primary: true})}, "PUT");
}

export function deleteEmail(emailId) {
  const path = `${serverUrl}/v1/user/emails/${emailId}`;
  return validFetchNoErrorDialog(path, {}, "DELETE");
}

export function getSocialAccounts() {
  const path = `${serverUrl}/v1/user/socialaccounts`;
  return validFetch(path);
}

// Student badges
export function requestBadge(id) {
  const path = `${serverUrl}/lti_edu/enroll`;
  return validFetchNoErrorDialog(
    path,
    {body: JSON.stringify({badgeclass_slug: id})},
    "POST"
  );
}

export function withdrawRequestBadge(enrollmentID) {
  const path = `${serverUrl}/lti_edu/student/enrollments`;
  return validFetchNoErrorDialog(
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

export function acceptAssertion(assertionEntityId) {
  const path = `${serverUrl}/v1/earner/badges/${assertionEntityId}`;
  return validFetch(
    path,
    {body: JSON.stringify({"acceptance": "Accepted"})},
    "PUT"
  );
}

export function claimAssertion(assertionEntityId) {
  const path = `${serverUrl}/v1/earner/badges/${assertionEntityId}`;
  return validFetch(
    path,
    {body: JSON.stringify({"public": false, "acceptance": "Accepted"})},
    "PUT"
  );
}

// Institution
export function editInstitution(entityId, institution) {
  const path = `${serverUrl}/institution/edit/${entityId}`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(institution)}, "PUT");
}

// Faculty
export function editFaculty(entityId, faculty) {
  const path = `${serverUrl}/institution/faculties/edit/${entityId}`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(faculty)}, "PUT");
}

export function createFaculty(faculty) {
  const path = `${serverUrl}/institution/faculties/create`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(faculty)}, "POST");
}

// Issuer
export function editIssuer(entityId, issuer) {
  const path = `${serverUrl}/issuer/edit/${entityId}`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(issuer)}, "PUT");
}

export function createIssuer(issuer) {
  const path = `${serverUrl}/issuer/create`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(issuer)}, "POST");
}

// Badgeclass
export function editBadgeclass(entityId, badgeclass) {
  const path = `${serverUrl}/issuer/badgeclasses/edit/${entityId}`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(badgeclass)}, "PUT");
}

export function createBadgeclass(badgeclass) {
  const path = `${serverUrl}/issuer/badgeclasses/create`;
  return validFetchNoErrorDialog(path, {body: JSON.stringify(badgeclass)}, "POST");
}

// Entities
export function deleteEntity(entityType, entityId) {
  const path = `${serverUrl}/${entityType}/edit/${entityId}`;
  return validFetch(path, {}, "DELETE");
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
  return validFetchNoErrorDialog(path, {}, "GET", false);
}

export function validateName(identityHash, salt) {
  const path = `${serverUrl}/public/assertions/identity/${identityHash}/${salt}`;
  return validFetch(path, {}, "GET", false);
}

// Manage users
export function newStaffMembership(entityType, entityId, perms, userId, notes) {
  const path = `${serverUrl}/staff-membership/${entityType}/${entityId}/create`;
  const payload = {
    ...perms,
    "user": userId,
    entityType: entityId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function removeStaffMembership(entityType, staffMembershipId) {
  const path = `${serverUrl}/staff-membership/${entityType}/change/${staffMembershipId}`;
  return validFetch(path, {}, "DELETE");
}

export function makeUserInstitutionAdmin(insitutionId, userId, notes) {
  const path = `${serverUrl}/staff-membership/institution/${insitutionId}/create`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 1,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 1,
    "user": userId,
    "institution": insitutionId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function removeUserInstitutionAdmin(institutionMembershipId) {
  const path = `${serverUrl}/staff-membership/institution/change/${institutionMembershipId}`;
  return validFetch(path, {}, "DELETE");
}

export function makeUserIssuerGroupAdmin(facultyId, userId, notes) {
  const path = `${serverUrl}/staff-membership/faculty/${facultyId}/create`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 1,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 1,
    "user": userId,
    "faculty": facultyId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function removeUserIssuerGroupAdmin(facultyMembershipId) {
  const path = `${serverUrl}/staff-membership/faculty/change/${facultyMembershipId}`;
  return validFetch(path, {}, "DELETE");
}

export function makeUserIssuerAdmin(issuerId, userId, notes) {
  const path = `${serverUrl}/staff-membership/issuer/${issuerId}/create`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 1,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 1,
    "user": userId,
    "issuer": issuerId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function removeUserIssuerAdmin(issuerMembershipId) {
  const path = `${serverUrl}/staff-membership/issuer/change/${issuerMembershipId}`;
  return validFetch(path, {}, "DELETE");
}

export function makeUserBadgeclassOwner(badgeclassId, userId, notes) {
  const path = `${serverUrl}/staff-membership/badgeclass/${badgeclassId}/create`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 1,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 1,
    "user": userId,
    "badgeclass": badgeclassId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function makeUserBadgeclassEditor(badgeclassId, userId, notes) {
  const path = `${serverUrl}/staff-membership/badgeclass/${badgeclassId}/create`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 0,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 0,
    "user": userId,
    "badgeclass": badgeclassId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function makeUserBadgeclassAwarder(badgeclassId, userId, notes) {
  const path = `${serverUrl}/staff-membership/badgeclass/${badgeclassId}/create`;
  const payload = {
    "may_create": 0,
    "may_read": 1,
    "may_update": 0,
    "may_delete": 0,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 0,
    "user": userId,
    "badgeclass": badgeclassId,
    "notes": notes
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function removeUserBadgeclassPermission(badgeclassMembershipId) {
  const path = `${serverUrl}/staff-membership/badgeclass/change/${badgeclassMembershipId}`;
  return validFetch(path, {}, "DELETE");
}

export function changeUserToBadgeclassOwner(badgeclassMembershipId) {
  const path = `${serverUrl}/staff-membership/badgeclass/change/${badgeclassMembershipId}`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 1,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 1,
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "PUT");
}

export function changeUserToBadgeclassEditor(badgeclassMembershipId) {
  const path = `${serverUrl}/staff-membership/badgeclass/change/${badgeclassMembershipId}`;
  const payload = {
    "may_create": 1,
    "may_read": 1,
    "may_update": 1,
    "may_delete": 0,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 0,
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "PUT");
}

export function changeUserToBadgeclassAwarder(badgeclassMembershipId) {
  const path = `${serverUrl}/staff-membership/badgeclass/change/${badgeclassMembershipId}`;
  const payload = {
    "may_create": 0,
    "may_read": 1,
    "may_update": 0,
    "may_delete": 0,
    "may_sign": 1,
    "may_award": 1,
    "may_administrate_users": 0,
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "PUT");
}

export function changeProvisionmentToBadgeclassOwner(provisionmentId) {
  const path = `${serverUrl}/v1/user/provision/edit/${provisionmentId}`;
  const payload = {
    data: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 1,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 1,
    }
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "PUT");
}

export function changeProvisionmentToBadgeclassEditor(provisionmentId) {
  const path = `${serverUrl}/v1/user/provision/edit/${provisionmentId}`;
  const payload = {
    data: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 0,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 0,
    }
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "PUT");
}

export function changeProvisionmentToBadgeclassAwarder(provisionmentId) {
  const path = `${serverUrl}/v1/user/provision/edit/${provisionmentId}`;
  const payload = {
    data: {
      "may_create": 0,
      "may_read": 1,
      "may_update": 0,
      "may_delete": 0,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 0,
    }
  };
  return validFetch(path, {body: JSON.stringify(payload)}, "PUT");
}

export function inviteUser(entityType, entityId, userProvisonments) {
  const path = `${serverUrl}/v1/user/provision/create`;
  const payload = userProvisonments.map(({userEmail, permissions}) => {
    return {
      'content_type': entityType,
      'object_id': entityId,
      'email': userEmail,
      'for_teacher': true,
      'data': permissions,
      'type': 'Invitation'
    }
  });
  return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function disinviteUser(provisionmentId) {
  const path = `${serverUrl}/v1/user/provision/edit/${provisionmentId}`;
  return validFetch(path, {}, "DELETE");
}
