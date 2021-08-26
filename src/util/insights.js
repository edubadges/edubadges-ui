export const weekNumber = s => {
    const d = s ? new Date(s) : new Date();
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
}

export const entityTypeLookup = {
    ASSERTION: {BADGE_CLASS_ID: 'badgeclass_id', ISSUER_ID: 'issuer_id', FACULTY_ID: 'issuer__faculty_id'},
    DIRECT_AWARD: {
        BADGE_CLASS_ID: 'badgeclass_id',
        ISSUER_ID: 'badgeclass__issuer__id',
        FACULTY_ID: 'badgeclass__issuer__faculty_id'
    },
    ENROLMENT: {
        BADGE_CLASS_ID: 'badge_class_id',
        ISSUER_ID: 'badge_class__issuer__id',
        FACULTY_ID: 'badge_class__issuer__faculty_id'
    }
}

export const filterSeries = (assertions, identifiers, awardType = null, badgeClassId = null, issuerId = null, facultyId = null) =>
    assertions.filter(assertion => (awardType == null || assertion.award_type === awardType)
        && (badgeClassId == null || assertion[identifiers['BADGE_CLASS_ID']] === badgeClassId)
        && (issuerId == null || assertion[identifiers['ISSUER_ID']] === issuerId)
        && (facultyId == null || assertion[identifiers['FACULTY_ID']] === facultyId));

export const extractAssertionFaculties = (assertions, locale) => {
    const faculties = new Map();
    const lang = locale === 'en' ? 'english' : 'dutch'
    const facultyName = `issuer__faculty__name_${lang}`;
    const issuerName = `issuer__name_${lang}`;
    assertions.forEach(assertion => {
        const facultyId = assertion.issuer__faculty_id;
        let faculty = faculties.get(facultyId);
        if (!faculty) {
            faculty = {name: assertion[facultyName], issuers: new Map()}
            faculties.set(facultyId, faculty);
        }
        const issuerId = assertion.issuer_id;
        let issuer = faculty.issuers.get(issuerId);
        if (!issuer) {
            issuer = {name: assertion[issuerName], badgeClasses: new Map()};
            faculty.issuers.set(issuerId, issuer);
        }
        const badgeClassId = assertion.badgeclass_id;
        let badgeClass = issuer.badgeClasses.get(badgeClassId);
        if (!badgeClass) {
            issuer.badgeClasses.set(badgeClassId, assertion.badgeclass__name);
        }
    });
    return faculties;
}

export const assertionSeries = assertions => {
    //Add the week numbers based on the date
    let filteredAssertions = assertions.map(assertion => {
        assertion.weekNumber = weekNumber(assertion.week);
        return assertion;
    });
    //because we have grouped_by on badge, faculty and issuer, we need to add up the equal week numbers
    //and because we want to show a cumulative area chart we add the previous number with the current and so on
    let prevWeek;
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
        if (prevWeek && prevAssertion && val.weekNumber > (prevWeek + 1)) {
            acc = acc.concat(new Array(val.weekNumber - prevWeek + -1).fill({nbr: prevAssertion.nbr}));
        }
        if (!prevAssertion || prevAssertion.weekNumber !== val.weekNumber) {
            acc.push({nbr: val.nbr, weekNumber: val.weekNumber});
        }
        prevWeek = val.weekNumber;
        return acc;
    }, []);
    return filteredAssertions;
}

export const equalizeAssertionsSize = (daAssertions, reqAssertions) => {
    let daFirstWeek, daLastWeek, reqFirstWeek, reqLastWeek, daResults, reqResults;
    if (daAssertions.length > 0) {
        daFirstWeek = daAssertions[0].weekNumber;
        daLastWeek = daAssertions[daAssertions.length - 1].weekNumber;
    } else {
        daResults = new Array(reqAssertions.length).fill({nbr: 0});
    }
    if (reqAssertions.length > 0) {
        reqFirstWeek = reqAssertions[0].weekNumber;
        reqLastWeek = reqAssertions[reqAssertions.length - 1].weekNumber;
    } else {
        reqResults = new Array(daAssertions.length).fill({nbr: 0});
    }
    if (daFirstWeek && reqFirstWeek) {
        if (daFirstWeek > reqFirstWeek) {
            const zeroReq = new Array(daFirstWeek - reqFirstWeek).fill({nbr: 0});
            reqResults = [...zeroReq, ...reqAssertions]
        }
        if (reqFirstWeek < daFirstWeek) {
            const zeroDa = new Array(reqFirstWeek - daFirstWeek).fill({nbr: 0});
            daResults = [...zeroDa, ...daAssertions]
        }
        if (daLastWeek > reqLastWeek) {
            const sameReq = new Array(daLastWeek - reqLastWeek).fill({nbr: reqAssertions[reqAssertions.length - 1].nbr});
            reqResults = [...reqAssertions, ...sameReq]
        }
        if (reqLastWeek > daLastWeek) {
            const sameDa = new Array(reqLastWeek - daLastWeek).fill({nbr: daAssertions[daAssertions.length - 1].nbr});
            daResults = [...daAssertions, ...sameDa]
        }
    }
    return [daResults, reqResults]
}
