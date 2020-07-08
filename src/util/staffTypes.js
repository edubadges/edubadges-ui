export const staffType = {
  INSTITUTION_STAFF: "institution_staff",
  ISSUER_GROUP_STAFF: "issuer_group_staff",
  ISSUER_STAFF: "issuer_staff",
  BADGE_CLASS_STAFF: "badge_class_staff",
  USER_PROVISIONMENT: "user_provisionment"
};

export const addStaffType = (users, type) => users.map(user => {
  user._staffType = type;
  return user;
});

