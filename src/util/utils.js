export const isObject = val => {
  if (val === null || val === undefined) {
    return false;
  }
  return ((typeof val === "function") || (typeof val === "object"));
}