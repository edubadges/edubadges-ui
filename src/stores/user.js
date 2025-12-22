import { writable } from "svelte/store";

// Custom store for redirectPath with validation
function createRedirectPathStore(initialValue) {
  function validatePathIsNotLogin(path) {
    if (path.startsWith("login") || path.startsWith("/login")) {
      console.error(
        `[redirectPath] ERROR: Cannot set redirectPath to login path: "${path}"`
      );
      throw new Error(`Cannot set redirectPath to login path: "${path}"`);
    }
  }

  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    set: (value) => {
      validatePathIsNotLogin(value);
      set(value);
      localStorage.setItem("redirectPath", value);
    },
    update: (updater) => {
      update((current) => {
        const newValue = updater(current);
        validatePathIsNotLogin(newValue);
        localStorage.setItem("redirectPath", newValue);
        return newValue;
      });
    },
  };
}

export const redirectPath = createRedirectPathStore(
  localStorage.getItem("redirectPath") || ""
);
export const userRole = writable(localStorage.getItem("userRole") || "");
export const userImpersonated = writable(
  localStorage.getItem("userImpersonated") || ""
);
export const impersonation = writable(
  localStorage.getItem("impersonation") || ""
);
export const userLoggedIn = writable(
  localStorage.getItem("userLoggedIn") || ""
);
export const showMainErrorDialog = writable(false);
export const userName = writable(localStorage.getItem("userName") || "");
export const validatedUserName = writable(
  localStorage.getItem("validatedUserName") || ""
);
export const authToken = writable(localStorage.getItem("authToken") || "");
export const userHasClosedWelcome = writable(
  localStorage.getItem("userHasClosedWelcome") || ""
);
export const currentInstitution = writable(
  JSON.parse(localStorage.getItem("currentInstitution") || "{}")
);

// LocalStorage synchronization for redirectPath is now handled within the custom store
userRole.subscribe((val) => localStorage.setItem("userRole", val));
userImpersonated.subscribe((val) =>
  localStorage.setItem("userImpersonated", val)
);
impersonation.subscribe((val) => localStorage.setItem("impersonation", val));
userLoggedIn.subscribe((val) => localStorage.setItem("userLoggedIn", val));
userName.subscribe((val) => localStorage.setItem("userName", val));
validatedUserName.subscribe((val) =>
  localStorage.setItem("validatedUserName", val)
);
authToken.subscribe((val) => localStorage.setItem("authToken", val));
userHasClosedWelcome.subscribe((val) =>
  localStorage.setItem("userHasClosedWelcome", val)
);
currentInstitution.subscribe((val) =>
  localStorage.setItem("currentInstitution", JSON.stringify(val))
);
