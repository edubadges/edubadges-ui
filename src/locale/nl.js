import I18n from "i18n-js";

I18n.translations.nl = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Badge verzoeken",
    collections: "Collecties",
    profile: "Profiel",
  },
  header: {
    logout: "Logout",
    nav: {
      badgeclasses: "Badges",
      manage: "Manage",
    },
  },
  login: {
    title: "Leven lang ontwikkelen",
    description:
      "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis bezit. Edubadges kunnen worden uitgereikt voor zowel extracurriculaire activiteiten als geaccrediteerd onderwijs.",
    student: {
      title: "Mijn Backpack",
      subtitle: "ontvang en deel badges",
      action: "Open je Backpack",
      button: "Log in met je eduID",
      accountCreation: {
        askAccountNo: "Nog <strong>geen</strong> Backpack?",
        startAccount: "Klik hier",
      },
    },
    teacher: {
      title: "Uitgeversportaal",
      subtitle: "ken badges toe aan studenten",
      action: "Ga naar het uitgeversportaal",
      button: "Log in via SURFconext",
      accountCreation: {
        askAccount: "Nog <strong>geen</strong> toegang?",
        startAccount: "Neem contact op met de instellingsbeheerder",
      },
    },
    createEduId: {
      askAccountYes: "Al <strong>wel</strong> een Backpack?",
      logInAccount: "Log in",
      createAccountButton: "Maak een eduID aan",
      back: "Terug",
      title: "Maak een Backpack aan",
      subtitle: "je hebt een eduID nodig",
      step1: "Stap 1: Maak een eduID aan",
      step2: "Stap 2: verifieer uw identiteit",
      welcome: "Welkom bij je rugzak",
      bekroond: "We hebben u uw eerste badge toegekend😀",
      infoStep2:
        "Om eduBadges verder te kunnen ontvangen, moet u <strong> uw identiteit verifiëren </strong> bij uw onderwijsinstellingen. U kunt dit bewijzen door op de knop te klikken en u aan te melden bij uw instelling met uw instellingsaccount.",
      verificatie: "Verificatie geslaagd!",
      infoStep3: "Je kunt nu edubadges in je rugzak ontvangen.",
      require:
        "Om een edubadges Backpack aan te maken heb je een eduID nodig. Na het aanmaken van een eduID kan je je onderwijsinstelling verifiëren.",
      steps: {
        step1: "Maak een eduID aan",
        step2: "Verifieer je instelling",
        step3: "Ontvang & deel badges",
      },
    },
  },
  backpack: {
    title: "Behaalde badges",
  },
  notFound: {
    main: "404 - Not Found",
  },
  teacher: {
    sidebar: {
      search: "Zoeken",
      filters: {
        faculties: "Issuer groepen",
        issuers: "Issuers",
        show_all: "Toon meer",
        show_less: "Toon minder",
      },
    },
    name: "Naam",
    badgeclasses: {
      title: "Badgeclasses",
    },
    issuers: {
      title: "Issuers",
    },
    faculties: {
      title: "Groepen",
    },
  },
  manage: {
    tabs: {
      issuers: "Issuers",
      faculties: "Groepen",
      badgeclasses: "Badgeclasses",
      badgesRequested: "Aanvragen",
      badgesAwarded: "Ontvangers",
      badgesRevoked: "Ingetrokken",
    },
    edit: {
      institution: "Wijzig instituut",
      faculty: "Wijzig groep",
      issuer: "Wijzig issuer",
      badgeclass: "Wijzig badgeclass",
      save: "Opslaan",
      cancel: "Annuleren",
    },
    new: {
      faculty: "Nieuwe groep maken",
      issuer: "Nieuwe issuer maken",
      badgeclass: "Nieuwe badgeclass maken",
      save: "Opslaan",
      cancel: "Annuleren",
    },
  },
  footer: {
    tip: "Tip of info nodig?",
    help: "Help & FAQ",
    poweredBy: "Trots aangeboden door",
    surf: "SURF",
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
  },
  models: {
    institution: {
      created: "Vanaf",
      admin: "Admin",
      brin: "BRIN code",
      description: "Omschrijving",
      grading_table: "Grading table",
      no_grading_table: "<no link provided yet>",
      image: "Logo",
      name: "Name",
    },
    faculty: {
      created: "Created",
      admin: "Admin",
      description: "Beschrijving",
      name: "Naam",
    },
    issuer: {
      description: "Beschrijving",
      email: "Contact emailadres",
      created: "Created",
      admin: "Admin",
      email_header: "Contact",
      url_header: "Website",
      no_url: "<no website provided yet>",
      no_email: "<no email provided yet>",
      image: "Logo",
      name: "Naam",
      url: "Website URL",
      faculty: "Groep",
    },
    badgeclass: {
      issuer: "Issuer",
      image: "Badge foto",
      name: "Naam",
      description: "Beschrijving",
      criteria_text: "Wat is benodigd om deze badge te verdienen?",
      criteria_url: "Criteria URL",
    },
  },
};
