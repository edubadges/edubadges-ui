import I18n from "i18n-js";

export const language = {name: "LanguageExtension", value: "Language"};

export const ects = {name: "ECTSExtension", value: "ECTS"};

export const eqf = {name: "EQFExtension", value: "EQF"};

export const learningOutcome = {name: "LearningOutcomeExtension", value: "LearningOutcome"};

export const educationProgramIdentifier = {
  name: "EducationProgramIdentifierExtension",
  value: "EducationProgramIdentifier"
};

export const extensionValue = (extensions, extension) => {
  const ext = extensions.find(ext => ext.name === `extensions:${extension.name}`);
  return ext ? JSON.parse(ext.originalJson.replace(/'/g, "\""))[extension.value] : I18n.t("models.badgeclass.extensions.notSet");
};
