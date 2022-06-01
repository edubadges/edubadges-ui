export const userName = obj => {
  if (obj.user) {
    return `${obj.user.firstName || ""} ${obj.user.lastName || ""}`.trim() || "-";
  }
  return "-";
}

export const userNameCreatedBy = obj => {
  if (obj.createdBy) {
    return `${obj.createdBy.firstName || ""} ${obj.createdBy.lastName || ""}`.trim() || "-";
  }
  return "-";
}