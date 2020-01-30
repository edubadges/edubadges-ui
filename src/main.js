import App from "./App.svelte";

import Cookies from "js-cookie";
import I18n from "i18n-js";

import "./locale/en";
import "./locale/nl";

if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (urlSearchParams.has("lang")) {
        I18n.locale = urlSearchParams.get("lang");
    } else if (Cookies.get("lang")) {
        I18n.locale = Cookies.get("lang");
    } else {
        I18n.locale = navigator.language.toLowerCase().substring(0, 2);
    }

} else {
    I18n.locale = "en";
}

const app = new App({target: document.body});

export default app;