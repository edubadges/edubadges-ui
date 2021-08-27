import {assertionSeries, entityTypeLookup, filterSeries, equalizeAssertionsSize} from "../../util/insights";

test("Filter series", () => {
    const series = [{badge_class_id: 1}, {badge_class__issuer__id: 2}, {badge_class__issuer__faculty_id: 3}]
    let results = filterSeries(series, entityTypeLookup.ENROLMENT);
    expect(results.length).toEqual(3);

    results = filterSeries(series, entityTypeLookup.ENROLMENT, undefined, 9, 9, 9);
    expect(results.length).toEqual(0);

    series.push({award_type: 'requested', badge_class_id: 9});

    results = filterSeries(series, entityTypeLookup.ENROLMENT, 'requested', 9);
    expect(results.length).toEqual(1);

    series[3].badge_class__issuer__id = 2;
    results = filterSeries(series, entityTypeLookup.ENROLMENT, null, 9, 2, null);
    expect(results.length).toEqual(1);
});

test("Assertion series", () => {
    const assertions = [
        {week: '2021-01-04T00:00:00+01:00', nbr: 1}, //week 1
        {week: '2021-01-04T00:00:00+01:00', nbr: 2}, //week 1
        {week: '2021-01-04T00:00:00+01:00', nbr: 3}, //week 1
        {week: '2021-01-11T00:00:00+01:00', nbr: 4}, //week 2
        {week: '2021-02-01T00:00:00+01:00', nbr: 5}, //week 5
    ]
    let results = assertionSeries(assertions);
    expect(results.map(assertion => assertion.nbr)).toStrictEqual([6, 6 + 4, 10, 10, 6 + 4 + 5]);
});

test("Equalize Assertions size",() => {
    const daAssertions = [
        {nbr: 2, weekNumber: 2},
        {nbr: 3, weekNumber: 3},
        {nbr: 4, weekNumber: 4},
        {nbr: 5, weekNumber: 5},
    ];
    const reqAssertions = [
        {nbr: 1, weekNumber: 1},
        {nbr: 2, weekNumber: 2},
        {nbr: 3, weekNumber: 3}
    ];
    let results = equalizeAssertionsSize(daAssertions, reqAssertions);
    let daExpected = [
        {nbr: 0},
        {nbr: 2, weekNumber: 2},
        {nbr: 3, weekNumber: 3},
        {nbr: 4, weekNumber: 4},
        {nbr: 5, weekNumber: 5}
    ]
    let reqExpected = [
        {nbr: 1, weekNumber: 1},
        {nbr: 2, weekNumber: 2},
        {nbr: 3, weekNumber: 3},
        {nbr: 3},
        {nbr: 3}
    ]
    expect(results[0]).toStrictEqual(daExpected);
    expect(results[1]).toStrictEqual(reqExpected);

    results = equalizeAssertionsSize(reqAssertions, daAssertions);
    expect(results[0]).toStrictEqual(reqExpected);
    expect(results[1]).toStrictEqual(daExpected);

    results = equalizeAssertionsSize(daAssertions, daAssertions);
    expect(results[0]).toStrictEqual(daAssertions);
    expect(results[1]).toStrictEqual(daAssertions);

    results = equalizeAssertionsSize(daAssertions, []);
    expect(results[0]).toStrictEqual(daAssertions);
    expect(results[1]).toStrictEqual(new Array(4).fill({nbr: 0}));

    results = equalizeAssertionsSize([], reqAssertions);
    expect(results[0]).toStrictEqual(new Array(3).fill({nbr: 0}));
    expect(results[1]).toStrictEqual(reqAssertions);

    results = equalizeAssertionsSize([], []);
    expect(results[0]).toStrictEqual([]);
    expect(results[1]).toStrictEqual([]);
})
