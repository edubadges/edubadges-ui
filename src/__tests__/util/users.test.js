import {constructUserName, validatedUserName} from "../../util/users";

const constructUser = (firstName, lastName) => ({user: {firstName, lastName}})

test("User name", () => {
    const obj = constructUser("Rob", "Leeuwen, van");
    expect(constructUserName(obj)).toStrictEqual("Rob van Leeuwen");
});

test("User name correct", () => {
    const obj = constructUser("Rob", "van Leeuwen");
    expect(constructUserName(obj)).toStrictEqual("Rob van Leeuwen");
});

test("User name double comma's", () => {
    const obj = constructUser("Sari", "Veenendaal, ook wel bekend als Sari Keepster Ned elftal, van");
    expect(constructUserName(obj)).toStrictEqual("Sari van Veenendaal, ook wel bekend als Sari Keepster Ned elftal");
});

test("Validated user name", () => {
    expect(validatedUserName("Rob Leeuwen, van")).toStrictEqual("Rob van Leeuwen");
});
