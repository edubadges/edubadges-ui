export function sort(collection, attribute, reversed) {
  if (!attribute) {
    if (reversed) {
      return collection.reverse();
    } else {
      return collection;
    }
  }

  const col = collection.sort((a, b) => {
    if (attribute[0] !== "#") {
      return a[attribute.toLowerCase()].localeCompare(
        b[attribute.toLowerCase()]
      );
    } else {
      return (
        b[attribute.substring(1, attribute.length)].length -
        a[attribute.substring(1, attribute.length)].length
      );
    }
  });

  if (reversed) {
    return col.reverse();
  } else {
    return col;
  }
}
