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
  return `${date.getDay()} ${translation.monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

