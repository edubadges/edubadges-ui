import I18n from "i18n-js";
import {badgeClassFilterTypes} from "./catalogFilters";
import {badgeClassTypes} from "./badgeClassTypes";

export const lastNumber = assertions => {
    return !assertions || assertions.length === 0 ? 0 : assertions[assertions.length - 1];
}

export const institutionOptions = institutions => {
    const name = I18n.locale === "en" ? "nameEnglish" : "nameDutch";
    const backupName = I18n.locale === "en" ? "nameDutch" : "nameEnglish";
    return institutions.map(institution => ({
        identifier: institution.entityId,
        name: institution[name] || institution[backupName]
    })).sort((i1, i2) => i1.name.localeCompare(i2.name));
}

export const facultyOptions = faculties => {
    return Array.from(faculties.keys())
        .map(key => ({identifier: key, name: faculties.get(key).name}))
        .sort((i1, i2) => i1.name.localeCompare(i2.name));
}

export const issuerOptions = (faculties, facultyId) => {
    if (facultyId) {
        const facIssuers = faculties.get(facultyId).issuers;
        return Array.from(facIssuers.keys())
            .map(key => ({
            identifier: key,
            name: facIssuers.get(key).name,
            facultyId: facultyId
        }))
        .sort((i1, i2) => i1.name.localeCompare(i2.name));
    } else {
        return Array.from(faculties.keys()).map(facultyKey => {
            const faculty = faculties.get(facultyKey);
            const issuers = faculty.issuers;
            return Array.from(issuers.keys()).map(issuerKey => ({
                identifier: issuerKey,
                name: issuers.get(issuerKey).name,
                facultyId: facultyKey
            }))
        }).flat().sort((i1, i2) => i1.name.localeCompare(i2.name));;
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
    let options;
    if (facultyId) {
        const faculty = faculties.get(facultyId);
        const facIssuers = faculty.issuers;
        if (issuerId && facIssuers.has(issuerId)) {
            const badgeClasses = facIssuers.get(issuerId).badgeClasses;
            options = Array.from(badgeClasses.keys())
                .map(key => ({identifier: key, name: badgeClasses.get(key), facultyId: facultyId, issuerId: issuerId}));
        } else {
            options = getBadgeClassesFromFaculty(faculty);
        }
    } else {
        options = Array.from(faculties.keys()).map(facultyKey => {
            const faculty = faculties.get(facultyKey)
            return getBadgeClassesFromFaculty(faculty, facultyKey);
        }).flat(2);
    }
    return options.flat(2).sort((i1, i2) => i1.name.localeCompare(i2.name));
}

export const totalNbrByAttributeValue = (assertions, attr, value) => {
    return assertions.filter(assertion => assertion[attr] === value)
        .map(assertion => assertion.nbr)
        .reduce((a, b) => a + b, 0);
}

export const claimRatePercentage = (filteredDANotRevoked, totalNbrDirectWards) => {
    if (filteredDANotRevoked === 0 || totalNbrDirectWards === 0) {
        return 0;
    }
    return Math.round((filteredDANotRevoked / totalNbrDirectWards) * 100);
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

export const filterSeries = (assertions, identifiers, awardType = null, badgeClass = null,
                             issuer = null, faculty = null, badgeClassFilterType = badgeClassFilterTypes.ALL) => {
    const badgeClassId = badgeClass ? badgeClass.identifier : null;
    const issuerId = issuer ? issuer.identifier : null;
    const facultyId = faculty ? faculty.identifier : null;
    return assertions.filter(assertion => (awardType == null || assertion.award_type === awardType)
        && (badgeClassId == null || assertion[identifiers['BADGE_CLASS_ID']] === badgeClassId)
        && (issuerId == null || assertion[identifiers['ISSUER_ID']] === issuerId)
        && (facultyId == null || assertion[identifiers['FACULTY_ID']] === facultyId)
        && ((badgeClassFilterType == null || (badgeClassFilterType === badgeClassFilterTypes.ALL && badgeClassFilterType !== badgeClassFilterTypes.ARCHIVED)) ||
            (assertion.badgeclass__archived && badgeClassFilterType === badgeClassFilterTypes.ARCHIVED) ||
            (!assertion.badgeclass__archived &&
                ((assertion.badgeclass__badge_class_type === badgeClassTypes.REGULAR && badgeClassFilterType === badgeClassFilterTypes.REGULAR) ||
            (assertion.badgeclass__badge_class_type === badgeClassTypes.MICRO_CREDENTIAL && badgeClassFilterType === badgeClassFilterTypes.MICRO_CREDENTIALS) ||
            (assertion.badgeclass__badge_class_type === badgeClassTypes.EXTRA_CURRICULAR && badgeClassFilterType === badgeClassFilterTypes.EXTRA_CURRICULAR)))));

}

export const extractAssertionFaculties = (assertions, directAwards, enrolments, locale) => {
    const faculties = new Map();
    const name = I18n.locale === "en" ? "name_english" : "name_dutch";
    const backupName = I18n.locale === "en" ? "name_dutch" : "name_english";

    const facultyName = `issuer__faculty__${name}`;
    const facultyNameBackup = `issuer__faculty__${backupName}`;

    const issuerName = `issuer__${name}`;
    const issuerNameBackup = `issuer__${backupName}`;

    const directAwardsTransformed = directAwards.map(da => ({
        issuer__faculty_id: da.badgeclass__issuer__faculty_id,
        issuer__faculty__name_english: da["badgeclass__issuer__faculty__name_english"],
        issuer__faculty__name_dutch: da["badgeclass__issuer__faculty__name_dutch"],
        issuer_id: da.badgeclass__issuer__id,
        issuer__name_dutch: da["badgeclass__issuer__name_dutch"],
        issuer__name_english: da["badgeclass__issuer__name_english"],
        badgeclass_id: da.badgeclass_id,
        badgeclass__name: da.badgeclass__name
    }));
    const enrolmentsTransformed = enrolments.map(enr => ({
        issuer__faculty_id: enr.badge_class__issuer__faculty_id,
        issuer__faculty__name_english: enr["badge_class__issuer__faculty__name_english"],
        issuer__faculty__name_dutch: enr["badge_class__issuer__faculty__name_dutch"],
        issuer_id: enr.badge_class__issuer__id,
        issuer__name_dutch: enr["badge_class__issuer__name_dutch"],
        issuer__name_english: enr["badge_class__issuer__name_english"],
        badgeclass_id: enr.badge_class_id,
        badgeclass__name: enr.badge_class__name
    }));
    const allAssertions = assertions.concat(directAwardsTransformed).concat(enrolmentsTransformed);
    allAssertions.forEach(assertion => {
        const facultyId = assertion.issuer__faculty_id;
        let faculty = faculties.get(facultyId);
        if (!faculty) {
            faculty = {
                name: assertion[facultyName] || assertion[facultyNameBackup],
                issuers: new Map()
            }
            faculties.set(facultyId, faculty);
        }
        const issuerId = assertion.issuer_id;
        let issuer = faculty.issuers.get(issuerId);
        if (!issuer) {
            issuer = {
                name: assertion[issuerName] || assertion[issuerNameBackup],
                badgeClasses: new Map()
            };
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
    const dates1 = a1.filter(entry => entry.year).map(e => new Date(e.year, e.month - 1, 1));
    const dates2 = a2.filter(entry => entry.year).map(e => new Date(e.year, e.month - 1, 1));
    const time = maxDate ? Math.max(...dates1, ...dates2) : Math.min(...dates1, ...dates2);
    return new Date(time);
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


