export const search = (data, search, attribute) => {
  if (search === "") {
    return data.map(el => el.entityId);
  }
  return data
    .filter((element) => {
      return element[attribute].toLowerCase().includes(search.toLowerCase());
    })
    .map((el) => el.entityId);
};
