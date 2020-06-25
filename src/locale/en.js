import I18n from "i18n-js";

I18n.translations.en = {
  routes: {
    backpack: "Backpack",
    "badge-requests": "Badge requests",
    collections: "Collections",
    profile: "Profile",
  },
  header: {
    logout: "Logout",
    nav: {
      badgeclasses: "Badges",
      manage: "Manage",
      users: "Users"
    },
  },
  login: {
    title: "Never stop learning",
    loginToEnrol: "Login to enroll for this Badge",
    destination: "Where do you want to go?",
    description:
      "Edubadges are digital certificates and show that the owner has certain skills or knowledge. Edubadges can be issued for both extracurriculair activities and accredited education.",
    student: {
      title: "Backpack",
      subtitle: "Receive and collect badges",
      noEduId: "<sup>*</sup>If you don't have an eduID yet, we'll help you get one in less then 30 seconds",
      action: "Enter with eduID",
    },
    teacher: {
      title: "Issuer portal",
      subtitle: "Award badges",
      action: "Enter with SURFconext",
      accountCreation: {
        askAccount: "<strong>Don't</strong> have access?",
        startAccount: "Contact your institution admin",
      },
      byInviteOnly: "By invite only"
    },
    createEduId: {
      welcome: "Welcome to your Backpack",
      awarded: "We’ve awarded you with your first edubadge 😀",
      info: "You can now receive edubadges in your Backpack."
    },
  },
  profile: {
    profile: "Your account",
    name: "Name",
    primary: "Primary email",
    emails: "Emails",
    email: "Email",
    makePrimary: "Make primary",
    makePrimaryConfirmation: "Are you sure you want to make this email your primary email?",
    addEmail: "Add e-mail",
    addEmailInfo: "You will receive an email with a link to verify your new email",
    unverified: "unverified",
    validatedByYourInstitution: "Validated by your institution",
    deleteHeader: "Deleting your edubadges backpack",
    deleteInfo: "<p>You can delete your backpack whenever you want.</p><p>Proceed with care, as you will loose all your edubadges.</p>",
    submit: "Add",
    deleteEmail: "Delete this email",
    deleteEmailConfirmation: "Are you sure you want to delete this email?",
    delete: "Delete",
    account: "Account",
    eduid: "#eduid",
    accountInfo: "If you remove your account all your edubadges will become invalid.",
    deleteAccount: "Delete my account",
    deleteAccountConfirmation:
      "Are you sure you want to delete your edubadges account?",
  },
  modal: {
    cancel: "Cancel",
    confirm: "Confirm",
  },
  backpack: {
    title: "Your badges",
  },
  notFound: {
    main: "404 - Not Found",
  },
  teacher: {
    sidebar: {
      search: "Search",
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
    nameEmail: "Name/Email",
    badgeclasses: {
      title: "Badgeclasses",
      created: "Date created",
      recipients: "Recipients",
      ects: "ECTS-credits",
    },
    issuers: {
      title: "Issuers",
    },
    faculties: {
      title: "Groups",
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
    enroll: "Enroll",
    enrolled: "Enrolled",
    withdraw: "Withdraw enrollment",
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
      institution: "Institution",
      issuers: "Issuers",
      faculties: "Groups",
      badgeclasses: "Badgeclasses",
      badgeclassOverview: "Overview",
      userManagement: "User management",
      enrollments: "Enrolled",
      assertions: "Awarded",
    },
    edit: {
      edit: "edit",
      institution: "Edit institution",
      faculty: "Edit issuergroup",
      issuer: "Edit issuer",
      badgeclass: "Edit badgeclass",
      save: "Save changes",
      cancel: "Cancel",
    },
    new: {
      create: "new",
      faculty: "Add new issuergroup",
      issuer: "Add new issuer",
      badgeclass: "Add new badgeclass",
      save: "Save",
      cancel: "Cancel",
    },
    award: {
      title: "Award edubadges directly",
      description:
        "Fill in the email address of the person you'd like to award the badge to. Your request will be sent, and you will be notified when it's accepted or denied",
      submit: "Award edubadge",
      addAnother: "+ Add another",
      addBulk: "Add many at once",
    },
    bulkAward: {
      title: "Add many recipients at once",
      description: "Copy and paste email addresses in the form below",
      submit: "Add recipients",
    },
  },
  footer: {
    tip: "Need tips or support?",
    help: "Help & FAQ",
    poweredBy: "Proudly powered by",
    surf: "SURF",
  },
  error: {
    101: "Could not register email address. Address already in use",
    102: "You have already added this address. Please verify it",
    103: "Can not remove primary email address",
    104: "Can not remove only email address",
    105: "Can't make unverified email address the primary email address",
    201: "May not enroll: already enrolled",
    202: "May not enroll: you already have been awarded this badge",
    203: "May not enroll: you don't have a student account",
    204: "Invalid enrollment-id",
    205: "Enrollment not found",
    206: "Awarded enrollments cannot be withdrawn",
    207: "Users can only withdraw their own enrollments",
    208: "Missing badgeclass-id",
    209: "Cannot enroll",
    210: "You do not have permission. Check your assigned role in the Badgeclass related to this Enrollment",
    211: "Enrollment is already denied",
    212: "Awarded enrollments can't be denied",
    601: "You do not have permission. Check your assigned role in the Issuerportal",
    701: "Unspecified share provider",
    702: "Invalid share provider",
    801: "Cannot change grading table URL, edubadges have already been issued",
    802: "Cannot change BRIN code, edubadges have already been issued",
    unexpected: "Unexpected exception occurred."
  },
  inviteUsers: {
    addUser: {
      title: "Add user",
      description: "Fill in the email address of the people you'd like to invite as a user to this entity. Your request will be sent, and you'll be notified when it's accepted or declined."
    },
    cancel: "cancel",
    inviteStatus: "Status",
    sent: "Invite sent",
    accepted: "Accepted"
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
      addPermissions: "Add permissions",
      removePermissions: "Remove permissions",
      removeAdmin: "Are you sure you want to remove institution admin?",
      removeIssuerGroupAdmin: "Are you sure you want to remove this issuer group admin?",
      removeIssuerAdmin: "Are you sure you want to remove this issuer admin?",
      removeBadgeClassUser: "Are you sure you want to remove this role?",
      setInstitutionAdmin: "Make user institution admin",
      removeInstitutionAdmin: "Remove user institution admin",
      inviteNewUser: "Invite new User"
    },
    usersPermissions: "Users with permissions",
    modal: {
      add: 'add'
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
      badgeClass: "Select a badgeclass",
      issuerGroup: "Select an issuer group",
      issuer: "Select an issuer",
    },
    institution: {
      created: "Created",
      admin: "Admin",
      brin: "BRIN code",
      description: "Description",
      grading_table: "Grading table URL",
      image: "Institution Logo",
      name: "Institution Name",
    },
    faculty: {
      created: "Created",
      admin: "Admin",
      description: "Description",
      name: "Issuer Group Name",
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
      faculty: "Group",
    },
    badgeclass: {
      issuer: "Issuer",
      image: "Badge image",
      created: "Created",
      admin: "Admin",
      alignmentName: "Name",
      alignmentFramework: "Framework",
      alignmentUrl: "URL",
      alignmentCode: "Code",
      amount: "Amount",
      name: "Name",
      description: "Short description",
      criteria_text: "What is required to earn this edubadge?",
      criteria_url: "Or provide a criteria URL",
      criteria_url_value: "Link to the earning criteria:",
      directAward: "Direct award",
      inviteEnrollements: "Invite people to enroll",
      expiresAfter: "Expires after",
      expiresAfterNever: "Never",
      expiresAfterValue: "{{nbr}} weeks",
      expireSettings: "Default expiration settings",
      language: "Language of instruction",
      learningOutcome: "Learning outcome",
      ects: {
        creditPoints: "Credit points (according to ECTS)",
        hours: "Hours"
      },
      ectsLong: "European Credit Transfer and Accumulation System",
      typeOfStudyLoad: "Type of study load",
      eqf: "NLQF level",
      educationProgramIdentifier: "ISAT",
      educationProgramIdentifierLong: "Programme Identifier",
      notSet: "No value set",
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
        educationalIdentifiers: "Educational Identifiers",
        studyLoad: "Credit Points",
        alignment: "Alignment"
      },
      addButtons: {
        educationalIdentifiers: "Add educational identifiers",
        studyLoad: "Add study load",
        alignment: "Add alignment",
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
    },
    badge: {
      emailAddress: "Email address",
      emailAddresses: "Paste email addresses",
      details: "Details",
      recipient: "Recipient",
      requested: "Requested",
      awarded: "Awarded badges",
      awardType: {
        name: "Award type",
        enrolled: "Enrolled",
        directAward: "Direct award"
      },
      issuedOn: "Issued",
      issuedBy: "Issued by",
      expires: "Expires",
      expiresNever: "Never",
      download: "Download",
      share: "Share",
      status: "Status",
      revoked: "Revoked",
      validUntil: "Valid until",
      statuses: {
        new: "new",
      },
      confirmation: {
        revocationReason: "Reason for revocation (required)",
        revoke: "Revoke assertion",
        revokeConfirmation: "Are you sure you want to revoke this assertion? This can <strong>not</strong> be undone and the assertion will be invalid after this."
      },
      flash: {
        revoked: "The assertion(s) have been revoked."
      }
    },
    enrollment: {
      title: "Enrolled persons",
      enrolled: "Enrolled",
      enrolledOn: "Enrolled on",
      deleteEnrollment: "Delete enrollment",
      deleteEnrollmentConfirmation: "Are you sure you want to withdraw this enrollment?",
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
        deny: "Deny enrollment",
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
    copyPublicUrl: "If you want to place the link to the registration page on your intranet or ELO, you can copy the link",
    copyUrl: "Copy URL"
  },
  file: {
    noFileSelected: "No file selected",
    upload: "Upload image",
    remove: "Remove image",
    disclaimer:
      "Image must be png, at least 90x90 pixels and smaller than 256KB.",
  },
  copyToClipboard: {
    copied: "Copied to clipboard"
  },
  acceptTerms: {
    welcome: "Hi {{name}}",
    acceptTerms: "To proceed you must accept these terms",
    eduBadges: "Agreement with eduBadges",
    termsOfUse: "Please read and accept the <a href=\"https://www.surf.nl/edubadges-nationale-aanpak-voor-inzet-van-badges\" target=\"_blank\">terms of service of edubadges<a/>.",
    badgeAwardTerms: "Please read and accept the <a href=\"https://www.surf.nl/edubadges-nationale-aanpak-voor-inzet-van-badges\" target=\"_blank\">badge awarding terms<a/> for institution(s).",
    acceptTermsOfUse: "I accept the Terms of Service",
    acceptBadgeAwardTerms: "I accept the Awarding Terms",
    accept: "Get it on!"
  }
};
