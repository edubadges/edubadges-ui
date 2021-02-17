import { permissionRoleValue } from "./permissionRolesToValue";
import { staffType } from "./staffTypes";
import { attr } from "svelte/internal";
import { getPendingEnrollmentsCount } from "./issuerGroupPendingEnrollments";

export const sortType = {
  ALPHA: "alpha",
  DATE: "date",
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  COLLECTION: "collection",
  ROLES: "roles",
  INVITATION_STATUS: "invitationStatus",
  PERSONAL_DATA: "personalData",
  ISSUER_BADGE_CLASS_ASSERTIONS: "issuerBadgeClassAssertions",
  ISSUER_GROUP_ENROLLMENTS: "IssuerGroupEnrollments"
};

const defaultValue = (attr, howToSort) => {
  switch (howToSort) {
    case sortType.ALPHA:
      return attr || "";
    case sortType.DATE:
      return attr || null;
    case sortType.NUMERIC:
      return attr || 0;
    case sortType.COLLECTION:
      return attr || [];
    case sortType.BOOLEAN:
      return attr || false;
    case sortType.ISSUER_BADGE_CLASS_ASSERTIONS:
      return attr || 0;
    case sortType.ISSUER_GROUP_ENROLLMENTS:
      return attr || 0;
    default:
      throw new Error(`Undefined sortType: ${howToSort}`);
  }
};

const getNestedValue = (obj, attr, howToSort) => {
  const parts = attr.split(".");
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    obj = obj ? defaultValue(obj[part], howToSort) : defaultValue(null, howToSort);
  }
  return obj || defaultValue(null, howToSort);
};

export {getNestedValue as nestedValue};

export function sort(collection, attribute, reversed, howToSort = sortType.ALPHA) {
  if (!attribute) {
    return reversed ? collection.reverse() : collection;
  }

  const col = collection.sort((a, b) => {
    let valA = getNestedValue(a, attribute, howToSort);
    let valB = getNestedValue(b, attribute, howToSort);
    switch (howToSort) {
      case sortType.ALPHA:
        return valA.localeCompare(valB);
      case sortType.DATE:
        return new Date(valA) - new Date(valB);
      case sortType.BOOLEAN:
        return valA.toString().localeCompare(valB.toString());
      case sortType.NUMERIC:
        return parseInt(valB, 10) - parseInt(valA, 10);
      case sortType.COLLECTION:
        return valB.length - valA.length;
      case sortType.ROLES:
        return permissionRoleValue(b[attribute]) - permissionRoleValue(a[attribute]);
      case sortType.INVITATION_STATUS:
        return (b._staffType === staffType.USER_PROVISIONMENT ? Date.parse(b.createdAt) : 0) -
            (a._staffType === staffType.USER_PROVISIONMENT ? Date.parse(a.createdAt) : 0);
      case sortType.PERSONAL_DATA:
        return (a._staffType === staffType.USER_PROVISIONMENT ? a.email : a.user.firstName + " " + a.user.lastName)
            .localeCompare(b._staffType === staffType.USER_PROVISIONMENT ? b.email : b.user.firstName + " " + b.user.lastName);
      case sortType.ISSUER_BADGE_CLASS_ASSERTIONS:
        return parseInt(b.badgeclasses.reduce((acc, badgeClass) => acc += (badgeClass.badgeAssertions || []).length, 0))
          - parseInt(a.badgeclasses.reduce((acc, badgeClass) => acc += (badgeClass.badgeAssertions || []).length, 0));
      case sortType.ISSUER_GROUP_ENROLLMENTS:
        return getPendingEnrollmentsCount(b) - getPendingEnrollmentsCount(a);
      default:
        throw new Error(`Unsupported sortType ${howToSort}`);
    }
  });
  return reversed ? col.reverse() : col;
};
