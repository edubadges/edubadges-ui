import {writable} from 'svelte/store';
import I18n from "i18n-js";

const msgLevel = {
  INFO: "info",
  ERROR: "error"
};

const createFlash = () => {
  const {subscribe, set} = writable({val: "", level: msgLevel.INFO});

  return {
    subscribe,
    setValue: (value, level = msgLevel.INFO) => setTimeout(() => {
      set({val: value, level: level});
      setTimeout(() => set({val: "", level}), 3500);
    }, 125),
    error: details => setTimeout(() => {
      const msg = details && details.fields ? details.fields.error_message : I18n.t("error.unexpected");
      set({val: msg, level: msgLevel.ERROR});
    }, 125)
  };
};

export const flash = createFlash();
export {msgLevel};
