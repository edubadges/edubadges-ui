import {nestedValue, sortType} from "./sortData";
import {isEmpty} from "./utils";

export const searchMultiple = (data, search, identifier = "entityId", ...attributes) => {
    if (isEmpty(search)) {
        return data.map(el => el[identifier]);
    }
    const searchString = search.toLowerCase().trim();
    return data
        .filter(element => {
            return attributes.some(attr => nestedValue(element, attr, sortType.ALPHA).toLowerCase().includes(searchString));
        })
        .map((el) => el[identifier]);
};

export const search = (data, search, attribute, identifier = "entityId") => searchMultiple(data, search, identifier, attribute);
