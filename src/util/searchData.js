export const search = (data, search) => {
  if (search === "") {
    return data.map((el) => el[1]);
  }
  return data
    .filter((element) =>
      // element = [searchableAttribute, id]
      element[0].toLowerCase().includes(search.toLowerCase())
    )
    .map((el) => el[1]);
};
