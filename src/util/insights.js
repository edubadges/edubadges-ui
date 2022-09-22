import I18n from "i18n-js";

export const lastNumber = assertions => {
    return assertions.length === 0 ? 0 : assertions[assertions.length - 1];
}

export const institutionOptions = institutions => {
    const name = I18n.locale === "en" ? "nameEnglish" : "nameDutch";
    return institutions.map(institution => ({
        identifier: institution.entityId,
        name: institution[name]
    }))
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
    // TODO change algorithm
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
    //because we have grouped_by badge, faculty and issuer, we need to add up the equal month / year numbers
    //and because we want to show a cumulative line chart we add the previous number with the current and so on
    let prevAssertion;
    const filteredAssertions = assertions.reduce((acc, val) => {
        let nbr = val.nbr;
        if (acc.length > 0) {
            prevAssertion = acc[acc.length - 1];
            const newMonthOrYear = prevAssertion.year !== val.year || prevAssertion.month !== val.month;
            if (newMonthOrYear) {
                nbr += prevAssertion.nbr;
            } else {
                prevAssertion.nbr += nbr;
            }
        }
        if (prevAssertion && (val.month > prevAssertion.month || val.year > prevAssertion.year)) {
            //We need to fill in blanks for the months not present, but also check if we are in a new year
            let numberOfFills;
            if (val.year === prevAssertion.year) {
                numberOfFills = val.month - prevAssertion.month - 1;
            } else {
                numberOfFills = 12 - prevAssertion.month + val.month - 1;
            }
            acc = acc.concat(new Array(numberOfFills).fill({nbr: prevAssertion.nbr}));
        }
        if (!prevAssertion || prevAssertion.month !== val.month || prevAssertion.year !== val.year) {
            acc.push({nbr: nbr, year: val.year, month: val.month});
        }
        prevAssertion = val;
        return acc;
    }, []);
    return filteredAssertions;
}

export const minMaxDateOfAssertionSeries = (a1, a2, maxDate) => {
    //The first entry can be added with 0 and the last entry with the same number to fill the array
    const length1 = a1.length;
    const length2 = a2.length;
    const firstDate1 = (length1 > 0 && a1[0].year) ? new Date(a1[0].year, a1[0].month) : new Date(253373439600000);
    const firstDate2 = (length2 > 0 && a2[0].year) ? new Date(a2[0].year, a2[0].month) : new Date(253373439600000);
    const lastDate1 = (length1 > 0 && a1[length1 - 1].year) ? new Date(a1[length1 - 1].year, a1[length1 - 1].month) : new Date(0);
    const lastDate2 = (length2 > 0 && a2[length2 - 1].year) ? new Date(a2[length2 - 1].year, a2[length2 - 1].month) : new Date(0);
    return maxDate ? (lastDate1 <= lastDate2 ? lastDate2 : lastDate1) : (firstDate1 <= firstDate2 ? firstDate1 : firstDate2);
}

const monthDiff = (laterDate, earliestDate) => {
    let months = (laterDate.getFullYear() - earliestDate.getFullYear()) * 12;
    months -= earliestDate.getMonth();
    months += laterDate.getMonth();
    return months;
}

//The assumption is made that gaps e.g. months missing in the assertion are already filled with assertionSeries
export const equalizeAssertionsSize = (daAssertions, reqAssertions) => {
    if (daAssertions.length === reqAssertions.length) {
        return [daAssertions, reqAssertions];
    }
    let daFirstDate, daLastDate, reqFirstDate, reqLastDate, daResults, reqResults;
    if (daAssertions.length > 0) {
        daFirstDate = new Date(daAssertions[0].year, daAssertions[0].month);
        daLastDate = new Date(daAssertions[daAssertions.length - 1].year, daAssertions[daAssertions.length - 1].month);
    } else {
        daResults = new Array(reqAssertions.length).fill({nbr: 0});
        reqResults = reqAssertions;
    }
    if (reqAssertions.length > 0) {
        reqFirstDate = new Date(reqAssertions[0].year, reqAssertions[0].month);
        reqLastDate = new Date(reqAssertions[reqAssertions.length - 1].year, reqAssertions[reqAssertions.length - 1].month);
    } else {
        reqResults = new Array(daAssertions.length).fill({nbr: 0});
        daResults = daAssertions;
    }
    if (daFirstDate && reqFirstDate) {
        if (daFirstDate < reqFirstDate) {
            const zeroReq = new Array(monthDiff(reqFirstDate, daFirstDate)).fill({nbr: 0});
            reqResults = [...zeroReq, ...reqAssertions]
        } else if (daFirstDate > reqFirstDate) {
            const zeroDa = new Array(monthDiff(daFirstDate, reqFirstDate)).fill({nbr: 0});
            daResults = [...zeroDa, ...daAssertions]
        }
        if (daLastDate > reqLastDate) {
            const sameReq = new Array(monthDiff(daLastDate, reqLastDate)).fill({nbr: lastNumber(reqAssertions).nbr});
            const subReqResults = reqResults || reqAssertions;
            reqResults = [...subReqResults, ...sameReq]
        } else if (daLastDate < reqLastDate) {
            const sameDa = new Array(monthDiff(reqLastDate, daLastDate)).fill({nbr: lastNumber(daAssertions).nbr});
            const subDaAssertions = daResults || daAssertions;
            daResults = [...subDaAssertions, ...sameDa]
        }
    }
    return [daResults || daAssertions, reqResults || reqAssertions]
}


