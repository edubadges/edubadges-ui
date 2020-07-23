import {staffType} from "./staffTypes";

export const permissionRoleValue = role => {
  switch (role) {
    case staffType.INSTITUTION_STAFF:
      return 6;
    case staffType.ISSUER_GROUP_STAFF:
      return 5;
    case staffType.ISSUER_STAFF:
      return 4;
    case staffType.BADGE_CLASS_OWNER:
      return 3;
    case staffType.BADGE_CLASS_EDITOR:
      return 2;
    case staffType.BADGE_CLASS_AWARDER:
      return 1;
    case staffType.VIEWER:
      return 0;
    default:
      return -1;
  }
};