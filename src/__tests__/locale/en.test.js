import I18n from "i18n-js";
import en from "../../locale/en";
import nl from "../../locale/nl";

expect.extend({
  toContainKey(translation, key) {
    return {
      message: () =>
        `Expected ${key} to be present in ${JSON.stringify(translation)}`,
      pass: translation !== undefined && translation[key] !== undefined
    };
  }
});

test("All translations exists in EN and NL", () => {
  //we need to use them, otherwise the imports are deleted when organizing them
  expect(en).toBeDefined();
  expect(nl).toBeDefined();

  const contains = (translation, translationToVerify) => {
    Object.keys(translation).forEach(key => {
      expect(translationToVerify).toContainKey(key);
      const value = translation[key];
      if (typeof value === "object") {
        contains(value, translationToVerify[key]);
      }
    });
  };
  contains(I18n.translations.en, I18n.translations.nl);
  contains(I18n.translations.nl, I18n.translations.en);
});
