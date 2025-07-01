import {uniqueBadgesByNameAndLatestCreatedAt} from "../../util/catalogFilters";

test("UniqueBadgesByNameAndLatestCreatedAt", () => {
    const badgeClasses = [
        {name: 'BC1', i_entity_id: "ISS1", ins_entity_id: "INS1", createdAt: '2021-11-15T12:56:43.453846'},
        {name: 'BC2', i_entity_id: "ISS1", ins_entity_id: "INS1", createdAt: '2022-11-15T12:56:43.453846'},
        {name: 'bc2', i_entity_id: "ISS2", ins_entity_id: "INS1", createdAt: '2023-11-15T12:56:43.453846'}, // Later created for BC2
        {name: 'BC2', i_entity_id: "ISS1", ins_entity_id: "INS1", createdAt: '2024-11-15T12:56:43.453846'},// Later created for BC2
        {name: 'BC1', i_entity_id: "ISS1", ins_entity_id: "INS2", createdAt: '2023-11-15T12:56:43.453846'} // Later created for BC1
    ];
    const results = uniqueBadgesByNameAndLatestCreatedAt(
        badgeClasses, "name", "createdAt", "ins_entity_id")
    const badgeClassNames = results.map(bc => bc.name).toSorted();
    expect(badgeClassNames).toEqual(["BC1", "BC1", "BC2"]);

    const resultsByIssuer = uniqueBadgesByNameAndLatestCreatedAt(
        badgeClasses, "name", "createdAt", "i_entity_id")
    const badgeClassNamesByIssuer = resultsByIssuer.map(bc => bc.name).toSorted();
    expect(badgeClassNamesByIssuer).toEqual(["BC1", "BC2", "bc2"]);
});
