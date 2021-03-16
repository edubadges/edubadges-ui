import {translateProperties} from "../../util/utils";
import I18n from "i18n-js";

test("Translate ", () => {
  const obj = {
    nameEnglish: "name-en",
    descriptionDutch: "description-nl",
    imageEnglish: "image-en",
    imageDutch: "image-nl"
  }
  I18n.locale = "en";
  translateProperties(obj);
  expect(obj.name).toStrictEqual("name-en");
  expect(obj.description).toStrictEqual("description-nl");
  expect(obj.image).toStrictEqual("image-en");

  I18n.locale = "nl";
  translateProperties(obj);
  expect(obj.name).toStrictEqual("name-en");
  expect(obj.description).toStrictEqual("description-nl");
  expect(obj.image).toStrictEqual("image-nl");
});
