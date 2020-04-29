import {nestedValue, sortType} from "./sortData";

export const searchMultiple = (data, search, identifier = "entityId", ...attributes) => {
  if (search === "") {
    return data.map(el => el[identifier]);
  }
  return data
    .filter(element => attributes.some(attr => nestedValue(element, attr, sortType.ALPHA).toLowerCase().includes(search.toLowerCase())))
    .map((el) => el[identifier]);
};

export const search = (data, search, attribute, identifier = "entityId") => searchMultiple(data, search, identifier, attribute);


