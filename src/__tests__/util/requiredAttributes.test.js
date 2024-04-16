import {attributeValue, isRequired} from "../../util/requiredAttributes";
import {badgeClassTypes} from "../../util/badgeClassTypes";


test("Required attr", () => {
    const badgeClass = {typeBadgeClass: badgeClassTypes.REGULAR, name: "test"}
    expect(isRequired(badgeClass, "name")).toBe(true);
    expect(attributeValue(badgeClass, "name", {})).toBe("test");
});

test("Required extension", () => {
    const badgeClass = {
        typeBadgeClass: badgeClassTypes.MICRO_CREDENTIAL
    }
    const extensions = {LearningOutcomeExtension: "test"};
    expect(isRequired(badgeClass, "extensions.LearningOutcomeExtension")).toBe(true);
    expect(attributeValue(badgeClass, "extensions.LearningOutcomeExtension", extensions)).toBe("test");
});

test("Required educationProgramIdentifier array", () => {
    const badgeClass = {
        typeBadgeClass: badgeClassTypes.MICRO_CREDENTIAL
    }
    const extensions = {EducationProgramIdentifierExtension: [123456]};
    expect(isRequired(badgeClass, "extensions.EducationProgramIdentifierExtension")).toBe(true);
    expect(attributeValue(badgeClass, "extensions.EducationProgramIdentifierExtension", extensions)).toBe(123456);
});
