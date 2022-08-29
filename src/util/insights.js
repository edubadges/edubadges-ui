export const weekNumber = s => {
    const d = s ? new Date(s) : new Date();
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
}

export const yearNumber = s => {
    const d = s ? new Date(s) : new Date();
    return d.getFullYear();
}

export const lastNumber = assertions => {
    return assertions.length === 0 ? 0 : assertions[assertions.length - 1];
}

export const facultyOptions = faculties => {
    return Array.from(faculties.keys()).map(key => ({identifier: key, name: faculties.get(key).name}))
}

export const issuerOptions = (faculties, facultyId) => {
    if (facultyId) {
        const facIssuers = faculties.get(facultyId).issuers;
        return Array.from(facIssuers.keys()).map(key => ({
            identifier: key,
            name: facIssuers.get(key).name,
            facultyId: facultyId
        }))
    } else {
        return Array.from(faculties.keys()).map(facultyKey => {
            const faculty = faculties.get(facultyKey);
            const issuers = faculty.issuers;
            return Array.from(issuers.keys()).map(issuerKey => ({
                identifier: issuerKey,
                name: issuers.get(issuerKey).name,
                facultyId: facultyKey
            }))
        }).flat();
    }
}

const getBadgeClassesFromFaculty = (faculty, facultyKey) => {
    const issuers = faculty.issuers;
    return Array.from(issuers.keys()).map(issuerKey => {
        const issuer = issuers.get(issuerKey);
        const badgeClasses = issuer.badgeClasses;
        return Array.from(badgeClasses.keys())
            .map(key => ({
                identifier: key,
                name: badgeClasses.get(key),
                facultyId: facultyKey,
                issuerId: issuerKey
            }));
    })
}

export const badgeClassOptions = (faculties, facultyId, issuerId) => {
    if (facultyId) {
        const faculty = faculties.get(facultyId);
        const facIssuers = faculty.issuers;
        if (issuerId && facIssuers.has(issuerId)) {
            const badgeClasses = facIssuers.get(issuerId).badgeClasses;
            return Array.from(badgeClasses.keys())
                .map(key => ({identifier: key, name: badgeClasses.get(key), facultyId: facultyId, issuerId: issuerId}));
        } else {
            return getBadgeClassesFromFaculty(faculty);
        }
    } else {
        return Array.from(faculties.keys()).map(facultyKey => {
            const faculty = faculties.get(facultyKey)
            return getBadgeClassesFromFaculty(faculty, facultyKey);
        }).flat(2);
    }
}

export const findByAttributeValue = (assertions, attr, value) => {
    return assertions.filter(assertion => assertion[attr] === value).map(assertion => assertion.nbr).reduce((a, b) => a + b, 0);
}

