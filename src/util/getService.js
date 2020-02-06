import {get} from "svelte/store";
import {config} from "../stores/config";

export const getService = {
    STUDENT: get(config).studentDomain,
    TEACHER: get(config).teacherDomain
};