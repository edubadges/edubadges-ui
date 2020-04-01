import { search } from "../../util/searchData";

test("Search data", () => {
    let results = search([["teaCHers","1"], ["students", "2"], ["allTeachers","3"]], "eac");
    expect(results).toStrictEqual(["1", "3"]);
});