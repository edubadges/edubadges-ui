export const validPassword = password =>
  /^(((?=.*[A-Z])(?=.*[0-9])(.{8,}))|(.{15,}))$/.test(password);
