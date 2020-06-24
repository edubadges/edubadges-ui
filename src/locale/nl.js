import I18n from "i18n-js";

I18n.translations.nl = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Edubadge verzoeken",
    collections: "Collecties",
    profile: "Profiel",
  },
  header: {
    logout: "Logout",
    nav: {
      badgeclasses: "Edubadges",
      manage: "Beheer",
      users: "Gebruikers"
    },
  },
  login: {
    title: "Leven lang ontwikkelen",
    loginToEnrol: "Login om deze edubadge aan te vragen",
    destination: "Waar wil je heen?",
    description:
      "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis bezit. Edubadges kunnen worden uitgereikt voor zowel extracurriculaire activiteiten als geaccrediteerd onderwijs.",
    student: {
      title: "Ontvang en deel edubadges",
      subtitle: "(Je hebt een eduID nodig om in te loggen))",
      noEduId: "<sup>*</sup>Als je nog geen eduID hebt, dan helpen we je om er één aan te maken in minder dan 30 sseconden.",
      action: "Open je Backpack",
    },
    teacher: {
      title: "Ken edubadges toe",
      subtitle: "(Toegang wordt verleend door de instellingsbeheerder)",
      action: "Ga naar het Issuers portaal",
      accountCreation: {
        askAccount: "Nog <strong>geen</strong> toegang?",
        startAccount: "Neem contact op met je instellingsbeheerder",
      },
      byInviteOnly: "Alleen op uitnodiging"
    },
    createEduId: {
      logInAccount: "Log in",
      createAccountButton: "Maak een eduID aan",
      back: "Terug",
      title: "Maak een Backpack aan",
      subtitle: "Je hebt een eduID nodig",
      welcome: "Welkom bij je edubadges Backpack",
      awarded: "We hebben je je eerste edubadge toegekend 😀",
      verification: "Verificatie geslaagd!",
      infoStep3: "Je kunt nu edubadges in je Backpack ontvangen.",
      require:
        "Om een edubadges Backpack aan te maken heb je een eduID nodig. Na het aanmaken van een eduID kan je je onderwijsinstelling verifiëren.",
      steps: {
        step1: "Maak een eduID aan",
        step2: "Verifieer bij je instelling",
        step3: "Ontvang & deel edubadges",
      },
    },
  },
  profile: {
    profile: "Profiel",
    name: "Naam",
    primary: "Primair e-mailadres",
    emails: "E-mailadressen",
    email: "E-mailadres",
    makePrimary: "Maak primair",
    makePrimaryConfirmation: "Weet je zeker dat je dit e-maiadres primair wilt maken?",
    addEmail: "Voeg e-mailadres toe",
    addEmailInfo: "Je zult een e-mail ontvangen met een link om je e-mailadres te verifieren.",
    unverified: "Niet geverifieerd",
    validatedByYourInstitution: "Validated by your institution",
    deleteHeader: "Deleting your edubadges backpack",
    deleteInfo: "<p>You can delete your backpack whenever you want.</p><p>Proceed with care, as you will loose all your badges.</p>",
    submit: "Voeg toe",
    deleteEmail: "Verwijder dit e-mailadres",
    deleteEmailConfirmation: "Weet je zeker dat je dit e-mailadres wilt verwijderen?",
    delete: "Verwijder",
    account: "Account",
    eduid: "#eduid",
    accountInfo: "Als je je account verwijderd zullen al je edubadges ongeldig worden.",
    deleteAccount: "Verwijder mijn account",
    deleteAccountConfirmation:
      "Weet je zeker dat je je edubadges account wilt verwijderen?",
  },
  modal: {
    cancel: "Annuleer",
    confirm: "Bevestig",
  },
  backpack: {
    title: "Behaalde edubadges",
  },
  notFound: {
    main: "404 - Niet gevonden",
  },
  teacher: {
    sidebar: {
      search: "Zoeken",
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
    nameEmail: "Naam/Email",
    badgeclasses: {
      title: "Badgeclasses",
      created: "Datum gecreëerd",
      recipients: "Ontvangers",
      ects: "ECTS-credits",
    },
    issuers: {
      title: "Issuers",
    },
    faculties: {
      title: "Groepen",
    },
    badgeRevoked: {
      revoke: "Verwijder edubadge",
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
      enrolled: "Successvol voor deze edubadge ingeschreven: {{name}}.",
      published: "Deze edubadge is nu publiek gemaakt. Je kunt deze nu downloaden en delen met anderen.",
      private: "Deze edubadge is nu prive gemaakt. Je kunt deze niet langer downloaden of delen met anderen.",
      deleted: "Deze edubadge is verwijderd. Je kunt deze niet langer downloaden of delen met anderen.",
      claimed: "Deze edubadge is succesvol aangevraagd."
    },
    enrollments: "Aangevraagde edubadges",
    badges: "Jouw edubadges",
    deleteBadge: "Verwijder deze edubadge",
    share: "Deel",
    copyUrl: "Kopieer URL",
    shareYourBadge: "Deel jouw edubadge",
    shareYourBadgeQuestion: "Jouw publieke edubadge URL is voor iedereen toegankelijk",
    badgeRevoked: "Deze edubadge is ingetrokken. Je ziet deze nog wel, maar deze edubadge kan je niet langer delen",
    privateBadge: "Prive edubadge",
    publicPrivate: "Wanneer je edubadge prive is gezet, dan kan alleen jij deze edubadge zien en downloaden.",
    confirmation: {
      publish: "Maak deze edubadge publiekelijk beschikbaar",
      private: "Maak deze edubadge prive",
      deleteBadge: "Verwijder edubadge",
      publishConfirmation: "Weet je het zeker dat je deze edubadge publiek wilt maken?",
      privateConfirmation: "Weet je het zeker dat je deze edubadge prive wilt maken",
      deleteBadgeConfirmation: "Weet je het zeker dat je deze edubadge wil verwijderen?",
    },
    validation: {
      loading: "Edubadge wordt gevalideerd...",
      valid: "Geldige edubadge",
      invalid: "Ongeldige edubadge"
    }
  },
  manage: {
    tabs: {
      institution: "Instituut",
      issuers: "Issuers",
      faculties: "Groepen",
      badgeclasses: "Badgeclasses",
      badgeclassOverview: "Overzicht",
      userManagement: "Gebruikers beheer",
      enrollments: "Ingeschreven",
      assertions: "Toegekend",
    },
    edit: {
      edit: "wijzig",
      institution: "Wijzig instituut",
      faculty: "Wijzig groep",
      issuer: "Wijzig issuer",
      badgeclass: "Wijzig badgeclass",
      save: "Opslaan",
      cancel: "Annuleren",
    },
    new: {
      create: "nieuw",
      faculty: "Nieuwe groep maken",
      issuer: "Nieuwe issuer maken",
      badgeclass: "Nieuwe badgeclass maken",
      save: "Opslaan",
      cancel: "Annuleren",
    },
    award: {
      title: "Ken edubadges direct toe",
      description:
        "Vul het e-mailadres in van de persoon aan wie je de edubadge wilt toekennen. Je zult een bericht krijgen wanneer dit is geaccepteerd of afgewezen.",
      submit: "Ken edubadge toe",
      addAnother: "+ Voeg toe",
      addBulk: "Voeg meerdere tegelijk toe",
    },
    bulkAward: {
      title: "Voeg meerdere ontvangers tegelijk toe",
      description: "Copy & paste e-mailadressen in het onderstaande formulierveld",
      submit: "Voeg ontvangers toe",
    },
  },
  footer: {
    tip: "Tips of hulp nodig?",
    help: "Help & FAQ",
    poweredBy: "Trots aangeboden door",
    surf: "SURF",
  },
  error: {
    101: "Kan e-mailadres niet registreren. Het e-mailadres is al in gebruik",
    102: "Je hebt dit e-mailadres al toegevoegd. Je moet nog verifieren",
    103: "Kan niet het primaire e-mailadres verwijderen",
    104: "Kan niet het enige e-mailadres verwijderen",
    105: "Verifieer het e-mailadres voordat je het e-mailadres primair maakt",
    201: "Kan niet enrollen: je bent al enrolled",
    202: "Kan niet enrollen: je hebt deze edubadge al",
    203: "Kan niet enrollen: je hebt geen studentenaccount",
    204: "Ongeldige enrollment-id",
    205: "Enrollment niet gevonden",
    206: "Awarded enrollments kunnen niet teruggetrokken worden",
    207: "Gebruikers kunnen alleen eigen enrollments terugtrekken",
    208: "Missende badgeclass-id",
    209: "Kan niet enrollen",
    210: "Geen toegang. Controleer je assigned role in de Badgeclass die hoort bij deze enrollment",
    211: "Enrollment is al afgewezen",
    212: "Awarded enrollments kunnen niet afgewezen worden",
    601: "Geen toegang. Check je assigned role in de Issuer",
    701: "Ongespecifieerde share provider",
    702: "Ongeldige share provider",
    801: "Kan grading table URL niet aanpassen, er zijn al edubadges uitgegeven",
    802: "Kan BRIN code niet aanpassen, er zijn al edubadges uitgegeven",
    unexpected: "Oops, er is iets totaal onverwachts en onverklaarbaars gebeurt. Heb je de applicatie stuk gemaakt?"
  },
  inviteUsers: {
    addUser: {
      title: "Voeg gebruiker toe",
      description: "Vul het e-mailadres in van de personen die je wilt uitnodigen voor deze entiteit."
    },
    cancel: "annuleer",
    inviteStatus: "Status",
    sent: "Invite sent",
    accepted: "Accepted"
  },
  editUsers: {
    institutionPermissions: "Permissies op instellings nivo",
    institution: {
      header: "Instelling",
      allRights: "Instellings Admin",
      noRights: "Geen rechten"
    },
    issuerGroup: {
      header: "Issuer Group",
      allRights: "Issuer Group Admin",
    },
    issuer: {
      header: "Issuer",
      allRights: "Issuer Admin",
    },
    badgeClass: {
      header: "Badgeclass",
      badgeclassOwner: "Owner",
      badgeclassEditor: "Editor",
      badgeclassAwarder: "Awarder",
      owner: "owner",
      editor: "editor",
      awarder: "awarder",
    },
    permissions: {
      allRights: "All rights",
      institutionAllRights: "(because Institution Admin)",
      issuerGroupAllRights: "(because Issuer Group Admin)",
      issuerAllRights: "(because Issuer Admin)",
      addPermissions: "Voeg permissies toe",
      removePermissions: "Verwijder permissies",
      removeAdmin: "Weet je zeker dat je de instellings Admin wilt verwijderen?",
      removeIssuerGroupAdmin: "Are you sure you want to remove this issuer group admin?",
      removeIssuerAdmin: "Are you sure you want to remove this issuer admin?",
      removeBadgeClassUser: "Are you sure you want to remove this role?",
      setInstitutionAdmin: "Maak gebruiker instellings Admin",
      removeInstitutionAdmin: "Verwijder instellings Admin",
      inviteNewUser: "Nodig nieuwe gebruiker uit"
    },
    usersPermissions: "Gebruikers met permissies",
    modal: {
      add: 'voeg toe'
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
      badgeClass: "Selecteer een badgeclass",
      issuerGroup: "Selecteer een issuer group",
      issuer: "Selecteer een issuer",
    },
    institution: {
      created: "Vanaf",
      admin: "Admin",
      brin: "BRIN code",
      description: "Beschrijving",
      grading_table: "Grading table URL",
      image: "Logo",
      name: "Naam",
    },
    faculty: {
      created: "Aangemaakt",
      admin: "Admin",
      description: "Beschrijving",
      name: "Naam",
    },
    issuer: {
      description: "Beschrijving",
      email: "Contact e-mailadres",
      created: "Aangemaakt",
      admin: "Admin",
      email_header: "Contact",
      url_header: "Website",
      image: "Logo",
      name: "Naam",
      url: "Website URL",
      faculty: "Groep",
    },
    badgeclass: {
      issuer: "Issuer",
      image: "Badge afbeelding",
      created: "Aangemaakt",
      admin: "Admin",
      alignmentName: "Name",
      alignmentFramework: "Framework",
      alignmentUrl: "URL",
      alignmentCode: "Code",
      amount: "Amount",
      name: "Naam",
      description: "Beschrijving",
      criteria_text: "Wat is benodigd om deze edubadge te verdienen?",
      criteria_url: "Criteria URL",
      criteria_url_value: "Link naar de criteria:",
      directAward: "Direct award",
      inviteEnrollements: "Invite people to enroll",
      expiresAfter: "Verloopt na",
      expiresAfterNever: "Nooit",
      expiresAfterValue: "{{nbr}} weken",
      expireSettings: "Standaard verloop setting",
      language: "Language of instruction",
      learningOutcome: "Leeruitkomst",
      ects: {
        creditPoints: "Studiepunten (ECTS)",
        hours: "Uren"
      },
      ectsLong: "European Credit Transfer and Accumulation System",
      typeOfStudyLoad: "Soort studielast",
      eqf: "NLQF niveau",
      educationProgramIdentifier: "ISAT",
      educationProgramIdentifierLong: "Programme Identifier",
      notSet: "Geen waarde opgegeven",
      expirationPeriods: {
        days: "Dagen",
        weeks: "Weken",
        months: "Maanden",
        years: "Jaren",
      },
      headers: {
        basicInformation: "Basis informatie",
        earningCriteria: "Leer criteria",
        additionalSections: "Extra toevoegingen",
        educationalIdentifiers: "Onderwijsidentificatie",
        studyLoad: "Studiepunten",
        alignment: "Alignment"
      },
      addButtons: {
        educationalIdentifiers: "Add educational identifiers",
        studyLoad: "Add study load",
        alignment: "Add alignment",
      },
      info: {
        educationProgramIdentifier:
          "Raadpleeg <a target='_blank' rel='noreferrer' href='https://apps.duo.nl/MCROHO/pages/zoeken.jsf'>het DUO CROHO register</a> of <a target='_blank' rel='noreferrer' href='https://kwalificaties.s-bb.nl/Lijsten/Groep/14'>de SBB CREBO lijsten</a> als je deze code niet weet.",
        eqf:
          "Check <a target='_blank' rel='noreferrer' href='https://www.nlqf.nl/nlqf-niveaus'>https://www.nlqf.nl/nlqf-niveaus</a> voor een overzicht",
        ects:
          "Alleen hele en halve punten. <br/>Een minimum van 0,5 punt is vereist.",
      },
      publicUrl: "Publieke URL",
    },
    badge: {
      emailAddress: "E-mailadres",
      emailAddresses: "Plak e-mailadressen",
      details: "Details",
      recipient: "Ontvanger",
      requested: "Aangevraagd",
      awarded: "Toegekende edubadges",
      awardType: {
        name: "Award type",
        enrolled: "Enrolled",
        directAward: "Direct award"
      },
      issuedOn: "Uitgegeven op",
      issuedBy: "Uitgegeven door",
      expires: "Expires",
      expiresNever: "Never",
      download: "Download",
      share: "Deel",
      status: "Status",
      revoked: "Ingetrokken",
      validUntil: "Geldig tot",
      statuses: {
        new: "Nieuw",
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
      title: "Ingeschreven personen",
      enrolled: "Ingeschreven",
      enrolledOn: "Ingeschreven op",
      deleteEnrollment: "Verwijder inschrijving",
      deleteEnrollmentConfirmation: "Weet je zeker dat je deze inschrijving wilt verwijderen?",
      award: "Ken toe",
      denied: "Geweigerd",
      deny: "Weiger verzoek",
      enrollmentType: {
        name: "Type inschrijving",
        enrolled: "Zelf ingeschreven",
        invited: "Uitgenodigd"
      },
      confirmation: {
        award: "Ken inschrijving toe",
        awardConfirmation: "Weet je zeker dat je deze inschrijving wilt toekennen?",
        deny: "Wijs inschrijving af",
        denyConfirmation: "Weet u zeker dat u deze inschrijving wilt afwijzen?"
      },
      flash: {
        denied: "De inschrijving(en) zijn afgewezen.",
        awarded: "De inschrijving(en) zijn toegekend."
      }
    },
  },
  invites: {
    title: "Nodig iemand uit om zich in te schrijven",
    copyPublicUrl: "Als u de link naar de registratiepagina op uw intranet of ELO wilt plaatsen, kunt u de link kopiëren",
    copyUrl: "Kopieer URL"
  },
  file: {
    noFileSelected: "Geen bestand geselecteerd",
    upload: "Upload afbeelding",
    remove: "Verwijder afbeelding",
    disclaimer:
      "Afbeelding moet van het type png zijn, tenminste 90x90 pixels en kleiner dan 256KB.",
  },
  copyToClipboard: {
    copied: "Naar klembord gekopieerd"
  }
};
