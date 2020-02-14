export const validBadge = ({ image, json }) => {
    try {
        const { badge, issuedOn, expires } = json;

        return {
            image: image || "https://via.placeholder.com/500?text=Placeholder",
            title: badge.name['@value'],
            issueDate: issuedOn['@value'],
            expiryDate: expires && expires['@value'],
            awardedBy: badge.issuer.name['@value'],
            description: badge.description['@value']
        };
    } catch (e) {
        console.error(e);
        return undefined;
    }
};
