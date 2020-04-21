import I18n from "i18n-js";

const expirationMultiplier = multiplier => {
  switch (multiplier) {
    case "D":
      return 1;
    case "W":
      return 7;
    case "M":
      return 30;
    case "Y":
      return 365;
    default:
      return 1;
  }
}

const expirationValueToPeriod = expiration_period => {
  const periods = expirationPeriods();
  let currentPeriod = "D";
  if (expiration_period % 7 === 0) {
    currentPeriod = "W";
    expiration_period = expiration_period / 7;
  }
  if (expiration_period % 30 === 0) {
    currentPeriod = "M"
    expiration_period = expiration_period / 30;
  }
  if (expiration_period % 365 === 0) {
    currentPeriod = "Y";
    expiration_period = expiration_period / 365;
  }
  return [expiration_period, periods.find(p => p.key === currentPeriod)];
}

export const deduceExpirationPeriod = badgeclass => {
  const expirationPeriod = badgeclass.expirationPeriod;
  if (expirationPeriod) {
    badgeclass.expireValueSet = true;
    const p = expirationValueToPeriod(expirationPeriod);
    badgeclass.expirationDuration = p[0];
    badgeclass.expirationPeriod = p[1];
  } else {
    badgeclass.expireValueSet = false;
    badgeclass.expirationDuration = 1;
    badgeclass.expirationPeriod = expirationPeriods()[3];
  }
  return badgeclass;
}

export const setExpirationPeriod = badgeclass => {
  if (badgeclass.expireValueSet) {
    const multiplier = expirationMultiplier(badgeclass.expirationPeriod.key);
    badgeclass.expiration_period = parseInt(badgeclass.expirationDuration) * multiplier;
  } else {
    badgeclass.expiration_period = 0;
  }

}

export const expirationPeriods = () => [
  {name: I18n.t("models.badgeclass.expirationPeriods.days"), key: "D"},
  {name: I18n.t("models.badgeclass.expirationPeriods.weeks"), key: "W"},
  {name: I18n.t("models.badgeclass.expirationPeriods.months"), key: "M"},
  {name: I18n.t("models.badgeclass.expirationPeriods.years"), key: "Y"}
];
