export const isRevoked = assertion => {
    return (assertion.isDirectAward && assertion.status.toLowerCase() === "revoked") || (!assertion.isDirectAward && assertion.revoked);
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
