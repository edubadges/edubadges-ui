export const permissionsRole = {
  ADMIN: "admin",
  AWARDER: "awarder",
  EDITOR: "editor",
  OWNER: "owner"
}


export const rolesToPermissions = role => {
  switch (role) {
    case permissionsRole.ADMIN:
      return {
        "may_create": 1,
        "may_read": 1,
        "may_update": 1,
        "may_delete": 1,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 1,
      };
    case permissionsRole.EDITOR:
      return {
        "may_create": 1,
        "may_read": 1,
        "may_update": 1,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
      };
    case permissionsRole.AWARDER:
      return {
        "may_create": 0,
        "may_read": 1,
        "may_update": 0,
        "may_delete": 0,
        "may_sign": 1,
        "may_award": 1,
        "may_administrate_users": 0,
      };
    default : {
      throw new Error(`Not supported role ${role}`);
    }
  }
};