import I18n from "i18n-js";

I18n.translations.en = {
    routes: {
        backpack: "My backpack",
        "badge-requests": "Edubadge requests",
        collections: "Collections",
        archived: "Archive",
        profile: "Account"
    },
    header: {
        logout: "Logout",
        profile: "My profile",
        home: "My backpack",
        permissions: "My permissions",
        feedback: "Send feedback",
        demo: "Demo environment",
        impersonate: "Impersonate",
        clearImpersonation: "Clear impersonation",
        nav: {
            badgeclasses: "Badge classes",
            manage: "Manage",
            users: "Users",
            catalog: "Catalog",
            insights: "Insights"
        },
    },
    login: {
        title: "Never stop learning",
        loginToEnrol: "Login to request this edubadge",
        loginToEnrolInfo: "<strong>Attention!</strong> You can only request this edubadge if you are registered at one of these institutions: <strong>{{name}}</strong>.",
        loginToEnrolInfoOne: "<strong>Attention!</strong> You can only request this edubadge if you are registered at <strong>{{name}}</strong>.",
        loginToEnrolInfoAll: "<strong>Attention!</strong> You can only request this edubadge if your institution is registered with edubadges.",
        loginAllowedWithoutValidatedName: "You can request this edubadge as an eduID guest user.",
        badgeClassArchived: "This edubadge has been archived and can no longer be requested.",
        destination: "What would you like to do?",
        description:
            "Edubadges are digital certificates which show that the owner has acquired certain skills or knowledge. Edubadges can be issued for both accredited education and extracurriculair activities.",
        student: {
            title: "<strong style='font-size: 38px'>C</strong>ollect",
            subtitle: "A backpack is the place to receive and collect edubadges.",
            noEduId: "An eduID is needed to create and use your backpack. Creating an eduID takes less than 30 seconds",
            action: "Open your backpack",
        },
        catalog: {
            title: "<strong style='font-size: 38px'>B</strong>rowse",
            subtitle: "At this moment {{badgeInstancesCount}} edubadges have been awarded by the institutions.",
            info: "The catalog shows all the badge classes of all institutions using edubadges.",
            beta: "{{badgeClassesCount}} Badge Classes",
            action: "Open the catalog",
        },
        teacher: {
            title: "<strong style='font-size: 38px'>A</strong>ward",
            subtitle: "Award your students with edubadges, the micro credentials of the future.",
            action: "Open the issuer portal",
            accountCreation: {
                askAccount: "The issuer portal is by invite only. If you want to enter, but don't have access, please contact your institution admin.",
            },
            byInviteOnly: "By invite only"
        },
        createEduId: {
            welcome: "Welcome to your edubadges backpack",
            awarded: "We’ve awarded you your first edubadge 😀",
            info: "You can now receive edubadges in your backpack."
        },
    },
    searchPlaceholder: "Search...",
    authError: {
        title: "Sorry, you don't have access",
        adminEmail: "If you want, you can request access to this service by contacting your institution admin via email: {{email}}",
        tip: "TIP",
        code: {
            "1": "An unexpected error has occurred. Please contact support@edubadges.nl for support.",
            "2": "The edubadges issuer portal is an invite-only service, so we can't show you anything now."
        }
    },
    profile: {
        profile: "Your account",
        name: "Name",
        validatedName: "Validated name",
        primary: "Primary email address",
        university: "Institution",
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
        permissionsHeader: "Your given statement(s) of agreement",
        permissionsInfo: "You can withdraw any statement of agreement you have given.",
        noPermissions: "You currently have not given a statement of agreement to any institution.",
        consentWithdrawn: "Statement of agreement withdrawn for institution {{institution}}",
        deleteHeader: "Deleting your edubadges account",
        deleteInfo1: "You can delete your account whenever you want.",
        deleteInfo2: "Proceed with care, as it would be no longer possible to validate all your edubadges.",
        deleteInfo3: "Please note that deleting your edubadges account does not mean you delete your eduID.",
        deleteInfo4: "To fully complete the process of deleting your edubadges account you must close your browser after your account has been removed.",
        submit: "Add",
        deleteEmail: "Delete this email address",
        deleteEmailConfirmation: "Are you sure you want to delete this email address?",
        delete: "Delete",
        account: "Account",
        eduid: "#eduid",
        accountInfo: "If you remove your account all your edubadges will become invalid.",
        deleteAccount: "Delete your backpack",
        deleteAccountConfirmation: "Are you sure you want to delete your backpack?",
        withdrawPermission: "Withdraw your statements",
        withdrawPermissionConfirmation: "Are you sure you want to withdraw your statement of agreement for {{name}}?",
    },
    modal: {
        cancel: "Cancel",
        confirm: "Confirm",
    },
    backpack: {
        title: "Your edubadges",
    },
    archived: {
        title: "Your archived edubadges",
    },
    notFound: {
        main: "Edubadge not found",
        publicBadge: "The edubadge is either not publicly visible anymore or has been revoked.",
        issuer: "This issuer has been deleted."
    },
    teacher: {
        sidebar: {
            filterBadges: "Filter badge classes",
            filterAwards: "Filter awards",
            filterUsers: "Filter users",
            filters: {
                faculties: "Issuer groups",
                issuers: "Issuers",
                educations: "Educational level",
                institutions: "Institution",
                studyLoads: "Studyload",
                eqfs: "NLQF level",
                roles: "Roles (highest)",
                issued: "Issued",
                awardType: "Award type",
                status: "Status",
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
            badgesCount: "{{count}} Edubadges issued",
            requestedBadges: "Requested edubadges",
            noRequestedBadges: "No open requests",
            requestedBadgesCount: "{{count}} Open requests",
            created: "Date created",
            enrollments: "Open requests",
            recipients: "Recipients",
            studyLoad: "Study load",
            timeInvestment: "Time investment",
            educationProgramIdentifier: "Education identifier",
            ects: "{{value}} ECTS",
            hours: "{{value}} hours",
            canAward: "Badge classes you can award",
            allBadges: "All badge classes",
            mostRecent: "Most recent",
            mostAwarded: "Most awarded",
            mostRequested: "Most requested"
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
            published: "This edubadge has been made publicly visible. You can share this edubadge now",
            private: "This edubadge has been made private. You can no longer share this edubadge",
            deleted: "This edubadge has been removed. You can no longer download or share this edubadge",
            accepted: "This edubadge has been accepted. You can share this edubadge now",
            claimed: "Successfully claimed this edubadge.",
            withdrawn: "Request withdrawn."
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
        badgeExpired: "This edubadge has been expired. You can see the details, but this edubadge can no longer be shared",
        privateBadge: "Private edubadge",
        publicPrivate: "Your edubadge is set to private, only you can see it.",
        publicPrivatePublic: "Your edubadge is not set to private, everyone with your sharelink will be able to see it.",
        publicPrivateRejected: "In order for you to make this edubadge public, you'll first have to accept this edubadge",
        revoked: "This edubadge has been revoked",
        revokedWithReason: "This edubadge has been revoked by the issuer for the reason: '{{revocationReason}}'",
        collections: {
            title: "Add to collection",
            question: "Select a collection to add this badge to",
            placeholder: "Select...",
            flash: "Badge {{name}} added to collection {{col}}"
        },
        confirmation: {
            publish: "Make this edubadge publicly visible",
            private: "Make this edubadge private",
            publishConfirmation: "Are you sure you want to make this edubadge publicly visible?<br/><br/>If you make this edubadge public then your validated name <strong>{{name}}</strong> will be displayed in the validation section of the public edubadge webpage.",
            publishEvidenceConfirmation: "Do you want to include the evidence in the publicly available information?",
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
        none: "You have no outstanding edubadge requests.",
        noneArchived: "You have no archived edubadges."
    },
    manage: {
        tabs: {
            institution: "Institution",
            issuers: "Issuers",
            faculties: "Issuer groups",
            badgeclasses: "Badge classes",
            badgeclassOverview: "Overview",
            userManagement: "User management",
            enrollments: "Requested ",
            assertions: "Awarded ",
            directAwardBundle: "Award status",
            profile: "Profile",
            requestedBadges: "Requested edubadges"
        },
        edit: {
            edit: "edit",
            institution: "Edit educational institution",
            faculty: "Edit issuer group",
            issuer: "Edit issuer",
            badgeclass: "Edit badge class",
            save: "Save changes",
            cancel: "Cancel",
            archive: "Archive"
        },
        delete: {
            delete: "Delete",
            info: {
                assertionsBlock: {
                    faculty: "Issuer group contains edubadges that haven't been revoked and can't be deleted",
                    issuer: "Issuer contains edubadges that haven't been revoked. Therefore the issuer can't be deleted.",
                    badgeclass: "Edubadges belonging to this badge class have already been awarded. Therefore the badge class can’t be deleted."
                },
                noPermission: {
                    institution: "Institutions can't be deleted in the issuer portal",
                    faculty: "You don't have permission to delete this issuer group.",
                    issuer: "You don't have permission to delete this issuer.",
                    badgeclass: "You don't have permission to delete this badge class."
                }
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
                question: "Do you really want to delete this issuer group? All issuers and badge classes within will also be deleted."
            },
            issuer: {
                name: "issuer",
                title: "Delete issuer",
                question: "Do you really want to delete this issuer? All the badge classes within will also be deleted."
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
        poweredBy: "Proudly powered by",
        about: "About edubadges",
        aboutLink: "https://wiki.surfnet.nl/display/Edubadges/edubadges+in+English"
    },
    modalTerms: {
        agree: "Agree",
        disagree: "Disagree",
        ok: "Close",
    },
    error: {
        100: "You don't have the required permissions.",
        101: "Could not register email address. Address already in use.",
        102: "You have already added this address. Please verify it.",
        103: "Cannot remove primary email address.",
        104: "Cannot remove only email address.",
        105: "Unverified email address cannot be made primary email address.",
        201: "May not request: you already requested this edubadge.",
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
        215: "Cannot create a formal badge class for an institution without the judicial basis for formal edubadges.",
        216: "Cannot create an informal badge class for an institution without the judicial basis for informal edubadges.",
        500: "Cannot remove the last staff member of this institution.",
        501: "There may be only one invite per email address.",
        502: "Cannot invite user for this entity: there is a conflicting staff membership.",
        503: "Cannot invite user for this entity: there is a conflicting invite.",
        504: "May not invite user from different institution.",
        505: "This invite is for a student.",
        506: "This invite is for a teacher.",
        507: "You do not have permission to invite user for this entity.",
        508: "You cannot edit an invitation that has been rejected.",
        509: "Not a vaild email address.",
        510: "You entered this email address multiple times.",
        601: "You do not have permission. Check your assigned role in the issuer portal.",
        701: "Unspecified share provider.",
        702: "Invalid share provider.",
        801: "Cannot change grading table URL, edubadges have already been issued.",
        802: "Cannot change BRIN code, edubadges have already been issued.",
        902: "Must be a valid URL or picture format.",
        903: "This is a required attribute.",
        904: "No file was uploaded.",
        905: "Either criteria or criteria URL is required.",
        906: "Enter the number of study load hours or remove this section.",
        907: "This is a reserved name for badge classes",
        908: "Cannot create Issuer with this English name in this issuer group. It already exists.",
        909: "Enter the programme identifier or remove this section.",
        910: "Either url or narrative is required.",
        911: "Cannot create Badge class with this name in this Issuer. It already exists.",
        912: "An English or Dutch name is required.",
        913: "An English or Dutch description is required.",
        914: "Cannot create Issuer with this Dutch name in this issuer group. It already exists.",
        915: "A Dutch or English url is required.",
        916: "Cannot create Issuer Group with this Dutch name in this institution. It already exists.",
        917: "Cannot create Issuer Group with this English name in this institution. It already exists.",
        918: "A Dutch or English image is required.",
        919: "Cannot create Institution with this Dutch name. It already exists.",
        920: "Cannot create Institution with this English name. It already exists.",
        921: "Invalid URL",
        922: "Too many Related Educational Framework objects. The maximum is 8.",
        923: "An English or Dutch url is required.",
        924: "An English or Dutch name is required.",
        925: "An English or Dutch description is required.",
        926: "An English or Dutch image is required.",
        927: "Email is invalid",
        928: "EPPN is required",
        929: "Email is duplicated",
        930: "EPPN is duplicated",
        931: "There is already an unaccepted direct award for this EPPN",
        932: "This badge class requires a narrative for awarding",
        933: "This badge class requires evidence for awarding",
        934: "The programme identifier is required when Credit points are specified.",
        935: "Enter the time investment or remove this section.",
        936: "Cannot create edubadge collection with this name as it already exists.",
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
        headerControl: "Users of",
        roles: {
            institution_staff: "Institution Admin",
            issuer_group_staff: "Issuer group admin",
            issuer_group_awarder: "Issuer group Awarder",
            issuer_group_admin: "Issuer group Admin",
            issuer_staff: "Issuer Admin",
            issuer_admin: "Issuer Admin",
            issuer_awarder: "Issuer Awarder",
            badge_class_owner: "Badge class Owner",
            badge_class_editor: "Badge class Editor",
            badge_class_awarder: "Badge class Awarder",
            viewer: "Viewer",
        },
        flash: {
            makeUserInstitutionAdmin: "{{name}} has been granted institution admin rights",
            removeUserInstitutionAdmin: "Institution admin rights have been removed from {{name}}",
            makeUserIssuerGroupAdmin: "{{name}} has been granted issuer group admin rights",
            makeUserIssuerGroupAwarder: "{{name}} has been granted issuer group awarder rights",
            removeUserIssuerGroupAdmin: "Issuer group admin rights have been removed from {{name}}",
            makeUserIssuerAdmin: "{{name}} has been granted issuer admin rights",
            makeUserIssuerAwarder: "{{name}} has been granted issuer awarder rights",
            removeUserIssuerAdmin: "Issuer admin rights have been removed from {{name}}",
            makeUserBadgeClassAdmin: "{{name}} has been granted badge class admin rights",
            removeUserBadgeClassAdmin: "Badge class admin rights have been removed from {{name}}",
            makeUserBadgeClassEditor: "{{name}} has been granted badge class editor rights",
            removeUserBadgeClassEditor: "Badge class editor rights have been removed from {{name}}",
            makeUserBadgeClassAwarder: "{{name}} has been granted badge class awarder rights",
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
            awarder: "Issuer group awarder",
            switchToOwner: "Successfully changed user permissions to issuer group admin role.",
            switchToAwarder: "Successfully changed user permissions to issuer group awarder role.",
            header: "Issuer group",
            allRights: "Issuer group admin",
            permissions: "Permissions on issuer group level"
        },
        issuer: {
            admin: "Issuer admin",
            awarder: "Issuer awarder",
            switchToOwner: "Successfully changed user permissions to issuer admin role.",
            switchToAwarder: "Successfully changed user permissions to issuer awarder role.",
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
            switchToOwner: "Successfully changed user permissions to badge class admin role.",
            switchToEditor: "Successfully changed user permissions to badge class editor role.",
            switchToAwarder: "Successfully changed user permissions to badge class awarder role.",
            permissions: "Permissions on badge class level"
        },
        permissions: {
            header: "Your Permissions",
            headerUser: "Permissions for",
            allRights: "All rights",
            awarderRights: "Awarder rights",
            institutionAllRights: "(Because of status as institution admin)",
            issuerGroupAllRights: "(Because of status as issuer group admin)",
            issuerGroupAwarderRights: "(Because of status as issuer group awarder)",
            issuerAllRights: "(Because of status as issuer admin)",
            issuerAwarderRights: "(Because of status as issuer awarder)",
            addPermissions: "Add permissions",
            remove: {
                institution: "Are you sure you want to remove institution admin permission?",
                faculty: "Are you sure you want to remove this issuer group admin permission?",
                issuer: "Are you sure you want to remove this issuer admin permission?",
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
            description: "About this institution",
            description_english: "Description in English",
            description_dutch: "Description in Dutch",
            grading_table: "Grading table",
            image_english: "Institution logo English",
            image_dutch: "Institution logo Dutch",
            name_english: "Institution name in English",
            name_dutch: "Institution name in Dutch",
            award_allowed_institutions: "Award allowed institutions",
            requestedBadges: "Requested badges"
        },
        faculty: {
            created: "Created",
            admin: "Admin",
            description: "About this issuer group",
            description_english: "Description in English",
            description_dutch: "Description in Dutch",
            name: "Issuer group name",
            name_english: "Issuer group English name",
            name_dutch: "Issuer group Dutch name",
        },
        issuer: {
            description: "About this issuer",
            description_english: "Description in English",
            description_dutch: "Description in Dutch",
            email: "Contact email address",
            created: "Created",
            admin: "Admin",
            email_header: "Contact",
            image_dutch: "Issuer Logo Dutch",
            image_english: "Issuer Logo English",
            name_dutch: "Name in Dutch",
            name_english: "Name in English",
            url_header: "Website",
            url: "Website URL",
            url_dutch: "Website URL for Dutch language",
            url_english: "Website URL for English language",
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
            of: "of",
            admin: "Admin",
            alignment: "Related educational framework",
            alignmentMultiple: "Related educational frameworks",
            alignmentName: "Name",
            alignmentFramework: "Framework",
            alignmentUrl: "URL",
            alignmentCode: "Code",
            alignmentDescription: "Description",
            number: "Number",
            hours: "Hours",
            name: "Name",
            description: "Description",
            about: "About this badge",
            criteria_text: "What are the requirements to qualify for this edubadge?",
            criteria_url: "Or provide a link to a webpage with the criteria or more information",
            criteria_url_value: "Link to the criteria for earning this edubadge:",
            expiresAfter: "Expires after",
            expiresAfterOption: "After",
            expiresAfterNever: "Never",
            expiresAfterValue: "{{nbr}} weeks",
            expireSettings: "Default expiration settings",
            language: "Language of instruction",
            extraOptions: "Extra options",
            isPrivate: "Private badgeclass",
            evidenceRequired: "Evidence required",
            narrativeRequired: "Narrative required",
            awardNonValidatedNameAllowed: "Award tot non-validated account allowed",
            learningOutcome: "Learning outcome",
            studyLoad: "Study load",
            timeInvestment: "Time investment",
            ects: {
                creditPoints: "Credit points (according to ECTS)",
                hours: "Hours"
            },
            sbu: "Studie Belasting Uren",
            ectsLong: "European Credit Transfer and Accumulation System",
            typeOfStudyLoad: "Type of study load",
            eqf: "NLQF level",
            educationProgramIdentifier: "ISAT",
            educationProgramIdentifierLong: "Programme Identifier",
            notSet: "-",
            expirationPeriods: {
                days: "Days",
                weeks: "Weeks",
                months: "Months",
                years: "Years",
            },
            headers: {
                basicInformation: "Basic information",
                earningCriteria: "Criteria for this edubadge",
                additionalSections: "Additional sections",
                educationalIdentifiers: "Educational identifiers",
                studyLoad: "Study load",
                timeInvestment: "Time investment",
                alignment: "Related educational framework ",
                allowedInstituions: "Allowed institutions"
            },
            addButtons: {
                educationalIdentifiers: "Add educational identifier(s)",
                studyLoad: "Add study load",
                timeInvestment: "Add time investment",
                alignment: "Add related educational framework",
                alignmentAddition: "Add another related educational framework",
            },
            info: {
                educationProgramIdentifier:
                    "Consult <a target='_blank' rel='noreferrer' href='https://apps.duo.nl/MCROHO/pages/zoeken.jsf'>the DUO CROHO register</a> or <a target='_blank' rel='noreferrer' href='https://kwalificaties.s-bb.nl/Lijsten/Groep/14'>the SBB CREBO lists</a> if you don’t know the code.",
                eqf:
                    "Check <a target='_blank' rel='noreferrer' href='https://www.nlqf.nl/images/English2015/NLQF_levels_English_description_2020.pdf'>https://www.nlqf.nl/images/English2015/NLQF_levels_English_description_2020.pdf</a> for help",
                ects:
                    "Whole and half points only. <br/>A minimum of 0.5 points is required.",
            },
            publicUrl: "Public URL",
            sorting: "Sorting:",
            award_allowed_institutions: "Award allowed institutions",
            archive: {
                confirmation: "Badge class archive",
                confirmationQuestion: "Are you sure you want to archive this badge class?",
                flash: "Badge class {{name}} is archived",
                action: "Archive"
            },
            unarchive: {
                confirmation: "Badge class unarchive",
                confirmationQuestion: "Are you sure you wannt to unarchive this badge class?",
                flash: "Badge class {{name}} is unarchived",
                action: "Unarchive"
            }
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
                REQUESTED: "Requested",
                DIRECT_AWARD: "Direct award"
            },
            claimDirectAward: "View details to claim this edubadge",
            associatedInstitution: "Associated institution",
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
            addToCollection: "Add to collection",
            statuses: {
                new: "New",
                rejected: "Rejected",
                revoked: "Revoked",
                expired: "Expired",
                accepted: "Claimed",
                unaccepted: "Pending",
                pending: "Pending",
                unclaimed: "Unclaimed",
                pendingEnrollmentCount: "{{count}} open requests",
                archived: "Archived"
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
            status: "Status",
            open: "Open",
            denied: "Denied",
            deny: "Deny request",
            addEvidence: "+ Add narrative and/or evidence",
            removeEvidence: "- Remove narrative and/or evidence",
            enrollmentType: {
                name: "Request type",
                enrolled: "Self requested",
                invited: "Invited",
                evidenceNarrativeRequired: "Required attributes",
                none: "None",
                narrative: "Narrative",
                evidence: "Evidence",
                badgeClass: "Badge class"
            },
            confirmation: {
                award: "Award request",
                awardConfirmation: "Are you sure you want to award this request?",
                deny: "Deny request",
                denyConfirmation: "Are you sure you want to deny this request?",
            },
            awardButton: "Award",
            showDenied: "Show denied enrollments ({{count}})",
            evidence: "Optional descriptive metadata about evidence related to the issuance of an edubadge.",
            evidenceRequired: "Required descriptive metadata about evidence related to the issuance of an edubadge.",
            evidenceHeader: "Metadata about the evidence related for this edubadge",
            evidenceNarrative: "Narrative",
            evidenceURL: "URL",
            evidenceDescription: "Description",
            evidenceName: "Name",
            flash: {
                denied: "The request(s) have been denied.",
                awarded: "The request(s) have been awarded."
            }
        },
        badgeAward: {
            email: "Email address",
            eppn: "Student number (EPPN)",
            reject: "Reject",
            claim: "Claim & Add to your backpack",
            confirmation: {
                claim: "After this edubadge is claimed, it will be added to your backpack and you can make the edubadge public and share it.",
                reject: "Are you absolutely sure you want to reject this edubadge? This edubadge will be deleted after rejection and this action cannot be undone."
            },
            flash: {
                claim: "Successfully claimed edubadge",
                reject: "Edubadge is rejected",
            }
        },
        directAwardBundle: {
            title: "Direct Award statuses",
            directAwardCount: "Pending",
            directAwardRejectedCount: "Rejected",
            directAwardRevokedCount: "Revoked",
            assertionCount: "Claimed",
            initialTotal: "Total",
            rateClaim: "Claim rate",
            createdAt: "Created",
        },
        insights: {
            faculty: "Issuer group",
            facultyPlaceholder: "Select an issuer group...",
            issuer: "Issuer",
            issuerPlaceholder: "Select an issuer...",
            badgeClass: "Badge class",
            badgeClassPlaceholder: "Select a badge class...",
            year: "Year",
            yearPlaceholder: "Select a year...",
        },
        collections: {
            number: "Number",
            lastUpdated: "Last one created",
            name: "Name",
            description: "Description",
            privatePublic: "Private / public",
            badge_instances: "Edubadges",
            createdAt: "Created at"
        }
    },
    inviteDialog: {
        title: "Invite people to enroll",
        publicBadgePage: "People can enroll for this edubadge from the <a href=\"{{publicBadgePage}}\" target=\"_blank\">public badgepage</a>.",
        intranet: "You can place this link to the public badgepage on your intranet or ELO, or share it via email.",
        copy: "Copy the link"
    },
    shareDialog: {
        title: "Share your edubadge",
        copyPublicUrl: "If you want to share the public page link of this edubadge, you can copy the link to your clipboard.",
        copy: "Copy the link",
        titleCollections: "Share your collection",
        copyPublicUrlCollections: "If you want to share the public page link of this collection of edubadges, you can copy the link to your clipboard.<br/><br/>Note that only public badges which are not revoked are shown on the public collection page.",
    },
    invites: {
        title: "Invite people to request",
        copyPublicUrl: "If you want to place the link to the registration page on your intranet or electronic learning environment, you can copy the link.",
        copyPublicUrlDisabled: "This badge class is private and can not be awarded.",
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
        acceptTerms: "Please take notice of our terms",
        renewTerms: "The edubadges terms have changed. Please take notice of our new terms.",
        teacher: {
            accept: "I agree",
            termsInfo: "Below are the key points about edubadges and the protection of your personal data. " +
                "The full version of the Terms of Use between SURF and you can be found below this text. " +
                "You must create an account and link it to your eduID before you can receive edubadges. " +
                "The data controller for the purposes of your account is SURF.",
            termsTitle: "Terms of Use",
            termsLinkPre: "By clicking on -I agree-, you agree to ",
            termsLink: "the Terms of Use",
            termsLinkPost: "in their entirety.",
            privacyTitle: "Privacy",
            privacyLinkPre: " For more information, see also our ",
            privacyLink: "Privacy Statement.",
            privacyLinkPost: ""
        },
        student: {
            accept: "I agree",
            read: "I have read this",
            termsInfo: "Below are the key points about edubadges and the protection of your personal data. " +
                "The full version of the Terms of Use between SURF and you can be found below this text. " +
                "You must create an account and link it to your eduID before you can receive edubadges. " +
                "The data controller for the purposes of your account is SURF.",
            termsTitle: "Terms of Use",
            termsLinkPre: "By clicking on -I agree-, you agree to ",
            termsLink: "the Terms of Use",
            termsLinkPost: "in their entirety.",
            privacyTitle: "Privacy Statement",
            privacyLinkPre: " For more information, see also our ",
            privacyLink: "Privacy Statement.",
            privacyLinkPost: "",
            formalBadges: "Formal edubadges",
            informalBadges: "Non-formal edubadges",
            version: "version ",
            agreedOn: "Agreed on ",
            readOn: "Read on ",
            withdrawConsent: "Withdraw"
        },
        termsBullets: {
            teacher:
                [
                    "SURF will create an account for you based on your eduID. This account will continue to exist until you delete it.",
                    "SURF processes the following personal data for this purpose: given names, surname, e-mail address, institution name and eduID.",
                    "If you have any questions about your account and/or privacy issues, please contact us at support@edubadges.nl."
                ],
            student:
                [
                    "SURF will create an account for you based on your eduID. This account will continue to exist until you delete it.",
                    "SURF processes the following personal data for this purpose: given names, surname, e-mail address, institution name and eduID.",
                    "If you have any questions about your account and/or privacy issues, please contact us at support@edubadges.nl."
                ]
        },
        noValidInstitution: "No valid institution",
        noValidInstitutionInfo: {
            student: "The institution <strong>{{name}}</strong> connected to your eduID account is not participating in the edubadges programme.<br/><br/>" +
                "Please contact support@edubadges.nl for support or try linking a different institution to your eduID account.",
            teacher: "The institution <strong>{{name}}</strong> connected to your SURF account is not participating in the edubadges programme.<br/><br/>" +
                "Please contact support@edubadges.nl for support or try logging in with a different institution."
        },
        noValidInstitutionInfoNoInstitution: "You don't have any verified institutions linked to your account. <br/>" +
            "You need a verified institution that is participating in the edubadges programme to use this service.",
        noValidInstitutionInfoForEnrollment: "Institution <strong>{{name}}</strong> is not connected to your eduID account. " +
            "To request this edubadge we require verification that you are able to identify yourself at institution <strong>{{name}}</strong>.<br/><br/>" +
            "Please contact <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> for support or try linking institution <strong>{{name}}</strong> to your eduID account",
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
            privacyLink: "Privacy Statement.",
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
        noValidatedName: "This edubadge was issued to {{name}} which name was <strong>not</strong> validated by an Institution on {{date}}",
        expires: "It expires on {{date}}",
        hasExpired: "It has expired on {{date}}",
        neverExpires: "It has no expiry date",
        verify: "Verify",
        validations: {
            institution: "From institution {{val}}",
            issuedOn: "Issued on {{val}}",
            issuedBy: "Issued by {{val}}",
            issuedUsing: "Issued using {{val}}",
            issuedTo: "Issued to <strong>{{val}}</strong>",
            noValidatedName: "unvalidated name",
            claimedOn: "Claimed on {{val}}",
            expiresOn: "Expires on {{val}}",
            never: "never",
            verified: "<strong>Verified<strong> {{val}}"
        },
        noValidatedNameModal: {
            noLinkedInstitution: "No linked verfied institution",
            question: "Your eduID account is not linked to any verfied institution. This is required to request edubadges.<br><br>Please press <span style='color: #540b6c'>Link institution</span> to be redirected to eduID. After that you will be redirected back to this page.",
            directAwards: "Your eduID account is not linked to any verfied institution. This is required to claim your direct awards.<br><br>Please press <span style='color: #540b6c'>Link institution</span> to be redirected to eduID. After that you will be redirected back to this page.",
            goToEduID: "Link institution"
        }
    },
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    zeroState: {
        badgeClasses: "There are no badge classes for issuer {{name}}.",
        issuers: "There are no issuers for {{name}}.",
        faculties: "There are no faculties for institution {{name}}.",
        users: "There are no users for institution {{name}}.",
        assertions: "There are no awarded edubadges for {{name}}.",
        enrollments: "There are no requests for edubadge {{name}}.",
        permissions: "There are no permissions for this user on the {{entity}} level.",
        selfPermissions: "There are no permissions for you on the {{entity}} level.",
        userPermissions: "This user does not have any permissions for {{entity}} {{name}}.",
        directAwardBundles: "There is no direct award status for edubadge {{name}}",
        directAwards: "All direct awards have been claimed. There are no more outstanding direct awards for this bundle.",
        requestedBatches: "There are no outstanding eduBadge requests you are allowed to award."
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
            brin: "(Required field) BRIN code",
            gradingTable: "URL of the grading table",
            description: "(Required field) e.g. The University of Harderwijk was founded in 1977",
            allowedInstitutions: "Select one or more institutions..."
        },
        faculty: {
            name: "(Required field) e.g. History",
            description: "(Required field) e.g. all History related studies"
        },
        issuer: {
            name: "(Required field) e.g. Social History Studies",
            description: "(Required field) e.g. the study of social behaviour in the Middle Ages",
            email: "(Required field) e.g. john.doe@example.com",
            url: "(Required field) e.g. https://www.universityofharderwijk.nl"
        },
        badgeClass: {
            name: "(Required field) e.g. Renaissance",
            description: "(Required field) e.g. Political infuence of the Church during the Renaissance",
            learningOutcome: "e.g. is able to read and interpret ancient sources as well as modern texts, and demonstrates a good overview of the important developments of this time period.",
            criteriaText: "(Either criteria or criteria URL is required) e.g. online multiple choice exam",
            criteriaUrl: "e.g. https://www.universityofharderwijk.nl/renaissance/criteria",
            studyLoad: "e.g. 120",
            timeInvestment: "e.g. 260",
            status: {
                name: "Status",
                archived: "Archived",
                active: "Active"
            },
            educationProgramIdentifier: "e.g. 12111990",
            alignmentName: "e.g. history",
            alignmentFramework: "e.g. ESCO",
            alignmentDescription: "e.g. The discipline that studies, analyses and presents the events of the past related to humans.",
            alignmentUrl: "http://data.europa.eu/esco/skill/2b22f3b1-5de4-43f9-b6d1-b20f65871268",
            alignmentCode: "2b22f3b1-5de4-43f9-b6d1-b20f65871268"
        },
        permissions: {
            notes: "e.g. why did you add permissions?"
        },
        userManagement: {
            email: "e.g. john.doe@example.com"
        },
        enrollment: {
            evidenceNarrative: "e.g. a personal note that you would add to this edubadge",
            evidenceURL: "e.g. https://university-example.org/persistent-url-to-evidence.",
            evidenceName: "e.g. Thesis Introduction Pysychology",
            evidenceDescription: "e.g. a description of the evidence you can add to this edubadge"
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
        termsTitle: "Terms of Use",
        privacyPolicyTitle: "Privacy Statement",
        student: {
            serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-agreement-en.md",
            termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-terms-en.md",
            privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-statement-en.md",
        },
        teacher: {
            serviceAgreementRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-agreement-en.md",
            termsOfUseRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-terms-en.md",
            privacyPolicyRaw: "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-statement-en.md",
        }
    },
    tooltips: {
        // If you don't want a tooltip to be displayed, just comment out (or delete) the line (like this line;-)
        //badgeClassImage: "badgeClassImage",
        badgeClassExpireSettings: "After this period edubadges will expiry and will be no longer valid.",
        badgeClassName: "Avoid abbreviations, make sure the name is recognisable for others.",
        //badgeClassDescription: "",
        badgeClassLanguageOfInstruction: "The language used in obtaining this edubadge.",
        badgeClassLearningOutcome: "Describe the learning outcome or learning goal. Recorded in the Teaching and Examination Regulations. Possibly in line with the Tuning methodology.",
        //badgeClassLearningIssuer: "badgeClassLearningIssuer",
        badgeClassIsPrivate: "If checked, this badge class will not appear in the catalog. Note that you cannot award edubadges from a private badge class.",
        badgeClassEvidenceRequired: "If checked, any awards based on this badge class require an evidence to be filled in.",
        badgeClassNarrativeRequired: "If checked, any awards based on this badge class require an narrative to be filled in.",
        badgeClassAwardNonValidatedNameAllowed: "If checked, non-formal badges can be awarded to non-validated accounts.",
        //badgeClassCriteriaRequirements: "badgeClassCriteriaRequirements",
        //badgeClassCriteriaUrl: "badgeClassCriteriaUrl",
        //badgeClassTypeOfStudyLoad: "badgeClassTypeOfStudyLoad",
        badgeClassStudyLoadNumber: "Study Tax Hours (SBU in Hours)",
        badgeClassTimeInvestmentNumber: "How many hours have to be invested to earn this informal edubadge.",
        //badgeClassSBUNumber: "badgeClassSBULoadNumber",
        badgeClassStudyLoadEcts: "The European Credit Transfer System (ECTS) is a points system used by universities and agreed by governments, that makes international education more easily comparable across borders.",
        //badgeClassProgrammeIdentifier: "badgeClassProgrammeIdentifier",
        //badgeClassNLQFLevel: "badgeClassNLQFLevel",
        //badgeClassRelatedFrameworkName: "badgeClassRelatedFrameworkName",
        //badgeClassRelatedFrameworkFramework: "badgeClassRelatedFrameworkFramework",
        //badgeClassRelatedFrameworkURL: "badgeClassRelatedFrameworkURL",
        //badgeClassRelatedFrameworkCode: "badgeClassRelatedFrameworkCode",
        //badgeClassRelatedFrameworkDescription: "badgeClassRelatedFrameworkDescription",
        facultyName: "Avoid abbreviations, make sure your name is recognisable, also to external parties.",
        //facultyDescriptionEn: "facultyDescriptionEn",
        //facultyDescriptionNl: "facultyDescriptionNl",
        //issuerFaculty: "issuerFaculty",
        //issuerImage: "issuerImage",
        issuerName: "Avoid abbreviations, make sure your name is recognisable, also to external parties.",
        //issuerDescriptionEn: "issuerDescriptionEn",
        //issuerDescriptionNl: "issuerDescriptionNl",
        issuerURL: "Use a URL that will not change. (Persistent URL).",
        //issuerEmail: "issuerEmail",
        //institutionImage: "institutionImage",
        //institutionName: "institutionName",
        //institutionDescriptionEn: "institutionDescriptionEn",
        //institutionDescriptionNl: "institutionDescriptionNl",
        //institutionBrin: "institutionBrin",
        institutionGradingTable: "Use a URL that will not change. (Persistent URL).",
        institutionAwardAllowedInstitutions: "Select other institutions from which<br/>students potentially may be awarded edubadges.",
        badgeclassAwardAllowedInstitutions: "Select other institutions from which<br/>students may be awarded this edubadge.",
        enrollmentEvidenceNarrative: "A personal narrative that can be added to this awarded edubadge.",
        enrollmentEvidenceURL: "The URI of a webpage presenting the evidence of this achievement.",
        enrollmentEvidenceName: "A descriptive title of the evidence of this achievement.",
        enrollmentEvidenceDescription: "A longer description of the evidence of this achievement.",
        demoEnvironment: "All data is deleted every month.",
        claimRate: "The claim rate is the total number of awarded edubadges as a percentage of the total of direct awards and enrollments.",
        directAwards: "Direct awards are edubadges that are awarded by the teacher to students by email. The number(s) below are direct awards that are either still not accepted, rejected or revoked",
        enrollments: "Enrollments are requested by students and once approved will be new awarded edubadges. The number(s) below are enrollments that have not been approved by the teacher or are denied",
        toggleBadgeCollectionPublic: "A public collection can be shared with other whereas a private collection can not.",
        collectionBadgeInstances: "Select all the edubadges you want to put in this collection"
    },
    badgeOverview: {
        faculty: "Faculty",
        issuer: "Issuer"
    },
    catalog: {
        name: "Catalog",
        education: {
            WO: "WO",
            HBO: "HBO",
            MBO: "MBO",
            NONE: "SURF"
        },
        studyLoad: {
            NO_STUDYLOAD: "No studyload",
            ECTS_0_5: "0-5 ECTS (WO/HBO)",
            ECTS_6_10: "6-10 ECTS (WO/HBO)",
            ECTS_10_MORE: "> 10 ECTS (WO/HBO)",
            HOURS_0_60: "0-60 hours (WO/HBO)",
            HOURS_61_120: "61-120 hours (WO/HBO)",
            HOURS_120_MORE: "> 120 hours (WO/HBO)"
        },
        eqf: {
            eqfNone: "No NLQF level",
            eqf: "NLQF level {{level}}",
        },
        issuer: {
            contact: "Contact the issuer",
            website: "Visit issuer website",
            gradingTable: "View the grading table",
            institution: "<span>Part of <a href=\"{{link}}\" target=\"_blank\">{{name}}</a></span>"
        }
    },
    badgeAwardOptions: {
        directAward: "Award edubadge(s)",
        bulkAward: "Bulk award from csv",
        or: "-or-",
        inviteEnrollements: "Invite people to enroll",
        badgeClassArchived: "Can not award archived badge class",
    },
    badgeAward: {
        directAward: {
            title: "Award edubadges directly",
            subtitle: "Your request will be sent, and you'll be notified when it's accepted or denied.",
            waringEnrollments: "There are {{count}} enrollments for this badge class. ",
            toToEnrollments: "Maybe check them first?",
            addAnother: "+ Add another",
            cancel: "Cancel",
            award: "Award",
            addEvidence: "Add evidence",
            editEvidence: "Edit evidence",
            processing: "Processing {{count}} direct awards. Please be patient...",
            flash: {
                created: "Direct awards have been sent"
            }
        },
        bulkAward: {
            title: "Bulk award from CSV",
            subtitle: "This file needs to fit the exact format of edubadges. If you are not sure, please download our " +
                "<a href=\"{{sample}}\" download=\"sample_direct_award.csv\">Sample CSV Awardfile</a> first.",
            or: "- or -",
            browse: "Browse",
            award: "Upload your Awardfile",
            wrong: "Your upload contains {{count}} invalid entries which are removed from the upload.",
            duplicate: "Your upload contains {{count}} duplicate entries which are removed from the upload.",
            eppnExisting: "Your upload contains {{count}} EPPN's (StudentID'd) with outstanding unaccepted direct awards which are removed from the upload.",
            missingEvidenceOrNarrative: "Your upload contains {{count}} entries missing narrative and / or evidence which are removed from the upload.",
            good: "Parsed {{count}} entries for upload.",
            view: "View",
            hide: "Hide",
            evidenceIncluded: "(including evidence)",
            evidenceAndNarrativeRequired: "This badge class requires both evidence and narrative to be awarded.",
            evidenceRequired: "This badge class requires evidence to be awarded.",
            narrativeRequired: "This badge class requires narrative to be awarded.",
            flash: {
                created: "Bulk awards are sent"
            },
            details: {
                breadCrumb: "Direct award details",
                header: "Direct award bundle",
                title: "Award status (issued {{issued})",
                email: "Email",
                studentId: "Student ID",
                status: "Status"
            }
        }
    },
    assertions: {
        issued: {
            LAST_30_DAYS: "Last 30 days",
            LAST_60_DAYS: "Last 60 days",
            LAST_90_DAYS: "Last 90 days",
            ALL: "All",
        },
        awardType: {
            DIRECT_AWARD: "Direct award",
            REQUESTED: "Enrolled / requested",
        },
        status: {
            PENDING: "Pending",
            CLAIMED: "Claimed",
            REVOKED: "Revoked",
            REJECTED: "Rejected"
        }
    },
    demo: {
        info: "This is the demo environment of edubadges.<br/><br/>All of the data is cleared each month and after each new " +
            "deployment.<br/><br/>" +
            "If you have any question about the demo environment please contact us" +
            " at <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> "
    },
    feedback: {
        title: "Provide Feedback",
        subTitle: "Share your thoughts",
        info: "Like what you see? Have a suggestion? Let us know what you think here!",
        disclaimer: "The SURF edubadges team will use this information, in conjunction with other information we may have regarding your account, to fix problems, improve our products and help you. " +
            "We may follow up with you regarding your feedback using the email address associated with your account. " +
            "You are responsible for ensuring that your feedback does not contain any confidential, sensitive, or personal information.",
        send: "Send feedback",
        flash: "Your feedback has successfully been send. Thanks!"
    },
    insights: {
        awardedBadges: "Awarded edubadges",
        totalAwarded: "Total awarded",
        directAwarded: "Direct awarded",
        requested: "Requested",
        enrollments: "Enrollments",
        open: "Open",
        directAwards: "Direct awards",
        directAwardDenied: "Rejected by student",
        requestedDeniedTooltip: "Denied by teacher after request",
        revoked: "Revoked after awarded",
        requestedDenied: "Denied by teacher",
        claimRate: "Claim rate",
        numbers: "The numbers add up",
        badgeClasses: "Badge classes",
        issuers: "Issuers",
        issuerGroups: "Issuer groups",
        users: "Portal users",
        crunching: "Crunching the numbers just for you...",
        date: "Date",
        reset: "Reset"
    },
    collections: {
        title: "Collections",
        info: "A collection of edubadges that you as a whole can share with others.",
        zeroState: "You have not created any collections of edubadges yet...",
        zeroStateBadges: "You have not added any edubadges yet...",
        create: "Create a new collection",
        shareable: "Collections that you can share",
        requiresPublicBadgePresent: "A public collection requires at least one public badge",
        all: "All your collections",
        byRecent: "Most recent",
        bySize: "Number of edubadges",
        byPublic: "Public / private",
        deleteConfirmation: "Delete collection {{name}}",
        deleteConfirmationQuestion: "Are you sure you want to delete collection {{name}}.",
        deleteFlash: "Collection {{name}] deleted.",
        privatePublic: "Check to make this collection public",
        share: {
            title: "Not shareable",
            publish: "Make this collection publicly visible",
            publishConfirmation: "Are you sure you want to make this collection publicly visible?<br/><br/>If you make this collection public then it is viewable for everyone with the link.",
            private: "Make this collection private",
            privateConfirmation: "Are you sure you want to make this collection private?",
        },
        placeholders: {
            name: "Name of the collection",
            description: "Description of the collection",
            chosenBadges: "Edubadges in this collection"
        },
        new: "New collection"
    },
    impersonate : {
        confirmation: "Are you sure you want to impersonate {{name}}",
        title: "Impersonate"
    }
};