export const claimRate = (totalAssertions, directAwards, enrollments) => {
    if (totalAssertions.length === 0) {
        return 0;
    }
    const notClaimedAwarded = directAwards.map(da => da.nbr).reduce((a, b) => a + b, 0) + enrollments.map(da => da.nbr).reduce((a, b) => a + b, 0);
    const claimed = lastNumber(totalAssertions);
    const total = notClaimedAwarded + claimed;
    return Math.floor(claimed / total * 100);
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

export const filterSeries = (assertions, identifiers, awardType = null, badgeClass = null, issuer = null, faculty = null) => {
    const badgeClassId = badgeClass ? badgeClass.identifier : null;
    const issuerId = issuer ? issuer.identifier : null;
    const facultyId = faculty ? faculty.identifier : null;
    return assertions.filter(assertion => (awardType == null || assertion.award_type === awardType)
        && (badgeClassId == null || assertion[identifiers['BADGE_CLASS_ID']] === badgeClassId)
        && (issuerId == null || assertion[identifiers['ISSUER_ID']] === issuerId)
        && (facultyId == null || assertion[identifiers['FACULTY_ID']] === facultyId));
}

export const extractAssertionFaculties = (assertions, directAwards, enrolments, locale) => {
    const faculties = new Map();
    const lang = locale === 'en' ? 'english' : 'dutch'
    const facultyName = `issuer__faculty__name_${lang}`;
    const issuerName = `issuer__name_${lang}`;
    const directAwardsTransformed = directAwards.map(da => ({
        issuer__faculty_id: da.badgeclass__issuer__faculty_id,
        [facultyName]: da[`badgeclass__issuer__faculty__name_${lang}`],
        issuer_id: da.badgeclass__issuer__id,
        [issuerName]: da[`badgeclass__issuer__name_${lang}`],
        badgeclass_id: da.badgeclass_id,
        badgeclass__name: da.badgeclass__name
    }));
    const enrolmentsTransformed = enrolments.map(enr => ({
        issuer__faculty_id: enr.badge_class__issuer__faculty_id,
        [facultyName]: enr[`badge_class__issuer__faculty__name_${lang}`],
        issuer_id: enr.badge_class__issuer__id,
        [issuerName]: enr[`badge_class__issuer__name_${lang}`],
        badgeclass_id: enr.badge_class_id,
        badgeclass__name: enr.badge_class__name
    }));
    const allAssertions = assertions.concat(directAwardsTransformed).concat(enrolmentsTransformed);
    allAssertions.forEach(assertion => {
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
        assertion.yearNumber = yearNumber(assertion.year)
        return assertion;
    });
    //because we have grouped_by on badge, faculty and issuer, we need to add up the equal week numbers
    //and because we want to show a cumulative area chart we add the previous number with the current and so on
    let prevWeek;
    filteredAssertions = filteredAssertions.reduce((acc, val) => {
        let prevAssertion;
        let nbr = val.nbr;
        if (acc.length > 0) {
            prevAssertion = acc[acc.length - 1];
            if (prevAssertion.weekNumber !== val.weekNumber) {
                nbr += prevAssertion.nbr;
            } else {
                prevAssertion.nbr += nbr;
            }
        }
        if (prevWeek && prevAssertion && val.weekNumber > (prevWeek + 1)) {
            acc = acc.concat(new Array(val.weekNumber - prevWeek + -1).fill({nbr: prevAssertion.nbr}));
        }
        if (!prevAssertion || prevAssertion.weekNumber !== val.weekNumber) {
            acc.push({nbr: nbr, weekNumber: val.weekNumber});
        }
        prevWeek = val.weekNumber;
        return acc;
    }, []);
    return filteredAssertions;
}

export const minWeekOfAssertionSeries = (a1, a2) => {
    const week1 = a1.length > 0 ? a1[0].weekNumber : 1;
    const week2 = a2.length > 0 ? a2[0].weekNumber : 1;
    return Math.min(week1 || 1, week2 || 1);
}

export const maxWeekOfAssertionSeries = (a1, a2) => {
    const week1 = a1.length > 0 ? a1[a1.length -1].weekNumber : 1;
    const week2 = a2.length > 0 ? a2[a2.length -1].weekNumber : 1;
    return Math.max(week1 || 1, week2 || 1);
}

export const minYearOfAssertionSeries = (a1, a2) => {
    const year1 = a1.length > 0 ? a1[0].yearNumber : 1;
    const year2 = a2.length > 0 ? a2[0].yearNumber : 1;
    return Math.min(year1 || 1, year2 || 1);
}

export const maxYearOfAssertionSeries = (a1, a2) => {
    const year1 = a1.length > 0 ? a1[a1.length -1].yearNumber : 1;
    const year2 = a2.length > 0 ? a2[a2.length -1].yearNumber : 1;
    return Math.max(year1 || 1, year2 || 1);
}

export const equalizeAssertionsSize = (daAssertions, reqAssertions) => {
    if (daAssertions.length === reqAssertions.length) {
        return [daAssertions, reqAssertions];
    }
    let daFirstWeek, daLastWeek, reqFirstWeek, reqLastWeek, daResults, reqResults;
    if (daAssertions.length > 0) {
        daFirstWeek = daAssertions[0].weekNumber;
        daLastWeek = daAssertions[daAssertions.length - 1].weekNumber;
    } else {
        daResults = new Array(reqAssertions.length).fill({nbr: 0});
        reqResults = reqAssertions;
    }
    if (reqAssertions.length > 0) {
        reqFirstWeek = reqAssertions[0].weekNumber;
        reqLastWeek = reqAssertions[reqAssertions.length - 1].weekNumber;
    } else {
        reqResults = new Array(daAssertions.length).fill({nbr: 0});
        daResults = daAssertions;
    }
    if (daFirstWeek && reqFirstWeek) {
        if (daFirstWeek < reqFirstWeek) {
            const zeroReq = new Array(reqFirstWeek - daFirstWeek).fill({nbr: 0});
            reqResults = [...zeroReq, ...reqAssertions]
        } else if (daFirstWeek > reqFirstWeek) {
            const zeroDa = new Array(daFirstWeek - reqFirstWeek).fill({nbr: 0});
            daResults = [...zeroDa, ...daAssertions]
        }
        if (daLastWeek > reqLastWeek) {
            const sameReq = new Array(daLastWeek - reqLastWeek).fill({nbr: lastNumber(reqAssertions).nbr});
            const subReqResults = reqResults || reqAssertions;
            reqResults = [...subReqResults, ...sameReq]
        } else if (daLastWeek < reqLastWeek) {
            const sameDa = new Array(reqLastWeek - daLastWeek).fill({nbr: lastNumber(daAssertions).nbr});
            const subDaAssertions = daResults || daAssertions;
            daResults = [...subDaAssertions, ...sameDa]
        }
    }
    return [daResults || daAssertions, reqResults || reqAssertions]
}


