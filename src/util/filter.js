export const collectFilters = (data, filterAttributes) => {
  let res = {};
  for (const attr of filterAttributes) {
    res[attr] = [];
    for (const element of data) {
      if (!res[attr].includes(element[attr])){
        res[attr].push(element[attr]);
      }
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

export const setVisibilityFilters = (filters, data) => {
  let res = {};
  for (const attr of Object.keys(filters)) {
    res[attr] = [];
    console.log('filters', filters);
    for (const value of Object.values(filters[attr])) {
      if (data.some(element => {
        return element[attr] === value;
      })) {
        res[attr].push(value);
      }
    }
  }
  console.log(res);
  return res;
};
