import {get} from "svelte/store";
import {authToken, showMainErrorDialog} from "../stores/user";
import {config} from "../util/config";
import {entityType} from "../util/entityTypes";
import I18n from "i18n-js";
import {isEmpty} from "../util/utils";

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

function badgeClassToJson(badgeclass) {
    return JSON.stringify(badgeclass).replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
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
            "x-requested-with": "client",
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
export function requestLoginToken(service, validateName = false, force = false) {
    const forceParam = force ? "&force=true" : "";
    window.location.href = `${serverUrl}/account/sociallogin?provider=${service}&validateName=${validateName}${forceParam}`;
}

export function getProfile() {
    const path = `${serverUrl}/user/profile`;
    return validFetchNoErrorDialog(path);
}

export function deleteProfile() {
    const path = `${serverUrl}/user/profile`;
    return validFetch(path, {}, "DELETE");
}

export function getSocialAccountsSafe() {
    const path = `${serverUrl}/user/socialaccounts`;
    return validFetch(path);
}

export function getSocialAccounts() {
    const path = `${serverUrl}/user/socialaccounts`;
    return validFetchNoErrorDialog(path);
}

export function getEmails() {
    const path = `${serverUrl}/user/emails`;
    return validFetch(path);
}

export function addEmail(newEmail) {
    const path = `${serverUrl}/user/emails`;
    return validFetchNoErrorDialog(
        path,
        {body: JSON.stringify({email: newEmail})},
        "POST"
    );
}

export function setPrimaryEmail(emailId) {
    const path = `${serverUrl}/user/emails/${emailId}`;
    return validFetchNoErrorDialog(path, {body: JSON.stringify({primary: true})}, "PUT");
}

export function deleteEmail(emailId) {
    const path = `${serverUrl}/user/emails/${emailId}`;
    return validFetchNoErrorDialog(path, {}, "DELETE");
}

export function deleteUser(entityId) {
    const path = `${serverUrl}/user/delete/${entityId}`;
    return validFetch(path, {}, "DELETE");
}

// Terms and agreements
export function validateInstitutions(schacHomeOrganisations) {
    const path = `${serverUrl}/institution/check`;
    return validFetch(path, {body: JSON.stringify(schacHomeOrganisations)}, "POST", false);
}

export function acceptTermsForBadge(terms_entity_id) {
    const path = `${serverUrl}/user/terms/accept`;
    return validFetch(path, {body: JSON.stringify([{terms_entity_id, accepted: true}])}, "POST");
}

export function tagUsage(tagName) {
    const path = `${serverUrl}/institution/tags`;
    return validFetch(path, {body: JSON.stringify({name: tagName})}, "POST");
}

export function withdrawTermsForBadge(terms_agreement_entity_id) {
    const path = `${serverUrl}/user/terms/accept`;
    return validFetch(path, {body: JSON.stringify({terms_agreement_entity_id: terms_agreement_entity_id})}, "DELETE");
}

// Student badges
export function requestBadge(id, narrative, evidence_url) {
    const path = `${serverUrl}/lti_edu/enroll`;
    const body = {badgeclass_slug: id, narrative: narrative, evidence_url: evidence_url};
    return validFetchNoErrorDialog(
        path,
        {body: JSON.stringify(body)},
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

export function logoutCurrentUser() {
    return validFetch(`${serverUrl}/user/socialaccounts/logout`, {}, "POST", true, false);
}

// Teacher badges
export function awardBadges(badgeId, enrollmentIds, useEvidence, narrative, url, name, description, gradeAchieved) {
    const path = `${serverUrl}/issuer/badgeclasses/award-enrollments/${badgeId}`;
    const body = {
        "issue_signed": false,
        "create_notification": true,
        "enrollments": enrollmentIds.map(el => {
            const res = {
                enrollment_entity_id: el,
                grade_achieved: gradeAchieved
            };
            if (useEvidence) {
                res.evidence_items = [{
                    "evidence_url": url,
                    "narrative": narrative,
                    "name": name,
                    "description": description
                }];
                if (narrative) {
                    res.narrative = narrative;
                }
            }
            return res;
        })
    };
    return validFetch(path, {body: JSON.stringify(body)}, "POST");
}

export function denyBadge(enrollmentEntityId, denyReason) {
    const path = `${serverUrl}/lti_edu/enrollment/${enrollmentEntityId}/deny`;
    return validFetch(path, {body: JSON.stringify({denyReason})}, "PUT");

}

export function revokeAssertions(assertionEntityIds, revocationReason) {
    const path = `${serverUrl}/issuer/revoke-assertions`;
    const assertions = assertionEntityIds.map(entityId => ({entity_id: entityId}));
    return validFetch(
        path,
        {body: JSON.stringify({revocation_reason: revocationReason, assertions: assertions})},
        "POST"
    );
}

export function revokeDirectAwards(directAwardEntityIds, revocationReason) {
    const path = `${serverUrl}/directaward/revoke-direct-awards`;
    const directAwards = directAwardEntityIds.map(entityId => ({entity_id: entityId}));
    return validFetch(
        path,
        {body: JSON.stringify({revocation_reason: revocationReason, direct_awards: directAwards})},
        "POST"
    );
}

export function deleteDirectAwards(directAwardEntityIds, revocationReason) {
    const path = `${serverUrl}/directaward/delete-direct-awards`;
    const directAwards = directAwardEntityIds.map(entityId => ({entity_id: entityId}));
    return validFetch(
        path,
        {body: JSON.stringify({revocation_reason: revocationReason, direct_awards: directAwards})},
        "PUT"
    );
}

export function resendDirectAwards(directAwardEntityIds) {
    const path = `${serverUrl}/directaward/resend-direct-awards`;
    const directAwards = directAwardEntityIds.map(entityId => ({entity_id: entityId}));
    return validFetch(
        path,
        {body: JSON.stringify({direct_awards: directAwards})},
        "POST"
    );
}

export function deleteAssertion(assertionEntityId) {
    const path = `${serverUrl}/earner/badges/${assertionEntityId}`;
    return validFetch(
        path,
        {body: JSON.stringify({})},
        "DELETE"
    );
}

export function publicAssertion(assertionEntityId, isPublic, includeEvidence, includeGradeAchieved) {
    const path = `${serverUrl}/earner/badges/${assertionEntityId}`;
    return validFetch(
        path,
        {
            body: JSON.stringify({
                "public": isPublic,
                "include_evidence": includeEvidence,
                "include_grade_achieved": includeGradeAchieved
            })
        },
        "PUT"
    );
}

export function acceptAssertion(assertionEntityId) {
    const path = `${serverUrl}/earner/badges/${assertionEntityId}`;
    return validFetch(
        path,
        {body: JSON.stringify({"acceptance": "Accepted"})},
        "PUT"
    );
}

export function claimAssertion(assertionEntityId) {
    const path = `${serverUrl}/earner/badges/${assertionEntityId}`;
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
    return validFetchNoErrorDialog(path, {body: badgeClassToJson(badgeclass)}, "PUT");
}

export function createBadgeclass(badgeclass) {
    const path = `${serverUrl}/issuer/badgeclasses/create`;
    return validFetchNoErrorDialog(path, {body: badgeClassToJson(badgeclass)}, "POST");
}

export function archiveBadgeclass(entityId, archive) {
    const path = `${serverUrl}/issuer/badgeclasses/archive/${entityId}`;
    return validFetchNoErrorDialog(path, {body: JSON.stringify({archive: archive})}, "PUT");
}

// Entities
export function deleteEntity(entityTypeName, entityId) {
    let path;
    switch (entityTypeName) {
        case entityType.ISSUER_GROUP:
            path = `${serverUrl}/institution/faculties/delete/${entityId}`;
            break;
        case entityType.ISSUER:
            path = `${serverUrl}/issuer/delete/${entityId}`;
            break;
        case entityType.BADGE_CLASS:
            path = `${serverUrl}/issuer/badgeclasses/delete/${entityId}`;
            break;
        default:
            throw new Error(`Unsupported delete ${entityTypeName}`)
    }
    return validFetch(path, {}, "DELETE");
}

// Public
export function getPublicInstitution(entityId) {
    const path = `${serverUrl}/public/institutions/${entityId}`;
    return validFetch(path, {}, "GET", false);
}

export function getPublicBadgeClass(badgeId) {
    const path = `${serverUrl}/public/badges/${badgeId}?expand=issuer&expand=awards&expand=endorsements&expand=micro`;
    return validFetch(path, {}, "GET", false, false);
}

export function getPublicIssuer(entityId) {
    const path = `${serverUrl}/public/issuers/${entityId}?expand=institution`;
    return validFetch(path, {}, "GET", false, false);
}

export function getPublicBadge(entityId) {
    const path = `${serverUrl}/public/assertions/${entityId}?expand=badge&expand=badge.issuer&expand=badge.user`;
    return validFetch(path, {}, "GET", false, false);
}

export function validateBadge(entityId) {
    const path = `${serverUrl}/public/assertions/validate/${entityId}`;
    return validFetchNoErrorDialog(path, {}, "GET", false);
}

export function validateName(identityHash, salt) {
    const path = `${serverUrl}/public/assertions/identity/${identityHash}/${salt}`;
    return validFetch(path, {}, "GET", false);
}

export function getValidatorInfo() {
    const path = `${serverUrl}/public/validator/info`;
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

export function makeUserIssuerGroupAwarder(facultyId, userId, notes) {
    const path = `${serverUrl}/staff-membership/faculty/${facultyId}/create`;
    const payload = {
        "may_create": 0,
        "may_read": 1,
        "may_update": 0,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
        "user": userId,
        "faculty": facultyId,
        "notes": notes
    };
    return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function changeUserIssuerGroupToAdmin(facultyMembershipId) {
    const path = `${serverUrl}/staff-membership/faculty/change/${facultyMembershipId}`;
    const payload = {
        "may_create": 1,
        "may_read": 1,
        "may_update": 1,
        "may_delete": 1,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 1,
    };
    return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function changeUserIssuerGroupToAwarder(facultyMembershipId) {
    const path = `${serverUrl}/staff-membership/faculty/change/${facultyMembershipId}`;
    const payload = {
        "may_create": 0,
        "may_read": 1,
        "may_update": 0,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
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

export function makeUserIssuerAwarder(issuerId, userId, notes) {
    const path = `${serverUrl}/staff-membership/issuer/${issuerId}/create`;
    const payload = {
        "may_create": 0,
        "may_read": 1,
        "may_update": 0,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
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

export function changeUserToIssuerGroupOwner(issuerMembershipId) {
    const path = `${serverUrl}/staff-membership/faculty/change/${issuerMembershipId}`;
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

export function changeUserToIssuerGroupAwarder(issuerMembershipId) {
    const path = `${serverUrl}/staff-membership/faculty/change/${issuerMembershipId}`;
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


export function changeUserToIssuerOwner(issuerMembershipId) {
    const path = `${serverUrl}/staff-membership/issuer/change/${issuerMembershipId}`;
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

export function changeUserToIssuerAwarder(issuerMembershipId) {
    const path = `${serverUrl}/staff-membership/issuer/change/${issuerMembershipId}`;
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

//Following methods all re-use the changeProvisionmentToBadgeclass${Role} as this is generic based on the provisionment ID
export function changeProvisionmentToIssuerOwner(provisionmentId) {
    return changeProvisionmentToBadgeclassOwner(provisionmentId)
}

export function changeProvisionmentToIssuerAwarder(provisionmentId) {
    return changeProvisionmentToBadgeclassAwarder(provisionmentId)
}

export function changeProvisionmentToIssuerGroupOwner(provisionmentId) {
    return changeProvisionmentToBadgeclassOwner(provisionmentId)
}

export function changeProvisionmentToIssuerGroupAwarder(provisionmentId) {
    return changeProvisionmentToBadgeclassAwarder(provisionmentId)
}

export function changeProvisionmentToBadgeclassOwner(provisionmentId) {
    const path = `${serverUrl}/user/provision/edit/${provisionmentId}`;
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
    const path = `${serverUrl}/user/provision/edit/${provisionmentId}`;
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
    const path = `${serverUrl}/user/provision/edit/${provisionmentId}`;
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
    const path = `${serverUrl}/user/provision/create`;
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
    const path = `${serverUrl}/user/provision/edit/${provisionmentId}`;
    return validFetch(path, {}, "DELETE");
}

export function createDirectAwards(directAwards, badgeclass, bulkAward, scheduled_at = null, ltiImport = false,
                                   enableAwardOnEmail = false) {
    const path = `${serverUrl}/directaward/create`;
    const payload = {
        notify_recipients: true,
        batch_mode: bulkAward,
        lti_import: ltiImport,
        scheduled_at: scheduled_at,
        badgeclass: badgeclass.entityId,
        identifier_type: enableAwardOnEmail ? "email" : "eppn",
        direct_awards: directAwards.map(da => ({
            recipient_email: da.email,
            eppn: da.eppn,
            evidence_url: isEmpty(da.evidence_url) ? null : da.evidence_url,
            narrative: isEmpty(da.narrative) ? null : da.narrative,
            grade_achieved: isEmpty(da.grade_achieved) ? null : da.grade_achieved,
            name: isEmpty(da.name) ? null : da.name,
            description: isEmpty(da.description) ? null : da.description,
        }))
    }
    return validFetch(path, {body: JSON.stringify(payload)}, "POST", true, false);
}

export function acceptRejectDirectAward(directAward, accept) {
    const path = `${serverUrl}/directaward/accept/${directAward.entityId}`;
    const payload = {"accept": accept};
    return validFetch(path, {body: JSON.stringify(payload)}, "POST");
}

export function sendFeedback(message) {
    const path = `${serverUrl}/user/feedback`;
    return validFetch(path, {body: JSON.stringify({message})}, "POST");
}

//Insights
export function insights(year, institutionId, countSURFInTotal) {
    const path = `${serverUrl}/insights/insight`;
    const data = {
        lang: I18n.locale,
        year: year
    }
    if (institutionId) {
        data["institution_id"] = institutionId;
        data["include_surf"] = countSURFInTotal;
    }
    return validFetch(path, {body: JSON.stringify(data)}, "POST");
}

export function fetchInstitutionAdmins() {
    const path = `${serverUrl}/insights/institution/admins`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function fetchInstitutionBadges() {
    const path = `${serverUrl}/insights/institution/badges`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function fetchInstitutionBadgeOverview() {
    const path = `${serverUrl}/insights/institution/badges-overview`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function fetchIssuerMembers() {
    const path = `${serverUrl}/insights/institution/issuer-members`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function fetchInstitutionMicroCredentials() {
    const path = `${serverUrl}/insights/institution/micro-credentials`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function fetchCountMicroCredentials() {
    const path = `${serverUrl}/insights/institution/micro-credentials-count`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function fetchMicroCredentialsBadges() {
    const path = `${serverUrl}/insights/institution/micro-credentials-badges`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

//Queries
export function fetchRawDirectAwards(status) {
    const path = `${serverUrl}/queries/direct-awards?status=${status}`;
    return validFetchNoErrorDialog(path, {}, "GET");
}


//BadgeInstanceCollections
export function createBadgeInstanceCollection(badgeInstanceCollection) {
    const path = `${serverUrl}/issuer/collections/create`;
    return validFetch(path, {body: JSON.stringify(badgeInstanceCollection)}, "POST", true, false);
}

export function editBadgeInstanceCollection(badgeInstanceCollection) {
    const path = `${serverUrl}/issuer/collections/edit/${badgeInstanceCollection.entity_id}`;
    return validFetch(path, {body: JSON.stringify(badgeInstanceCollection)}, "PUT", true, false);
}

export function deleteBadgeInstanceCollection(badgeInstanceCollection) {
    const path = `${serverUrl}/issuer/collections/delete/${badgeInstanceCollection.entityId}`;
    return validFetch(path, {}, "DELETE", true, false);
}

export function impersonate(userId) {
    const path = `${serverUrl}/account/impersonate/${userId}`;
    return validFetch(path, {});
}

//Import assertions
export function importedAssertions() {
    const path = `${serverUrl}/earner/imported/assertions`;
    return validFetch(path, {});
}

export function importAssertion(body) {
    const path = `${serverUrl}/earner/imported/assertions`;
    return validFetch(path, {body: JSON.stringify(body)}, "POST", true, false);
}

export function confirmImportedAssertion(body) {
    const path = `${serverUrl}/earner/imported/assertions/edit/${body.entity_id}`;
    return validFetch(path, {body: JSON.stringify(body)}, "PUT", true, false);
}

export function importedAssertionByEntityId(entityId) {
    const path = `${serverUrl}/earner/imported/assertions/detail/${entityId}`;
    return validFetch(path, {});
}

export function importedAssertionValidate(entityId) {
    const path = `${serverUrl}/earner/imported/assertions/validate/${entityId}`;
    return validFetch(path, {});
}

export function deleteImportedAssertion(entityId) {
    const path = `${serverUrl}/earner/imported/assertions/delete/${entityId}`;
    return validFetch(path, {}, "DELETE", true);
}

//LTI
export function getLTIContext(launchId) {
    const path = `${serverUrl}/lti/context/${launchId}/`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function getGrades(launchId) {
    const path = `${serverUrl}/lti/grades/${launchId}/`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function getMembers(launchId) {
    const path = `${serverUrl}/lti/members/${launchId}/`;
    return validFetchNoErrorDialog(path, {}, "GET");
}

export function linkLtiCourse(ltiCourse) {
    const path = `${serverUrl}/lti/course/create`;
    return validFetch(path, {body: JSON.stringify(ltiCourse)}, "POST", true, false);
}

export function deleteLtiCourse(ltiCourse) {
    const path = `${serverUrl}/lti/course/delete/${ltiCourse.entityId}`;
    return validFetch(path, {}, "DELETE", true, false);
}

//Notifications
export function updateNotifications(delta) {
    const path = `${serverUrl}/notifications/notifications`;
    return validFetch(path, {body: JSON.stringify(delta)}, "PUT");
}

//Endorsements
export function createEndorsement(endorsement) {
    const path = `${serverUrl}/endorsement/create`;
    return validFetch(path, {body: JSON.stringify(endorsement)}, "POST", true, false);
}

export function acceptEndorsement(endorsement) {
    const path = `${serverUrl}/endorsement/edit/${endorsement.entityId}`;
    return validFetch(path, {body: JSON.stringify({status: "Accepted"})}, "PUT", true, false);
}

export function rejectEndorsement(endorsement, reason) {
    const path = `${serverUrl}/endorsement/edit/${endorsement.entityId}`;
    return validFetch(path, {body: JSON.stringify({status: "Rejected", rejection_reason: reason})}, "PUT", true, false);
}

export function revokeEndorsement(endorsement, reason) {
    const path = `${serverUrl}/endorsement/edit/${endorsement.entityId}`;
    return validFetch(path, {body: JSON.stringify({status: "Revoked", revocation_reason: reason})}, "PUT", true, false);
}

export function deleteEndorsement(endorsement) {
    const path = `${serverUrl}/endorsement/delete/${endorsement.entityId}`;
    return validFetch(path, {}, "DELETE", true, false);
}

export function resendEndorsement(endorsement, message) {
    const path = `${serverUrl}/endorsement/resend/${endorsement.entityId}`;
    return validFetch(path, {body: JSON.stringify({message: message})}, "POST", true, false);
}

//ob3
export function ob3WalletImport(badgeInstance, variant) {
    const path = `${serverUrl}/ob3/v1/ob3`;
    const data = {badge_id: badgeInstance.id, variant}
    return validFetch(path, {body: JSON.stringify(data)}, "POST");
}

