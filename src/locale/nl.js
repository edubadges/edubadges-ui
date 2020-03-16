import I18n from "i18n-js";

I18n.translations.nl = {
  routes: {
    backpack: "Backpack",
    'badge-requests': "Badge verzoeken",
    collections: "Collecties",
    profile: "Profiel"
  },
  header: {
    title: "Mijn SURFconext",
    logout: "Logout",
    nav: {
      badges: "Badges"
    }
  },
  login: {
    title: "Leven lang ontwikkelen",
    description: "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis bezit. Edubadges kunnen worden uitgereikt voor zowel extracurriculaire activiteiten als geaccrediteerd onderwijs.",
    student: {
      title: "<strong>Mijn Backpack</strong>",
      subtitle: "ontvang en deel badges",
      button_title: "Open je Backpack",
      button: "Log in met je eduID",
      accountCreation: {
        askAccount: "Nog <strong>geen</strong> Backpack?",
        startAccount: "Klik hier",
        createAccountButton: "Maak een eduID aan"
      },
    },
    studentCreatesAccountSteps: {
      step1: "Maak een eduID aan",
      step2: "Verifieer je instelling",
      step3: "Ontvang & deel badges"
    },
    studentCreatesAccountText: {
      title: "<strong>Create a Backpack</strong>",
      subtitle: "je hebt een eduID nodig",
      step1: "Stap 1: Maak een eduID aan",
      require: "Om een edubadges Backpack aan te maken heb je een eduID nodig. Na het aanmaken van een eduID kan je je onderwijsinstelling verifiëren."
    },
    teacher: {
      title: "<strong>Uitgeversportaal</strong>",
      subtitle: "ken badges toe aan studenten",
      button_title: "Ga naar het uitgeversportaal",
      button: "Log in via SURFconext",
      accountCreation: {
        askAccount: "Nog <strong>geen</strong> toegang?",
        startAccount: "Neem contact op met de instellingsbeheerder",
      }
    }
  },
  backpack: {
    title: "Behaalde badges"
  },
  landing: {
    info: "Online samenwerken in het onderwijs",
    logoutStatus:
      "Je bent succesvol uitgelogd. Om het uitlogproces te voltooien, moet je je browser sluiten",
    deletionStatus:
      "Je hebt succesvol je account verwijderd. Om het proces te voltooien, moet je je browser sluiten"
  },
  notFound: {
    main: "404 - Not Found"
  },
  teacher: {
    badges: {
      title: "Badgeclasses"
    }
  },
  profile: {
    title: "Persoonlijke informatie",
    info:
      "Basisinformatie zoals je naam en e-mailadres en de informatie die we van je instelling hebben ontvangen",
    email: "Email",
    schacHomeOrganization: "Instellings ID",
    name: "Naam",
    profile: "Profiel"
  },
  edit: {
    title: "Aanpassen profiel gegevens",
    info: "Voer je volledige naam in",
    givenName: "Je voornaam",
    familyName: "Je achternaam",
    update: "Verstuur",
    cancel: "Annuleer",
    updated: "Je profiel is bijgewerkt.",
    back: "/profile"
  },
  security: {
    title: "Beveliging",
    subTitle:
      "We ondersteunen de volgende aanmeldingsopties voor Mijn SURFconext:",
    usePassword: "Wachtwoord",
    notSet: "Niet ingesteld",
    useMagicLink: "Email magic link naar",
    rememberMe: "Onthoud dit apparaat",
    rememberMetrue: "Ja",
    rememberMefalse: "Nee"
  },
  home: {
    welcome: "Welkom {{name}}",
    profile: "Profiel",
    security: "Beveiliging",
    account: "Account",
    favorites: "Favorieten",
    settings: "Instellingen",
    links: {
      teams: "Teams",
      teamsHref: "https://teams.{{baseDomain}}"
    }
  },
  account: {
    title: "Je my.SURFconext account",
    info: "Je kan ervoor kiezen om je SURFconext-account te verwijderen",
    deleteAccount: "Verwijder mijn account",
    deleteAccountConfirmation:
      "Weet je zeker dat je je my.surfconext account wil verwijderen?"
  },
  password: {
    setTitle: "Wachtwoord instellen",
    updateTitle: "Verander wachtwoord",
    currentPassword: "Huidige wachtwoord",
    newPassword: "Nieuwe wachtwoord",
    confirmPassword: "Bevestig nieuwe wachtwoord",
    setUpdate: "Zet wachtwoord",
    updateUpdate: "Verander wachtwoord",
    cancel: "Annuleer",
    set: "Je wachtwoord is gezet",
    updated: "je wachtwoord is aangepast",
    back: "/security",
    passwordDisclaimer:
      "je wachtwoord moet minimaal 15 karakters zijn of 8 met en dan inclusief een hoofdletter en cijfer.",
    invalidCurrentPassword: "Je huidige wachtwoord is niet correct."
  },
  rememberMe: {
    updated: "Dit apparaat is niet langer onthouden",
    forgetMeTitle: "Onthoud dit apparaat.",
    info:
      "Je huidige apparaat wordt onthouden. Je bent hierdoor automatisch ingelogt op de SURFconext Guest IdP.",
    cancel: "Annuleer",
    update: "Vergeet me",
    forgetMeConfirmation:
      "Weet je zeker dat je dit apparaat niet langer wilt onthouden?",
    forgetMe: "Vergeet dit apparaat"
  },
  footer: {
    tip: "Tip of info nodig?",
    help: "Help & FAQ",
    poweredBy: "Trots aangeboden door",
    surf: "SURF"
  },
  modal: {
    cancel: "Annuleren",
    confirm: "Bevestigen"
  },
  migration: {
    header: "Je SURFconext gastaccount is aangemaakt!",
    info: "je Onegini account is succesvol gemigreerd.",
    info2:
      "Vanaf nu moet je je SURFconext gastaccount gebruiken om inte loggene bij services waar je voorheen Onegini gebruikte.",
    info3:
      "Tip! je SURFconext gastaccount heeft standaard geen wachtwoord nodig (we sturen een magische link naar je e-mail om in te loggen), maar als je wilt, kan je een wachtwoord instellen op het ",
    securityLink: " tabblad Beveiliging.",
    link: "Naar mijn account gegevens"
  },
  migrationError: {
    header: "Account migratie Error",
    header2: "Migratie van Onegini naar SURFconext Guest Account is mislukt",
    info:
      "We kunnen je Onegini-account NIET migreren naar een SURFconext-gastaccount omdat je een e-mail hebt gebruikt die al is gekoppeld aan een andere gastaccount gebruiker.",
    info2:
      "Kopieer de onderstaande link, sluit je browser en probeer het opnieuw met de gekopieerde link met een andere e-mail.",
    info3:
      'Als je wel de eigenaar bent van de e-mail <strong>{{email}}</strong>, kan je naar de <a href="{{url}}">SURFconext Guest IdP</a> gaan en een magic link aanvragen om in te loggen met deze e-mail.'
  }
};
