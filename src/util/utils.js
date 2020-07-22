import I18n from "i18n-js";

export const isObject = val => {
  if (val === null || val === undefined) {
    return false;
  }
  return ((typeof val === "function") || (typeof val === "object"));
}

export const formatDate = iso => {
  const date = new Date(iso);
  const translation = I18n.locale === 'en' ? I18n.translations.en : I18n.translations.nl;
  return `${date.getDate()} ${translation.monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

const formatOptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

export const formatCreateDate = iso => {
  const date = new Date(iso);
  const locale = I18n.locale === "en" ? "en-US" : "nl-NL";
  const datePart = date.toLocaleDateString(locale, formatOptions);
  let minutes = date.getMinutes().toString();
  minutes = minutes.length === 2 ? minutes : "0" + minutes;
  return {date: datePart, hours: date.getHours(), minutes: minutes};
};

export const flatten = arr => arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
