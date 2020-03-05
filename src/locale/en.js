import I18n from "i18n-js";

I18n.translations.en = {
  routes: {
    backpack: "Backpack",
    'badge-requests': "Badge requests",
    collections: "Collections",
    profile: "Profile"
  },
  header: {
    title: "My SURFconext",
    logout: "Logout",
    nav: {
      badges: "Badges",
      issuers: "Issuers"
    }
  },
  login: {
    title: "Never stop learning",
    description: "Edubadges are digital certificates and show that the owner has certain skills or knowledge. Edubadges can be issued for both extracurriculair activities and accredited education.",
    student: {
      title: "Receive and share badges",
      button: "View your Backpack",
      button_sub: "Log in with your eduID",
      edu_id_info: "You will need an eduID to be able to view your Backpack. If you don’t have an eduID yet, you can easily <a target=\"_blank\" href=\"%{url}\">request one here.</a>",
    },
    teacher: {
      title: "Award badges to students",
      button: "Enter the issuer portal",
    }
  },
  backpack: {
    title: "Your achievements"
  },
  landing: {
    info: "Collaborate online in higher education",
    logoutStatus:
      "You have successfully logged out. To complete the logout process, you must close your browser",
    deletionStatus:
      "You have successfully deleted your account. To complete the process, you must close your browser"
  },
  notFound: {
    main: "404 - Not Found"
  },
  teacher: {
    badges: {
      title: "Badgeclasses"
    },
    issuers: {
      title: "Issuers"
    }
  },
  profile: {
    title: "Personal information",
    info:
      "Basic information like your name and email address, and the information we have received from your institution",
    email: "Email address",
    schacHomeOrganization: "Institution ID",
    name: "Name",
    profile: "Profile"
  },
  edit: {
    title: "Name",
    info: "Please provide your full name",
    givenName: "Your given name",
    familyName: "Your family name",
    update: "Update",
    cancel: "Cancel",
    updated: "Your profile has been updated",
    back: "/profile"
  },
  security: {
    title: "Security",
    subTitle: "We support the following sign in options for My SURFconext:",
    usePassword: "Password",
    notSet: "Not set",
    useMagicLink: "Send magic link to",
    rememberMe: "Remember this device",
    rememberMetrue: "Yes",
    rememberMefalse: "No"
  },
  home: {
    welcome: "Welcome {{name}}",
    profile: "Personal info",
    security: "Security",
    account: "Account",
    favorites: "Favorites",
    settings: "Settings",
    links: {
      teams: "Teams",
      teamsHref: "https://teams.{{baseDomain}}"
    }
  },
  account: {
    title: "Your my.SURFconext account",
    info: "You can choose to remove your SURFconext account",
    deleteAccount: "Delete my account",
    deleteAccountConfirmation:
      "Are you sure you want to delete your my.SURFconext account?"
  },
  password: {
    setTitle: "Set password",
    updateTitle: "Change password",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    setUpdate: "Set password",
    updateUpdate: "Update password",
    cancel: "Cancel",
    set: "Your password has been set",
    updated: "Your password has been updated",
    back: "/security",
    passwordDisclaimer:
      "Make sure it's at least 15 characters OR at least 8 characters including a number and a uppercase letter.",
    invalidCurrentPassword: "Your current password is invalid."
  },
  rememberMe: {
    updated: "Your device is no longer remembered",
    forgetMeTitle: "Remember this device.",
    info:
      "Your device is currently remembered. You will be automatically logged in on the SURFconext Guest IdP.",
    cancel: "Cancel",
    update: "Forget me",
    forgetMeConfirmation:
      "Are you sure you no longer want this device remembered?",
    forgetMe: "Forget this device"
  },
  footer: {
    tip: "Need tips or info?",
    help: "Help & FAQ",
    poweredBy: "Proudly powered by",
    surf: "SURF"
  },
  modal: {
    cancel: "Cancel",
    confirm: "Confirm"
  },
  migration: {
    header: "Your SURFconext guest account has been created!",
    info: "Your Onegini account is succesfully migrated.",
    info2:
      "From now on you must use your SURFconext guest account to logon to services where you previously used Onegini.",
    info3:
      "Tip! Your eduID account by default doesn’t need a password (we send a magic link to your email to sign in), but if you want to, you can set one right now under the",
    securityLink: " Security tab.",
    link: "Show my account details"
  },
  migrationError: {
    header: "Account migration Error",
    header2: "Migration from Onegini to SURFconext Guest Account failed",
    info:
      "We could NOT migrate your Onegini account to a SURFconext Guest Account as you have used a email that is already associated with a different Guest Account user.",
    info2:
      "Please copy the link below, close your browser and retry with the copied link using a different email.",
    info3:
      'If you do own the email <strong>{{email}}</strong> then you can proceed to <a href="{{url}}">SURFconext Guest IdP</a> and request a magic link to login with this email.'
  }
};

I18n.ts = (key, model) => {
  let res = I18n.t(key, model);
  if (I18n.branding && I18n.branding !== "SURFconext") {
    res = res.replace(/SURFconext/g, I18n.branding);
  }
  return res;
};
