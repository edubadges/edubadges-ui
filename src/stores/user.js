import { writable } from "svelte/store"

export const user = writable({
  id: "",
  email: "",
  givenName: "",
  familyName: "",
  schacHomeOrganization: "",
  uid: "",
  usePassword: false,
  rememberMe: true,
});

export const redirectPath = writable("");

const createFlash = () => {
  const { subscribe, set } = writable("");

  return {
    subscribe,
    setValue: value =>
      setTimeout(() => {
        set(value);
        setTimeout(() => set(""), 3000)
      }, 125)
  }
};
export const flash = createFlash();

export const userRole = writable(localStorage.getItem("userRole") || "");
export const userLoggedIn = writable(localStorage.getItem("userLoggedIn") || "");
export const authToken = writable(localStorage.getItem("authToken") || "");
export const userVerifiedByInstitution = writable(localStorage.getItem("userVerifiedByInstitution") || "");

userRole.subscribe(val => localStorage.setItem("userRole", val));
userLoggedIn.subscribe(val => localStorage.setItem("userLoggedIn", val));
authToken.subscribe(val => localStorage.setItem("authToken", val));
userVerifiedByInstitution.subscribe(val => localStorage.setItem("userVerifiedByInstitution", val));
