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
    profile: "Profiel",
    permissions: "Permissies",
    nav: {
      badgeclasses: "Badge classes",
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
      title: "Backpack",
      subtitle: "Ontvang en deel edubadges",
      noEduId: "Als je nog geen eduID hebt, dan helpen we je om er één aan te maken in minder dan 30 sseconden.",
      action: "Login met eduID",
    },
    teacher: {
      title: "Issuer portaal ",
      subtitle: "Ken edubadges toe",
      action: "Login met SURFconext",
      accountCreation: {
        askAccount: "Nog <strong>geen</strong> toegang?",
        startAccount: "Neem contact op met je instellingsbeheerder",
      },
      byInviteOnly: "Alleen op uitnodiging"
    },
    createEduId: {
      welcome: "Welkom bij je edubadges Backpack",
      awarded: "We hebben je je eerste edubadge toegekend 😀",
      info: "Je kunt nu edubadges in je Backpack ontvangen.",
    },
  },
  searchPlaceholder: "Zoek...",
  authError: {
    title: "Sorry, je hebt geen toegang",
    adminEmail: "Indien je wilt kan je toegang tot deze dienst vragen aan je instellings admin <a href='mailto:{{email}}' style='color: black;text-decoration: underline'>via dit e-mailadres</a>",
    tip: "TIP",
    code: {
      "1": "Een onverwachte fout is opgetreden. Neem contact op met <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> voor ondersteuning.",
      "2": "Toegang tot de edubadges Issuer Portal is alleen mogelijk met een geldige uitnodiging.  We kunnen je nu dus niets laten zien."
    }
  },
  profile: {
    profile: "Profiel",
    name: "Naam",
    primary: "Primair e-mailadres",
    emails: "E-mailadressen",
    email: "E-mailadres",
    makePrimary: "Maak primair",
    memberSince: "Lid sinds",
    memberSinceDate: "{{date}} om {{hours}}:{{minutes}}",
    makePrimaryConfirmation: "Weet je zeker dat je dit e-maiadres primair wilt maken?",
    addEmail: "Voeg e-mailadres toe",
    addEmailInfo: "Je zult een e-mail ontvangen met een link om je e-mailadres te verifieren.",
    unverified: "Niet geverifieerd",
    validatedByYourInstitution: "Geleverd door je instelling",
    validatedByEduId: "Geleverd door eduID",
    deleteHeader: "Bezig om je edubadges backpack te verwijderen",
    deleteInfo1: "Je kunt je backpack verwijderen als je dat wilt.",
    deleteInfo2: "Wees je dan wel bewust dat je al je edubadges zult verliezen.",
    deleteInfo3: "Het verwijderen van je edubadges betekent overigens niet dat je eduID ook verwijderd wordt.",
    deleteInfo4: "Om het proces van het verwijderen van je eduBadges-account volledig te voltooien, moet je je browser sluiten nadat je account is verwijderd.",
    submit: "Voeg toe",
    deleteEmail: "Verwijder dit e-mailadres",
    deleteEmailConfirmation: "Weet je zeker dat je dit e-mailadres wilt verwijderen?",
    delete: "Verwijder",
    account: "Account",
    eduid: "#eduid",
    accountInfo: "Als je je account verwijderd zullen al je edubadges ongeldig worden.",
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
    publicBadge: "Deze edubadge is niet meer publiek of is ingetrokken.",
    issuer: "Deze issuer is verwijderd."
  },
  teacher: {
    sidebar: {
      filterBadges: "Filter Badge Classes",
      filterUsers: "Filter Gebruikers",
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
      title: "Badge Classes",
      badges: "Badges",
      noBadges: "(Nog geen edubadges uitgegeven)",
      badgesCount: "{{count}} edubadges uitgegeven",
      created: "Datum gecreëerd",
      recipients: "Ontvangers",
      studyLoad: "Studie belasting",
      ects: "{{value}} ECTS",
      hours: "{{value}} uren",
      canAward: "Edubadges die u kunt uitdelen",
      allBadges: "Alle edubadges"
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
      accepted: "Deze edubadge is geaccepteerd. Je kan deze nu downloaden of delen met anderen.",
      claimed: "Deze edubadge is succesvol aangevraagd."
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
    privateBadge: "Prive edubadge",
    publicPrivate: "Je edubadge staat op prive, alleen jij kan deze edubadge zien en downloaden.",
    publicPrivatePublic: "Je edubadge staat niet op prive, iedereen met de publieke link kan deze edubadge zien en downloaden.",
    publicPrivateRejected: "Voordat je deze edubadge publiek kan maken, moet je deze edubadge eerst accepteren.",
    revoked: "Deze edubadge is ingetrokken door de uitgever",
    revokedWithReason: "Deze edubadge is ingetrokken door de uitgever met als reden: '{{revocationReason}}'",
    confirmation: {
      publish: "Maak deze edubadge publiekelijk beschikbaar",
      private: "Maak deze edubadge prive",
      publishConfirmation: "Weet je zeker dat u deze edubadge publiek wilt maken?<b/><br/>Als je deze edubadge publiek maakt, wordt je gevalideerde naam <strong>{{name}}</strong> weergegeven in het validatiegedeelte van de openbare badge-webpagina.",
      privateConfirmation: "Weet je het zeker dat je deze edubadge prive wilt maken",
      deleteBadgeConfirmation: "Weet je het zeker dat je deze edubadge wil weigeren?",
      acceptBadgeConfirmation: "Weet je het zeker dat je deze edubadge wil accepteren?",
    },
    validation: {
      loading: "Edubadge wordt gevalideerd...",
      valid: "Geldige edubadge",
      invalid: "Ongeldige edubadge",
      validatedName: "Gevalideerde naam van de edubadge ontvanger: <strong>{{name}}</strong>"
    }
  },
  badgeRequests: {
    none: "Je hebt geen openstaande edubadge verzoeken op dit moment. "
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
      profile: "Profiel"
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
    delete: {
      delete: "verwijder",
      info: {
        institution: "Instellingen kunnen niet verwijderd worden in het issuer portaal.",
        faculty: "Faculteit heeft issuers en kan niet verwijderd worden.",
        issuer: "Issuer heeft badge classes en kan niet verwijderd worden.",
        badgeclass: "Badge class heeft assertions en kan niet verwijderd worden."
      },
      flash: "{{type}} is verwijderd",
      institution: {
        name: "Instituut",
        title: "Verwijder instelling",
        question: "Wil je deze instelling echt verwijderen?"
      },
      faculty: {
        name: "Faculteit",
        title: "Verwijder issuergroup",
        question: "Wil je deze issuergroup echt verwijderen?"
      },
      issuer: {
        name: "Issuer",
        title: "Verwijder issuer",
        question: "Wil je deze issuer echt verwijderen?"
      },
      badgeclass: {
        name: "Badge class",
        title: "Verwijder badgeclass",
        question: "Wil je deze badgeclass echt verwijderen?"
      },
    },
    new: {
      create: "nieuw",
      faculty: "Nieuwe issuer groep maken",
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
    poweredBy: "Trots aangeboden door"
  },
  modalTerms: {
    agree: "Akkoord",
    disagree: "Niet akkoord",
    ok: "Sluit",
  },
  error: {
    100: "Je hebt de benodige permissies niet",
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
    213: "Kan voor deze enrollment geen edubadge uitgeven, dit is al gebeurd",
    214: "Je kunt niets annpassen, edbadges zijn al uitgegeven binnen deze entiteit",
    500: 'Kan niet de laatste permissie van de het instituut verwijderen',
    501: 'Je kunt maar één uitnodiging hebben per emailadres',
    502: 'Kan de gebruiker niet uitnodigen voor deze entiteit: er is een conflicterende permissie',
    503: 'Kan de gebruiker niet uitnodigen voor deze entiteit: er is een conflicterende uitnodiging',
    504: 'Kan niet een gebruiker van een andere instelling uitnodigen',
    505: 'Deze uitnodiging is voor een student',
    506: 'Deze uitnodiging is voor een docent',
    507: 'Je hebt geen bevoegdheid om een gebruiker voor deze entiteit uit te nodigen',
    508: 'Je kunt geen uitnodiging aanpassen die afgewezen is',
    509: 'Geen geldig email-adres',
    601: "Geen toegang. Check je assigned role in de Issuer",
    701: "Ongespecifieerde share provider",
    702: "Ongeldige share provider",
    801: "Kan grading table URL niet aanpassen, er zijn al edubadges uitgegeven.",
    802: "Kan BRIN code niet aanpassen, er zijn al edubadges uitgegeven.",
    902: "Moet een geldige URL zijn.",
    903: "Dit veld is verplicht.",
    904: "Geen bestand gekozen.",
    905: "Dan wel criteria of criteria URL zijn verplicht.",
    unexpected: "Oops, er is iets totaal onverwachts en onverklaarbaars gebeurt.",
    description: "Een onverwachte fout is opgetreden. Probeer het opnieuw of neem contact op met <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> voor ondersteuning",
    close: "Sluit"
  },
  inviteUsers: {
    addUser: {
      title: "Voeg gebruiker toe",
      description: "Vul het e-mailadres in van de personen die je wilt uitnodigen voor deze entiteit.",
      success: "Gebruiker succesvol uitgenodigd",
    },
    cancel: "annuleer",
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
    institution: {
      admin: "Instellings Admin",
      header: "Instelling",
      allRights: "Instellings Admin",
      noRights: "Geen rechten",
      permissions: "Permissies op Instelling niveau",
      makeUserInstitutionAdmin: "Ken gebruiker {{name}} instellings admin rechten toe",
      makeUserInstitutionAdminQuestion: "Weet je het zeker dat je {{name}} instellings admin wilt maken?",
      removeUserInstitutionAdmin: "Verwijder de instellings admin rechten van {{name}}",
      removeUserInstitutionAdminQuestion: "Weet je het zeker dat je de instellings admin rechten van {{name}} wilt verwijderen?",
      flash: {
        makeUserInstitutionAdmin: "{{name}} heeft de instellings admin rechten gekregen",
        removeUserInstitutionAdmin: "De instellings admin rechten zijn verwijderd van {{name}}",
        invite: "Uitnodiging is succesvol verwijderd.",
        removed: "Rechten zijn succesvol verwijderd."
      }
    },
    faculty: {
      admin: "Issuer Group admin",
      header: "Issuer Group",
      allRights: "Issuer Group Admin",
      permissions: "Permissies op Issuer Group niveau"
    },
    issuer: {
      admin: "Issuer admin",
      header: "Issuer",
      allRights: "Issuer Admin",
      permissions: "Permissies op Issuer niveau"
    },
    badgeclass: {
      header: "Badgeclass",
      issuedBy: "Uitgegeven door",
      badgeclassOwner: "Admin",
      badgeclassEditor: "Editor",
      badgeclassAwarder: "Awarder",
      owner: "Admin",
      editor: "Editor",
      awarder: "Awarder",
      switchToOwner: "Permissie succesvol aangepast naar badgeclass Admin.",
      switchToEditor: "Permissie succesvol aangepast naar badgeclass Editor.",
      switchToAwarder: "Permissie succesvol aangepast naar badgeclass Awarder.",
      permissions: "Permissies op badgeclass niveau"
    },
    permissions: {
      header: "Uw Permissies",
      headerUser: "Permissies voor",
      allRights: "Alle rechten",
      institutionAllRights: "(vanwege Institution Admin)",
      issuerGroupAllRights: "(vanwege Issuer Group Admin)",
      issuerAllRights: "(vanwege Issuer Admin)",
      addPermissions: "Voeg permissies toe",
      removePermissions: "Verwijder permissies",
      removeAdmin: "Weet je zeker dat je de instellings Admin wilt verwijderen?",
      removeIssuerGroupAdmin: "Weet je het zeker dat je de issuer group Admin wilt verwijderen?",
      removeIssuerAdmin: "Weet je het zeker dat je de issuer Admin wilt verwijderen?",
      removeBadgeClassUser: "Weet je het zeker dat je deze rol wilt verwijderen?",
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
      badgeclass: "Selecteer een badgeclass",
      issuerGroup: "Selecteer een issuer group",
      issuer: "Selecteer een issuer",
    },
    institution: {
      created: "Vanaf",
      admin: "Admin",
      brin: "BRIN code",
      description: "Beschrijving",
      grading_table: "Grading tabel",
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
      gradingTable: "Instelling beoordelingstabel URL",
      institutionName: "Instelling naam",
      institutionIdentifier: "Instelling identifier"
    },
    badgeclass: {
      issuer: "Issuer",
      image: "Badge afbeelding",
      created: "Aangemaakt",
      issuedBy: "Issued by",
      admin: "Admin",
      alignment: "Alignment",
      alignmentName: "Naam",
      alignmentFramework: "Framework",
      alignmentUrl: "URL",
      alignmentCode: "Code",
      alignmentDescription: "Omschrijving",
      amount: "Aantal",
      name: "Naam",
      description: "Beschrijving",
      criteria_text: "Wat is benodigd om deze edubadge te verdienen?",
      criteria_url: "Criteria URL",
      criteria_url_value: "Link naar de criteria:",
      directAward: "Direct award",
      inviteEnrollements: "Nodig iemand uit om deze edubadge te verdienen",
      expiresAfter: "Verloopt na",
      expiresAfterNever: "Nooit",
      expiresAfterValue: "{{nbr}} weken",
      expireSettings: "Standaard verloop setting",
      language: "Language of instruction",
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
      educationProgramIdentifierLong: "Programme Identifier",
      notSet: "Geen",
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
        studyLoad: "Studielast",
        alignment: "Alignment"
      },
      addButtons: {
        educationalIdentifiers: "Educatie identifier(s) toevoegen",
        studyLoad: "Study load toevoegen",
        alignment: "Alignment toevoegen",
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
        name: "Award type",
        enrolled: "Enrolled",
        directAward: "Direct award"
      },
      issuedOn: "Uitgegeven op",
      issuedBy: "Uitgegeven door",
      claimed: "Geclaimed",
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
        accepted: "Claimed",
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
  shareDialog: {
    title: "Deel je edubadge",
    copyPublicUrl: "Als je de link naar de publieke pagina van deze edubadge wilt delen, kan je de link kopiëren",
    copy: "Kopieer de link"
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
  },
  acceptTerms: {
    welcome: "Hoi {{name}}",
    acceptTerms: "Let op onze voorwaarden",
    renewTerms: "De eduBadges-voorwaarden zijn gewijzigd. Let op onze nieuwe voorwaarden.",
    teacher: {
      accept: "Ik heb het gelezen",
      termsInfo: "Het aanmaken van een backpack en het koppelen hiervan aan je eduID is noodzakelijk om " +
        "om badges te kunnen ontvangen. Het backpack valt onder de verwerkingsverantwoordelijkheid van SURF",
      serviceAgreementTitle: "Serviceovereenkomst",
      serviceAgreementLinkPre: "Je kunt hier ",
      serviceAgreementLink: "de volledige serviceovereenkomst",
      serviceAgreementLinkPost: " inzien.",
      termsTitle: "Terms",
      termsLinkPre: "Door door te gaan, ga je akkoord met ",
      termsLink: "onze voorwaarden",
      termsLinkPost: ".",
      privacyTitle: "Privacy",
      privacyLinkPre: " Je gaat ook akkoord met onze ",
      privacyLink: "privacy policy",
      privacyLinkPost: "."
    },
    student: {
      accept: "Ik ga akkoord",
      termsInfo: "Het aanmaken van een backpack en het koppelen hiervan aan je eduID is noodzakelijk om " +
        "om badges te kunnen ontvangen. Het backpack valt onder de verwerkingsverantwoordelijkheid van SURF",
      serviceAgreementTitle: "Serviceovereenkomst",
      serviceAgreementLinkPre: "Je kunt hier ",
      serviceAgreementLink: "de volledige serviceovereenkomst",
      serviceAgreementLinkPost: " inzien.",
      termsTitle: "Terms",
      termsLinkPre: "Door door te gaan, ga je akkoord met ",
      termsLink: "onze voorwaarden",
      termsLinkPost: ".",
      privacyTitle: "Privacy",
      privacyLinkPre: " Je gaat ook akkoord met onze ",
      privacyLink: "privacy policy",
      privacyLinkPost: "."
    },
    termsBullets: {
      teacher:
        [
          "SURF maakt een backpack voor je op basis van je eduID. Dit backpack blijft bestaan totdat je dit backpack opheft.",
          "SURF verwerkt hiervoor persoonsgegevens: je voornaam, achternaam, e-mailadres, eduID en eventuele persoonlijke teksten in badges.",
          "Alleen jouw onderwijsinstelling en SURF hebben toegang tot deze persoonsgegevens."
        ],
      student:
        [
          "SURF maakt een backpack voor je op basis van je eduID. Dit backpack blijft bestaan totdat je dit backpack opheft.",
          "SURF verwerkt hiervoor persoonsgegevens: je voornaam, achternaam, e-mailadres, eduID en eventuele persoonlijke teksten in badges.",
          "Alleen jouw onderwijsinstelling en SURF hebben toegang tot deze persoonsgegevens."
        ]
    },
    noValidInstitution: "No valid institution",
    noValidInstitutionInfo: "The institution <strong>{{name}}</strong> connected to your eduID account is not participating in the eduBadges programme.<br/><br/>" +
      "Please contact <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> for support or try linking an extra institution to your eduID account",
    noValidInstitutionInfoForEnrollment: "Institution {{name}} is not connected to your eduID account. " +
      "To enroll for this badge you will need verify that you can identify yourself at institution <strong>{{name}}</strong>.<br/><br/>" +
      "Please contact <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> for support or try linking institution {{name}} to your eduID account",
    goToSurfConext: "Proceed to eduID",
    multipleValidInstitutions: "Multiple valid institutions",
    multipleValidInstitutionsInfo: "You have multiple institutions connected to your eduID account.<br/><br/>" +
      "Please choose with which institution you want to start using eduBadges.",
    badgeClassEnrollmentTerms: {
      formalBadges: "Formal Badges - please take notice of our terms",
      inFormalBadges: "Informal Badges - please take notice of our terms",
      statementTitle: "Statement",
      statementLinkPre: "You can read here ",
      statementLink: "the complete Statement.",
      statementLinkPost: "",
      privacyTitle: "Privacy",
      privacyLinkPre: " You also understand the ",
      privacyLink: "privacy policy.",
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
    expires: "Het verloopt op {{date}}",
    neverExpires: "Het heeft geen expiratie datum.",
    verify: "Verifieer",
    validations: {
      issuedOn: "Uitgereikt op {{val}}",
      issuedBy: "Uitgereikt door {{val}}",
      issuedUsing: "Issued using {{val}}",
      issuedTo: "Uitgereikt aan <strong>{{val}}</strong>",
      claimedOn: "Geaccepteerd op {{val}}",
      verified: "<strong>Gevalideerd!<strong> {{val}}"
    }
  },
  monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"],
  zeroState: {
    badgeClasses: "Er zijn geen badge-classes voor issuer {{name}}.",
    issuers: "Er zijn geen issuers voor {{name}}.",
    faculties: "Er zijn geen Issuer Groups voor instelling {{name}}.",
    users: "Er zijn geen users voor instelling {{name}}.",
    assertions: "Er zijn geen assertions voor edubadge {{name}}.",
    enrollments: "Er zijn geen enrollments voor edubadge {{name}}.",
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
    user_provisionment: "user provisionment"
  },
  user: {
    home: "Home",
    permissions: "Je permissies",
    banner: "Hi {{firstName}} {{lastName}}",
    profile: "Profiel",
    loggedIn: "Je bent momenteel ingelogd met je instellings account, via SURFconext"
  },
  placeholders: {
    institution: {
      name: "Bijv. Universiteit van Harderwijk",
      brin: "Basisregistratie Instellingen - BRIN",
      gradingTable: "URL van de grading table",
      description: "Bijv De Universiteit van Harderwijk is gesticht in 1977"
    },
    faculty: {
      name: "Bijv. Geschiedenis",
      description: "Bijv. Alle issuers van de faculteit Geschiedenis"
    },
    issuer: {
      name: "Bijv. Social Historic Studies",
      description: "Bijv. the study of social behaviour in the Middle Ages",
      email: "Bijv. john.doe@example.com",
      url: "Bijv. https://harderwijk.nl"
    },
    badgeClass: {
      name: "Bijv. Renaissance",
      description: "Bijv. Political infuence of the Church during the Renaissance",
      learningOutcome: "Bijv. will be able to read and demonstrate good comprehension of text in areas of the student’s interest or professional field.",
      criteriaText: "Bijv. online multiple choice exam",
      criteriaUrl: "Bijv. https://harderwijk.nl/renaissance/criteria",
      studyLoad: "Bijv. 120",
      educationProgramIdentifier: "Bijv. 12111990",
      alignmentName: "Bijv. Big Skill",
      alignmentFramework: "Bijv. Skill Matter",
      alignmentDescription: "A big skill, takes many hours to learn",
      alignmentUrl: "http://standards.net/CCELA-RL-6",
      alignmentCode: "CCSS.ELA-Literacy.RL.6.3"
    },
    permissions: {
      notes: "Bijv. waarom heb je permissies gegeven?"
    },
    userManagement: {
      email: "Bijv. john.doe@example.com"
    }
  },
  eye: {
    awardView: "Award view",
    adminView: "Admin view"
  },
  studentEnroll: {
    confirmation: {
      title: "Aanvragen",
      question: "Weet je zeker dat je de badge <strong>{{name}}</strong> wil aanvragen?"
    }
  },
  terms: {
    overviewTitle: "Overzicht alle terms",
    termsTitle: "Terms of use",
    privacyPolicyTitle: "Privacy Policy",
    student: {
      serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/service-agreement-student-nl.md",
      termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-termsofservice-nl.md",
      privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-privacy-statement-nl.md",
    },
    teacher: {
      serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/service-agreement-employee-nl.md",
      termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-termsofservice-nl.md",
      privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-privacy-statement-nl.md",
    }
  }
};
