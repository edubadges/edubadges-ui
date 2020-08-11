export const schacHomeNamesFromExtraData = affiliations => {

  return (affiliations || [])
    .map(aff => {
      const domain = aff.substring(aff.indexOf("@") + 1)
      const parts = domain.split(".")
      return parts.slice(Math.max(parts.length - 2, 0)).join(".")
    });
}

export const schacHomeNames = jwtClaims => {
  return schacHomeNamesFromExtraData(jwtClaims.eduperson_scoped_affiliation);
}

