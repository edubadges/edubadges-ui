import { writable } from "svelte/store";

export const ltiContext = writable({
    ltiEnabled: false
});
