import { writable } from "svelte/store";

export const redirectPath = writable(localStorage.getItem("redirectPath") || "");
export const userRole = writable(localStorage.getItem("userRole") || "");
export const userLoggedIn = writable(
  localStorage.getItem("userLoggedIn") || ""
);
export const authToken = writable(localStorage.getItem("authToken") || "");
export const userVerifiedByInstitution = writable(
  localStorage.getItem("userVerifiedByInstitution") || ""
);
export const userInVerificationFlow = writable(
  localStorage.getItem("userInVerificationFlow") || ""
);

redirectPath.subscribe((val) => localStorage.setItem("redirectPath", val));
userRole.subscribe((val) => localStorage.setItem("userRole", val));
userLoggedIn.subscribe((val) => localStorage.setItem("userLoggedIn", val));
authToken.subscribe((val) => localStorage.setItem("authToken", val));
userVerifiedByInstitution.subscribe((val) =>
  localStorage.setItem("userVerifiedByInstitution", val)
);
userInVerificationFlow.subscribe((val) =>
  localStorage.setItem("userInVerificationFlow", val)
);
