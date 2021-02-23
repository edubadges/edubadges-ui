import I18n from "i18n-js";

I18n.translations.nl = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Aanvragen voor edubadges",
    collections: "Collecties",
    profile: "Profiel",
  },
  header: {
    logout: "Logout",
    profile: "Mijn profiel",
    permissions: "Mijn permissies",
    nav: {
      badgeclasses: "Badge classes",
      manage: "Beheer",
      users: "Gebruikers"
    },
  },
  login: {
    title: "Never stop learning",
    loginToEnrol: "Login om deze edubadge aan te vragen",
    destination: "Wat zou je willen doen?",
    description:
      "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis heeft verworven. Edubadges kunnen worden uitgereikt voor zowel geaccrediteerd onderwijs als extracurriculaire activiteiten.",
    student: {
      title: "<strong style='font-size: 38px'>C</strong>ollect",
      subtitle: "De backpack is de plek om  edubadges te ontvangen en verzamelen",
      noEduId: "Een eduID is nodig om je backpack aan te maken en te gebruuken. Het maken van een eduID duurt minder dan 30 seconden.",
      action: "Open je backpack",
    },
    catalog: {
      title: "<strong style='font-size: 38px'>B</strong>rowse",
      subtitle: "Meer dan 13000 eduBadges zijn gemaakt door de instellingen.",
      info: "",
      beta: "Beta",
      action: "Open catalogus",
    },
    teacher: {
      title: "<strong style='font-size: 38px'>A</strong>ward",
      subtitle: "Ken edubadges toe aan je studenten, de micro credentials van de toekomst.",
      action: "Open het issuer portaal",
      accountCreation: {
        askAccount: "De issuer portaal is alleen beschikbaar op uitnodiging. Als je binnen wilt komen, maar nog geen toegang hebt, neem dan contact op met je beheerder bij jouw instelling.",
      },
      byInviteOnly: "Alleen op uitnodiging"
    },
    createEduId: {
      welcome: "Welkom bij je edubadges backpack",
      awarded: "We hebben je je eerste edubadge toegekend 😀",
      info: "Je kunt nu edubadges in je backpack ontvangen.",
    },
  },
  searchPlaceholder: "Zoek...",
  authError: {
    title: "Sorry, je hebt geen toegang",
    adminEmail: "Indien je wilt kan je toegang tot deze dienst vragen aan je instellingsadmin via dit e-mailadres: {{email}}",
    tip: "TIP",
    code: {
      "1": "Een onverwachte fout is opgetreden. Neem contact op met support@edubadges.nl voor ondersteuning.",
      "2": "Toegang tot de edubadges issuer portaal is alleen mogelijk met een geldige uitnodiging. We kunnen je nu dus niets laten zien."
    }
  },
  profile: {
    profile: "Profiel",
    name: "Naam",
    validatedName: "Bevestigde naam",
    primary: "Primair e-mailadres",
    emails: "E-mailadressen",
    email: "E-mailadres",
    makePrimary: "Maak primair",
    memberSince: "Lid sinds",
    memberSinceDate: "{{date}} om {{hours}}:{{minutes}}",
    makePrimaryConfirmation: "Weet je zeker dat je dit e-mailadres primair wilt maken?",
    addEmail: "Voeg e-mailadres toe",
    addEmailInfo: "Je ontvangt een e-mail met een link om je e-mailadres te verifiëren.",
    unverified: "Niet geverifieerd",
    validatedByYourInstitution: "Geleverd door je instelling",
    validatedByEduId: "Geleverd door eduID",
    permissionsHeader: "Jouw gegeven akkoordverklaring(en)",
    permissionsInfo: "Je kan je gegeven akkoordverklaring(en) intrekken.",
    noPermissions: "Er zijn op dit moment geen kennisinstellingen waar je een akkoordverklaring aan hebt gegeven.",
    consentWithdrawn: "Akkoordverklaring voor instelling {{institution}} ingetrokken.",
    deleteHeader: "Je edubadges edubadges account verwijderen",
    deleteInfo1: "Je kunt je edubadges account verwijderen als je dat wilt.",
    deleteInfo2: "Wees je dan wel bewust dat hierna al je edubadges niet meer gevalideerd kunnen worden.",
    deleteInfo3: "Het verwijderen van je edubadges account betekent overigens niet dat je eduID ook verwijderd wordt.",
    deleteInfo4: "Om het proces van het verwijderen van je edubadges account te voltooien, moet je je browser sluiten nadat je account is verwijderd.",
    submit: "Voeg toe",
    deleteEmail: "Verwijder dit e-mailadres",
    deleteEmailConfirmation: "Weet je zeker dat je dit e-mailadres wilt verwijderen?",
    delete: "Verwijder",
    account: "Account",
    eduid: "#eduid",
    accountInfo: "Als je je account verwijdert zullen al je edubadges ongeldig worden.",
    deleteAccount: "Verwijder mijn backpack",
    deleteAccountConfirmation: "Weet je zeker dat je je backpack wilt verwijderen?",
  },
  modal: {
    cancel: "Annuleer",
    confirm: "Bevestig",
  },
  backpack: {
    title: "Behaalde edubadges",
  },
  notFound: {
    main: "Edubadge niet gevonden",
    publicBadge: "Deze edubadge is niet meer publiek zichtbaar of is ingetrokken.",
    issuer: "Deze issuer is verwijderd."
  },
  teacher: {
    sidebar: {
      filterBadges: "Filter badge classes",
      filterUsers: "Filter gebruikers",
      filters: {
        faculties: "Issuer groepen",
        issuers: "Issuers",
        roles: "Rollen (hoogste)",
        show_all: "Toon meer",
        show_less: "Toon minder",
      },
    },
    breadcrumb: {
      back: "Terug",
    },
    name: "Naam",
    nameEmail: "Naam/E-mailadres",
    badgeclasses: {
      title: "Badge classes",
      badges: "Edubadges",
      noBadges: "(Nog geen edubadges uitgegeven)",
      badgesCount: "{{count}} Edubadges uitgegeven",
      requestedBadges: "Open aanvragen",
      noRequestedBadges: "Geen open aanvragen",
      requestedBadgesCount: "{{count}} Open aanvragen",
      created: "Datum gecreëerd",
      recipients: "Ontvangers",
      enrollments: "Open aanvragen",
      studyLoad: "Studielast",
      ects: "{{value}} ECTS",
      hours: "{{value}} uren",
      canAward: "Badge classes die je kunt uitreiken",
      allBadges: "Alle badge classes",
      mostRecent: "Meest recent",
      mostAwarded: "Hoogste aantal toegekend",
    },
    issuers: {
      title: "Issuers",
    },
    faculties: {
      title: "Issuer groepen",
    },
    badgeRevoked: {
      revoke: "Trek edubadge in",
    },
    roles: {
      title: "Rollen (hoogste)"
    },
    users: {
      title: "Gebruikers"
    }
  },
  student: {
    enroll: "Aanvragen",
    enrolled: "Aangevraagd",
    withdraw: "Aanvraag intrekken",
    flash: {
      enrolled: "Successvol een aanvraag gedaan voor deze edubadge: {{name}}.",
      published: "Deze edubadge is nu publiek zichtbaar gemaakt. Je kunt deze nu delen met anderen.",
      private: "Deze edubadge is nu privé gemaakt. Je kunt deze niet langer delen met anderen.",
      deleted: "Deze edubadge is verwijderd. Je kunt deze niet langer downloaden of delen met anderen.",
      accepted: "Deze edubadge is geaccepteerd. Je kan deze nu delen met anderen.",
      claimed: "Deze edubadge is succesvol aangevraagd.",
      withdrawn: "Aanvraag teruggetrokken."
    },
    enrollments: "Aangevraagde edubadges",
    badges: "Jouw edubadges",
    deleteBadge: "Weiger deze edubadge",
    acceptBadge: "Accepteer deze edubadge",
    share: "Deel",
    copyUrl: "Kopieer URL",
    shareYourBadge: "Deel jouw edubadge",
    shareYourBadgeQuestion: "Jouw publieke edubadge URL is voor iedereen toegankelijk",
    badgeRevoked: "Deze edubadge is ingetrokken. Je ziet deze nog wel, maar deze edubadge kan je niet langer delen",
    badgeExpired: "Deze edubadge is verlopen. Je ziet deze nog wel, maar deze edubadge kan je niet langer delen",
    privateBadge: "Privé edubadge",
    publicPrivate: "Je edubadge staat op privé, alleen jij kan deze edubadge zien en downloaden.",
    publicPrivatePublic: "Je edubadge staat niet op privé, iedereen met de publieke link kan deze edubadge zien en downloaden.",
    publicPrivateRejected: "Voordat je deze edubadge publiek zichtbaar kan maken, moet je deze edubadge eerst accepteren.",
    revoked: "Deze edubadge is ingetrokken door de uitgever",
    revokedWithReason: "Deze edubadge is ingetrokken door de uitgever met als reden: '{{revocationReason}}'",
    confirmation: {
      publish: "Maak deze edubadge publiekelijk zichtbaar",
      private: "Maak deze edubadge privé",
      publishConfirmation: "Weet je zeker dat je deze edubadge publiek zichtbaar wilt maken?<b/><br/>Als je deze edubadge publiek maakt, wordt je gevalideerde naam <strong>{{name}}</strong> weergegeven in het validatiegedeelte van de openbare badge-webpagina.",
      privateConfirmation: "Weet je het zeker dat je deze edubadge privé wilt maken",
      deleteBadgeConfirmation: "Weet je het zeker dat je deze edubadge wilt weigeren?",
      acceptBadgeConfirmation: "Weet je het zeker dat je deze edubadge wilt accepteren?",
    },
    validation: {
      loading: "Edubadge wordt gevalideerd...",
      valid: "Geldige edubadge",
      invalid: "Ongeldige edubadge",
      validatedName: "Gevalideerde naam van de edubadge ontvanger: <strong>{{name}}</strong>"
    }
  },
  badgeRequests: {
    none: "Je hebt geen openstaande edubadge aanvragen op dit moment. "
  },
  manage: {
    tabs: {
      institution: "Onderwijsinstelling",
      issuers: "Issuers",
      faculties: "Issuer groepen",
      badgeclasses: "Badge classes",
      badgeclassOverview: "Overzicht",
      userManagement: "Gebruikers beheer",
      enrollments: "Aangevraagd",
      assertions: "Toegekend",
      profile: "Profiel"
    },
    edit: {
      edit: "wijzig",
      institution: "Wijzig onderwijsinstelling",
      faculty: "Wijzig issuer group",
      issuer: "Wijzig issuer",
      badgeclass: "Wijzig badge class",
      save: "Opslaan",
      cancel: "Annuleren",
    },
    delete: {
      delete: "verwijder",
      info: {
        assertionsBlock: {
          faculty: "Issuer group bevat badges die niet ingetrokken zijn en kan niet verwijderd worden.",
          issuer: "Issuer bevat badges die niet ingetrokken zijn. De issuer kan daarom niet verwijderd worden.",
          badgeclass: "Er zijn voor deze badge class reeds edubadges uitgereikt. De badge class kan daarom niet verwijderd worden."
        },
        noPermission: {
          institution: "Instellingen kunnen niet verwijderd worden in het issuer portaal.",
          faculty: "Je hebt geen bevoegdheid om deze issuer group te verwijderen.",
          issuer: "Je hebt geen bevoegdheid om deze issuer te verwijderen.",
          badgeclass: "Je hebt geen bevoegdheid om deze badge class te verwijderen."
        }
      },
      flash: "{{type}} is verwijderd",
      institution: {
        name: "Instelling",
        title: "Verwijder instelling",
        question: "Wil je deze instelling echt verwijderen?"
      },
      faculty: {
        name: "issuer group",
        title: "Verwijder issuer group",
        question: "Wil je deze issuer group echt verwijderen? Alle issuers en badge classes worden dan ook verwijderd."
      },
      issuer: {
        name: "Issuer",
        title: "Verwijder issuer",
        question: "Wil je deze issuer echt verwijderen? Alle badge classes worden ook verwijderd."
      },
      badgeclass: {
        name: "Badge class",
        title: "Verwijder badge class",
        question: "Wil je deze badge class echt verwijderen?"
      },
    },
    new: {
      create: "nieuw",
      faculty: "Nieuwe issuer groep maken",
      issuer: "Nieuwe issuer maken",
      badgeclass: "Nieuwe badge class maken",
      save: "Opslaan",
      cancel: "Annuleren",
    },
    award: {
      title: "Ken edubadges direct toe",
      description:
        "Vul het e-mailadres in van de persoon aan wie je de edubadge wilt toekennen. Je zult een bericht krijgen wanneer deze persoon de edubadge accepteert of afwijst.",
      submit: "Ken edubadge toe",
      addAnother: "+ Voeg toe",
      addBulk: "Voeg meerdere tegelijk toe",
    },
    bulkAward: {
      title: "Voeg meerdere ontvangers tegelijk toe",
      description: "Kopieer en plak e-mailadressen in het onderstaande formulierveld",
      submit: "Voeg ontvangers toe",
    },
  },
  footer: {
    poweredBy: "Trots aangeboden door",
    about: "Over edubadges",
    aboutLink: "https://wiki.surfnet.nl/display/Edubadges/edubadges"
  },
  modalTerms: {
    agree: "Akkoord",
    disagree: "Niet akkoord",
    ok: "Sluit",
  },
  error: {
    100: "Je hebt de benodige permissies niet.",
    101: "Kan e-mailadres niet registreren. Het e-mailadres is al in gebruik.",
    102: "Je hebt dit e-mailadres al toegevoegd. Je moet nog verifiëren.",
    103: "Kan niet het primaire e-mailadres verwijderen.",
    104: "Kan niet het enige e-mailadres verwijderen.",
    105: "Verifieer het e-mailadres voordat je het e-mailadres primair maakt.",
    201: "Kan edubadge niet aanvragen: je hebt deze aanvraag reeds gedaan. ",
    202: "Kan edubadge niet aanvragen: je hebt deze edubadge al.",
    203: "Kan edubadge niet aanvragen: je hebt geen studentenaccount.",
    204: "Ongeldige aanvraag-id.",
    205: "Aanvraag niet gevonden.",
    206: "Toegekende aanvragen kunnen niet teruggetrokken worden.",
    207: "Gebruikers kunnen alleen eigen aanvragen terugtrekken.",
    208: "Ontbrekende badge class-id.",
    209: "Kan niet aanvragen.",
    210: "Geen toegang. Controleer je toegekende rol in de badge class die hoort bij deze aanvraag.",
    211: "Aanvraag is al afgewezen.",
    212: "Toegekende aanvragen kunnen niet afgewezen worden.",
    213: "Kan voor deze aanvraag geen edubadge uitgeven, dit is al gebeurd.",
    214: "Je kunt niets aanpassen, er zijn al edubadges uitgegeven binnen deze badge class.",
    215: "Het is niet mogelijk een formele badgeclass aan te maken voor een instelling die geen grondslag heeft voor formele badges.",
    216: "Het is niet mogelijk een informele badgeclass aan te maken voor een instelling die geen grondslag heeft voor informele badges.",
    500: "Kan niet de laatste permissie van de instelling verwijderen.",
    501: "Je kunt maar één uitnodiging hebben per emailadres.",
    502: "Kan de gebruiker niet uitnodigen voor deze entiteit: er is een conflicterende permissie.",
    503: "Kan de gebruiker niet uitnodigen voor deze entiteit: er is een conflicterende uitnodiging.",
    504: "Kan niet een gebruiker van een andere instelling uitnodigen.",
    505: "Deze uitnodiging is voor een student.",
    506: "Deze uitnodiging is voor een docent.",
    507: "Je hebt geen bevoegdheid om een gebruiker voor deze entiteit uit te nodigen.",
    508: "Je kunt geen uitnodiging aanpassen die afgewezen is.",
    509: "Geen geldig e-mailadres.",
    510: "Je hebt dit e-mailadres meerdere keren toegevoegd.",
    601: "Geen toegang. Controleer je permissie in deze issuer.",
    701: "Ongespecifieerde share provider.",
    702: "Ongeldige share provider.",
    801: "Kan grading table URL niet aanpassen, er zijn al edubadges uitgegeven.",
    802: "Kan BRIN code niet aanpassen, er zijn al edubadges uitgegeven.",
    902: "Dit is geen geldige URL of het formaat van de afbeelding klopt niet.",
    903: "Dit veld is verplicht.",
    904: "Geen bestand gekozen.",
    905: "Invullen van criteria of van criteria URL is verplicht.",
    906: "Vul een getal in voor studiebelastingsuren of verwijder deze rubriek.",
    909: "Vul de opleidingscode of verwijder deze rubriek.",
    907: "Dit is een gereserveerde naam voor badgeclasses",
    908: "Kan een Issuer met deze naam niet aanmaken in deze Issuer group. Er bestaat er al een met dezelfde naam.",
    910: "Invullen van narratief of van URL is verplicht.",
    911: "Kan een Badgeclass met deze naam niet aanmaken in deze Issuer. Er bestaat er al een met dezelfde naam.",
    unexpected: "Oeps, er is iets totaal onverwachts en onverklaarbaars gebeurd.",
    description: "Een onverwachte fout is opgetreden. Probeer het opnieuw of neem contact op met support@edubadges.nl voor ondersteuning.",
    close: "Sluit"
  },
  inviteUsers: {
    addUser: {
      title: "Voeg gebruiker toe",
      description: "Vul het e-mailadres in van de personen die je wilt uitnodigen.",
      success: "Gebruiker succesvol uitgenodigd",
    },
    cancel: "Annuleer",
    inviteStatus: "Status",
    sent: "Uitnodiging verstuurd",
    accepted: "Geaccepteeerd",
    flash: {
      confirm: "{{emails}} succesvol uitgenodigd"
    }
  },
  editUsers: {
    institutionPermissions: "Permissies op {{instance}} niveau",
    user: {
      header: "Gebruiker",
    },
    headerControl: "Gebruikers die je kunt beheren in",
    roles: {
      institution_staff: "Instellingsadmin",
      issuer_group_staff: "Issuer group admin",
      issuer_staff: "Issuer admin",
      badge_class_owner: "Badge class admin",
      badge_class_editor: "Badge class editor",
      badge_class_awarder: "Badge class awarder",
      viewer: "Badge raadpleger",
    },
    flash: {
      makeUserInstitutionAdmin: "{{name}} heeft de instellingsadmin-rechten gekregen",
      removeUserInstitutionAdmin: "De instellingsadmin-rechten zijn verwijderd van {{name}}",
      makeUserIssuerGroupAdmin: "{{name}} heeft de issuer group admin rechten gekregen",
      removeUserIssuerGroupAdmin: "De issuer group admin rechten zijn verwijderd van {{name}}",
      makeUserIssuerAdmin: "{{name}} heeft de issuer admin rechten gekregen",
      removeUserIssuerAdmin: "De issuer admin rechten zijn verwijderd van {{name}}",
      makeUserBadgeClassAdmin: "{{name}} heeft badge class admin rechten gekregen",
      removeUserBadgeClassAdmin: "De badge class admin rechten zijn verwijderd van {{name}}",
      makeUserBadgeClassEditor: "{{name}} heeft badge class editor rechten gekregen",
      removeUserBadgeClassEditor: "De badge class editor rechten zijn verwijderd van {{name}}",
      makeUserBadgeClassAwarder: "{{name}} heeft badge class awarder rechten gekregen",
      removeUserBadgeClassAwarder: "De badge class awarder rechten zijn verwijderd van {{name}}",
      removeUserBadgeClassRole: "De badge class rechten zijn verwijderd van {{name}}",
      invite: "Uitnodiging is succesvol verwijderd.",
      removed: "Rechten zijn succesvol verwijderd."
    },
    institution: {
      admin: "Instellingsadmin",
      header: "Instelling",
      allRights: "Instellingsadmin",
      noRights: "Geen rechten",
      permissions: "Permissies op instellingsniveau",
      makeUserInstitutionAdmin: "Ken gebruiker {{name}} instellingsadmin-rechten toe",
      makeUserInstitutionAdminQuestion: "Weet je het zeker dat je {{name}} instellingsadmin wilt maken?",
      removeUserInstitutionAdmin: "Verwijder de instellingsadmin-rechten van {{name}}",
      removeUserInstitutionAdminQuestion: "Weet je het zeker dat je de instellingsadmin-rechten van {{name}} wilt verwijderen?",
    },
    faculty: {
      admin: "Issuer group admin",
      header: "Issuer group",
      allRights: "Issuer group admin",
      permissions: "Permissies op issuer group niveau"
    },
    issuer: {
      admin: "Issuer admin",
      header: "Issuer",
      allRights: "Issuer admin",
      permissions: "Permissies op issuer niveau"
    },
    badgeclass: {
      header: "Badge class",
      issuedBy: "Uitgegeven door",
      badgeclassOwner: "Admin",
      badgeclassEditor: "Editor",
      badgeclassAwarder: "Awarder",
      owner: "Admin",
      editor: "Editor",
      awarder: "Awarder",
      switchToOwner: "Permissie succesvol aangepast naar badge class admin.",
      switchToEditor: "Permissie succesvol aangepast naar badge class editor.",
      switchToAwarder: "Permissie succesvol aangepast naar badge class awarder.",
      permissions: "Permissies op badge class niveau"
    },
    permissions: {
      header: "Jouw Permissies",
      headerUser: "Permissies voor",
      allRights: "Alle rechten",
      institutionAllRights: "(vanwege instellingsadmin)",
      issuerGroupAllRights: "(vanwege issuer group admin)",
      issuerAllRights: "(vanwege issuer admin)",
      addPermissions: "Voeg permissies toe",
      remove: {
        institution: "Weet je zeker dat je de instellingsadmin-rechten wilt verwijderen?",
        faculty: "Weet je zeker dat je de issuer group rechten wilt verwijderen?",
        issuer: "Weet je zeker dat je de issuer-rechten wilt verwijderen?",
        badgeclass: "Weet je zeker dat je deze rechten wilt verwijderen?"
      },
      removePermissions: "Verwijder permissies",
      setInstitutionAdmin: "Maak gebruiker instellingsadmin",
      removeInstitutionAdmin: "Verwijder instellingsadmin",
      inviteNewUser: "Nodig nieuwe gebruiker uit"
    },
    usersPermissions: "Gebruikers met permissies",
    modal: {
      add: 'Voeg toe'
    },
    role: "Rol",
  },
  models: {
    inviteUsers: {
      email: "e-mailadres"
    },
    editUsers: {
      memberSince: "Lid sinds",
      email: "e-mailadres",
      role: 'Rol',
      notes: 'Commentaar',
      badgeclass: "Selecteer een badge class",
      issuerGroup: "Selecteer een issuer group",
      issuer: "Selecteer een issuer",
    },
    institution: {
      created: "Aangemaakt",
      admin: "Admin",
      brin: "BRIN code",
      description: "Over deze instelling",
      description_english: "Beschrijving in het Engels",
      description_dutch: "Beschrijving in het Nederlands",
      grading_table: "Grading table",
      image: "Logo",
      name: "Naam",
    },
    faculty: {
      created: "Aangemaakt",
      admin: "Admin",
      description: "Over deze issuer groep",
      description_english: "Beschrijving in het Engels",
      description_dutch: "Beschrijving in het Nederlands",
      name: "Naam",
    },
    issuer: {
      description: "Over deze issuer",
      description_english: "Beschrijving in het Engels",
      description_dutch: "Beschrijving in het Nederlands",
      email: "Contact e-mailadres",
      created: "Aangemaakt",
      admin: "Admin",
      email_header: "Contact",
      url_header: "Website",
      image: "Logo",
      name: "Naam",
      url: "Website URL",
      faculty: "Groep",
      gradingTable: "Instelling grading table URL",
      institutionName: "Instelling naam",
      institutionIdentifier: "Instelling identifier"
    },
    badgeclass: {
      issuer: "Issuer",
      image: "Edubadge afbeelding",
      created: "Aangemaakt",
      issuedBy: "Uitgegeven door",
      admin: "Admin",
      alignment: "Gerelateerd onderwijskundig raamwerk",
      alignmentName: "Naam",
      alignmentFramework: "Raamwerk",
      alignmentUrl: "URL",
      alignmentCode: "Code",
      alignmentDescription: "Omschrijving",
      number: "Aantal",
      name: "Naam",
      description: "Beschrijving",
      criteria_text: "Aan welke criteria moet je voldoen om in aanmerking te komen voor deze edubadge?",
      criteria_url: "Of geef een link naar de criteria of meer informatie",
      criteria_url_value: "Link naar de criteria en meer informatie:",
      directAward: "Direct uitreiken",
      inviteEnrollements: "Nodig iemand uit om deze edubadge aan te vragen",
      expiresAfter: "Verloopt na",
      expiresAfterOption: "Na",
      expiresAfterNever: "Nooit",
      expiresAfterValue: "{{nbr}} weken",
      expireSettings: "Standaard verloop setting",
      language: "Taal van het onderwijs",
      isPrivate: "Private",
      learningOutcome: "Leeruitkomst",
      studyLoad: "Studielast",
      ects: {
        creditPoints: "Studiepunten (ECTS)",
        hours: "Uren"
      },
      ectsLong: "European Credit Transfer and Accumulation System",
      typeOfStudyLoad: "Soort studielast",
      eqf: "NLQF niveau",
      educationProgramIdentifier: "ISAT",
      educationProgramIdentifierLong: "Opleidingscode",
      notSet: "-",
      expirationPeriods: {
        days: "Dagen",
        weeks: "Weken",
        months: "Maanden",
        years: "Jaren",
      },
      headers: {
        basicInformation: "Basisinformatie",
        earningCriteria: "Criteria om in aanmerking te komen voor deze edubadge",
        additionalSections: "Extra toevoegingen",
        educationalIdentifiers: "Opleidingscode",
        studyLoad: "Studielast",
        alignment: "Gerelateerd onderwijskundig raamwerk"
      },
      addButtons: {
        educationalIdentifiers: "Opleidingscode(s) toevoegen",
        studyLoad: "Studielast toevoegen",
        alignment: "Gerelateerd onderwijskundig raamwerk toevoegen",
      },
      info: {
        educationProgramIdentifier:
          "Raadpleeg <a target='_blank' rel='noreferrer' href='https://apps.duo.nl/MCROHO/pages/zoeken.jsf'>het DUO CROHO register</a> of <a target='_blank' rel='noreferrer' href='https://kwalificaties.s-bb.nl/Lijsten/Groep/14'>de SBB CREBO lijsten</a> als je deze code niet weet.",
        eqf:
          "Kijk op <a target='_blank' rel='noreferrer' href='https://www.nlqf.nl/nlqf-niveaus'>https://www.nlqf.nl/nlqf-niveaus</a> voor een overzicht",
        ects:
          "Alleen hele en halve punten. <br/>Een minimum van 0,5 punt is vereist.",
      },
      publicUrl: "Publieke URL",
      sorting: "Sorteer:"
    },
    badge: {
      emailAddress: "E-mailadres",
      emailAddresses: "Plak e-mailadressen",
      details: "Details",
      recipient: "Ontvanger",
      requested: "Aangevraagd",
      awarded: "Toegekende edubadges",
      awardType: {
        name: "Type aanvraag",
        enrolled: "Aangevraagd",
        directAward: "Direct toegekend"
      },
      associatedInstitution: "Van instelling",
      issuedOn: "Uitgegeven op",
      issuedBy: "Uitgegeven door",
      claimed: "Geclaimd",
      expires: "Verloopt op",
      expiresNever: "Nooit",
      download: "Download",
      share: "Deel",
      status: "Status",
      revoked: "Ingetrokken",
      validUntil: "Geldig tot",
      statuses: {
        new: "Nieuw",
        rejected: "Geweigerd",
        revoked: "Ingetrokken",
        expired: "Verlopen",
        accepted: "Geaccepteerd",
        unaccepted: "In afwachting"
      },
      confirmation: {
        revocationReason: "Reden voor intrekking (verplicht)",
        revoke: "Trek edubadge in",
        revokeConfirmation: "Weet je zeker dat je deze edubadge wilt intrekken?"
      },
      flash: {
        revoked: "De edubadge(s) zijn ingetrokken."
      }
    },
    enrollment: {
      title: "Personen die een edubadge hebben aangevraagd",
      enrolled: "Aangevraagd",
      enrolledOn: "Aangevraagd op",
      deleteEnrollment: "Verwijder aangevraag",
      deleteEnrollmentConfirmation: "Weet je zeker dat je deze aangevraag wilt verwijderen?",
      award: "Ken toe",
      denied: "Geweigerd",
      deny: "Weiger verzoek",
      enrollmentType: {
        name: "Type aanvraag",
        enrolled: "Zelf aangevraagd",
        invited: "Uitgenodigd"
      },
      confirmation: {
        award: "Ken inschrijving toe",
        awardConfirmation: "Weet je zeker dat je deze inschrijving wilt toekennen?",
        deny: "Wijs inschrijving af",
        denyConfirmation: "Weet je zeker dat je deze inschrijving wilt afwijzen?"
      },
      flash: {
        denied: "De inschrijving(en) zijn afgewezen.",
        awarded: "De inschrijving(en) zijn toegekend."
      }
    },
  },
  shareDialog: {
    title: "Deel je edubadge",
    copyPublicUrl: "Als je de link naar de publieke pagina van deze edubadge wilt delen, kan je de link kopiëren",
    copy: "Kopieer de link"
  },
  invites: {
    title: "Nodig iemand uit om zich in te schrijven",
    copyPublicUrl: "Als je de link naar de registratiepagina op je intranet of elektronische leeromgeving wilt plaatsen, kunt je de link kopiëren",
    copyPublicUrlDisabled: "Deze badge class is privé en daarom is de publieke link niet beschikbaar.",
    copyUrl: "Kopieer URL"
  },
  file: {
    noFileSelected: "Geen bestand geselecteerd",
    upload: "Upload afbeelding",
    remove: "Verwijder afbeelding",
    disclaimer:
      "Afbeelding moet van het type .png zijn, tenminste 90x90 pixels bevatten en kleiner zijn dan 256KB.",
  },
  copyToClipboard: {
    copied: "Naar klembord gekopieerd"
  },
  acceptTerms: {
    welcome: "Hoi {{name}}",
    acceptTerms: "Onze Gebruiksvoorwaarden",
    renewTerms: "De edubadge-voorwaarden zijn gewijzigd. Raadpleeg onze nieuwe voorwaarden.",
    teacher: {
      accept: "Ik ga akkoord",
      termsInfo: "Hieronder staan de belangrijkste punten over edubadges en jouw privacy. " +
        " De volledige versie van de Gebruiksvoorwaarden tussen SURF en jou is onder deze tekst te vinden. " +
        "Het aanmaken van het account en het koppelen van dit account aan eduID is noodzakelijk om edubadges " +
        "te kunnen ontvangen. Het account valt onder de verwerkingsverantwoordelijkheid van SURF.",
      termsTitle: "Gebruiksvoorwaarden",
      termsLinkPre: "Door op -Ik ga akkoord- te klikken, ga je akkoord met ",
      termsLink: "de volledige Gebruiksvoorwaarden",
      termsLinkPost: ".",
      privacyTitle: "Privacy",
      privacyLinkPre: " Voor meer informatie kun je ook onze ",
      privacyLink: "Privacyverklaring",
      privacyLinkPost: "bekijken."
    },
    student: {
      accept: "Ik ga akkoord",
      read: "Ik heb dit gelezen",
      termsInfo: "Hieronder staan de belangrijkste punten over edubadges en jouw privacy. " +
        " De volledige versie van de Gebruiksvoorwaarden tussen SURF en jou is onder deze tekst te vinden. " +
        "Het aanmaken van het account en het koppelen van dit account aan eduID is noodzakelijk om edubadges " +
        "te kunnen ontvangen. Het account valt onder de verwerkingsverantwoordelijkheid van SURF.",
      termsTitle: "Onze Gebruiksvoorwaarden",
      termsLinkPre: "Door op -Ik ga akkoord- te klikken, ga je akkoord met ",
      termsLink: "de volledige Gebruiksvoorwaarden",
      termsLinkPost: ".",
      privacyTitle: "Privacyverklaring",
      privacyLinkPre: " Voor meer informatie kun je ook onze ",
      privacyLink: "Privacyverklaring",
      privacyLinkPost: "bekijken.",
      formalBadges: "",
      informalBadges: "",
      version: "versie ",
      agreedOn: "Akkoord op ",
      readOn: "Gelezen op ",
      withdrawConsent: "intrekken"
    },
    termsBullets: {
      teacher:
        [
          "SURF maakt een account voor je aan op basis van je eduID. Dit account blijft bestaan tot je dit account verwijdert.",
          "SURF verwerkt hiervoor persoonsgegevens: voornaam, achternaam, e-mailadres, instellingsnaam en eduID.",
          "Met vragen over jouw account en/of privacy kun je ons bereiken via support@edubadges.nl."
        ],
      student:
        [
          "SURF maakt een account voor je op basis van je eduID. Dit account blijft bestaan tot je dit account verwijdert.",
          "SURF verwerkt hiervoor persoonsgegevens: voornaam, achternaam, e-mailadres, instellingsnaam en eduID.",
          "Met vragen over jouw account en/of privacy kun je ons bereiken via support@edubadges.nl."
        ]
    },
    noValidInstitution: "Geen geldige instelling",
    noValidInstitutionInfo: {
      student: "De onderwijsinstelling <strong>{{name}}</strong> die gekoppeld is aan je eduID account, heeft de edubadges dienst niet afgenomen.<br/><br/>" +
        "Neem contact op met support@edubadges.nl voor ondersteuning of probeer een andere onderwijsinstelling aan je eduID account te koppelen.",
      teacher: "De onderwijsinstelling <strong>{{name}}</strong> waarmee je via SURFconext ingelogd bent, gebruikt edubadges momenteel niet.<br/><br/>" +
        "Neem contact op met support@edubadges.nl voor ondersteuning of probeer via een andere onderwijsinstelling in te loggen."
    },
    noValidInstitutionInfoNoInstitution: "Je hebt geen geldige onderwijsinstelling gekoppeld aan je account. <br/>" +
      "Om deze dienst te kunnen gebruiken moet je account gekoppeld zijn aan een onderwijsinstelling die de edubadges dienst afneemt.",
    noValidInstitutionInfoForEnrollment: "Onderwijsinstelling {{name}} is niet gekoppeld aan je eduID account. " +
      "Om deze edubadge aan te kunnen vragen zal je eduID account gekoppeld moeten zijn met de onderwijsinstelling: <strong>{{name}}</strong>.<br/><br/>" +
      "Neem contact op met <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> voor ondersteuning of probeer je eduID account te koppelen met {{name}}.",
    goToSurfConext: "Ga door naar eduID",
    multipleValidInstitutions: "Meerdere geldige onderwijsinstellingen",
    multipleValidInstitutionsInfo: "Je hebt meerdere geldige onderwijsinstellingen gekoppeld aan je eduID account.<br/><br/>" +
      "Maak een keuze van welke onderwijsinstelling je edubadges wilt ontvangen.",
    badgeClassEnrollmentTerms: {
      formalBadges: "Formele edubadges - Gelieve kennis te nemen van onze voorwaarden",
      inFormalBadges: "Non-formele edubadges - Gelieve kennis te nemen van onze voorwaarden",
      statementTitle: "Verklaring",
      statementLinkPre: "Je kunt ",
      statementLink: "de volledige verklaring hier ",
      statementLinkPost: "lezen",
      privacyTitle: "Privacy",
      privacyLinkPre: "Je gaat ook akkoord met de ",
      privacyLink: "privacyverklaring.",
      privacyLinkPost: ""
    },
  },
  language: {
    en_EN: "Engels",
    En_En: "Engels",
    nl_NL: "Nederlands",
    Nl_Nl: "Nederlands"
  },
  publicBadge: {
    verification: "Verificatie",
    issuedTo: "Deze edubadge is uitgereikt aan <strong>{{name}}</strong> op {{date}}",
    noValidatedName: "Deze edubadge is uitgereikt aan een gebruiker wiens naam <strong>niet</strong> is gevalideerd door een instelling op {{date}}",
    expires: "Deze edubadge verloopt op {{date}}",
    neverExpires: "Deze edubadge heeft geen expiratie datum.",
    hasExpired: "Deze edubadge is verlopen op {{date}}",
    verify: "Verifieer",
    validations: {
      institution: "Van instelling {{val}}",
      issuedOn: "Uitgereikt op {{val}}",
      issuedBy: "Uitgereikt door {{val}}",
      issuedUsing: "Gebruikt platform {{val}}",
      issuedTo: "Uitgereikt aan <strong>{{val}}</strong>",
      noValidatedName: "ongevalideerde naam",
      claimedOn: "Geaccepteerd op {{val}}",
      expiresOn: "Verloopt op {{val}}",
      never: "nooit",
      verified: "<strong>Gevalideerd!<strong> {{val}}"
    },
    noValidatedNameModal: {
      noLinkedInstitution: "Geen gekoppelde instelling",
      question: "Je eduID account is niet gekoppeld aan een onderwijsinstelling. Dit is vereist om edubadges aan te vragen.<br><br>Druk op <span style='color: #540b6c'>koppel instelling</span> om doorgestuurd te worden naar eduID. Daarna wordt je terug gestuurd naar deze pagina.",
      goToEduID: "Koppel onderwijsinstelling"
    },

  },
  monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
  zeroState: {
    badgeClasses: "Er zijn geen badge classes voor issuer {{name}}.",
    issuers: "Er zijn geen issuers voor {{name}}.",
    faculties: "Er zijn geen issuer groups voor instelling {{name}}.",
    users: "Er zijn geen gebruikers voor instelling {{name}}.",
    assertions: "Er zijn geen uitreikingen voor edubadge {{name}}.",
    enrollments: "Er zijn geen aanvragen voor edubadge {{name}}.",
    permissions: "Er zijn geen permissies voor deze gebruiker {{entity}} niveau.",
    selfPermissions: "Deze gebruiker heeft geen permissies op {{entity}} niveau.",
    userPermissions: "Deze gebruiker heeft geen permissies op {{entity}} niveau."
  },
  userManagement: {
    permissions: "Permissies voor {{name}}",
    institution_staff: "institution staff",
    issuer_group_staff: "issuer group staff",
    issuer_staff: "issuer staff",
    badge_class_staff: "badge class staff",
    user_provisionment: "uitnodigingen gebruikers"
  },
  user: {
    home: "Home",
    permissions: "Je permissies",
    banner: "Hallo {{firstName}} {{lastName}}",
    profile: "Profiel",
    loggedIn: "Je bent momenteel ingelogd met je instellingsaccount, via SURFconext"
  },
  placeholders: {
    institution: {
      name: "(Verplicht veld) Bijv. Universiteit van Harderwijk",
      brin: "(Verplicht veld) Basisregistratie Instellingen - BRIN",
      gradingTable: "URL van de grading table",
      description: "(Verplicht veld) Bijv. De Universiteit van Harderwijk is gesticht in 1977."
    },
    faculty: {
      name: "(Verplicht veld) Bijv. Geschiedenis",
      description: "(Verplicht veld) Bijv. Alle issuers van de faculteit Geschiedenis"
    },
    issuer: {
      name: "(Verplicht veld) Bijv. Economische en Sociale geschiedenis",
      description: "(Verplicht veld) Bijv. Economische en sociale geschiedenis houdt zich bezig met langetermijn ontwikkelingen in de wereldeconomie en samenlevingen, van de late Middeleeuwen tot nu.",
      email: "(Verplicht veld) Bijv. john.doe@example.com",
      url: "(Verplicht veld) Bijv. https://universiteitvanharderwijk.nl"
    },
    badgeClass: {
      name: "(Verplicht veld) Bijv. Geschiedenis van de middeleeuwen",
      description: "(Verplicht veld) Bijv. Een overzicht van de geschiedenis vanaf de late oudheid tot de vijftiende eeuw.",
      learningOutcome: "Bijv. Je bent in staat antieke bronnen, maar ook moderne teksten, te lezen en interpreteren en hebt zo een overzicht van alle belangrijke ontwikkelingen.",
      criteriaText: "Bijv. online multiple choice tentamen",
      criteriaUrl: "Bijv. https://universiteitvanharderwijk.nl/geschiedenis/criteria",
      studyLoad: "Bijv. 120",
      educationProgramIdentifier: "Bijv. 12111990",
      alignmentName: "Bijv. Geschiedenis",
      alignmentFramework: "Bijv. ESCO",
      alignmentDescription: "Bijv. De tak van wetenschap die aan mensen gerelateerde gebeurtenissen uit het verleden bestudeert, analyseert en beschrijft.",
      alignmentUrl: "http://data.europa.eu/esco/skill/2b22f3b1-5de4-43f9-b6d1-b20f65871268",
      alignmentCode: "2b22f3b1-5de4-43f9-b6d1-b20f65871268"
    },
    permissions: {
      notes: "Bijv. waarom heb je permissies gegeven?"
    },
    userManagement: {
      email: "Bijv. john.doe@example.com"
    }
  },
  eye: {
    awardView: "Ga naar de Award view",
    adminView: "Ga naar de Admin view"
  },
  studentEnroll: {
    confirmation: {
      title: "Aanvragen",
      question: "Weet je zeker dat je de edubadge <strong>{{name}}</strong> wil aanvragen?"
    }
  },
  terms: {
    overviewTitle: "Overzicht van alle voorwaarden",
    termsTitle: "Gebruiksvoorwaarden",
    privacyPolicyTitle: "Privacyverklaring",
    student: {
      serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-agreement-nl.md",
      termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-terms-nl.md",
      privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-statement-nl.md",
    },
    teacher: {
      serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-agreement-nl.md",
      termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-terms-nl.md",
      privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-statement-nl.md",
    }
  },
  tooltips: {
    // If you don't want a tooltip to be displayed, just comment out (or delete) the line (like this line;-)
    badgeClassImage: "badgeClassImage",
    badgeClassExpireSettings: "After this period badges will expiry and will be no longer valid. " +
      "See the <a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/Edubadges/Edubadges+Example+BadgeClass\">wiki</a> for more explanation.",
    badgeClassName: "badgeClassName",
    badgeClassDescription: "badgeClassDescription",
    badgeClassLanguageOfInstruction: "badgeClassLanguageOfInstruction",
    badgeClassLearningOutcome: "badgeClassLearningOutcome",
    badgeClassLearningIssuer: "badgeClassLearningIssuer",
    badgeClassIsPrivate: "Indien aangevinkt zal deze badge-klasse niet in de catalogus verschijnen. Houd er rekening mee dat privébadge-klassen geen assertions kunnen hebben.",
    badgeClassCriteriaRequirements: "badgeClassCriteriaRequirements",
    badgeClassCriteriaUrl: "badgeClassCriteriaUrl",
    badgeClassTypeOfStudeLoad: "badgeClassTypeOfStudeLoad",
    badgeClassStudyLoadNumber: "badgeClassStudyLoadNumber",
    badgeClassStudyLoadEcts: "badgeClassStudyLoadEcts",
    badgeClassProgrammeIdentifier: "badgeClassProgrammeIdentifier",
    badgeClassNLQFLevel: "badgeClassNLQFLevel",
    badgeClassRelatedFrameworkName: "badgeClassRelatedFrameworkName",
    badgeClassRelatedFrameworkFramework: "badgeClassRelatedFrameworkFramework",
    badgeClassRelatedFrameworkURL: "badgeClassRelatedFrameworkURL",
    badgeClassRelatedFrameworkCode: "badgeClassRelatedFrameworkCode",
    badgeClassRelatedFrameworkDescription: "badgeClassRelatedFrameworkDescription",
    facultyName: "facultyName",
    facultyDescriptionEn: "facultyDescriptionEn",
    facultyDescriptionNl: "facultyDescriptionNl",
    issuerFaculty: "issuerFaculty",
    issuerImage: "issuerImage",
    issuerName: "issuerName",
    issuerDescriptionEn: "issuerDescriptionEn",
    issuerDescriptionNl: "issuerDescriptionNl",
    issuerURL: "issuerURL",
    issuerEmail: "issuerEmail",
    institutionImage: "institutionImage",
    institutionName: "institutionName",
    institutionDescriptionEn: "institutionDescriptionEn",
    institutionDescriptionNl: "institutionDescriptionNl",
    institutionBrin: "institutionBrin",
    institutionGradingTable: "institutionGradingTable",
  },
  badgeOverview : {
    faculty: "Faculteit",
    issuer: "Vakgroup",
  }

};
