export const getPendingEnrollmentsCount = issuerGroup => {
  return issuerGroup.issuers.reduce((acc, issuer) => {
    acc += issuer.badgeclasses.reduce((_acc, badgeClass) => {
      _acc += badgeClass.pendingEnrollments.length;
      return _acc;
    }, 0);
    return acc;
  }, 0);
};
