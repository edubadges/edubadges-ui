import {badgeClassTypes} from "./badgeClassTypes";
import {isEmpty} from "./utils";
import {validUrlRegExp} from "./Url";

const requiredMicroCredentials = {
    name: true,
    image: true,
    description: true,
    extensions: {
        LearningOutcomeExtension: true,
        EQFExtension: true,
        //Not both of them are required, but the UI can handle this as only one is visible
        ECTSExtension: true,
        StudyLoadExtension: true
    },
    criteriaText: true,
    participation: true,
    assessmentType: true,
    qualityAssuranceName: true,
    qualityAssuranceUrl: true,
    qualityAssuranceDescription: true,
    stackable: true
}

const requiredRegular = {
    name: true,
    image: true,
    description: true,
    extensions: {
        LearningOutcomeExtension: true,
        ECTSExtension: true,
        EQFExtension: true,
        EducationProgramIdentifierExtension: true
    },
    criteriaText: true
}

const requiredExtraCurricular = {
    name: true,
    image: true,
    description: true,
    extensions: {
        TimeInvestmentExtension: true,
    },
    criteriaText: true,
}

const isRequiredAttribute = (attributeName, requiredConfig) => {
    const parts = attributeName.split(".");
    while (parts.length && requiredConfig) {
        requiredConfig = requiredConfig[parts.shift()];
    }
    return requiredConfig || false;
}

const attributeValue = (badgeClass, attributeName, extensions) => {
    const isExtension = attributeName.startsWith("extensions");
    const parts = attributeName.split(".");
    if (isExtension) {
        parts.shift();
    }
    let obj = isExtension ? extensions : badgeClass;
    while (parts.length && obj) {
        obj = obj[parts.shift()];
    }
    return Array.isArray(obj) ? obj[0] : obj;
}

export const isRequired = (badgeClass, attributeName) => {
    switch (badgeClass.badgeClassType) {
        case badgeClassTypes.MICRO_CREDENTIAL:
            return isRequiredAttribute(attributeName, requiredMicroCredentials);
        case badgeClassTypes.REGULAR:
            return isRequiredAttribute(attributeName, requiredRegular);
        case badgeClassTypes.EXTRA_CURRICULAR:
            return isRequiredAttribute(attributeName, requiredExtraCurricular);
    }
}

export const constructErrors = (badgeClass, extensions) => {
    const type = badgeClass.badgeClassType;
    const requiredAttributes = badgeClass.isPrivate ? {name: true} :
        type === badgeClassTypes.MICRO_CREDENTIAL ? requiredMicroCredentials :
            type === badgeClassTypes.REGULAR ? requiredRegular : requiredExtraCurricular;
    const attributes = Object.keys(requiredAttributes).reduce((acc, cur) => {
        if (cur !== "extensions") {
            acc.push(cur);
        } else {
            Object.keys(requiredAttributes[cur]).forEach(ex => acc.push(`extensions.${ex}`))
        }
        return acc;
    }, []);
    const errors = attributes.map(attr => ({name: attr, value: attributeValue(badgeClass, attr, extensions)}))
        .filter(item => isEmpty(item.value) || item.value === 0)
        .reduce((acc, item) => {
            acc[item.name] = [{"error_code": "903"}]
            return acc;
        }, {});
    if (!isEmpty(badgeClass.qualityAssuranceUrl) && !validUrlRegExp.test(badgeClass.qualityAssuranceUrl)) {
        errors.qualityAssuranceUrl = [{"error_code": "921"}];
    }
    if (!isEmpty(badgeClass.alignments)) {
        errors.alignments = [];
        const validAlignments = badgeClass.alignments
            .filter(alignment =>
                !isEmpty(alignment.target_name) || !isEmpty(alignment.target_url) || !isEmpty(alignment.target_description) ||
                !isEmpty(alignment.target_framework) || !isEmpty(alignment.target_code));
        validAlignments
            .forEach(alignment => {
                const alignmentError = {};
                if (isEmpty(alignment.target_name)) {
                    alignmentError.target_name = [{"error_code": "903"}]
                }
                if (isEmpty(alignment.target_url) && type !== badgeClassTypes.MICRO_CREDENTIAL) {
                    alignmentError.target_url = [{"error_code": "903"}]
                }
                if (!isEmpty(alignment.target_url) && !validUrlRegExp.test(alignment.target_url)) {
                    alignmentError.target_url = [{"error_code": "921"}];
                }
                if (!isEmpty(alignmentError)) {
                    errors.alignments.push(alignmentError);
                }
            });
        if (isEmpty(errors.alignments)) {
            delete errors.alignments;
        }
    }
    if (badgeClass.expireValueSet && isEmpty(badgeClass.expirationDuration)) {
        errors.expirationSetting = [{"error_code": "903"}];
    }
    return errors;
}