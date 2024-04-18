import {badgeClassTypes} from "./badgeClassTypes";
import {isEmpty} from "lodash";

const requiredMicroCredentials = {
    name: true,
    image: true,
    description: true,
    extensions: {
        LearningOutcomeExtension: true,
        EQFExtension: true,
        EducationProgramIdentifierExtension: true,
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
    const type = badgeClass.badgeClassType
    const requiredAttributes = type === badgeClassTypes.MICRO_CREDENTIAL ? requiredMicroCredentials :
        type === badgeClassTypes.REGULAR ? requiredRegular : requiredExtraCurricular;
    const attributes = Object.keys(requiredAttributes).reduce((acc, cur) => {
        if (cur !== "extensions") {
            acc.push(cur);
        } else {
            Object.keys(requiredAttributes[cur]).forEach(ex => acc.push(`extensions.${ex}`))
        }
        return acc;
    }, []);
    return attributes.map(attr => ({name: attr, value: attributeValue(badgeClass, attr, extensions )}))
        .filter(item => isEmpty(item.value))
        .reduce((acc,item) => {
            acc[item.name] = [{"error_code": "903"}]
            return acc;
        },{})
}