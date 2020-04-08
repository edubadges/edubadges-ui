export const sortType = {
  ALPHA: "alpha",
  NUMERIC: "numeric",
  COLLECTION: "collection"
};

export function sort(collection, attribute, reversed, howToSort = sortType.ALPHA) {
  if (!attribute) {
    return reversed ? collection.reverse() : collection;
  }

  const col = collection.sort((a, b) => {
    if (howToSort === sortType.ALPHA) {
      return a[attribute].localeCompare(b[attribute]);
    } else if (howToSort === sortType.NUMERIC) {
      return parseInt(b[attribute], 10) - parseInt(a[attribute], 10);
    } else if (howToSort === sortType.COLLECTION) {
      return b[attribute].length - a[attribute].length;
    }
    throw new Error(`Unsupported sortType ${howToSort}`);
  });

  return reversed ? col.reverse() : col;
}
