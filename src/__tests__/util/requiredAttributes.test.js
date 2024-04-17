import { isRequired, constructErrors} from "../../util/requiredAttributes";
import {badgeClassTypes} from "../../util/badgeClassTypes";


test("Required attr", () => {
    const badgeClass = {typeBadgeClass: badgeClassTypes.REGULAR, name: "test"}
    expect(isRequired(badgeClass, "name")).toBe(true);
});

test("Optional attr", () => {
    const badgeClass = {typeBadgeClass: badgeClassTypes.REGULAR, name: "test"}
    expect(isRequired(badgeClass, "nope")).toBe(false);
});

test("Required extension", () => {
    const badgeClass = {
        typeBadgeClass: badgeClassTypes.MICRO_CREDENTIAL
    }
    const extensions = {LearningOutcomeExtension: "test"};
    expect(isRequired(badgeClass, "extensions.LearningOutcomeExtension")).toBe(true);
});

test("Required educationProgramIdentifier array", () => {
    const badgeClass = {
        typeBadgeClass: badgeClassTypes.MICRO_CREDENTIAL
    }
    const extensions = {EducationProgramIdentifierExtension: [123456]};
    expect(isRequired(badgeClass, "extensions.EducationProgramIdentifierExtension")).toBe(true);
});

test("Construct errors", () => {
    const badgeClass = {
        typeBadgeClass: badgeClassTypes.MICRO_CREDENTIAL,
        name: "name",
    }
    const extensions = {EducationProgramIdentifierExtension: [123456]};
    const errors = constructErrors(badgeClass, extensions);
    expect(errors).strictEqual(true);
});
