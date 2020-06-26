export const staffType = {
  INSTITUTION_STAFF: "institution staff",
  ISSUER_GROUP_STAFF: "issuer group staff",
  ISSUER_STAFF: "issuer staff",
  BADGE_CLASS_STAFF: "badge class staff",
  USER_PROVISIONMENT: "user provisionment"
};

export const addStaffType = (users, type) => {
  return users.map(user => {
    user._staffType = type;
    return user;
  })
};
