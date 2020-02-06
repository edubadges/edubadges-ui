import {writable} from "svelte/store";

export const config = writable({
    loginUrl: "",
    serverUrl: "http://127.0.0.1:8000",
    baseDomain: "",
    migrationLandingPageUrl: "",
    myConextUrlGuestIdp: "",
    studentDomain: "edu_id",
    teacherDomain: "surf_conext"
});