export const filtered = (data, search) => {
  if (search === "") return data;
  return data.filter(element => {
    return element.name.toLowerCase().includes(search.toLowerCase());
  });
};
