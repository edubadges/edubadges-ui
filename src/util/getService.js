import {config} from "../stores/user";
import {get} from "svelte/store";

export const getService = {
    STUDENT: get(config).studentDomain,
    TEACHER: get(config).teacherDomain
};