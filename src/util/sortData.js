export function sort(collection, attribute) {
  if (!attribute) return collection;
  return collection.sort((a, b) => {
    if (attribute[0] !== '#') {
      return a[attribute.toLowerCase()].localeCompare(b[attribute.toLowerCase()]);
    } else {
      return b[attribute.substring(1, attribute.length)].length - a[attribute.substring(1, attribute.length)].length;
    }
  });
}