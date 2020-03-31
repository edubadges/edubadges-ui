export function sort(collection, attribute) {
  if (attribute.length === 0) return collection;
  return collection.sort((a, b) => {
    if (attribute[0][0] !== '#') {
      return a[attribute[0].toLowerCase()].localeCompare(b[attribute[0].toLowerCase()]);
    } else {
      return b[attribute[0].substring(1, attribute[0].length)].length - a[attribute[0].substring(1, attribute[0].length)].length;
    }
  });
}