export const permissionRoleValue = role => {
  switch (role) {
    case 'Institution Admin':
      return 6;
    case 'Issuer Group Admin':
      return 5;
    case 'Issuer Admin':
      return 4;
    case 'Badgeclass Owner':
      return 3;
    case 'Badgeclass Editor':
      return 2;
    case 'Badgeclass Awarder':
      return 1;
    case 'Viewer':
      return 0;
    default:
      return -1;
  }
};