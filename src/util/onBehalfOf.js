import {translateProperties} from "./utils";

export const onBehalfOfDisplayName = faculty => {
    const fac =  translateProperties(faculty);
    const name = fac.name || fac.on_behalf_of_display_name || fac.onBehalfOfDisplayName
    if (fac.on_behalf_of_url || fac.onBehalfOfUrl) {
        return `<a href="${fac.on_behalf_of_url || fac.onBehalfOfUrl}" target="_blank">${name}</a>`;
    }
    return name;
}
