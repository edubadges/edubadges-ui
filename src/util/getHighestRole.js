export const getHighestRole = (user) => {
  if (user.institutionStaff.mayAdministrateUsers) {
    return 'Institution Admin';
  } else {
    const facultyAdmin = user.facultyStaffs.reduce((acc, facultyMembership) => facultyMembership.mayAdministrateUsers || acc, false);
    const issuerAdmin = user.issuerStaffs.reduce((acc, issuerMembership) => issuerMembership.mayAdministrateUsers || acc, false);
    const badgeClassOwner = user.badgeclassStaffs.reduce((acc, badgeClassMembership) => badgeClassMembership.mayAdministrateUsers || acc, false);
    const badgeClassAwarder = user.badgeclassStaffs.reduce((acc, badgeClassMembership) => badgeClassMembership.mayAward || acc, false);

    if (facultyAdmin) {
      return 'Issuer Group Admin';
    } else if (issuerAdmin) {
      return 'Issuer Admin';
    } else if (badgeClassOwner) {
      return 'Badgeclass Owner';
    } else if (badgeClassAwarder) {
      return 'Badgeclass Awarder';
    } else {
      return 'no-role';
    }
  }
  return;
};
