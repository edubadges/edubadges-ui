export const validBadge = ({image, json}) => {
  const {badge, issuedOn, expires} = json;
  return {
    image: image || "https://via.placeholder.com/500?text=Placeholder",
    title: badge.name["@value"],
    issueDate: issuedOn["@value"],
    expiryDate: expires && expires["@value"],
    awardedBy: badge.issuer.name["@value"],
    issuerImage: badge.issuer.image.id || "https://via.placeholder.com/500?text=Placeholder",
    description: badge.description["@value"],
    facultyName: badge.issuer.faculty.name
  };
};
