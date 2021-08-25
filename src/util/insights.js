const weekNumber = s => {
    const d = new Date(s);
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
}

const addZeroNumbers = (arr, index, nbrMissing) => [
            ...arr.slice(0, index),
                new Array(nbrMissing).fill({nbr:0}),
            ...arr.slice(index)
        ];
/*
 * [
    {
      "badgeclass_id": 50,
      "badgeclass__name": "Many Assertions",
      "award_type": "direct_award",
      "issuer_id": 82,
      "issuer__name_english": "Many Assertions",
      "issuer__faculty_id": 26,
      "issuer__faculty__name_english": "Many Assertions",
      "week": "2020-12-28T00:00:00+01:00",
      "nbr": 2
    }
   ]
 */
export const assertionSeries = (assertions, awardType, isEnrollment, badgeClassId = null, issuerId = null, facultyId = null) => {
    //TODO ensure immutability
    const badgeIdentifier = isEnrollment ? 'badge_class_id' : 'badgeclass_id'
    const issuerIdentifier = isEnrollment ? 'badge_class__issuer__id' : 'badge_class_id'
    const facultyIdentifer = isEnrollment ? 'badgeclass_id' : 'badge_class_id'
    let filteredAssertions = assertions.filter(assertion => {
        return assertion.award_type === awardType
            && (badgeClassId === null || assertion.badgeclass_id === badgeClassId)
            && (issuerId === null || assertion.issuer_id === issuerId)
            && (facultyId === null || assertion.issuer__faculty_id === facultyId)
    });
    filteredAssertions = filteredAssertions.map(assertion => {
        assertion.weekNumber = weekNumber(assertion.week);
        return assertion;
    });
    //now add missing week numbers
    let prev;
    [...filteredAssertions].forEach((assertion, index) => {
        const week = assertion.weekNumber;
        if (prev && week > (prev + 1)) {
            filteredAssertions = addZeroNumbers(filteredAssertions, index, week - index + 1);
        }
        prev = week;
    });
    //because we have included badge, faculty and issuer, we need to add up the equal week numbers
    filteredAssertions = filteredAssertions.reduce((acc, val) => {
        let prevAssertion
        if (acc.length > 0) {
            prevAssertion = acc[acc.length - 1];
            if (prevAssertion.weekNumber !== val.weekNumber) {
                val.nbr += prevAssertion.nbr;
            } else {
                prevAssertion.nbr += val.nbr;
            }
        }
        if (!prevAssertion || prevAssertion.weekNumber !== val.weekNumber) {
            acc.push(val);
        }
        return acc;
    }, [])
    //now return array with cumulative values
    return filteredAssertions.map(assertion => assertion.nbr).map((sum => value => sum += value)(0));
}