import { userLoggedIn, userRole, authToken } from "../stores/user";
import { navigate } from "svelte-routing";

export const role = {
  GUEST: "guest",
  STUDENT: "student",
  TEACHER: "teacher",
};
