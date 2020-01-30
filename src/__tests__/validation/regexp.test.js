import { validPassword } from "../../validation/regexp";

test("Valid password", () => {
  expect(validPassword("nope")).toBe(false);

  expect(validPassword("abcdefghijklmnop")).toBe(true);
  expect(validPassword("abcdefA1")).toBe(true);
  expect(validPassword("#@$%abcdefA1")).toBe(true);
});
