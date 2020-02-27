export function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object
}
