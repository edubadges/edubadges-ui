import {badgeClassTypes} from "./badgeClassTypes";

const requiredMicroCredentials = {
    name: true,
    image: true,
    description: true,
    extensions: {
        LearningOutcomeExtension: true,
        ECTSExtension: true,
        EducationProgramIdentifierExtension: true
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

export const attributeValue = (badgeClass, attributeName, extensions) => {
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