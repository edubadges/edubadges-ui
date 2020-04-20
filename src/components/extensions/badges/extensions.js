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
  return ext ? JSON.parse(ext.originalJson.replace(/'/g, "\""))[extension.value] : null;
};

const extensionNameValueDict = [language, ects, eqf, learningOutcome, educationProgramIdentifier].reduce((acc, extension) => {
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
export const extensionToJson = nameValuePairs => {
  const res = nameValuePairs.reduce((acc, nameValue) => {
    acc[`extensions:${nameValue.name}`] = {
      "@context": `https://openbadgespec.org/extensions/${nameValue.name}/context.json`,
      "type": ["Extension", `extensions:${nameValue.name}`],
      [extensionNameValueDict[nameValue.name]]: nameValue.value
    };
    return acc;
  }, {});
  return res;
}

