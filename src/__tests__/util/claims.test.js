import {schacHomeNames} from "../../util/claims";

test("Schac home", () => {
  const affiliations = [
    "jdoe@fontys.nl",
    "fontys.nl",
    "jdoe@stafff.fontys.nl",
    "jdoe123@student.fontys.nl",
    "jdoe12@gueststudent.fontys.nl",
    "jdoe12@guest.student.subdomain.fontys.nl",
    "jdoe@faculteit-geesteswetenschappen.fontys.nl"
  ];
  const names = schacHomeNames({eduperson_scoped_affiliation: affiliations});
  const expected = affiliations.map(_ => "fontys.nl");
  expect(names).toStrictEqual(expected);
});

test("Schac home single value", () => {
  const affiliations = [
    "qwerty"
  ];
  const names = schacHomeNames({eduperson_scoped_affiliation: affiliations});
  expect(names).toStrictEqual(["qwerty"]);
});
