import { permissionRoleValue } from "./permissionRolesToValue";
import { staffType } from "./staffTypes";

export const sortType = {
  ALPHA: "alpha",
  BOOLEAN: "boolean",
  NUMERIC: "numeric",
  COLLECTION: "collection",
  ROLES: "roles",
  INVITATION_STATUS: "invitationStatus",
  PERSONAL_DATA: "personalData"
};

const defaultValue = (attr, howToSort) => {
  switch (howToSort) {
    case sortType.ALPHA:
      return attr || "";
    case sortType.NUMERIC:
      return attr || 0;
    case sortType.COLLECTION:
      return attr || [];
    case sortType.BOOLEAN:
      return attr || false;
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
    switch (howToSort) {
      case sortType.ALPHA:
        return getNestedValue(a, attribute, howToSort).localeCompare(getNestedValue(b, attribute, howToSort));
      case sortType.BOOLEAN:
        return getNestedValue(a, attribute, howToSort).toString().localeCompare(getNestedValue(b, attribute, howToSort).toString());
      case sortType.NUMERIC:
        return parseInt(getNestedValue(b, attribute, howToSort), 10) - parseInt(getNestedValue(a, attribute, howToSort), 10);
      case sortType.COLLECTION:
        return getNestedValue(b, attribute, howToSort).length - getNestedValue(a, attribute, howToSort).length;
      case sortType.ROLES:
        return permissionRoleValue(b[attribute]) - permissionRoleValue(a[attribute]);
      case sortType.INVITATION_STATUS:
        return (b._staffType === staffType.USER_PROVISIONMENT ? Date.parse(b.createdAt) : 0) -
            (a._staffType === staffType.USER_PROVISIONMENT ? Date.parse(a.createdAt) : 0);
      case sortType.PERSONAL_DATA:
        return (a._staffType === staffType.USER_PROVISIONMENT ? a.email : a.user.firstName + " " + a.user.lastName)
            .localeCompare(b._staffType === staffType.USER_PROVISIONMENT ? b.email : b.user.firstName + " " + b.user.lastName);
      default:
        throw new Error(`Unsupported sortType ${howToSort}`);
    }
  });
  return reversed ? col.reverse() : col;
};
