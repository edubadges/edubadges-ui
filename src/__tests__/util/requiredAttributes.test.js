import {isRequired, constructErrors} from "../../util/requiredAttributes";
import {badgeClassTypes} from "../../util/badgeClassTypes";


test("Required attr", () => {
    const badgeClass = {badgeClassType: badgeClassTypes.REGULAR, name: "test"}
    expect(isRequired(badgeClass, "name")).toBe(true);
});

test("Optional attr", () => {
    const badgeClass = {badgeClassType: badgeClassTypes.REGULAR, name: "test"}
    expect(isRequired(badgeClass, "nope")).toBe(false);
});

test("Required extension", () => {
    const badgeClass = {
        badgeClassType: badgeClassTypes.MICRO_CREDENTIAL
    }
    const extensions = {LearningOutcomeExtension: "test"};
    expect(isRequired(badgeClass, "extensions.LearningOutcomeExtension")).toBe(true);
});

test("Required ECTSExtension", () => {
    const badgeClass = {
        badgeClassType: badgeClassTypes.MICRO_CREDENTIAL
    }
    const extensions = {ECTSExtension: "ECTS-5"};
    expect(isRequired(badgeClass, "extensions.ECTSExtension")).toBe(true);
});

test("Construct errors", () => {
    const badgeClass = {
        badgeClassType: badgeClassTypes.MICRO_CREDENTIAL,
        name: "name",
    }
    const extensions = {EducationProgramIdentifierExtension: [123456]};
    const errors = constructErrors(badgeClass, extensions);
    const expected = {
        "image": [
            {
                "error_code": "903"
            }
        ],
        "description": [
            {
                "error_code": "903"
            }
        ],
        "extensions.LearningOutcomeExtension": [
            {
                "error_code": "903"
            }
        ],
        "extensions.EQFExtension": [
            {
                "error_code": "903"
            }
        ],
        "extensions.ECTSExtension": [
            {
                "error_code": "903"
            }
        ],
        "extensions.StudyLoadExtension": [
            {
                "error_code": "903"
            }
        ],
        "criteriaText": [
            {
                "error_code": "903"
            }
        ],
        "participation": [
            {
                "error_code": "903"
            }
        ],
        "assessmentType": [
            {
                "error_code": "903"
            }
        ],
        "qualityAssuranceName": [
            {
                "error_code": "903"
            }
        ],
        "qualityAssuranceUrl": [
            {
                "error_code": "903"
            }
        ],
        "qualityAssuranceDescription": [
            {
                "error_code": "903"
            }
        ],
        "stackable": [
            {
                "error_code": "903"
            }
        ]
    }
    expect(errors).toStrictEqual(expected);
});
