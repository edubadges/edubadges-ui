export const collectFilters = (data, filterAttributes) => {
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
  let newFilters = filters;
  if (newFilters[attr] === value) {
    delete newFilters[attr];
  } else {
    newFilters[attr] = value;
  }
  return newFilters;
};

function shouldFilter(element, filters) {
  for (const [attr, filterValue] of Object.entries(filters)) {
    if (!element[attr] || element[attr] !== filterValue) {
      return false;
    }
  }
  return true;
}

export const filteredData = (data, filters) => {
  return data.filter(element => shouldFilter(element, filters));
};