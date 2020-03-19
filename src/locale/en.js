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
      "/issuers": "Issuers"
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
  footer: {
    tip: "Need tips or info?",
    help: "Help & FAQ",
    poweredBy: "Proudly powered by",
    surf: "SURF"
  }
};
