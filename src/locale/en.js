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
    profile: "Profile",
    permissions: "Permissions",
    nav: {
      badgeclasses: "Badge Classes",
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
      noEduId: "If you don't have an eduID yet, we'll help you get one in less then 30 seconds",
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
  searchPlaceholder: "Search...",
  authError: {
    title: "Sorry, you don't have access",
    adminEmail: "If you want, you can request access to this service by contacting your institution admin <a href='mailto:{{email}}' style='color: black;text-decoration: underline'>via email</a>",
    tip: "TIP",
    code: {
      "1": "An unexpected exception has occurred. Please contact <a href='mailto:edubadges@surf.nl'>edubadges@surf.nl</a> for support",
      "2": "The edubadges Issuer Portal is an invite-only service, so we can't show you anything now."
    }
  },
  profile: {
    profile: "Your account",
    name: "Name",
    primary: "Primary email",
    emails: "Emails",
    email: "Email",
    makePrimary: "Make primary",
    memberSince: "Member since",
    memberSinceDate: "{{date}} at {{hours}}:{{minutes}}",
    makePrimaryConfirmation: "Are you sure you want to make this email your primary email?",
    addEmail: "Add e-mail",
    addEmailInfo: "You will receive an email with a link to verify your new email",
    unverified: "unverified",
    validatedByYourInstitution: "verified",
    deleteHeader: "Deleting your edubadges backpack",
    deleteInfo1: "You can delete your backpack whenever you want.",
    deleteInfo2: "Proceed with care, as you will loose all your edubadges.",
    deleteInfo3: "Please note that deleting your edubadges backpack does not mean you delete your eduID.",
    deleteInfo4: "To fully complete the process of deleting you eduBadges account you must close your browser after your accout has been removed.",
    submit: "Add",
    deleteEmail: "Delete this email",
    deleteEmailConfirmation: "Are you sure you want to delete this email?",
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
    title: "Your badges",
  },
  notFound: {
    main: "404 - Not Found",
  },
  teacher: {
    sidebar: {
      filterBadges: "Filter Badge Classes",
      filterUsers: "Filter Users",
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
      title: "Badge Classes",
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
      deleted: "This badge has been rejected. You can no longer download or share this badge",
      accepted: "This badge has been accepted. You can now download or share this badge",
      claimed: "Successfully claimed this badge."
    },
    enrollments: "Requested badges",
    badges: "Your badges",
    deleteBadge: "Reject this badge",
    acceptBadge: "Accept this badge",
    share: "Share",
    copyUrl: "Copy URL",
    shareYourBadge: "Share your badge",
    shareYourBadgeQuestion: "Your public badge URL is accessible for everyone",
    badgeRevoked: "This badge has been revoked. You can see the details, but this badge can no longer be shared or downloaded",
    privateBadge: "Private badge",
    publicPrivate: "Your badge is set to private, only you can see it and download it.",
    publicPrivatePublic: "Your badge is not set to private, everyone with your sharelink will be able to see it.",
    publicPrivateRejected: "In order for you to make this badge public, you'll first have to accept this badge",
    revoked: "Thsi badge has been revoked",
    revokedWithReason: "This badge has been revoked by the issuer for the reason: '{{revocationReason}}'",
    confirmation: {
      publish: "Make this badge public accessible",
      private: "Make this badge private",
      deleteBadge: "Reject this badge",
      acceptBadge: "Accept this badge",
      publishConfirmation: "Are you sure you want to make this badge public?<br/><br/>If you make this badge public then your validated name <strong>{{name}}</strong> will be displayed in the validation section of the public badge webpage.",
      privateConfirmation: "Are you sure you want to make this badge private?",
      deleteBadgeConfirmation: "Are you sure you want to reject this badge?",
      acceptBadgeConfirmation: "Are you sure you want to accept this badge?",
    },
    validation: {
      loading: "Validating badge...",
      valid: "Valid badge",
      invalid: "Invalid badge",
      validatedName: "Validated name of the badge recipient: <strong>{{name}}</strong>"
    }
  },
  badgeRequests: {
    none: "You have no outstanding badge requests. "
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
    delete: {
      delete: "Delete",
      flash: "Successfully deleted {{type}}",
      institution: {
        name: "institution",
        title: "Delete institution",
        question: "Do you really want to delete this institution?"
      },
      faculty: {
        name: "faculty",
        title: "Delete issuergroup",
        question: "Do you really want to delete this issuergroup?"
      },
      issuer: {
        name: "issuer",
        title: "Delete issuer",
        question: "Do you really want to delete this issuer?"
      },
      badgeclass: {
        name: "badge class",
        title: "Delete badgeclass",
        question: "Do you really want to delete this badgeclass?"
      },
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
    termsStudentRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/termsofservice-create-account-student-en.md",
    termsTeacherRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/termsofservice-create-account-employee-en.md",
    termsTitle: "Terms of use",
    privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/edubadges-privacy-statement-en.md",
    privacyPolicyTitle: "Privacy Policy",
    poweredBy: "Proudly powered by"
  },
  modalTerms: {
    agree: "Agree",
    disagree: "Disagree",
    ok: "Close",
  },
  error: {
    100: "You don't have the necessary permissions",
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
    213: "Can't award enrollment, it has already been awarded",
    214: "Cannot change any value, assertions have already been issued within this entity",
    500: 'Cannot remove the last staff membership of this institution',
    501: 'There may be only one invite per email address',
    502: 'Cannot invite user for this entity: there is a conflicting staff membership',
    503: 'Cannot invite user for this entity: there is a conflicting invite',
    504: 'May not invite user from other institution',
    505: 'This invite is for a student',
    506: 'This invite is for a teacher',
    507: 'You do not have permission to invite user for this entity',
    508: 'You cannot edit an invitation that has been rejected',
    601: "You do not have permission. Check your assigned role in the Issuerportal",
    701: "Unspecified share provider",
    702: "Invalid share provider",
    801: "Cannot change grading table URL, edubadges have already been issued",
    802: "Cannot change BRIN code, edubadges have already been issued",
    unexpected: "Unexpected exception occurred.",
    description: "An unexpected error has occurred. Please try again later or contact <a href='mailto:edubadges@surf.nl'>edubadges@surf.nl</a> for support",
    close: "Close"
  },
  inviteUsers: {
    addUser: {
      title: "Add user",
      description: "Fill in the email address of the people you'd like to invite as a user to this entity. Your request will be sent, and you'll be notified when it's accepted or declined.",
      success: "User successfully invited",
    },
    cancel: "cancel",
    inviteStatus: "Status",
    sent: "Invite sent",
    accepted: "Accepted"
  },
  editUsers: {
    institution: {
      header: "Institution",
      allRights: "Institution Admin",
      noRights: "No rights",
      permissions: "Permissions on Institution level"
    },
    faculty: {
      header: "Issuer Group",
      allRights: "Issuer Group Admin",
      permissions: "Permissions on Issuer Group level"
    },
    issuer: {
      header: "Issuer",
      allRights: "Issuer Admin",
      permissions: "Permissions on Issuer level"
    },
    badgeclass: {
      header: "Badgeclass",
      badgeclassOwner: "Owner",
      badgeclassEditor: "Editor",
      badgeclassAwarder: "Awarder",
      owner: "owner",
      editor: "editor",
      awarder: "awarder",
      switchToOwner: "Successfully changed user to badgeclass owner role.",
      switchToEditor: "Successfully changed user to badgeclass editor role.",
      switchToAwarder: "Successfully changed user to badgeclass awarder role.",
      permissions: "Permissions on Badge Class level"
    },
    permissions: {
      header: "Permissions",
      headerUser: "Permissions for",
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
      badgeclass: "Select a badgeclass",
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
      gradingTable: "Institution grading table URL",
      institutionName: "Institution name",
      institutionIdentifier: "Institution identifier"
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
      description: "Description",
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
        studyLoad: "Study load",
        alignment: "Alignment"
      },
      addButtons: {
        educationalIdentifiers: "Add educational identifier(s)",
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
    renewTerms: "The edubadges terms have changed. To proceed you must accept the renewed terms",
    eduBadges: "Agreement with eduBadges",
    termsTitle: "Terms of service of edubadges",
    termsPre: "Please read and accept the ",
    termsOfUseLink: "terms of service of edubadges.",
    termsOfUseStudentRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/termsofservice-create-account-employee-en.md",
    termsOfUseTeacherRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/termsofservice-create-account-employee-en.md",
    badgeAwardTitle: "Badge awarding terms of eduBadges",
    badgeAwardTerms: "badge awarding terms",
    badgeAwardTermsPost: " for institution(s)",
    badgeAwardTermsRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/termsofservice-create-account-institution-en.md",
    acceptTermsOfUse: "I accept the Terms of Service",
    acceptBadgeAwardTerms: "I accept the Awarding Terms",
    accept: "Get it on!"
  },
  language: {
    en_EN: "English",
    nl_NL: "Dutch"
  },
  publicBadge: {
    verification: "Verification",
    issuedTo: "This badge was issued to <strong>{{name}}</strong> on {{date}}",
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
    badgeClasses: "There are no badge-classes for issuer {{name}}.",
    issuers: "There are no issuers for {{name}}.",
    faculties: "There are no faculties for institution {{name}}.",
    users: "There are no users for institution {{name}}.",
    assertions: "There are no assertions for badge {{name}}.",
    enrollments: "There are no enrollments for badge {{name}}.",
  }
};
