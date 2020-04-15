export const formatAdminNames = (staffContainer) => {
  const staff = staffContainer.staff || [];
  let names = staff
    .map((u) => u.user.firstName + " " + u.user.lastName)
    .slice(0, 2)
    .join(", ");
  if (staff.length > 2) {
    names += ` (+${staff.length - 2})`;
  }
  return names || "-";
};
