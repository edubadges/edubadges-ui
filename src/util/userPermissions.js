import {staffType} from "./staffTypes";
import {entityType} from "./entityTypes";
import {isEmpty} from "lodash";

export const enrichUser = (institution, institutionStaffMemberships, issuerGroupStaffMemberships, issuerStaffMemberships, badgeClassStaffMemberships) => {
  const _issuerGroupStaffMemberships = [...issuerGroupStaffMemberships];
  const _issuerStaffMemberships = [...issuerStaffMemberships];

  if (!isEmpty(institutionStaffMemberships)) {
    for (const faculty of institution.faculties) {
      issuerGroupStaffMemberships.push({faculty: {name: faculty.name, entityId: faculty.entityId}, _staffType: staffType.INSTITUTION_STAFF});

      for (const issuer of faculty.issuers) {
        issuerStaffMemberships.push({issuer: {name: issuer.name, entityId: issuer.entityId, faculty: {name: faculty.name, entityId: faculty.entityId}}, _staffType: staffType.INSTITUTION_STAFF});

        for (const badgeClass of issuer.badgeclasses) {
          badgeClassStaffMemberships.push({badgeclass: {issuer: {name: issuer.name, faculty: {name: faculty.name}, entityId: issuer.entityId}, name: badgeClass.name, entityId: badgeClass.entityId}, _staffType: staffType.INSTITUTION_STAFF});
        }
      }
    }
  }
  if (!isEmpty(_issuerGroupStaffMemberships)) {
    const faculties = institution.faculties.filter(faculty => issuerGroupStaffMemberships.some(_facultyMembership => _facultyMembership.faculty.entityId === faculty.entityId));
    for (const faculty of faculties) {
      for (const issuer of faculty.issuers) {
        issuerStaffMemberships.push({issuer: {name: issuer.name, entityId: issuer.entityId}, _staffType: staffType.ISSUER_GROUP_STAFF});

        for (const badgeClass of issuer.badgeclasses) {
          badgeClassStaffMemberships.push({badgeclass: {issuer: {name: issuer.name, faculty: {name: faculty.name}}, name: badgeClass.name, entityId: badgeClass.entityId}, _staffType: staffType.ISSUER_GROUP_STAFF});
        }
      }
    }
  }

  if (!isEmpty(_issuerStaffMemberships)) {
    let allIssuers = [];
    institution.faculties.map(faculty => {
      faculty.issuers.map(issuer => {
        allIssuers.push(issuer);
      });
    });
    const issuers = allIssuers.filter(issuer => _issuerStaffMemberships.some(_issuerMembership => _issuerMembership.issuer.entityId === issuer.entityId));
    for (const issuer of issuers) {
      for (const badgeClass of issuer.badgeclasses) {
        badgeClassStaffMemberships.push({badgeclass: {issuer: {name: issuer.name, faculty: {name: issuer.faculty.name}}, name: badgeClass.name, entityId: badgeClass.entityId}, _staffType: staffType.ISSUER_STAFF});
      }
    }
  }
};

export const userAlreadyHasPermissions = (entity, _entityType, institutionStaffs, issuerGroupStaffs, issuerStaffs, badgeClassStaffs) => {
  if (institutionStaffs) return true;

  switch (_entityType) {
    case entityType.ISSUER_GROUP:
      return issuerGroupStaffs.some(iGS => iGS.faculty.entityId === entity.entityId);
    case entityType.ISSUER:
      return issuerStaffs.some(iS => iS.issuer.entityId === entity.entityId) || issuerGroupStaffs.some(iGS => iGS.faculty.issuers.some(issuer => issuer.entityId === entity.entityId));
    case entityType.BADGE_CLASS:
      break;
  }
};
