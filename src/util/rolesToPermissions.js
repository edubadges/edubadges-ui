export const rolesToPermissions = role => {
  switch (role) {
    case 'admin':
      return {
        "may_create": 1,
        "may_read": 1,
        "may_update": 1,
        "may_delete": 1,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 1,
      };
    case 'editor':
      return {
        "may_create": 1,
        "may_read": 1,
        "may_update": 1,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
      };
    case 'awarder':
      return {
        "may_create": 0,
        "may_read": 1,
        "may_update": 0,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
      };
  }
};