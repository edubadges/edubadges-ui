export const getFilters = (data, filterAttributes) => {
  let res = {};
  for (const attr of filterAttributes) {
    res[attr] = [];
    for (const element of data) {
      res[attr].push(element[attr]);
    }
  }
  return res;
};

export const filters = (data, filterAttributes) => {
  let res = {};
  for (const filterAttribute of filterAttributes) {
    res[filterAttribute] = [];
  }

  for (const element of data) {
    for (const filterAttribute of filterAttributes) {
      res[filterAttribute].push({
          "value": element[filterAttribute],
          count: element['badgeClassCount'],
          "active": false
        });
    }
  }
  return res;
};

export const toggleFilter = (filters, attr, value) => {
  if (filters[attr] === value) {

  }
};

function shouldFilter(data, filters) {
  for (const filter in filters) {
    if (filters.hasOwnProperty(filter)){
      for (const option of filters[filter]) {
        if (option.active && data[filter] !== option.value) {
          return false;
        }
      }
    }
  }
  return true;
}

export const filteredData = (data, filters) => {
  return data.filter(issuer => shouldFilter(issuer, filters));
};