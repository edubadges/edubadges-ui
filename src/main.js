import App from "./App.svelte";

import Cookies from "js-cookie";
import I18n from "i18n-js";

import "./locale/en";
import "./locale/nl";

if (typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search);
    let lang;
    if (urlSearchParams.has("lang")) {
        lang = urlSearchParams.get("lang");
    } else if (Cookies.get("lang")) {
        lang = Cookies.get("lang");
    } else {
        lang = navigator.language.toLowerCase().substring(0, 2);
    }
    lang = ["en", "nl"].indexOf(lang) > -1 ? lang : "en";
    I18n.locale = lang;
} else {
    I18n.locale = "en";
}

const app = new App({ target: document.body });

export default app;