export const schacHomeNamesFromExtraData = affiliations => {
  //TODO there can be subdomains
  return (affiliations || [])
    .map(aff => aff.substring(aff.indexOf("@") + 1));
}

export const schacHomeNames = jwtClaims => {
  return schacHomeNamesFromExtraData(jwtClaims.eduperson_scoped_affiliation);
}

