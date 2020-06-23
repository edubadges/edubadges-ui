export const staffRole = {
  INSTITUTION_ADMIN: {
    LOCALE_VALUE: 'institutionAdmin',
    SORTING_VALUE: 6,
    PERMISSIONS: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 1,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 1,
    }
  },
  ISSUER_GROUP_ADMIN: {
    LOCALE_VALUE: 'issuerGroupAdmin',
    SORTING_VALUE: 5,
    PERMISSIONS: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 1,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 1,
    }
  },
  ISSUER_ADMIN: {
    LOCALE_VALUE: 'issuerGroupAdmin',
    SORTING_VALUE: 4,
    PERMISSIONS: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 1,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 1,
    }
  },
  BADGE_CLASS_OWNER: {
    LOCALE_VALUE: 'badgeClassOwner',
    SORTING_VALUE: 3,
    PERMISSIONS: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 1,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 1,
    }
  },
  BADGE_CLASS_EDITOR: {
    LOCALE_VALUE: 'badgeClassEditor',
    SORTING_VALUE: 2,
    PERMISSIONS: {
      "may_create": 1,
      "may_read": 1,
      "may_update": 1,
      "may_delete": 0,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 0,
    }
  },
  BADGE_CLASS_AWARDER: {
    LOCALE_VALUE: 'badgeClassAwarder',
    SORTING_VALUE: 1,
    PERMISSIONS: {
      "may_create": 0,
      "may_read": 1,
      "may_update": 0,
      "may_delete": 0,
      "may_sign": 1,
      "may_award": 1,
      "may_administrate_users": 0,
    }
  },
  VIEWER: {
    LOCALE_VALUE: 'viewer',
    SORTING_VALUE: 0,
  }
};