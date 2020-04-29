import {sort, sortType} from "../../util/sortData";

test("Sort collection", () => {
  const collection = [
    {
      tag: "teacher", user: {
        name: "Mary",
        nested: {
          value: 2
        }
      }
    },
    {
      tag: "student", user: {
        name: "John",
        nested: {
          value: 1
        }
      }
    }
  ]
  let results = sort(collection, "user.nested.value", false, sortType.NUMERIC).map(obj => obj.user.nested.value);
  expect(results).toStrictEqual([2, 1]);

  results = sort(collection, "tag", false, sortType.ALPHA).map(obj => obj.tag);
  expect(results).toStrictEqual(["student", "teacher"]);

  results = sort(collection, "user.name", true, sortType.ALPHA).map(obj => obj.user.name);
  expect(results).toStrictEqual(["Mary", "John"]);

  results = sort(collection, "user.nope.nada", false, sortType.ALPHA).map(obj => obj.tag);
  expect(results.sort()).toStrictEqual(["student", "teacher"]);
});
