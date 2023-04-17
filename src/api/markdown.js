import {marked} from "marked";
import DOMPurify from 'dompurify';

const cache = {};

const fetchOptions = {
    method: "GET",
    credentials: "same-origin",
    "x-requested-with": "client",
};

export const fetchMarkdown = url => {
    if (cache[url]) {
        return Promise.resolve(cache[url]);
    } else {
        return fetch(url, fetchOptions).then(res => res.text()).then(text => {
            const htmlTerms = DOMPurify.sanitize(marked(text));
            const htmlTermsHrefs = htmlTerms.replace(/<a href=/g, "<a target=\"_blank\" href=");
            cache[url] = htmlTermsHrefs;
            return htmlTermsHrefs;
        });
    }

}
