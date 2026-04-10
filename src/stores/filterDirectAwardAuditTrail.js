import {writable} from "svelte/store";
import {isEmpty} from "../util/utils";

export const auditTrailSearch = writable();
export const allAuditTrails = writable([]);

const auditTrailSearchAttributes = [
    "action_datetime",
    "institution_name",
    "badgeclass_name",
    "recipient_email",
    "recipient_eppn",
    "user",
];

export function filterBySearch(auditTrails, search, searchAttributes = auditTrailSearchAttributes) {
    if (!isEmpty(search)) {
        const lowerSearch = search.toLowerCase().trim();
        return auditTrails.filter((trail) =>
            searchAttributes.some((attr) => trail[attr] && trail[attr].toLowerCase().indexOf(lowerSearch) > -1)
        );
    }
    return auditTrails;
}
