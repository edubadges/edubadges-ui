export const tableNumber = (data, attribute) => {
  const count = data.reduce((acc, badgeClass) => acc += (badgeClass[attribute] || []).length, 0);
  return count === 0 ? "-" : count;
};
