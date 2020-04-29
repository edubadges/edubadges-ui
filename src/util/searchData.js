export const search = (data, search, attribute, identifier = "entityId") => {
  if (search === "") {
    return data.map(el => el[identifier]);
  }
  return data
    .filter((element) => {
      return element[attribute].toLowerCase().includes(search.toLowerCase());
    })
    .map((el) => el[identifier]);
};

export const searchMultiple = (data, search, identifier = "entityId", ...attributes) => {
  if (search === "") {
    return data.map(el => el[identifier]);
  }
  return data
    .filter((element) => {
      return element[attribute].toLowerCase().includes(search.toLowerCase());
    })
    .map((el) => el[identifier]);
};
