export const validBadge = (input) => {
    const getOptionalValue = (path, x) => path.reduce((acc, p) => acc != null && acc[p], x);
    try {
        return {
            image: input.image,
            title: input.json.badge.name['@value'],
            issueDate: input.json.issuedOn['@value'],
            expiryDate: getOptionalValue(["json", "expires", "@value"], input),
            awardedBy: input.json.badge.issuer.name['@value'],
            description: input.json.badge.description['@value']
        };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};