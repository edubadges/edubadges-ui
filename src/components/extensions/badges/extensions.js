import { config } from "../../../util/config";

export const language = {name: "LanguageExtension", value: "Language"};

export const ects = {name: "ECTSExtension", value: "ECTS"};

export const studyLoad = {name: "StudyLoadExtension", value: "StudyLoad"};

export const eqf = {name: "EQFExtension", value: "EQF"};

export const timeInvestment = {name: "TimeInvestmentExtension", value: "TimeInvestment"};

export const learningOutcome = {
  name: "LearningOutcomeExtension",
  value: "LearningOutcome",
};

export const educationProgramIdentifier = {
  name: "EducationProgramIdentifierExtension",
  value: "EducationProgramIdentifier",
};

export const extensionValue = (extensions, extension) => {
  if (!extensions) {
    return null;
  }
  const ext = extensions.find(ext => ext.name === `extensions:${extension.name}`);
  if (ext) {
    const json = JSON.parse(ext.originalJson);
    return json[extension.value];
  }
  return null;
};

const extensionNameValueDict = [
  language,
  ects,
  eqf,
  learningOutcome,
  educationProgramIdentifier,
  studyLoad,
  timeInvestment,
].reduce((acc, extension) => {
  acc[extension.name] = extension.value;
  return acc;
}, {});

/*
 * We expect the following nameValuePairs input parameter:
 *
 * [
 *   {name: "LanguageExtension", value: "Nl_Nl"},
 *   {name: "ECTSExtension", value: 6},
 *
 * ]
 * This is what we receive from the API:
 * {
 *   name: "extensions:ECTSExtension",
 *   originalJson: "{'@context': 'https://openbadgespec.org/extensions/ECTSExtension/context.json', 'type': ['Extension', 'extensions:ECTSExtension'], 'ECTS': 2.5}"
 * }
 *
 * This is what we need to post / put
 * {
 *   "extensions:ECTSExtension": {
 *     "@context": "https://openbadgespec.org/extensions/ECTSExtension/context.json",
 *     "type": [
 *       "Extension",
 *       "extensions:ECTSExtension"
 *     ],
 *     "ECTS": "fi-FI"
 *   }
 * }
 */
export const extensionToJson = (nameValuePairs) => {
  const res = nameValuePairs.reduce((acc, nameValue) => {
    acc[`extensions:${nameValue.name}`] = {
      "@context": `${config.extensionsRootUrl}/extensions/${nameValue.name}/context.json`,
      type: ["Extension", `extensions:${nameValue.name}`],
      [extensionNameValueDict[nameValue.name]]: nameValue.value,
    };
    return acc;
  }, {});
  return res;
};

export const publicBadgeInformation = (badgeClass, res) => {
  //The data from the public endpoint is different then from the graphQL query endpoint
  badgeClass.alignments = badgeClass.alignment;
  badgeClass.criteriaText = res['criteria']['narrative'];
  if (res['extensions:LanguageExtension']) {
    badgeClass.language = res['extensions:LanguageExtension']['Language'];
  }
  if (res['extensions:ECTSExtension']) {
    badgeClass.ects = res['extensions:ECTSExtension']['ECTS'];
  }
  if (res['extensions:StudyLoadExtension']) {
    badgeClass.studyLoad = res['extensions:StudyLoadExtension']['StudyLoad'];
  }
  if (res['extensions:TimeInvestmentExtension']) {
    badgeClass.timeInvestment = res['extensions:TimeInvestmentExtension']['TimeInvestment'];
  }
  if (res['extensions:EQFExtension']) {
    badgeClass.eqf = res['extensions:EQFExtension']['EQF'];
  }
  if (res['extensions:LearningOutcomeExtension']) {
    badgeClass.learningOutcome = res['extensions:LearningOutcomeExtension']['LearningOutcome'];
  }
  if (res['extensions:EducationProgramIdentifierExtension']) {
    badgeClass.educationProgramIdentifier = res['extensions:EducationProgramIdentifierExtension']['EducationProgramIdentifier'];
  }
  //When using graphQL the extensions field is an array - for compatibility we set an empty array as we already populated the badgeClass
  badgeClass.extensions = [];
  badgeClass.ignoreExtensions = true;
};
