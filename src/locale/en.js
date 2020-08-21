import I18n from "i18n-js";

I18n.translations.en = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Edubadge requests",
    collections: "Collections",
    profile: "Profile",
  },
  header: {
    logout: "Logout",
    profile: "My profile",
    permissions: "My permissions",
    nav: {
      badgeclasses: "Badge classes",
      manage: "Manage",
      users: "Users"
    },
  },
  login: {
    title: "Never stop learning",
    loginToEnrol: "Login to request this edubadge",
    destination: "Where do you want to go?",
    description:
      "Edubadges are digital certificates which show that the owner has certain skills or knowledge. Edubadges can be issued for both accredited education and extracurriculair activities.",
    student: {
      title: "Backpack",
      subtitle: "Receive and collect edubadges",
      noEduId: "If you don't have an eduID yet, we'll help you get one in less than 30 seconds",
      action: "Enter with eduID",
    },
    teacher: {
      title: "Issuer portal",
      subtitle: "Award edubadges",
      action: "Enter with SURFconext",
      accountCreation: {
        askAccount: "<strong>Don't</strong> have access?",
        startAccount: "Contact your institution admin",
      },
      byInviteOnly: "By invite only"
    },
    createEduId: {
      welcome: "Welcome to your edubadges backpack",
      awarded: "We’ve awarded you with your first edubadge 😀",
      info: "You can now receive edubadges in your backpack."
    },
  },
  searchPlaceholder: "Search...",
  authError: {
    title: "Sorry, you don't have access",
    adminEmail: "If you want, you can request access to this service by contacting your institution admin via email: {{email}}",
    tip: "TIP",
    code: {
      "1": "An unexpected error has occurred. Please contact support@edubadges.nl for support",
      "2": "The edubadges Issuer Portal is an invite-only service, so we can't show you anything now."
    }
  },
  profile: {
    profile: "Your account",
    name: "Name",
    primary: "Primary email address",
    emails: "Email addresses",
    email: "Email address",
    makePrimary: "Make primary",
    memberSince: "Member since",
    memberSinceDate: "{{date}} at {{hours}}:{{minutes}}",
    makePrimaryConfirmation: "Are you sure you want to make this email your primary email address?",
    addEmail: "Add e-mail",
    addEmailInfo: "You will receive an email with a link to verify your new email address",
    unverified: "unverified",
    validatedByYourInstitution: "Provided by your institution",
    validatedByEduId: "Provided by eduID",
    permissionsHeader: "Your permissions",
    permissionsInfo: "You can withdraw any permissions you have given.",
    deleteHeader: "Deleting your edubadges backpack",
    deleteInfo1: "You can delete your backpack whenever you want.",
    deleteInfo2: "Proceed with care, as you will lose all your edubadges.",
    deleteInfo3: "Please note that deleting your edubadges backpack does not mean you delete your eduID.",
    deleteInfo4: "To fully complete the process of deleting you edubadges account you must close your browser after your account has been removed.",
    submit: "Add",
    deleteEmail: "Delete this email address",
    deleteEmailConfirmation: "Are you sure you want to delete this email address?",
    delete: "Delete",
    account: "Account",
    eduid: "#eduid",
    accountInfo: "If you remove your account all your edubadges will become invalid.",
    deleteAccount: "Delete your backpack",
    deleteAccountConfirmation: "Are you sure you want to delete your backpack?",
  },
  modal: {
    cancel: "Cancel",
    confirm: "Confirm",
  },
  backpack: {
    title: "Your edubadges",
  },
  notFound: {
    main: "Edubadge not found",
    publicBadge: "The edubadge is either not public anymore or has been revoked.",
    issuer: "This issuer has been deleted."
  },
  teacher: {
    sidebar: {
      filterBadges: "Filter badge classes",
      filterUsers: "Filter users",
      filters: {
        faculties: "Issuer groups",
        issuers: "Issuers",
        roles: "Roles (highest)",
        show_all: "Show all",
        show_less: "Show less",
      },
    },
    breadcrumb: {
      back: "back",
    },
    name: "Name",
    nameEmail: "Name/Email address",
    badgeclasses: {
      title: "Badge classes",
      badges: "Edubadges",
      noBadges: "(No edubadges issued yet)",
      badgesCount: "{{count}} edubadges issued",
      created: "Date created",
      recipients: "Recipients",
      studyLoad: "Study load",
      ects: "{{value}} ECTS",
      hours: "{{value}} hours",
      canAward: "Edubadges you can award",
      allBadges: "All edubadges",
      mostRecent: "Most recent",
      mostAwarded: "Most awarded",
    },
    issuers: {
      title: "Issuers",
    },
    faculties: {
      title: "Issuer groups",
    },
    badgeRevoked: {
      revoke: "Revoke edubadge",
    },
    roles: {
      title: "Roles (highest)"
    },
    users: {
      title: "Users"
    }
  },
  student: {
    enroll: "Request",
    enrolled: "Requested",
    withdraw: "Withdraw request",
    flash: {
      enrolled: "Successfully requested edubadge {{name}}.",
      published: "This edubadge has been made public. You can share this edubadge now",
      private: "This edubadge has been made private. You can no longer share this edubadge",
      deleted: "This edubadge has been rejected. You can no longer download or share this edubadge",
      accepted: "This edubadge has been accepted. You can share this edubadge now",
      claimed: "Successfully claimed this edubadge.",
      withdrawn: "Enrollment withdrawn."
    },
    enrollments: "Requested edubadges",
    badges: "Your edubadges",
    deleteBadge: "Reject this edubadge",
    acceptBadge: "Accept this edubadge",
    share: "Share",
    copyUrl: "Copy URL",
    shareYourBadge: "Share your edubadge",
    shareYourBadgeQuestion: "Your public edubadge URL is accessible for everyone",
    badgeRevoked: "This edubadge has been revoked. You can see the details, but this edubadge can no longer be shared",
    privateBadge: "Private edubadge",
    publicPrivate: "Your edubadge is set to private, only you can see it and download it.",
    publicPrivatePublic: "Your edubadge is not set to private, everyone with your sharelink will be able to see it.",
    publicPrivateRejected: "In order for you to make this edubadge public, you'll first have to accept this edubadge",
    revoked: "Thsi edubadge has been revoked",
    revokedWithReason: "This edubadge has been revoked by the issuer for the reason: '{{revocationReason}}'",
    confirmation: {
      publish: "Make this edubadge public accessible",
      private: "Make this edubadge private",
      publishConfirmation: "Are you sure you want to make this edubadge public?<br/><br/>If you make this edubadge public then your validated name <strong>{{name}}</strong> will be displayed in the validation section of the public edubadge webpage.",
      privateConfirmation: "Are you sure you want to make this edubadge private?",
      deleteBadgeConfirmation: "Are you sure you want to reject this edubadge?",
      acceptBadgeConfirmation: "Are you sure you want to accept this edubadge?",
    },
    validation: {
      loading: "Validating edubadge...",
      valid: "Valid edubadge",
      invalid: "Invalid edubadge",
      validatedName: "Validated name of the edubadge recipient: <strong>{{name}}</strong>"
    }
  },
  badgeRequests: {
    none: "You have no outstanding edubadge requests. "
  },
  manage: {
    tabs: {
      institution: "Institution",
      issuers: "Issuers",
      faculties: "Issuer groups",
      badgeclasses: "Badge classes",
      badgeclassOverview: "Overview",
      userManagement: "User management",
      enrollments: "Requested",
      assertions: "Awarded",
      profile: "Profile"
    },
    edit: {
      edit: "edit",
      institution: "Edit educational institution",
      faculty: "Edit issuer group",
      issuer: "Edit issuer",
      badgeclass: "Edit badge class",
      save: "Save changes",
      cancel: "Cancel",
    },
    delete: {
      delete: "Delete",
      info: {
        institution: "Institutions can't be deleted in the issuer portal",
        faculty: "Issuer group contains issuers and can't be deleted",
        issuer: "Issuer contains badge classes and can't be deleted",
        badgeclass: "Edubadges belonging to this badge class have already been awarded. Therefore the badge class can’t be deleted."
      },
      flash: "Successfully deleted {{type}}",
      institution: {
        name: "institution",
        title: "Delete institution",
        question: "Do you really want to delete this institution?"
      },
      faculty: {
        name: "issuer group",
        title: "Delete issuer group",
        question: "Do you really want to delete this issuer group?"
      },
      issuer: {
        name: "issuer",
        title: "Delete issuer",
        question: "Do you really want to delete this issuer?"
      },
      badgeclass: {
        name: "Badge class",
        title: "Delete badge class",
        question: "Do you really want to delete this badge class?"
      },
    },
    new: {
      create: "new",
      faculty: "Add new issuer group",
      issuer: "Add new issuer",
      badgeclass: "Add new badge class",
      save: "Save",
      cancel: "Cancel",
    },
    award: {
      title: "Award edubadges directly",
      description:
        "Fill in the email address of the person you'd like to award the edubadge to. Your request will be sent, and you will be notified when the person accepts or denies it.",
      submit: "Award edubadge",
      addAnother: "+ Add another",
      addBulk: "Add several at once",
    },
    bulkAward: {
      title: "Add several recipients at once",
      description: "Copy and paste email addresses in the form below",
      submit: "Add recipients",
    },
  },
  footer: {
    poweredBy: "Proudly powered by"
  },
  modalTerms: {
    agree: "Agree",
    disagree: "Disagree",
    ok: "Close",
  },
  error: {
    100: "You don't have the necessary permissions.",
    101: "Could not register email address. Address already in use.",
    102: "You have already added this address. Please verify it.",
    103: "Cannot remove primary email address.",
    104: "Cannot remove only email address.",
    105: "Unverified email address cannot be made primary email address.",
    201: "May not request: already requested this edubadge.",
    202: "May not request: you already have been awarded this edubadge.",
    203: "May not request: you don't have a student account.",
    204: "Invalid request-id.",
    205: "Request not found.",
    206: "Accepted requests for edubadges cannot be withdrawn.",
    207: "Users can only withdraw their own requests.",
    208: "Missing badge class-id.",
    209: "Cannot request.",
    210: "You do not have permission. Check your assigned role in the badge class related to this request.",
    211: "Request has already been denied.",
    212: "Awarded requests can't be denied.",
    213: "Can’t award requested edubadge, it has already been awarded.",
    214: "Cannot change any value, edubadges have already been awarded within this entity.",
    500: "Cannot remove the last staff member of this institution.",
    501: "There may be only one invite per email address.",
    502: "Cannot invite user for this entity: there is a conflicting staff membership.",
    503: "Cannot invite user for this entity: there is a conflicting invite.",
    504: "May not invite user from other institution.",
    505: "This invite is for a student.",
    506: "This invite is for a teacher.",
    507: "You do not have permission to invite user for this entity.",
    508: "You cannot edit an invitation that has been rejected.",
    509: "Not a vaild email address.",
    601: "You do not have permission. Check your assigned role in the Issuerportal.",
    701: "Unspecified share provider.",
    702: "Invalid share provider.",
    801: "Cannot change grading table URL, edubadges have already been issued.",
    802: "Cannot change BRIN code, edubadges have already been issued.",
    902: "Must be a valid URL or picture format.",
    903: "This is a required attribute.",
    904: "No file was uploaded.",
    905: "Either criteria or criteria URL is required.",
    906: "Add number for study load or remove the extension.",
    unexpected: "Unexpected error occurred.",
    description: "An unexpected error has occurred. Please try again later or contact support@edubadges.nl for support.",
    close: "Close"
  },
  inviteUsers: {
    addUser: {
      title: "Add user",
      description: "Fill in the email address of the people you'd like to invite as a user to this entity. Your request will be sent, and you'll be notified when it's accepted or declined.",
      success: "User successfully invited",
    },
    cancel: "Cancel",
    inviteStatus: "Status",
    sent: "Invite sent: ",
    accepted: "Accepted",
    flash: {
      confirm: "Successfully invited {{emails}}"
    }
  },
  editUsers: {
    institutionPermissions: "Permissions on {{instance}} level",
    user: {
      header: "User",
    },
    headerControl: "Users you can control in",
    roles: {
      institution_staff: "Institution Admin",
      issuer_group_staff: "Issuer group admin",
      issuer_staff: "Issuer Admin",
      badge_class_owner: "Badge class owner",
      badge_class_editor: "Badge class editor",
      badge_class_awarder: "Badge class awarder",
      viewer: "Viewer",
    },
    flash: {
      makeUserInstitutionAdmin: "{{name}} is granted institution admin rights",
      removeUserInstitutionAdmin: "Institution admin rights have been removed from {{name}}",
      makeUserIssuerGroupAdmin: "{{name}} is granted issuer group admin rights",
      removeUserIssuerGroupAdmin: "Issuer group admin rights have been removed from {{name}}",
      makeUserIssuerAdmin: "{{name}} is granted issuer admin rights",
      removeUserIssuerAdmin: "Issuer admin rights have been removed from {{name}}",
      makeUserBadgeClassAdmin: "{{name}} is granted badge class admin rights",
      removeUserBadgeClassAdmin: "Badge class admin rights have been removed from {{name}}",
      makeUserBadgeClassEditor: "{{name}} is granted badge class editor rights",
      removeUserBadgeClassEditor: "Badge class editor rights have been removed from {{name}}",
      makeUserBadgeClassAwarder: "{{name}} is granted badge class awarder rights",
      removeUserBadgeClassAwarder: "Badge class awarder rights have been removed from {{name}}",
      removeUserBadgeClassRole: "Badge class rights have been removed from {{name}}",
      invite: "Successfully removed invite.",
      removed: "Successfully removed rights"
    },
    institution: {
      admin: "Institution admin",
      header: "Institution",
      allRights: "Institution admin",
      noRights: "No rights",
      permissions: "Permissions on institution level",
      makeUserInstitutionAdmin: "Grant user {{name}} institution admin rights",
      makeUserInstitutionAdminQuestion: "Are you sure you want to promote {{name}} to institution admin?",
      removeUserInstitutionAdmin: "Remove user institution admin rights from {{name}}",
      removeUserInstitutionAdminQuestion: "Are you sure you want to remove the institution admin rights from {{name}}?",
    },
    faculty: {
      admin: "Issuer group admin",
      header: "Issuer group",
      allRights: "Issuer group admin",
      permissions: "Permissions on issuer group level"
    },
    issuer: {
      admin: "Issuer admin",
      header: "Issuer",
      allRights: "Issuer admin",
      permissions: "Permissions on issuer level"
    },
    badgeclass: {
      header: "Badge class",
      issuedBy: "Issued by",
      badgeclassOwner: "Admin",
      badgeclassEditor: "Editor",
      badgeclassAwarder: "Awarder",
      owner: "Admin",
      editor: "Editor",
      awarder: "Awarder",
      switchToOwner: "Successfully changed user to badge class admin role.",
      switchToEditor: "Successfully changed user to badge class editor role.",
      switchToAwarder: "Successfully changed user to badge class awarder role.",
      permissions: "Permissions on badge class level"
    },
    permissions: {
      header: "Your Permissions",
      headerUser: "Permissions for",
      allRights: "All rights",
      institutionAllRights: "(Because of status as institution admin)",
      issuerGroupAllRights: "(Because of status as issuer group admin)",
      issuerAllRights: "(Because of status as issuer admin)",
      addPermissions: "Add permissions",
      remove: {
        institution: "Are you sure you want to remove institution admin?",
        faculty: "Are you sure you want to remove this issuer group admin?",
        issuer: "Are you sure you want to remove this issuer admin?",
        badgeclass: "Are you sure you want to remove this role?"
      },
      removePermissions: "Remove permissions",
      setInstitutionAdmin: "Make user institution admin",
      removeInstitutionAdmin: "Remove user's role as institution admin",
      inviteNewUser: "Invite new user"
    },
    usersPermissions: "Users with permissions",
    modal: {
      add: 'Add'
    },
    role: "Role",
  },
  models: {
    inviteUsers: {
      email: "Email address"
    },
    editUsers: {
      memberSince: "Member since",
      email: "email",
      role: 'Role',
      notes: 'Notes',
      badgeclass: "Select a badge class",
      issuerGroup: "Select an issuer group",
      issuer: "Select an issuer",
    },
    institution: {
      created: "Created",
      admin: "Admin",
      brin: "BRIN code",
      description: "Description",
      grading_table: "Grading table",
      image: "Institution logo",
      name: "Institution name",
    },
    faculty: {
      created: "Created",
      admin: "Admin",
      description: "Description",
      name: "Issuer group name",
    },
    issuer: {
      description: "Description",
      email: "Contact email address",
      created: "Created",
      admin: "Admin",
      email_header: "Contact",
      url_header: "Website",
      image: "Issuer Logo",
      name: "Name",
      url: "Website URL",
      faculty: "Issuer group",
      gradingTable: "Institution grading table URL",
      institutionName: "Institution name",
      institutionIdentifier: "Institution identifier"
    },
    badgeclass: {
      issuer: "Issuer",
      image: "Edubadge image",
      created: "Created",
      issuedBy: "Issued by",
      admin: "Admin",
      alignment: "Related educational framework ",
      alignmentName: "Name",
      alignmentFramework: "Framework",
      alignmentUrl: "URL",
      alignmentCode: "Code",
      alignmentDescription: "Description",
      number: "Number",
      name: "Name",
      description: "Description",
      criteria_text: "What are the requirements to earn this edubadge?",
      criteria_url: "Or provide a criteria URL",
      criteria_url_value: "Link to the earning criteria:",
      directAward: "Direct award",
      inviteEnrollements: "Invite people to request this edubadge",
      expiresAfter: "Expires after",
      expiresAfterOption: "After",
      expiresAfterNever: "Never",
      expiresAfterValue: "{{nbr}} weeks",
      expireSettings: "Default expiration settings",
      language: "Language of instruction",
      learningOutcome: "Learning outcome",
      studyLoad: "Study load",
      ects: {
        creditPoints: "Credit points (according to ECTS)",
        hours: "Hours"
      },
      ectsLong: "European Credit Transfer and Accumulation System",
      typeOfStudyLoad: "Type of study load",
      eqf: "NLQF level",
      educationProgramIdentifier: "ISAT",
      educationProgramIdentifierLong: "Programme Identifier",
      notSet: "None",
      expirationPeriods: {
        days: "Days",
        weeks: "Weeks",
        months: "Months",
        years: "Years",
      },
      headers: {
        basicInformation: "Basic information",
        earningCriteria: "Earning criteria",
        additionalSections: "Additional sections",
        educationalIdentifiers: "Educational identifiers",
        studyLoad: "Study load",
        alignment: "Related educational framework "
      },
      addButtons: {
        educationalIdentifiers: "Add educational identifier(s)",
        studyLoad: "Add study load",
        alignment: "Add related educational framework",
      },
      info: {
        educationProgramIdentifier:
          "Consult <a target='_blank' rel='noreferrer' href='https://apps.duo.nl/MCROHO/pages/zoeken.jsf'>the DUO CROHO register</a> or <a target='_blank' rel='noreferrer' href='https://kwalificaties.s-bb.nl/Lijsten/Groep/14'>the SBB CREBO lists</a> if you don’t know the code.",
        eqf:
          "Check <a target='_blank' rel='noreferrer' href='https://www.nlqf.nl/nlqf-niveaus'>https://www.nlqf.nl/nlqf-niveaus</a> for help",
        ects:
          "Whole and half points only. <br/>A minimum of 0.5 points is required.",
      },
      publicUrl: "Public URL",
      sorting: "Sorting:"
    },
    badge: {
      emailAddress: "Email address",
      emailAddresses: "Paste email addresses",
      details: "Details",
      recipient: "Recipient",
      requested: "Requested",
      awarded: "Awarded edubadges",
      awardType: {
        name: "Award type",
        enrolled: "Requested",
        directAward: "Direct award"
      },
      issuedOn: "Issued",
      issuedBy: "Issued by",
      claimed: "Claimed",
      expires: "Expires",
      expiresNever: "Never",
      download: "Download",
      share: "Share",
      status: "Status",
      revoked: "Revoked",
      validUntil: "Valid until",
      statuses: {
        new: "New",
        rejected: "Rejected",
        revoked: "Revoked",
        accepted: "Claimed",
        unaccepted: "Pending"
      },
      confirmation: {
        revocationReason: "Reason for revocation (required)",
        revoke: "Revoke edubadge",
        revokeConfirmation: "Are you sure you want to revoke this edubadge? This can <strong>not</strong> be undone and the edubadge will be invalid after this."
      },
      flash: {
        revoked: "The edubadge(s) have been revoked."
      }
    },
    enrollment: {
      title: "Persons with edubadge requests",
      enrolled: "Requested",
      enrolledOn: "Requested on",
      deleteEnrollment: "Delete request",
      deleteEnrollmentConfirmation: "Are you sure you want to withdraw this request?",
      award: "Award",
      denied: "Denied",
      deny: "Deny request",
      enrollmentType: {
        name: "Request type",
        enrolled: "Self requested",
        invited: "Invited"
      },
      confirmation: {
        award: "Award request",
        awardConfirmation: "Are you sure you want to award this request?",
        deny: "Deny request",
        denyConfirmation: "Are you sure you want to deny this request?"
      },
      flash: {
        denied: "The request(s) have been denied.",
        awarded: "The request(s) have been awarded."
      }
    },
  },
  shareDialog: {
    title: "Share your edubadge",
    copyPublicUrl: "If you want to share the public page link of this edubadge, you can copy the link to your clipboard.",
    copy: "Copy the link"
  },
  invites: {
    title: "Invite people to request",
    copyPublicUrl: "If you want to place the link to the registration page on your intranet or ELO, you can copy the link.",
    copyUrl: "Copy the link"
  },
  file: {
    noFileSelected: "No file selected",
    upload: "Upload image",
    remove: "Remove image",
    disclaimer:
      "Image must be in .png format, contain at least 90x90 pixel and have a maximum size of 256 KB.",
  },
  copyToClipboard: {
    copied: "Copied to clipboard"
  },
  acceptTerms: {
    welcome: "Hi {{name}}",
    acceptTerms: "Take notice of our terms",
    renewTerms: "The eduBadges terms have changed. Take notice of our new terms.",
    teacher: {
      accept: "I have read it",
      termsInfo: "Creating a backpack and linking it to your eduID is necessary to " +
        "to be able to receive badges. The backpack falls under the processing responsibility of SURF",
      serviceAgreementTitle: "Service Agreement",
      serviceAgreementLinkPre: "You can here see ",
      serviceAgreementLink: "the complete Service Agreement.",
      serviceAgreementLinkPost: "",
      termsTitle: "Terms",
      termsLinkPre: "By continuing you agree with ",
      termsLink: "the terms of service,",
      termsLinkPost: "",
      privacyTitle: "Privacy",
      privacyLinkPre: " You also understand the ",
      privacyLink: "Privacy Policy.",
      privacyLinkPost: ""
    },
    student: {
      accept: "I agree",
      read: "I have read this",
      termsInfo: "Creating a backpack and linking it to your eduID is necessary to " +
        "to be able to receive edubadges. The backpack falls under the processing responsibility of SURF.",
      serviceAgreementTitle: "Service Agreement",
      serviceAgreementLinkPre: "You can see here ",
      serviceAgreementLink: "the complete Service Agreement.",
      serviceAgreementLinkPost: "",
      termsTitle: "Terms",
      termsLinkPre: "By continuing you agree with ",
      termsLink: "the terms of service.",
      termsLinkPost: "",
      privacyTitle: "Privacy",
      privacyLinkPre: " You also understand the ",
      privacyLink: "privacy policy.",
      privacyLinkPost: "",
      formalBadges: "Formele badges",
      informalBadges: "Informele badges",
      version: "version ",
      agreedOn: "Agreed on ",
      readOn: "Read on ",
      withdrawConsent: "Withdraw"
    },
    termsBullets: {
      teacher:
        [
          "SURF makes a backpack for you based on your eduID. This backpack will remain until you cancel this backpack.",
          "SURF processes personal data for this: your first name, last name, e-mail address, eduID and any personal texts in edubadges.",
          "Only your educational institution and SURF have access to these personal data."
        ],
      student:
        [
          "SURF makes a backpack for you based on your eduID. This backpack will remain until you cancel this backpack.",
          "SURF processes personal data for this: your first name, last name, e-mail address, eduID and any personal texts in edubadges.",
          "Only your educational institution and SURF have access to these personal data."
        ]
    },
    noValidInstitution: "No valid institution",
    noValidInstitutionInfo: {
      student: "The institution <strong>{{name}}</strong> connected to your eduID account is not participating in the edubadges programme.<br/><br/>" +
          "Please contact support@edubadges.nl for support or try linking an extra institution to your eduID account",
      teacher: "The institution <strong>{{name}}</strong> connected to your Surf account is not participating in the edubadges programme.<br/><br/>" +
          "Please contact support@edubadges.nl for support or try linking an extra institution to your eduID account"
    },
    noValidInstitutionInfoNoInstitution: "You don't have any verified institutions linked to your account. <br/>" +
        "You need a verified institution that is participating in the edubadges programme to use this service.",
    noValidInstitutionInfoForEnrollment: "Institution <strong>{{name}}</strong> is not connected to your eduID account. " +
        "To request this edubadge we require verification that you can identify yourself at institution <strong>{{name}}</strong>.<br/><br/>" +
        "Please contact support@edubadges.nl for support or try linking institution <strong>{{name}}</strong> to your eduID account",
    goToSurfConext: "Proceed to eduID",
    multipleValidInstitutions: "Multiple valid institutions",
    multipleValidInstitutionsInfo: "You have multiple institutions connected to your eduID account.<br/><br/>" +
      "Please choose with which institution you want to start using edubadges.",
    badgeClassEnrollmentTerms: {
      formalBadges: "Formal edubadges - please take notice of our terms",
      inFormalBadges: "Non-formal edubadges - please take notice of our terms",
      statementTitle: "Statement",
      statementLinkPre: "You can read ",
      statementLink: "the complete statement here.",
      statementLinkPost: "",
      privacyTitle: "Privacy",
      privacyLinkPre: " You also understand the ",
      privacyLink: "Privacy Policy.",
      privacyLinkPost: ""
    },

  },
  language: {
    en_EN: "English",
    En_En: "English",
    nl_NL: "Dutch",
    Nl_Nl: "Dutch"
  },
  publicBadge: {
    verification: "Verification",
    issuedTo: "This edubadge was issued to <strong>{{name}}</strong> on {{date}}",
    expires: "It expires on {{date}}",
    neverExpires: "It has no expiry date",
    verify: "Verify",
    validations: {
      issuedOn: "Issued on {{val}}",
      issuedBy: "Issued by {{val}}",
      issuedUsing: "Issued using {{val}}",
      issuedTo: "Issued to <strong>{{val}}</strong>",
      claimedOn: "Claimed on {{val}}",
      verified: "<strong>Verified<strong> {{val}}"
    }
  },
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  zeroState: {
    badgeClasses: "There are no badge classes for issuer {{name}}.",
    issuers: "There are no issuers for {{name}}.",
    faculties: "There are no faculties for institution {{name}}.",
    users: "There are no users for institution {{name}}.",
    assertions: "There are no awarded edubadge for {{name}}.",
    enrollments: "There are no requests for edubadge {{name}}.",
    permissions: "There are no permissions for this user on the {{entity}} level.",
    selfPermissions: "There are no permissions for this user on the {{entity}} level.",
    userPermissions: "This user does not have any permissions for {{entity}} {{name}}."
  },
  userManagement: {
    permissions: "Permissions for {{name}}",
    institution_staff: "Institution staff",
    issuer_group_staff: "Issuer group staff",
    issuer_staff: "Issuer staff",
    badge_class_staff: "Badge class staff",
    user_provisionment: "User invitations"
  },
  user: {
    home: "Home",
    permissions: "Your permissions",
    banner: "Hi {{firstName}} {{lastName}}",
    profile: "Profile",
    loggedIn: "You are currently logged in with your institutional account, via SURFconext"
  },
  placeholders: {
    institution: {
      name: "(Required field) e.g. University of Harderwijk",
      brin: "(Required field) BRIN CODE",
      gradingTable: "URL of the grading table",
      description: "(Required field) e.g. The University of Harderwijk was founded in 1977"
    },
    faculty: {
      name: "(Required field) e.g. History",
      description: "(Required field) e.g. all History related studies"
    },
    issuer: {
      name: "(Required field) e.g. Social Historic Studies",
      description: "(Required field) e.g. the study of social behaviour in the Middle Ages",
      email: "(Required field) e.g. john.doe@example.com",
      url: "(Required field) e.g. https://www.universityofharderwijk.nl"
    },
    badgeClass: {
      name: "(Required field) e.g. Renaissance",
      description: "(Required field) e.g. Political infuence of the Church during the Renaissance",
      learningOutcome: "e.g. is able to read and demonstrate good comprehension of texts in subject area, also in professional field",
      criteriaText: "(Either criteria or criteria URL is required) e.g. online multiple choice exam",
      criteriaUrl: "e.g. https://www.universityofharderwijk.nl/renaissance/criteria",
      studyLoad: "e.g. 120",
      educationProgramIdentifier: "e.g. 12111990",
      alignmentName: "e.g. Big Skill",
      alignmentFramework: "e.g. Skill Matter",
      alignmentDescription: "A big skill takes many hours to learn",
      alignmentUrl: "http://standards.net/CCELA-RL-6",
      alignmentCode: "CCSS.ELA-Literacy.RL.6.3"
    },
    permissions: {
      notes: "e.g. why did you add permissions?"
    },
    userManagement: {
      email: "e.g. john.doe@example.com"
    }
  },
  eye: {
    awardView: "Go to award view",
    adminView: "Go to admin view"
  },
  studentEnroll: {
    confirmation: {
      title: "Request",
      question: "Are you sure you want to request this edubadge: <strong>{{name}}</strong>?"
    }
  },
  terms: {
    overviewTitle: "Overview of all terms",
    termsTitle: "Terms of use",
    privacyPolicyTitle: "Privacy Policy",
    student: {
      serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/service-agreement-student-en.md",
      termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-termsofservice-en.md",
      privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-privacy-statement-en.md",
    },
    teacher: {
      serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/service-agreement-employee-en.md",
      termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-termsofservice-en.md",
      privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-privacy-statement-en.md",
    }
  }
};
