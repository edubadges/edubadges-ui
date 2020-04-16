import {
  ects,
  educationProgramIdentifier,
  eqf,
  extensionValue,
  language,
  learningOutcome
} from "../../../components/extensions/badges/extensions";

import I18n from "i18n-js";
import en from "../../../locale/en";
import nl from "../../../locale/nl";

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

  expect(extensionValue(extensions, {name: "nope"})).toStrictEqual("No value set");

});