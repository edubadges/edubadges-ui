import {translateProperties} from "./utils";

export const onBehalfOfDisplayNameIssuerGroup = (faculty, isPublic) => {
    const fac = translateProperties(faculty);
    const name = fac.name || fac.on_behalf_of_display_name || fac.onBehalfOfDisplayName;
    if (faculty.onBehalfOf || faculty.on_behalf_of) {
        if (isPublic && (fac.on_behalf_of_url || fac.onBehalfOfUrl)) {
            return `<a href="${fac.on_behalf_of_url || fac.onBehalfOfUrl}" target="_blank">${name}</a>`;
        }
        return `<a use:link href="/manage/faculty/${faculty.entityId}">${faculty.name}</a>`
    }
    if (isPublic) {
        return `<a href="/public/institutions/${faculty.institution.entityId}">${faculty.institution.name}</a>`
    }
}

export const issuerLink = (issuer, isPublic) => {
    if (issuer.id) {
        debugger;
        return `<a href=${issuer.id}>${issuer.name}</a>`
    }
    if (issuer.entityId) {
        return `<a href="/public/issuers/${issuer.entityId}"}>${issuer.name}</a>`
    }
    return `<span class="issuer">${issuer.name}</span>`;
}

