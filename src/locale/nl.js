import I18n from "i18n-js";

I18n.translations.nl = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Badge verzoeken",
    collections: "Collecties",
    profile: "Profiel"
  },
  header: {
    logout: "Logout",
    nav: {
      "/": "Badges",
      "/manage": "Manage"
    }
  },
  login: {
    title: "Leven lang ontwikkelen",
    description:
      "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis bezit. Edubadges kunnen worden uitgereikt voor zowel extracurriculaire activiteiten als geaccrediteerd onderwijs.",
    student: {
      title: "Ontvang en deel badges",
      button: "Bekijk je Backpack",
      button_sub: "Log in met uw EduID",
      edu_id_info:
        'Je hebt een eduID nodig om je Backpack te bekijken. Als je nog geen eduID hebt, kan je er <a target="_blank" href="%{url}">hier een aanvragen.</a>'
    },
    teacher: {
      title: "Ken badges toe aan studenten",
      button: "Log in via uw instelling"
    }
  },
  backpack: {
    title: "Behaalde badges"
  },
  notFound: {
    main: "404 - Not Found"
  },
  teacher: {
    sidebar: {
      search: "Zoeken",
      filters: {
        faculties: "Issuer groepen",
        issuers: "Issuers",
        show_all: "Toon meer",
        show_less: "Toon minder"
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
    tip: "Tip of info nodig?",
    help: "Help & FAQ",
    poweredBy: "Trots aangeboden door",
    surf: "SURF"
  },
  error: {
    101: "Kan emailadres niet registreren. Het adres is al in gebruik",
    102: "Je hebt dit emailadres al toegevoegd. Je moet nog verifieren",
    103: "Kan niet het primaire emailadres verwijderen",
    104: "Kan niet het enige emailadres verwijderen",
    105: "Verifieer het emailadres voordat je het adres primair maakt",
    201: "Kan niet enrollen: je bent al enrolled",
    202: "Kan niet enrollen: je hebt deze badge al",
    203: "Kan niet enrollen: je hebt geen studentenaccount",
    204: "Ongeldige enrollment id",
    205: "Enrollment niet gevonden",
    206: "Awarded enrollments kunnen niet teruggetrokken worden",
    207: "Gebruikers kunnen alleen eigen enrollments terugtrekken",
    208: "Missende badgeclass id",
    209: "Kan niet enrollen",
    601: "Geen toegang. Check je assigned role in de Issuer",
    701: "Ongespecifieerde share provider",
    702: "Ongeldige share provider",
  }
};
