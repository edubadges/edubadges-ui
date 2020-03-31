import I18n from "i18n-js";

I18n.translations.en = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Badge requests",
    collections: "Collections",
    profile: "Profile"
  },
  header: {
    logout: "Logout",
    nav: {
      "/": "Badges",
      "/manage": "Manage"
    }
  },
  login: {
    title: "Never stop learning",
    description:
      "Edubadges are digital certificates and show that the owner has certain skills or knowledge. Edubadges can be issued for both extracurriculair activities and accredited education.",
    student: {
      title: "Receive and share badges",
      button: "View your Backpack",
      button_sub: "Log in with your eduID",
      edu_id_info:
        'You will need an eduID to be able to view your Backpack. If you don’t have an eduID yet, you can easily <a target="_blank" href="%{url}">request one here.</a>'
    },
    teacher: {
      title: "Award badges to students",
      button: "Enter the issuer portal"
    }
  },
  backpack: {
    title: "Your achievements"
  },
  notFound: {
    main: "404 - Not Found"
  },
  teacher: {
    sidebar: {
      search: "Search",
      filters: {
        faculties: "Issuer groups",
        issuers: "Issuers",
        show_all: "Show all",
        show_less: "Show less"
      }
    },
    badges: {
      title: "Badgeclasses"
    },
    issuers: {
      title: "Issuers"
    }
  },
  manage: {
    tabs: {
      issuers: "Issuers"
    }
  },
  footer: {
    tip: "Need tips or info?",
    help: "Help & FAQ",
    poweredBy: "Proudly powered by",
    surf: "SURF"
  },
  error: {
    101: "Could not register email address. Address already in use",
    102: "You have already added this address. Verify it",
    103: "Can not remove primary email address",
    104: "Can not remove only email address",
    105: "Can't make unverified email address the primary email address",
    201: "May not enroll: already enrolled",
    202: "May not enroll: you already have been awarded this badge",
    203: "May not enroll: you don't have a student account",
    204: "Invalid enrollment id",
    205: "Enrollment not found",
    206: "Awarded enrollments cannot be withdrawn",
    207: "Users can only withdraw their own enrollments",
    208: "Missing badgeclass id",
    209: "Cannot enroll",
    601: "You do not have permission. Check your assigned role in the Issuer",
    701: "Unspecified share provider",
    702: "Invalid share provider",
  }
};
