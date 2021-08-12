import I18n from "i18n-js";

export const isRevoked = assertion => {
    return (assertion.isDirectAward && assertion.status.toLowerCase() === "revoked") || (!assertion.isDirectAward && assertion.revoked);
}

export const assertionStatus = assertion => {
    if (!assertion.isDirectAward && assertion.revoked) {
        return I18n.t("models.badge.statuses.revoked");
    }
    return I18n.t(`models.badge.statuses.${assertion.isDirectAward ? assertion.status.toLowerCase() : assertion.acceptance.toLowerCase()}`);
}

export const assertionStatusClass = assertion => {
    if (!assertion.isDirectAward && assertion.revoked) {
        return "revoked"
    }
    return assertion.isDirectAward ? assertion.status.toLowerCase() : assertion.acceptance.toLowerCase();
}
