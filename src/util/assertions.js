import I18n from "i18n-js";

export const isRevoked = assertion => {
    return (assertion.isDirectAward && assertion.status.toLowerCase() === "revoked") || (!assertion.isDirectAward && assertion.revoked);
}

export const assertionStatus = assertion => {
    status = assertionStatusClass(assertion);
    return I18n.t(`models.badge.statuses.${status}`);
}

export const assertionStatusClass = assertion => {
    if (!assertion.isDirectAward && assertion.revoked) {
        return "revoked"
    }
    if (assertion.isDirectAward) {
        return assertion.status.toLowerCase();
    }
    const acceptance = assertion.acceptance.toLowerCase();
    if (acceptance === "rejected") {
        return acceptance;
    }
    return "awarded";
}
