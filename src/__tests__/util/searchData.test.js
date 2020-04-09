import {search} from "../../util/searchData";

test("Search data", () => {
  let results = search([
    {attr: "TEACHERS", entityId: "1"},
    {attr: "student", entityId: "2"},
    {attr: "TEacHERS_", entityId: "3"}
  ], "eac", "attr");
  expect(results).toStrictEqual(["1", "3"]);
});

test("Search data with custom identifier", () => {
  let results = search([
    {attr: "TEACHERS", identifier: "1"},
    {attr: "student", identifier: "2"},
    {attr: "TEacHERS_", identifier: "3"}
  ], "eac", "attr", "identifier");
  expect(results).toStrictEqual(["1", "3"]);
});