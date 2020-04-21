import {
  ects,
  educationProgramIdentifier,
  eqf,
  extensionToJson,
  extensionValue,
  language,
  learningOutcome
} from "../../../components/extensions/badges/extensions";

const extensions = [{
  name: "extensions:LanguageExtension",
  originalJson: "{'@context': 'https://openbadgespec.org/extensions/LanguageExtension/context.json', 'type': ['Extension', 'extensions:LanguageExtension'], 'Language': 'nl_NL'}"
}, {
  name: "extensions:ECTSExtension",
  originalJson: "{'@context': 'https://openbadgespec.org/extensions/ECTSExtension/context.json', 'type': ['Extension', 'extensions:ECTSExtension'], 'ECTS': 2.5}"
}, {
  name: "extensions:EQFExtension",
  originalJson: "{'@context': 'https://openbadgespec.org/extensions/EQFExtension/context.json', 'type': ['Extension', 'extensions:EQFExtension'], 'EQF': 7}"
}, {
  name: "extensions:LearningOutcomeExtension",
  originalJson: "{'@context': 'https://openbadgespec.org/extensions/LearningOutcomeExtension/context.json', 'type': ['Extension', 'extensions:LearningOutcomeExtension'], 'LearningOutcome': 'Will appreciate the benefits of learning a foreign language.'}"
}, {
  name: "extensions:EducationProgramIdentifierExtension",
  originalJson: "{'@context': 'https://openbadgespec.org/extensions/EducationProgramIdentifierExtension/context.json', 'type': ['Extension', 'extensions:EducationProgramIdentifierExtension'], 'EducationProgramIdentifier': 56823}"
}];

test("Extensions value", () => {
  expect(extensionValue(extensions, language)).toStrictEqual('nl_NL');
  expect(extensionValue(extensions, ects)).toStrictEqual(2.5);
  expect(extensionValue(extensions, eqf)).toStrictEqual(7);
  expect(extensionValue(extensions, learningOutcome)).toStrictEqual("Will appreciate the benefits of learning a foreign language.");
  expect(extensionValue(extensions, educationProgramIdentifier)).toStrictEqual(56823);

  expect(extensionValue(extensions, {name: "nope"})).toBeNull();

});

test("Extensions JSON", () => {
  const nameValuePairs = [
    {name: language.name, value: "Nl_Nl"},
    {name: ects.name, value: 6},
    {name: eqf.name, value: 3.5},
    {name: educationProgramIdentifier.name, value: "123456"},
  ]
  const extensions = extensionToJson(nameValuePairs);
  expect(extensions).toStrictEqual({

    "extensions:LanguageExtension": {
      "@context": "https://openbadgespec.org/extensions/LanguageExtension/context.json",
      "Language": "Nl_Nl",
      "type": [
        "Extension",
        "extensions:LanguageExtension"
      ]
    },

    "extensions:ECTSExtension": {
      "@context": "https://openbadgespec.org/extensions/ECTSExtension/context.json",
      "ECTS": 6,
      "type": [
        "Extension",
        "extensions:ECTSExtension"
      ]
    },
    "extensions:EQFExtension": {
      "@context": "https://openbadgespec.org/extensions/EQFExtension/context.json",
      "EQF": 3.5,
      "type": [
        "Extension",
        "extensions:EQFExtension"
      ]
    },
    "extensions:EducationProgramIdentifierExtension": {
      "@context": "https://openbadgespec.org/extensions/EducationProgramIdentifierExtension/context.json",
      "EducationProgramIdentifier": "123456",
      "type": [
        "Extension",
        "extensions:EducationProgramIdentifierExtension",
      ]
    }
  })
});
