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
    loginToEnrol: "Login to enroll for this Badge",
    description:
      "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis bezit. Edubadges kunnen worden uitgereikt voor zowel extracurriculaire activiteiten als geaccrediteerd onderwijs.",
    student: {
      title: "Mijn Backpack",
      subtitle: "Ontvang en deel edubadges",
      action: "Open je Backpack",
      button: "Log in met je eduID",
      accountCreation: {
        askAccountNo: "Nog <strong>geen</strong> Backpack?",
        startAccount: "Klik hier",
      },
    },
    teacher: {
      title: "Issuers portaal",
      subtitle: "Ken edubadges toe aan studenten",
      action: "Ga naar het Issuers portaal",
      button: "Log in via SURFconext",
      accountCreation: {
        askAccount: "Nog <strong>geen</strong> toegang?",
        startAccount: "Neem contact op met je instellingsbeheerder",
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
      welcome: "Welkom bij je Backpack",
      awarded: "We hebben u uw eerste edubadge toegekend 😀",
      infoStep2:
        "Om edubadges verder te kunnen ontvangen, moet u <strong> uw identiteit verifiëren </strong> bij uw onderwijsinstellingen. U kunt dit bewijzen door op de knop te klikken en u aan te melden bij uw instelling met uw instellingsaccount.",
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
      back: "terug",
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
      enrolled: "Successfully enrolled for badge {{name}}.",
      published: "This badge has been made public. You now can download and share this badge",
      private: "This badge has been made private. You can no longer download or share this badge",
      deleted: "This badge has been deleted. You can no longer download or share this badge",
      claimed: "Successfully claimed this badge."
    },
    enrollments: "Requested badges",
    badges: "Your badges",
    deleteBadge: "Delete this badge",
    share: "Share",
    copyUrl: "Copy URL",
    shareYourBadge: "Share your badge",
    shareYourBadgeQuestion: "Your public badge URL is accessible for everyone",
    badgeRevoked: "This badge has been revoked. You can see the details, but this badge can no longer be shared or downloaded",
    privateBadge: "Private badge",
    publicPrivate: "When your badge is private, only you can see it and download it",
    confirmation: {
      publish: "Make this badge public accessible",
      private: "Make this badge private",
      deleteBadge: "Delete badge",
      publishConfirmation: "Are you sure you want to make this badge public?",
      privateConfirmation: "Are you sure you want to make this badge private?",
      deleteBadgeConfirmation: "Are you sure you want to delete this badge?",
    },
    validation: {
      loading: "Validating badge...",
      valid: "Valid badge",
      invalid: "Invalid badge"
    }
  },
  manage: {
    tabs: {
      institution: "instituut",
      issuers: "Issuers",
      faculties: "Groepen",
      badgeclasses: "Badgeclasses",
      badgeclassOverview: "Overzicht",
      userManagement: "Gebruikers beheer",
      enrollments: "Ingeschreven",
      assertions: "Toegekend",
    },
    edit: {
      edit: "edit",
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
    unexpected: "Unexpected exception occurred."
  },
  editUsers: {
    institutionPermissions: "Permissions on institution level",
    institution: {
      header: "Institution",
      allRights: "Institution Admin",
      noRights: "No rights"
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
      owner: "Badgeclass owner",
      editor: "Badgeclass editor",
      awarder: "Badgeclass awarder",
    },
    permissions: {
      addPermissions: "Add permissions",
      removePermissions: "Remove permissions",
      setInstitutionAdmin: "Make user institution admin",
      removeInstitutionAdmin: "Remove user institution admin"
    },
    modal: {
      add: 'add'
    },
    role: "Role",
  },
  models: {
    editUsers: {
      memberSince: "Member since",
      email: "email",
      role: 'Role',
      notes: 'Notes',
      badgeClass: "Select a badgeclass",
      issuerGroup: "Select an issuer group",
      issuer: "Select an issuer",
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
      ects: "Credit points",
      ectsLong: "European Credit Transfer and Accumulation System",
      eqf: "NLQF niveau",
      educationProgramIdentifier: "ISAT",
      educationProgramIdentifierLong: "Education Program Identifier",
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
        creditPoints: "Credit Points",
      },
      info: {
        educationProgramIdentifier:
          "Raadpleeg <a target='_blank' rel='noreferrer' href='https://apps.duo.nl/MCROHO/pages/zoeken.jsf'>het DUO CROHO register</a> of <a target='_blank' rel='noreferrer' href='https://kwalificaties.s-bb.nl/Lijsten/Groep/14'>de SBB CREDO lijsten</a> als je deze code niet weet.",
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
      requested: "Requested",
      awarded: "Awarded badges",
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
      share: "Share",
      status: "Status",
      revoked: "Ingetrokken",
      validUntil: "Geldig tot",
      statuses: {
        new: "New",
      },
      confirmation: {
        revocationReason: "Reason for revocation (required)",
        revoke: "Revoke assertion",
        revokeConfirmation: "Are you sure you want to revoke this assertion?"
      },
      flash: {
        revoked: "The assertion(s) have been revoked."
      }
    },
    enrollment: {
      title: "Enrolled persons",
      enrolled: "Enrolled",
      enrolledOn: "Enrolled on",
      deleteEnrollment: "Verwijder assertion",
      deleteEnrollmentConfirmation: "Weet je zeker dat je deze enrollment wilt verwijderen?",
      award: "Award",
      denied: "Denied",
      deny: "Deny request",
      enrollmentType: {
        name: "Enrollment type",
        enrolled: "Self - enrolled",
        invited: "Invited"
      },
      confirmation: {
        award: "Award enrollment",
        awardConfirmation: "Are you sure you want to award this enrollment?",
        deny: "Award enrollment",
        denyConfirmation: "Are you sure you want to deny this enrollment?"
      },
      flash: {
        denied: "The enrollment(s) have been denied.",
        awarded: "The enrollment(s) have been awarded."
      }
    },
  },
  invites: {
    title: "Invite people to enroll",
    copyPublicUrl: "If you want to place the link to the registration page on your intranet or EOL, you can copy the link",
    copyUrl: "Copy URL"
  },
  file: {
    noFileSelected: "Geen bestand geselecteerd",
    upload: "Upload afbeelding",
    remove: "Verwijder afbeelding",
    disclaimer:
      "Afbeelding moet van het type png zijn, tenminste 90x90 pixels en kleiner dan 256KB.",
  },
  copyToClipboard: {
    copied: "Copied to clipboard"
  }
};
