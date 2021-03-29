export const userName = obj => {
  if (obj.user) {
    return `${obj.user.firstName || ""} ${obj.user.lastName || ""}`.trim() || "-";
  }
  return "-";
}