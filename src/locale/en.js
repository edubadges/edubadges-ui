import I18n from "i18n-js";

I18n.translations.en = {
    routes: {
        backpack: "My backpack",
        "badge-requests": "Edubadge requests",
        collections: "Collections",
        import: "Imported",
        archived: "Archive",
        profile: "Account",
    },
    header: {
        logout: "Logout",
        profile: "My Account",
        home: "My backpack",
        permissions: "My permissions",
        notifications: "My notifications",
        feedback: "Send feedback",
        demo: "Demo environment",
        impersonate: "Impersonate",
        queries: "Management queries",
        clearImpersonation: "Clear impersonation",
        nav: {
            badgeclasses: "Badge classes",
            manage: "Manage",
            users: "Users",
            catalog: "Catalog",
            insights: "Insights",
            lti: "LTI",
        },
    },
    login: {
        title: "Never stop learning",
        loginToEnrol: "Login to request this edubadge",
        loginToEnrolInfo:
            "<strong>Attention!</strong> You can only request this edubadge if you are registered at one of these institutions: <strong>{{name}}</strong>.",
        loginToEnrolInfoOne:
            "<strong>Attention!</strong> You can only request this edubadge if you are registered at <strong>{{name}}</strong>.",
        loginToEnrolInfoAll:
            "<strong>Attention!</strong> You can only request this edubadge if your institution is registered with edubadges.",
        selfEnrollmentDisabled: "This edubadge can not be requested",
        login: "Login",
        loginAllowedWithoutValidatedName:
            "You can request this edubadge as an eduID guest user.",
        badgeClassArchived:
            "This edubadge has been archived and can no longer be requested.",
        destination: "What would you like to do?",
        description:
            "Edubadges are digital certificates which show that the owner has acquired certain skills or knowledge. Edubadges can be issued for both accredited education and extracurriculair activities.",
        student: {
            title: "<strong style='font-size: 38px'>C</strong>ollect",
            subtitle: "A backpack is the place to receive and collect edubadges.",
            noEduId:
                "An eduID is needed to create and use your backpack. Creating an eduID takes less than 30 seconds",
            action: "Open your backpack",
        },
        catalog: {
            title: "<strong style='font-size: 38px'>B</strong>rowse",
            subtitle:
                "At this moment {{badgeInstancesCount}} edubadges have been awarded by the institutions.",
            info: "The catalog shows all the badge classes of all institutions using edubadges.",
            beta: "{{badgeClassesCount}} Badge Classes",
            action: "Open the catalog",
        },
        teacher: {
            title: "<strong style='font-size: 38px'>A</strong>ward",
            subtitle:
                "Award your students with edubadges, the microcredentials of the future.",
            action: "Open the issuer portal",
            accountCreation: {
                askAccount:
                    "The issuer portal is by invite only. If you want to enter, but don't have access, please contact your institution admin.",
            },
            byInviteOnly: "By invite only",
        },
        createEduId: {
            welcome: "Welcome to your edubadges backpack",
            awarded: "We’ve awarded you your first edubadge 😀",
            info: "You can now receive edubadges in your backpack.",
        },
    },
    searchPlaceholder: "Search...",
    authError: {
        title: "Sorry, you don't have access",
        adminEmail:
            "If you want, you can request access to this service by contacting your institution admin via email: <a href='mailto:{{email}}'>{{email}}</a>",
        tip: "TIP",
        code: {
            "1": "An unexpected error has occurred. Please contact support@edubadges.nl for support.",
            "2": "The edubadges issuer portal is an invite-only service, so we can't show you anything now.",
        },
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
        makePrimaryConfirmation:
            "Are you sure you want to make this email your primary email address?",
        addEmail: "Add e-mail",
        addEmailInfo:
            "You will receive an email with a link to verify your new email address",
        unverified: "unverified",
        validatedByYourInstitution: "Provided by your institution",
        validatedByEduId: "Provided by eduID",
        permissionsHeader: "Your given statement(s) of agreement",
        permissionsInfo:
            "You can withdraw any statement of agreement you have given.",
        noPermissions:
            "You currently have not given a statement of agreement to any institution.",
        consentWithdrawn:
            "Statement of agreement withdrawn for institution {{institution}}",
        deleteHeader: "Deleting your edubadges account",
        deleteInfo1: "You can delete your account whenever you want.",
        deleteInfo2:
            "Proceed with care, as it would be no longer possible to validate all your edubadges.",
        deleteInfo3:
            "Please note that deleting your edubadges account does not mean you delete your eduID.",
        deleteInfo4:
            "To fully complete the process of deleting your edubadges account you must close your browser after your account has been removed.",
        submit: "Add",
        deleteEmail: "Delete this email address",
        deleteEmailConfirmation:
            "Are you sure you want to delete this email address?",
        delete: "Delete",
        account: "Account",
        eduid: "#eduid",
        accountInfo:
            "If you remove your account all your edubadges will become invalid.",
        deleteAccount: "Delete your backpack",
        deleteAccountConfirmation: "Are you sure you want to delete your backpack?",
        withdrawPermission: "Withdraw your statements",
        withdrawPermissionConfirmation:
            "Are you sure you want to withdraw your statement of agreement for {{name}}?",
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
        publicBadge:
            "The edubadge is either not publicly visible anymore or has been revoked.",
        issuer: "This issuer has been deleted.",
    },
    teacher: {
        sidebar: {
            filterBadges: "Filter badge classes",
            filterAwards: "Filter awards",
            filterDirectAwards: "Filter direct awards",
            filterUsers: "Filter users",
            badgeTagPlaceholder: "Select a tag...",
            filters: {
                faculties: "Issuer groups",
                issuers: "Issuers",
                educations: "Educational level",
                institutions: "Institution",
                virtualOrganisations: "Virtual organisations",
                studyLoads: "Studyload",
                eqfs: "EQF level",
                badgeClassType: "Type edubadge",
                badgeClasses: "Badge class",
                roles: "Roles (highest)",
                issued: "Issued",
                awardType: "Award type",
                status: "Status",
                show_all: "Show all",
                show_less: "Show less",
                badgeClassTag: "Tags",
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
            virtualOrganisation: "Virtual organisation",
            created: "Date created",
            enrollments: "Open requests",
            recipients: "Recipients",
            studyLoad: "Study load",
            timeInvestment: "Time investment",
            educationProgramIdentifier: "Indicative EQF",
            ects: "{{value}} ECTS",
            hours: "{{value}} hours",
            canAward: "Badge classes you can award",
            allBadges: "All badge classes",
            mostRecent: "Most recent",
            mostAwarded: "Most awarded",
            mostRequested: "Most requested",
            awardAllowedInstitutions: "Award to institution",
            showMoreInstitutions: "Show more institutions",
            showLessInstitutions: "Show less institutions",
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
            title: "Roles (highest)",
        },
        users: {
            title: "Users",
        },
    },
    student: {
        enroll: "Request",
        enrolled: "Requested",
        withdraw: "Withdraw request",
        flash: {
            enrolled: "Successfully requested edubadge {{name}}.",
            published:
                "This edubadge has been made publicly visible. You can share this edubadge now",
            private:
                "This edubadge has been made private. You can no longer share this edubadge",
            deleted:
                "This edubadge has been removed. You can no longer download or share this edubadge",
            accepted:
                "This edubadge has been accepted. You can share this edubadge now",
            claimed: "Successfully claimed this edubadge.",
            withdrawn: "Request withdrawn.",
        },
        enrollments: "Requested edubadges",
        badges: "Your edubadges",
        deleteBadge: "Reject this edubadge",
        acceptBadge: "Accept this edubadge",
        share: "Share",
        copyUrl: "Copy URL",
        shareYourBadge: "Share your edubadge",
        shareYourBadgeQuestion:
            "Your public edubadge URL is accessible for everyone",
        badgeRevoked:
            "This edubadge has been revoked. You can see the details, but this edubadge can no longer be shared",
        revocationReason: "The revocation reason:",
        badgeExpired:
            "This edubadge has been expired. You can see the details, but this edubadge can no longer be shared",
        privateBadge: "Private edubadge",
        publicPrivate: "Your edubadge is set to private, only you can see it.",
        publicPrivatePublic:
            "Your edubadge is not set to private, everyone with your sharelink will be able to see it.",
        publicPrivateRejected:
            "In order for you to make this edubadge public, you'll first have to accept this edubadge",
        revoked: "This edubadge has been revoked",
        revokedWithReason:
            "This edubadge has been revoked by the issuer for the reason: '{{revocationReason}}'",
        collections: {
            title: "Add to collection",
            question: "Select a collection to add this edubadge to",
            placeholder: "Select...",
            flash: "Badge {{name}} added to collection {{col}}",
        },
        confirmation: {
            publish: "Make this edubadge publicly visible",
            private: "Make this edubadge private",
            publishConfirmation:
                "Are you sure you want to make this edubadge publicly visible?<br/><br/>If you make this edubadge public then your validated name <strong>{{name}}</strong> will be displayed in the validation section of the public edubadge webpage.",
            publishEvidenceConfirmation:
                "Add evidence/personal message (evidence) also to publicly available information of this edubadge?",
            publishGradeConfirmation:
                "Add grade achieved also to publicly available information of this edubadge?",
            privateConfirmation:
                "Are you sure you want to make this edubadge private?",
            deleteBadgeConfirmation: "Are you sure you want to reject this edubadge?",
            acceptBadgeConfirmation: "Are you sure you want to accept this edubadge?",
        },
        validation: {
            loading: "Validating edubadge...",
            valid: "Valid edubadge",
            invalid: "Invalid edubadge",
            validatedName:
                "Validated name of the edubadge recipient: <strong>{{name}}</strong>",
        },
    },
    badgeRequests: {
        none: "You have no outstanding edubadge requests.",
        noneArchived: "You have no archived edubadges.",
    },
    manage: {
        tabs: {
            institution: "Institution",
            issuers: "Issuers",
            faculties: "Issuer groups",
            badgeclasses: "Badge classes",
            badgeclassOverview: "Overview",
            userManagement: "User management",
            openDirectAwards: "Open awards",
            deniedDirectAwards: "Denied",
            openEnrollments: "Open requests",
            assertions: "In backpack",
            rejectedEnrollments: "Rejected",
            revokedBadgeAssertions: "Revoked",
            deletedDirectAwards: "Deleted",
            allDeletedDirectAwards: "Deleted direct awards",
            directAwardBundles: "Award status",
            profile: "Account",
            requestedBadges: "Requested edubadges",
            directAwards: "Unclaimed direct awards",
            lti: "LTI",
            ltiContext: "Context",
            ltiUsers: "Users",
            ltiGrades: "Grades",
            endorsements: "Endorsements",
            endorsed: "Endorsed",
        },
        edit: {
            edit: "edit",
            institution: "Edit educational institution",
            faculty: "Edit issuer group",
            issuer: "Edit issuer",
            badgeclass: "Edit badge class",
            save: "Save changes",
            cancel: "Cancel",
            archive: "Archive",
        },
        copy: {
            badgeclass: "Copy badge class",
        },
        delete: {
            delete: "Delete",
            info: {
                assertionsBlock: {
                    faculty:
                        "Issuer group contains edubadges that haven't been revoked and can't be deleted",
                    issuer:
                        "Issuer contains edubadges that haven't been revoked. Therefore the issuer can't be deleted.",
                    badgeclass:
                        "Edubadges belonging to this badge class have already been awarded. Therefore the badge class can’t be deleted.",
                },
                noPermission: {
                    institution: "Institutions can't be deleted in the issuer portal",
                    faculty: "You don't have permission to delete this issuer group.",
                    issuer: "You don't have permission to delete this issuer.",
                    badgeclass: "You don't have permission to delete this badge class.",
                },
            },
            flash: "Successfully deleted {{type}}",
            institution: {
                name: "institution",
                title: "Delete institution",
                question: "Do you really want to delete this institution?",
            },
            faculty: {
                name: "issuer group",
                title: "Delete issuer group",
                question:
                    "Do you really want to delete this issuer group? All issuers and badge classes within will also be deleted.",
            },
            issuer: {
                name: "issuer",
                title: "Delete issuer",
                question:
                    "Do you really want to delete this issuer? All the badge classes within will also be deleted.",
            },
            badgeclass: {
                name: "Badge class",
                title: "Delete badge class",
                question: "Do you really want to delete this badge class?",
            },
        },
        new: {
            create: "new",
            faculty: "Add new issuer group",
            issuer: "Add new issuer",
            badgeclass: "Add new badge class {{name}}",
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
        about: "User manual edubadges",
        aboutLink: "https://servicedesk.surf.nl/wiki/display/WIKI/edubadges",
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
        216: "Cannot create an non-formal badge class for an institution without the judicial basis for non-formal edubadges.",
        500: "Cannot remove the last staff member of this institution.",
        501: "There may be only one invite per email address.",
        502: "Cannot invite user for this entity: there is a conflicting staff membership.",
        503: "Cannot invite user for this entity: there is a conflicting invite.",
        504: "May not invite user from different institution.",
        505: "This invite is for a student.",
        506: "This invite is for a teacher.",
        507: "You do not have permission to invite user for this entity.",
        508: "You cannot edit an invitation that has been rejected.",
        509: "Not a valid email address.",
        510: "You entered this email address multiple times.",
        601: "You do not have permission. Check your assigned role in the issuer portal.",
        701: "Unspecified share provider.",
        702: "Invalid share provider.",
        801: "Cannot change grading table URL, edubadges have already been issued.",
        802: "Cannot change institution code, edubadges have already been issued.",
        902: "Must be a valid URL or picture format.",
        903: "This is a required attribute.",
        904: "No file was uploaded.",
        905: "Either criteria or criteria URL is required.",
        906: "Enter the number of study load hours or remove this section.",
        907: "This is a reserved name for badge classes",
        908: "Cannot create Issuer with this English name in this issuer group. It already exists.",
        909: "Enter the programme identifier or remove this section.",
        910: "Either narrative or url is required.",
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
        931: "There is already an unaccepted direct award for this EPPN.",
        932: "This badge class requires a narrative for awarding.",
        933: "This badge class requires evidence for awarding.",
        934: "The programme identifier is required when study points in ECTS are specified.",
        935: "Enter the time investment or remove this section.",
        936: "Cannot create edubadge collection with this name as it already exists.",
        937: "ECTS can not be empty or 0.",
        938: "This edubadge requires a motivation for enrollment.",
        939: "This edubadge requires an evidence URL for enrollment.",
        940: "There is already an edubadge or unaccepted direct award for this email.",
        941: "There is already an edubadge request from this email.",
        942: "EPPN does not match the EPPN-format of your institution.",
        943: "There is already a claimed assertion for this EPPN.",
        944: "This badge class requires a grade for awarding.",
        945: "The type of institution is required.",
        946: "Type of visibility is required for SURF institutions.",
        947: "An English or Dutch image is required when issued on behalf of other organisation.",

        unexpected: "Unexpected error occurred.",
        description:
            "An unexpected error has occurred. Please try again later or contact support@edubadges.nl for support.",
        close: "Close",
    },
    inviteUsers: {
        addUser: {
            title: "Add user",
            description:
                "Fill in the email address of the people you'd like to invite as a user to this entity. Your request will be sent, and you'll be notified when it's accepted or declined.",
            success: "User successfully invited",
        },
        cancel: "Cancel",
        inviteStatus: "Status",
        sent: "Invite sent: ",
        accepted: "Accepted",
        flash: {
            confirm: "Successfully invited {{emails}}",
        },
    },
    editUsers: {
        institutionPermissions: "Permissions on {{instance}} level",
        user: {
            header: "User",
        },
        delete: "Delete user",
        deleteConfirmation: "Are you sure you want to delete user {{name}}?",
        deleteFlash: "User {{name}} has been deleted",
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
            makeUserInstitutionAdmin:
                "{{name}} has been granted institution admin rights",
            removeUserInstitutionAdmin:
                "Institution admin rights have been removed from {{name}}",
            makeUserIssuerGroupAdmin:
                "{{name}} has been granted issuer group admin rights",
            makeUserIssuerGroupAwarder:
                "{{name}} has been granted issuer group awarder rights",
            removeUserIssuerGroupAdmin:
                "Issuer group admin rights have been removed from {{name}}",
            makeUserIssuerAdmin: "{{name}} has been granted issuer admin rights",
            makeUserIssuerAwarder: "{{name}} has been granted issuer awarder rights",
            removeUserIssuerAdmin:
                "Issuer admin rights have been removed from {{name}}",
            makeUserBadgeClassAdmin:
                "{{name}} has been granted badge class admin rights",
            removeUserBadgeClassAdmin:
                "Badge class admin rights have been removed from {{name}}",
            makeUserBadgeClassEditor:
                "{{name}} has been granted badge class editor rights",
            removeUserBadgeClassEditor:
                "Badge class editor rights have been removed from {{name}}",
            makeUserBadgeClassAwarder:
                "{{name}} has been granted badge class awarder rights",
            removeUserBadgeClassAwarder:
                "Badge class awarder rights have been removed from {{name}}",
            removeUserBadgeClassRole:
                "Badge class rights have been removed from {{name}}",
            invite: "Successfully removed invite.",
            removed: "Successfully removed rights",
        },
        institution: {
            admin: "Institution admin",
            header: "Institution",
            allRights: "Institution admin",
            noRights: "No rights",
            permissions: "Permissions on institution level",
            makeUserInstitutionAdmin: "Grant user {{name}} institution admin rights",
            makeUserInstitutionAdminQuestion:
                "Are you sure you want to promote {{name}} to institution admin?",
            removeUserInstitutionAdmin:
                "Remove user institution admin rights from {{name}}",
            removeUserInstitutionAdminQuestion:
                "Are you sure you want to remove the institution admin rights from {{name}}?",
        },
        faculty: {
            admin: "Issuer group admin",
            awarder: "Issuer group awarder",
            switchToOwner:
                "Successfully changed user permissions to issuer group admin role.",
            switchToAwarder:
                "Successfully changed user permissions to issuer group awarder role.",
            header: "Issuer group",
            allRights: "Issuer group admin",
            permissions: "Permissions on issuer group level",
        },
        issuer: {
            admin: "Issuer admin",
            awarder: "Issuer awarder",
            switchToOwner:
                "Successfully changed user permissions to issuer admin role.",
            switchToAwarder:
                "Successfully changed user permissions to issuer awarder role.",
            header: "Issuer",
            allRights: "Issuer admin",
            permissions: "Permissions on issuer level",
        },
        badgeclass: {
            header: "Badge class",
            issuedBy: "Issued by",
            onBehalfOf: "Issued on behalf of",
            badgeclassOwner: "Admin",
            badgeclassEditor: "Editor",
            badgeclassAwarder: "Awarder",
            owner: "Admin",
            editor: "Editor",
            awarder: "Awarder",
            switchToOwner:
                "Successfully changed user permissions to badge class admin role.",
            switchToEditor:
                "Successfully changed user permissions to badge class editor role.",
            switchToAwarder:
                "Successfully changed user permissions to badge class awarder role.",
            permissions: "Permissions on badge class level",
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
                institution:
                    "Are you sure you want to remove institution admin permission?",
                faculty:
                    "Are you sure you want to remove this issuer group admin permission?",
                issuer: "Are you sure you want to remove this issuer admin permission?",
                badgeclass: "Are you sure you want to remove this role?",
            },
            removePermissions: "Remove permissions",
            setInstitutionAdmin: "Make user institution admin",
            removeInstitutionAdmin: "Remove user's role as institution admin",
            inviteNewUser: "Invite new user",
        },
        usersPermissions: "Users with permissions",
        modal: {
            add: "Add",
        },
        role: "Role",
    },
    models: {
        visitWebsite: "Visit website",
        inviteUsers: {
            email: "Email address",
        },
        editUsers: {
            memberSince: "Member since",
            email: "email",
            role: "Role",
            notes: "Notes",
            badgeclass: "Select badge classes",
            badgeClassPlaceholder: "Search and select badge classes",
            issuerGroup: "Select an issuer group",
            issuer: "Select an issuer",
        },
        institution: {
            created: "Created",
            admin: "Admin",
            brin: "Institution code",
            description: "About this institution",
            description_english: "Description in English",
            description_dutch: "Description in Dutch",
            grading_table: "Grading table",
            email: "Contact email address",
            linkedin_org_identifier: "LinkedIn organisation identifier",
            image_english: "Institution logo English",
            image_dutch: "Institution logo Dutch",
            name_english: "Institution name in English",
            name_dutch: "Institution name in Dutch",
            award_allowed_institutions: "Award allowed institutions",
            badge_class_tags: "Badge class tags",
            requestedBadges: "Requested edubadges",
        },
        faculty: {
            created: "Created",
            admin: "Admin",
            description: "About this issuer group",
            description_english: "Description in English",
            description_dutch: "Description in Dutch",
            linkedin_org_identifier: "LinkedIn organisation identifier",
            name: "Issuer group name",
            name_english: "Issuer group English name",
            name_dutch: "Issuer group Dutch name",
            image_english: "Issuer group logo English",
            image_dutch: "Issuer group logo Dutch",
            onBehalfOf: "Issue on behalf of name issuer group",
            on_behalf_of_url: "Virtual organization",
            on_behalf_of_display_name: "Display name",
            faculty_type: "Type of institution",
            visibility_type: "Type of visibility",
            visibility: {
                public: "Public",
                test: "Test",
            },
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
            institutionIdentifier: "Institution identifier",
        },
        badgeclass: {
            issuer: "Issuer",
            image: "Edubadge image",
            created: "Created",
            issuedBy: "Issued by",
            onBehalfOf: "{{issuer}} of {{issuerGroup}}",
            of: "of",
            admin: "Admin",
            alignment: "Related educational framework",
            alignmentMultiple: "Related educational frameworks",
            alignmentName: "Name",
            alignmentFramework: "Framework",
            alignmentUrl: "URL",
            alignmentCode: "Code",
            alignmentDescription: "Description",
            endorsement: "Endorsement",
            endorsementMultiple: "Endorsements",
            number: "Number",
            hours: "Hours",
            name: "Name",
            description: "Description",
            about: "About this edubadge",
            criteria_text: "Criteria",
            expiresAfter: "Expires after",
            expiresAfterOption: "After",
            expiresAfterNever: "Never",
            expiresAfterValue: "{{nbr}} weeks",
            status: "Status",
            expireSettings: "Default expiration setting",
            language: "Language of instruction",
            badgeClassOptions: "Badge class options",
            evidenceNarrativeOptions: "Evidence/Narrative options",
            awardOptions: "Award options",
            isPrivate: "Private badge class",
            evidenceRequired: "Evidence (URL) required when issuing",
            narrativeRequired: "Narrative required when issuing",
            narrativeStudentRequired: "Motivation required for enrollment",
            evidenceStudentRequired: "Evidence (URL) required for enrollment",
            isMicroCredentials: "Badge class related to Microcredentials pilot",
            directAwardingDisabled: "Direct-Award disabled",
            selfEnrollmentDisabled: "Self-enrollment disabled",
            learningOutcome: "Learning outcomes",
            studyLoad: "Study load",
            timeInvestment: "Time investment",
            ects: {
                creditPoints: "Study load in ECTS",
                hours: "Hours",
            },
            sbu: "Studie Belasting Uren",
            ectsLong: "European Credit Transfer and Accumulation System",
            typeOfStudyLoad: "Type of study load",
            eqf: "Indicative EQF level",
            educationProgramIdentifier: "ISAT",
            educationProgramIdentifierLong: "Programme Identifiers",
            participation: "Form of participation",
            assessment: "Type of assessment",
            url: "URL",
            isGradeAchieved: "Grade /result achieved",
            gradeAchieved: "Grade achieved required?",
            notSet: "",
            qualityAssuranceName: "Name",
            qualityAssuranceUrl: "URL",
            qualityAssuranceDescription: "Description",
            internal_tags: "Internal tags",
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
                qualificationLevel: "Qualification level",
                studyLoad: "Study load",
                timeInvestment: "Time investment",
                alignment: "Related educational framework ",
                allowedInstituions: "Allowed institutions",
            },
            addButtons: {
                educationalIdentifiers: "Add educational identifier(s)",
                educationProgramIdentifier: "Add another programme identifier",
                studyLoad: "Add study load",
                timeInvestment: "Add time investment",
                alignment: "Add related educational framework",
                alignmentAddition: "Add another related educational framework",
                alignmentInitialAddition: "Add related educational framework",
                programmeIdentifier: "Add programme identifier",
            },
            info: {
                educationProgramIdentifier:
                    "Consult <a target='_blank' rel='noreferrer' href='https://zakelijk.duo.nl/portaal/zoeken-en-vinden/resultaten'>the DUO CROHO register</a> or <a target='_blank' rel='noreferrer' href='https://kwalificaties.s-bb.nl/Lijsten/Groep/14'>the SBB CREBO lists</a> if you don’t know the code.",
                eqf: "Check <a target='_blank' rel='noreferrer' href='https://www.nlqf.nl/daarom-nlqf/nlqf-niveaus'>https://www.nlqf.nl/daarom-nlqf/nlqf-niveaus</a> for help",
                ects: "Whole and half points only. Valid value between 0.5 and 240 points.",
                ectsMicroCredentials:
                    "Whole and half points only. Valid value between 3 and 30 points.",
                studyLoadMICRO_CREDENTIAL:
                    "Whole hours only. Minimal value is 80 hours.",
                studyLoadREGULAR: "Whole hours only.",
                studyLoadEXTRA_CURRICULAR: "Optional. Whole hours only.",
                timeInvestment:
                    "Whole hours only. Valid value between 84 and 840 hours.",
                timeInvestmentOptional: "Optional.",
            },
            publicUrl: "Public URL",
            sorting: "Sorting:",
            award_allowed_institutions: "Award allowed institutions",
            archive: {
                confirmation: "Badge class archive",
                confirmationQuestion:
                    "Are you sure you want to archive this badge class?",
                flash: "Badge class {{name}} is archived",
                action: "Archive",
            },
            unarchive: {
                confirmation: "Badge class unarchive",
                confirmationQuestion:
                    "Are you sure you wannt to unarchive this badge class?",
                flash: "Badge class {{name}} is unarchived",
                action: "Unarchive",
            },
            copyBadgeClass: "Copy badge class",
        },
        badge: {
            emailAddress: "Email address",
            emailAddresses: "Paste email addresses",
            details: "Details",
            recipient: "Recipient",
            requested: "Requested",
            awarded: "Edubadges in backpack",
            openAwarded: "Open awarded edubadges",
            deniedAwarded: "Denied awarded edubadges",
            deletedAwarded: "Deleted direct awards",
            revokedAwarded: "Revoked edubadges",
            awardType: {
                name: "Award type",
                REQUESTED: "Requested",
                DIRECT_AWARD: "Direct award",
            },
            claimDirectAward: "View details to claim this edubadge",
            associatedInstitution: "Associated institution",
            issuedOn: "Issued",
            issuedBy: "Issued by",
            claimed: "Claimed",
            inBackPack: "In backpack",
            expires: "Expires",
            deleted: "Delete at",
            expiresNever: "Never",
            download: "Download",
            open: "Open",
            share: "Share",
            status: "Status",
            revoked: "Revoked",
            validUntil: "Valid until",
            addToCollection: "Add to collection",
            grade: "Grade",
            ob3SsiAgent: "Wallet import {{name}}",
            ob3SsiAgentNames: {
                unime: "unime",
                sphereon: "sphereon",
                wwwallet: "WWWallet",
            },
            ob3SsiAgentQRCode: "Import into {{name}} wallet",
            ob3SsiAgentQRCodeQuestion:
                "Scan this code with your electronic credentials wallet",
            ok: "Ok",
            statuses: {
                new: "New",
                rejected: "Rejected",
                revoked: "Revoked",
                expired: "Expired",
                deleted: "Deleted",
                accepted: "Claimed",
                unaccepted: "Pending",
                pending: "Pending",
                unclaimed: "Unclaimed",
                pendingEnrollmentCount: "{{count}} open requests",
                archived: "Archived",
                imported: "Imported",
                awarded: "Awarded",
                scheduled: "Scheduled",
            },
            confirmation: {
                revocationReason: "Reason for revocation (required)",
                revoke: "Revoke edubadge",
                revokeConfirmation:
                    "Are you sure you want to revoke this edubadge? This can <strong>not</strong> be undone and the edubadge will be invalid after this.",
            },
            flash: {
                revoked: "The edubadge(s) have been revoked.",
            },
        },
        enrollment: {
            title: "Persons with open edubadge requests",
            titleRejected: "Persons with a rejected edubadge requests",
            rejectedReason: "Reason for rejection",
            enrolled: "Requested",
            enrolledOn: "Requested on",
            deleteEnrollment: "Delete request",
            deleteEnrollmentConfirmation:
                "Are you sure you want to withdraw this request?",
            award: "Award",
            status: "Status",
            open: "Open",
            denied: "Denied",
            rejected: "Rejected",
            deny: "Deny request",
            addEvidence: "+ Add narrative and/or evidence",
            removeEvidence: "- Remove narrative and/or evidence",
            addGrade: "+ Add grade achieved",
            removeGrade: "- Remove grade achieved",
            enrollmentType: {
                name: "Request type",
                enrolled: "Self requested",
                invited: "Invited",
                evidenceNarrativeRequired: "Required attributes",
                none: "None",
                narrative: "Narrative",
                evidence: "Evidence",
                gradeAchieved: "Grade achieved",
                narrativeStudent: "Narrative student",
                evidenceStudent: "Evidence student",
                badgeClass: "Badge class",
            },
            confirmation: {
                award: "Award request",
                awardConfirmation: "Are you sure you want to award this request?",
                deny: "Deny request",
                denyConfirmation: "Are you sure you want to deny this request?",
                denyReason: "What is the reason for denial (optional)?",
            },
            awardButton: "Award",
            showDenied: "Show denied enrollments ({{count}})",
            evidence:
                "Optional descriptive metadata about evidence related to the issuance of an edubadge.",
            evidenceRequired:
                "Required descriptive metadata about evidence related to the issuance of an edubadge.",
            evidenceHeader: "Metadata about the evidence related for this edubadge",
            evidenceNarrative: "Narrative",
            evidenceURL: "URL",
            evidenceDescription: "Description",
            evidenceName: "Name",
            grade: "Grade",
            evidence_url: "Citation URL",
            narrative: "Evidence description",
            flash: {
                denied: "The request(s) have been denied.",
                awarded: "The request(s) have been awarded.",
            },
            studentEvidenceRequired:
                "To request this edubadge you need to add evidence / motivation as to why the request is justified.",
        },
        badgeAward: {
            email: "Email address",
            eppn: "Student number (EPPN)",
            reject: "Reject",
            claim: "Claim & Add to your backpack",
            confirmation: {
                claim:
                    "After this edubadge is claimed, it will be added to your backpack and you can make the edubadge public and share it.",
                reject:
                    "Are you absolutely sure you want to reject this edubadge? This edubadge will be deleted after rejection and this action cannot be undone.",
            },
            flash: {
                claim: "Successfully claimed edubadge",
                reject: "Edubadge is rejected",
            },
        },
        directAwardBundle: {
            title: "Direct Award statuses",
            directAwardCount: "Pending",
            directAwardRejectedCount: "Rejected",
            directAwardRevokedCount: "Revoked",
            directAwardScheduledCount: "Scheduled",
            assertionCount: "Claimed",
            initialTotal: "Total",
            rateClaim: "Claim rate",
            createdAt: "Created",
        },
        insights: {
            institution: "Institution",
            institutionPlaceholder: "Select an institution...",
            countSURF: "Include SURF badges in the total?",
            faculty: "Issuer group",
            facultyPlaceholder: "Select an issuer group...",
            issuer: "Issuer",
            issuerPlaceholder: "Select an issuer...",
            badgeClass: "Badge class",
            badgeClassPlaceholder: "Select a badge class...",
            year: "Year",
            yearPlaceholder: "Select a year...",
            badgeClassType: "Type edubadge",
        },
        collections: {
            number: "Number",
            lastUpdated: "Last one created",
            name: "Name",
            description: "Description",
            privatePublic: "Private / public",
            badge_instances: "Edubadges",
            createdAt: "Created at",
        },
        importedBadges: {
            image: "Image",
            url: "Badge URL",
            email: "Email",
            code: "Verification code",
        },
        endorsements: {
            description: "Description",
            claim: "Claim",
            badgeClass: "Badge class",
        },
        directAwards: {
            title: "Unclaimed direct awards",
            titleDeleted: "Deleted direct awards",
            revoke: "Revoke",
            resend: "Resend",
            delete: "Delete awards",
            zeroState:
                "There are no unclaimed direct awards for badge classes you are allowed to award",
            recipient: "Recipient",
            eppn: "EPPN",
            status: "Status",
            createdAt: "Created",
            resendAt: "Reminder",
            expires: "Expires",
            badgeClass: "Badge class",
            issuer: "Issuer",
            faculty: "Issuer group",
            confirmation: {
                revocationReason: "Reason for revocation (required)",
                deletionReason: "Reason for deletion (required)",
                revoke: "Revoke edubadge",
                revokeConfirmation:
                    "Are you sure you want to revoke this edubadge? This can <strong>not</strong> be undone and the edubadge will be invalid after this.",
                delete: "Delete edubadge",
                deleteConfirmation:
                    "Are you sure you want to delete this direct award? This can <strong>not</strong> be undone and the direct award will be invalid after this.",
                resend: "Resend edubadge",
                resendConfirmation:
                    "Are you sure you want to resend this edubadge? The recipient will be notified with an email.",
            },
            flash: {
                revoked: "The edubadge(s) have been revoked.",
                deleted: "The direct awards(s) have been deleted.",
                resend: "The edubadge(s) have been resend.",
            },
        },
    },
    inviteDialog: {
        title: "Invite people to enroll",
        publicBadgePage:
            'People can enroll for this edubadge from the <a href="{{publicBadgePage}}" target="_blank">public badgepage</a>.',
        intranet:
            "You can place this link to the public badgepage on your intranet or ELO, or share it via email.",
        copy: "Copy the link",
    },
    shareDialog: {
        title: "Share your edubadge",
        copyPublicUrl:
            "If you want to share the public page link of this edubadge, you can copy the link to your clipboard.",
        copy: "Copy the link",
        titleCollections: "Share your collection",
        copyPublicUrlCollections:
            "If you want to share the public page link of this collection of edubadges, you can copy the link to your clipboard.<br/><br/>Note that only public edubadges which are not revoked are shown on the public collection page.",
    },
    copyDialog: {
        title: "SIS integration",
        sisIntegration:
            "For SIS integration you need to register the entityID of this edubadge in your SIS, you can copy this identifier to your clipboard",
        copy: "Copy the identifier",
    },
    invites: {
        title: "Invite people to request",
        copyPublicUrl:
            "If you want to place the link to the registration page on your intranet or electronic learning environment, you can copy the link.",
        copyPublicUrlDisabled:
            "This badge class is a draft and can not be awarded.",
        copyUrl: "Copy the link",
    },
    file: {
        noFileSelected: "No file selected",
        upload: "Upload image",
        remove: "Remove image",
        disclaimer:
            "<ul><li>Image must be in .png format</li><li>contain at least 90x90 pixels</li><li>have a maximum size of 256 KB</li></ul>",
    },
    copyToClipboard: {
        copied: "Copied to clipboard",
    },
    acceptTerms: {
        welcome: "Hi {{name}}",
        acceptTerms: "Please take notice of our terms",
        renewTerms:
            "The edubadges terms have changed. Please take notice of our new terms.",
        teacher: {
            accept: "I agree",
            termsInfo:
                "Below are the key points about edubadges and the protection of your personal data. " +
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
            privacyLinkPost: "",
        },
        student: {
            accept: "I agree",
            read: "I have read this",
            termsInfo:
                "Below are the key points about edubadges and the protection of your personal data. " +
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
            withdrawConsent: "Withdraw",
        },
        termsBullets: {
            teacher: [
                "SURF will create an account for you based on your eduID. This account will continue to exist until you delete it.",
                "SURF processes the following personal data for this purpose: given names, surname, e-mail address, institution name and eduID.",
                "If you have any questions about your account and/or privacy issues, please contact us at support@edubadges.nl.",
            ],
            student: [
                "SURF will create an account for you based on your eduID. This account will continue to exist until you delete it.",
                "SURF processes the following personal data for this purpose: given names, surname, e-mail address, institution name and eduID.",
                "If you have any questions about your account and/or privacy issues, please contact us at support@edubadges.nl.",
            ],
        },
        noValidInstitution: "No valid institution",
        noValidInstitutionInfo: {
            student:
                "The institution <strong>{{name}}</strong> connected to your eduID account is not participating in the edubadges programme.<br/><br/>" +
                "Please contact support@edubadges.nl for support or try linking a different institution to your eduID account.",
            teacher:
                "The institution <strong>{{name}}</strong> connected to your SURF account is not participating in the edubadges programme.<br/><br/>" +
                "Please contact support@edubadges.nl for support or try logging in with a different institution.",
        },
        noValidInstitutionInfoNoInstitution:
            "You don't have any verified institutions linked to your account. <br/>" +
            "You need a verified institution that is participating in the edubadges programme to use this service.",
        noValidInstitutionInfoForEnrollment:
            "Institution <strong>{{name}}</strong> is not connected to your eduID account. " +
            "To request this edubadge we require verification that you are able to identify yourself at institution <strong>{{name}}</strong>.<br/><br/>" +
            "Please contact <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> for support or try linking institution <strong>{{name}}</strong> to your eduID account",
        noValidatedNameAnymoreTitle: "eduID account no longer linked",
        noValidatedNameAnymore:
            "Your eduID account is no longer linked to an educational institution. " +
            "To link your eduID account again please proceed to eduID.<br/><br/>" +
            "Please contact <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> for support or try linking an institution to your eduID account",
        noValidatedNameTitle: "eduID account not linked",
        noValidatedName:
            "Your eduID account is not linked to an educational institution and therefore awarded badges can not be claimed. " +
            "To link your eduID account please proceed to eduID.<br/><br/>" +
            "Please contact <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> for support or try linking an institution to your eduID account",
        goToSurfConext: "Proceed to eduID",
        multipleValidInstitutions: "Multiple valid institutions",
        multipleValidInstitutionsInfo:
            "You have multiple institutions connected to your eduID account.<br/><br/>" +
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
            privacyLinkPost: "",
        },
    },
    language: {
        en_EN: "English",
        En_En: "English",
        nl_NL: "Dutch",
        Nl_Nl: "Dutch",
        es_ES: "Spanish",
        fr_FR: "French",
        de_DE: "German",
    },
    publicBadge: {
        verification: "Verification",
        issuedTo:
            "This edubadge was issued to <strong>{{name}}</strong> on {{date}}",
        noValidatedName:
            "This edubadge was issued to {{name}} whose name was <strong>not</strong> validated by an Institution on {{date}}",
        expires: "It expires on {{date}}",
        hasExpired: "It has expired on {{date}}",
        neverExpires: "It has no expiry date",
        verify: "Verify",
        validations: {
            institution: "From institution {{val}}",
            faculty: "By {{val}}",
            hosted: "Hosted on {{val}}",
            imported: "Imported on {{val}}",
            issuedOn: "Issued on {{val}}",
            issuedBy: "Issued by {{val}}",
            issuedUsing: "Issued using {{val}}",
            issuedTo: "Issued to <strong>{{val}}</strong>",
            noValidatedName: "unvalidated name",
            claimedOn: "Claimed on {{val}}",
            expiresOn: "Expires on {{val}}",
            never: "never",
            verified: "<strong>Verified<strong> {{val}}",
        },
        noValidatedNameModal: {
            noLinkedInstitution: "No linked verified institution",
            question:
                "Your eduID account is not linked to any verified institution. This is required to request edubadges.<br><br>Please press <span style='color: #540b6c'>Link institution</span> to be redirected to eduID. After that you will be redirected back to this page.",
            directAwards:
                "Your eduID account is not linked to any verified institution. This is required to claim your direct awards.<br><br>Please press <span style='color: #540b6c'>Link institution</span> to be redirected to eduID. After that you will be redirected back to this page.",
            goToEduID: "Link institution",
        },
    },
    monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    zeroState: {
        badgeClasses: "There are no badge classes for issuer {{name}}.",
        issuers: "There are no issuers for {{name}}.",
        faculties: "There are no faculties for institution {{name}}.",
        users: "There are no users for institution {{name}}.",
        assertions: "There are no awarded edubadges for {{name}}.",
        enrollments: "There are no requests for edubadge {{name}}.",
        enrollmentsDenied: "There are no denied requests for edubadge {{name}}.",
        permissions:
            "There are no permissions for this user on the {{entity}} level.",
        selfPermissions:
            "There are no permissions for you on the {{entity}} level.",
        userPermissions:
            "This user does not have any permissions for {{entity}} {{name}}.",
        directAwardBundles: "There is no direct award status for edubadge {{name}}",
        directAwards:
            "All direct awards have been claimed. There are no more outstanding direct awards for this bundle.",
        requestedBatches:
            "There are no outstanding edubadge requests you are allowed to award.",
        notifications:
            "You don't have permissions to award edubadges and therefore you can not configure any notifications.",
        endorsements: "There are no endorsements for {{name}}.",
        endorsed: "{{name}} has not endorsed any other badge class.",
    },
    userManagement: {
        permissions: "Permissions for {{name}}",
        institution_staff: "Institution staff",
        issuer_group_staff: "Issuer group staff",
        issuer_staff: "Issuer staff",
        badge_class_staff: "Badge class staff",
        user_provisionment: "User invitations",
    },
    user: {
        home: "Home",
        permissions: "Your permissions",
        notifications: "Your notification settings",
        banner: "Hi {{firstName}} {{lastName}}",
        profile: "Account",
        loggedIn:
            "You are currently logged in with your institutional account, via SURFconext",
        lti: "LTI",
    },
    placeholders: {
        institution: {
            name: "(Required field) e.g. University of Harderwijk",
            brin: "(Required field) Institution code (used to be the BRIN code)",
            gradingTable: "URL of the grading table",
            email: "(Optional field) e.g. john.doe@example.com",
            linkedinOrgIdentifier: "LinkedIn organisation identifier",
            description:
                "(Required field) e.g. The University of Harderwijk was founded in 1977",
            allowedInstitutions: "Select one or more institutions...",
        },
        faculty: {
            name: "(Required field) e.g. History",
            description: "(Required field) e.g. all History related studies",
            facultyType: "Select the institution type for this issuer group...",
            visibilityType: "Select the visibility type for this issuer group...",
            onBehalfOfUrl: "(Optional) e.g. URL of the other organisation",
            linkedinOrgIdentifier:
                "(Optional) e.g. the linkedin identifier of the other organisation",
            onBehalfOfDisplayName:
                "(Optional) e.g. display name of the issuer group or consortium",
        },
        issuer: {
            name: "(Required field) e.g. Social History Studies",
            description:
                "(Required field) e.g. the study of social behaviour in the Middle Ages",
            email: "(Required field) e.g. john.doe@example.com",
            url: "(Required field) e.g. https://www.universityofharderwijk.nl",
        },
        badgeClass: {
            name: "(Required field) e.g. Renaissance",
            description:
                "(Required field) e.g. Political infuence of the Church during the Renaissance",
            learningOutcome:
                "e.g. is able to read and interpret ancient sources as well as modern texts, and demonstrates a good overview of the important developments of this time period.",
            criteriaText:
                "(Either criteria or criteria URL is required) e.g. online multiple choice exam",
            studyLoadMICRO_CREDENTIAL: "e.g. 240",
            studyLoadREGULAR: "e.g. 24",
            studyLoadEXTRA_CURRICULAR: "e.g. 24",
            timeInvestment: "e.g. 260",
            status: {
                name: "Status",
                archived: "Archived",
                private: "Unpublished",
                active: "Active",
            },
            educationProgramIdentifier: "e.g. 12111990",
            alignmentName: "e.g. history",
            alignmentFramework: "e.g. ESCO",
            alignmentDescription:
                "e.g. The discipline that studies, analyses and presents the events of the past related to humans.",
            alignmentUrl:
                "e.g. http://data.europa.eu/esco/skill/2b22f3b1-5de4-43f9-b6d1-b20f65871268",
            alignmentCode: "e.g. 2b22f3b1-5de4-43f9-b6d1-b20f65871268",
            qualityAssuranceName: "e.g. something",
            qualityAssuranceUrl: "e.g. https://data.europa.com/qa",
            internalTags: "Select tags...",
        },
        permissions: {
            notes: "e.g. why did you add permissions?",
        },
        userManagement: {
            email: "e.g. john.doe@example.com",
        },
        enrollment: {
            evidenceNarrative:
                "e.g. a personal note that you would add to this edubadge",
            evidenceURL:
                "e.g. https://university-example.org/persistent-url-to-evidence.",
            evidenceName: "e.g. Thesis Introduction Pysychology",
            evidenceDescription:
                "e.g. a description of the evidence you can add to this edubadge",
            grade: "e.g. the grade assigned to the student",
        },
    },
    eye: {
        awardView: "Go to award view",
        adminView: "Go to admin view",
    },
    studentEnroll: {
        confirmation: {
            title: "Request",
            question:
                "Are you sure you want to request this edubadge: <strong>{{name}}</strong>?",
        },
    },
    terms: {
        overviewTitle: "Overview of all terms",
        termsTitle: "Terms of Use",
        privacyPolicyTitle: "Privacy Statement",
        student: {
            serviceAgreementRaw:
                "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-agreement-en.md",
            termsOfUseRaw:
                "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-terms-en.md",
            privacyPolicyRaw:
                "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-statement-en.md",
        },
        teacher: {
            serviceAgreementRaw:
                "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-agreement-en.md",
            termsOfUseRaw:
                "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-terms-en.md",
            privacyPolicyRaw:
                "https://raw.githubusercontent.com/edubadges/privacy/master/surf/account-statement-en.md",
        },
    },
    tooltips: {
        // If you don't want a tooltip to be displayed, just comment out (or delete) the line (like this line;-)
        //badgeClassImage: "badgeClassImage",
        badgeClassExpireSettings:
            "After this period edubadges will expiry and will be no longer valid.",
        badgeClassName:
            "Avoid abbreviations, make sure the name is recognisable for others.",
        // badgeClassDescription: "This description supports markdown. " +
        //     "See <a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/Edubadges/Edubadges+Example+BadgeClass\"> the wiki </a> for examples.",
        badgeClassLanguageOfInstruction:
            "The language used in obtaining this edubadge.",
        badgeClassLearningOutcome:
            "Describe the learning outcomes or learning goals. Recorded in the Teaching and Examination Regulations.",
        //badgeClassLearningIssuer: "badgeClassLearningIssuer",
        badgeClassIsPrivate:
            "If checked, this badge class will not appear in the catalog. Note that you cannot award edubadges from a private badge class.",
        badgeClassEvidenceRequired:
            "If checked, any awards based on this badge class require an evidence of the achievement to be filled in.",
        badgeClassNarrativeRequired:
            "If checked, any awards based on this badge class require an narrative to be filled in.",
        badgeClassNarrativeStudentRequired:
            "If checked, any enrollments for this badge class require a motivation of why the enrollment is justified.",
        badgeClassEvidenceStudentRequired:
            "If checked, any enrollments for this badge class require an evidence URL of why the enrollment is justified.",
        badgeClassAwardNonValidatedNameAllowed:
            "If checked, non-formal edubadges (edubadges without Study load) can be awarded to non-validated accounts.",
        badgeClassIsMicroCredentials:
            "If checked, then this badge class is participating in the Microcredentials pilot." +
            'See <a target="_blank" href="https://wiki.surfnet.nl/display/Edubadges/Handleiding+Metadata+ihkv+de+pilot+microcredentials"> the wiki </a> for a manual.',
        badgeClassDirectAwardingDisabled:
            "If checked, then this badge class can not be direct awarded",
        badgeClassSelfEnrollmentDisabled:
            "If checked, then this badge class can not be requested by students",
        badgeClassCriteriaRequirements:
            "What criteria does the learner meet to be eligible for this edubadge?",
        //badgeClassTypeOfStudyLoad: "badgeClassTypeOfStudyLoad",
        badgeClassStudyLoadNumber: "Study Tax Hours (SBU in Hours)",
        badgeClassTimeInvestmentNumber:
            "How many hours have to be invested to acquire this non-formal edubadge.",
        //badgeClassSBUNumber: "badgeClassSBULoadNumber",
        badgeClassStudyLoadEcts:
            "The European Credit Transfer System (ECTS) is a points system used by universities and agreed by governments, that makes international education more easily comparable across borders.",
        //badgeClassProgrammeIdentifier: "badgeClassProgrammeIdentifier",
        badgeClassNLQFLevel:
            "Indicate at which qualification level this edubadge is derived.",
        //badgeClassRelatedFrameworkName: "badgeClassRelatedFrameworkName",
        //badgeClassRelatedFrameworkFramework: "badgeClassRelatedFrameworkFramework",
        //badgeClassRelatedFrameworkURL: "badgeClassRelatedFrameworkURL",
        //badgeClassRelatedFrameworkCode: "badgeClassRelatedFrameworkCode",
        //badgeClassRelatedFrameworkDescription: "badgeClassRelatedFrameworkDescription",
        facultyName:
            "Avoid abbreviations, make sure your name is recognisable, also to external parties.",
        facultyOnBehalfOf:
            "When checked, the badge class indicates that edubadges are issued on behalf of this issuer group. Can be used when issuing on behalf of a consortium.",
        facultyOnBehalfOfUrl: "Issue on behalf of other organisation",
        facultyInstitutionType:
            "All edubadges of this issuer group will inherit the institution type. This is to determine the educational level of a badgeclass for hybrid institutions",
        facultyVisibilityType:
            "All eduBadges of Public issuer groups are displayed in the Catalog",
        facultyOnBehalfOfDisplayName:
            "When Issue on behalf of name issuer group is checked, this display name will used instead of the actual name of the issuer group.",
        //facultyDescriptionEn: "facultyDescriptionEn",
        //facultyDescriptionNl: "facultyDescriptionNl",
        //issuerFaculty: "issuerFaculty",
        //issuerImage: "issuerImage",
        issuerName:
            "Avoid abbreviations, make sure your name is recognisable, also to external parties.",
        //issuerDescriptionEn: "issuerDescriptionEn",
        //issuerDescriptionNl: "issuerDescriptionNl",
        issuerURL: "Use a URL that will not change. (Persistent URL).",
        //issuerEmail: "issuerEmail",
        //institutionImage: "institutionImage",
        //institutionName: "institutionName",
        //institutionDescriptionEn: "institutionDescriptionEn",
        //institutionDescriptionNl: "institutionDescriptionNl",
        institutionBrin:
            "Institution code issued by DUO. (used to be the BRIN code)",
        institutionGradingTable:
            "Use a URL that will not change. (Persistent URL).",
        institutionLinkedinOrgIdentifier:
            "LinkedIn identifier for this institution / organisation",
        institutionAwardAllowedInstitutions:
            "Select other institutions from which<br/>students potentially may be awarded edubadges.",
        institutionBadgeClassTags:
            "Select or add tags. The tags can be linked to badge classes",
        badgeclassAwardAllowedInstitutions:
            "Select other institutions from which<br/>students may be awarded this edubadge.",
        enrollmentEvidenceNarrative:
            "A personal narrative that can be added to this awarded edubadge.",
        enrollmentEvidenceURL:
            "The URI of a webpage presenting the evidence of this achievement.",
        enrollmentGrade: "The grade you have assigned the student of this badge.",
        enrollmentEvidenceName:
            "A descriptive title of the evidence of this achievement.",
        enrollmentEvidenceDescription:
            "A longer description of the evidence of this achievement.",
        demoEnvironment: "All data is deleted every month.",
        directAwards:
            "Direct awards are edubadges that are awarded by the teacher to students by email. The number(s) below are direct awards that are either still not accepted, rejected or revoked",
        enrollments:
            "Enrollments are requested by students and once approved will be new awarded edubadges. The number(s) below are enrollments that have not been approved by the teacher or are denied",
        toggleBadgeCollectionPublic:
            "A public collection can be shared with other whereas a private collection can not.",
        collectionBadgeInstances:
            "Select all the edubadges you want to put in this collection",
        importedBadgeEmail:
            "Your email that was used when this edubadge was issued",
        importedBadgeImageUrl: "The URL to the edubadge JSON data",
        importedBadgeImage: "The png or svg edubadge image file",
        endorsementDescription: "The description of the endorsement",
        endorsementClaim:
            "The claim describes why and how this badge class is similar to the endorsed badge",
        endorsementBadgeClass: "The badge class you would like to endorse.",
        awardScheduling:
            "Enter a scheduling date to set the date / time when the emails will be send out to the users who are awarded the badge",
        enableAwardOnEmail: "When selected you can award this badge solely based on the email. The email will be matched against the eduID email of the user.<br/><br/> The user needs to have a validated name, but  no connection to an educational institution is required.",
        badgeClassIsStackable:
            "A stackable badge-class can be linked to another badge-class",
    },
    badgeOverview: {
        faculty: "Issuer Group",
        issuer: "Issuer",
    },
    catalog: {
        name: "Catalog",
        education: {
            WO: "WO",
            HBO: "HBO",
            MBO: "MBO",
            NONE: "SURF",
        },
        studyLoad: {
            NO_STUDYLOAD: "No studyload",
            ECTS_0_5: "0-5 ECTS (WO/HBO)",
            ECTS_6_10: "6-10 ECTS (WO/HBO)",
            ECTS_10_MORE: "> 10 ECTS (WO/HBO)",
            HOURS_0_60: "0-60 hours (MBO)",
            HOURS_61_120: "61-120 hours (MBO)",
            HOURS_120_MORE: "> 120 hours (MBO)",
        },
        eqf: {
            eqfNone: "No EQF level",
            eqf: "EQF level {{level}}",
        },
        badgeClassType: {
            ARCHIVED: "Archived",
            ALL: "All",
            MICRO_CREDENTIALS: "Pilot Microcredentials",
            DRAFT: "Draft",
            REGULAR: "Regular",
            EXTRA_CURRICULAR: "Extra-curricular",
        },
        issuer: {
            contact: "Contact the issuer",
            website: "Visit issuer website",
            gradingTable: "View the grading table",
            institution: "Part of "
        },
        faculty: {
            website: "Website organization",
        },
        busy: "Fetching all information. This might take a while.... Take a ☕️",
    },
    badgeAwardOptions: {
        directAward: "Award edubadge(s)",
        bulkAward: "Bulk award from csv",
        or: "-or-",
        inviteEnrollements: "Invite people to enroll",
        copyBadgeClassId: "Copy the identifier for SIS integration",
        badgeClassArchived: "Can not award archived badge class",
        ltiAward: "Award from LTI import",
    },
    badgeAward: {
        directAward: {
            title: "Award edubadges directly",
            subtitle:
                "Your request will be sent, and you'll be notified when it's accepted or denied.",
            waringEnrollments:
                "There are {{count}} enrollments for this badge class. ",
            toToEnrollments: "Maybe check them first?",
            addAnother: "+ Add another",
            cancel: "Cancel",
            award: "Award",
            schedulingDate: "Enable scheduling",
            enableAwardOnEmail: "Enable awarding based on private email",
            addEvidence: "Narrative",
            addEvidenceGrade: "Narrative & Grade",
            editEvidence: "Edit narrative",
            grade: "Grade",
            metaData: "Add metadata",
            editMetaData: "Edit metadata",
            processing: "Processing {{count}} direct awards. Please be patient...",
            flash: {
                created: "Direct awards have been sent",
            },
        },
        ltiAward: {
            title: "Award edubadges directly from LTI import",
            noUsers:
                "No students with a valid <em>lis_person_sourcedid</em> are imported from <strong>{{name}}</strong>. ",
            usersImported:
                "{{nbr}} students with a valid <em>lis_person_sourcedid</em> are imported from <strong>{{name}}</strong>. ",
            checkContext: " See all users in the LTI context.",
        },
        bulkAward: {
            title: "Bulk award from CSV",
            subtitle:
                "This file needs to fit the exact format of edubadges. If you are not sure, please download our " +
                '<a href="{{sample}}" download="sample_direct_award.csv">Sample CSV Awardfile</a> first.',
            or: "- or -",
            browse: "Browse",
            award: "Upload your Awardfile",
            wrong: "Your upload contains {{count}} invalid entries which are removed from the upload.",
            duplicate: "Your upload contains {{count}} duplicate entries which are removed from the upload.",
            eppnExisting: "Your upload contains {{count}} EPPN's (StudentID'd) with outstanding unaccepted or scheduled direct awards which are removed from the upload.",
            emailExisting: "Your upload contains {{count}} emails that have already received this badgeclass which are removed from the upload",
            missingEvidenceOrNarrative: "Your upload contains {{count}} entries missing narrative and / or evidence which are removed from the upload.",
            good: "Parsed {{count}} entries for upload.",
            view: "View",
            hide: "Hide",
            evidenceIncluded: "(including evidence)",
            evidenceRequired: "Evidence",
            narrativeRequired: "Narrative",
            gradeRequired: "Grade",
            additionalRequirements:
                "This badge class requires additional descriptive metadata to be awarded:",
            flash: {
                created: "Bulk awards are sent",
            },
            details: {
                breadCrumb: "Direct award details",
                header: "Direct award bundle",
                title: "Award status (issued {{issued})",
                mail: "Email",
                studentId: "Student ID",
                status: "Status",
                info: "The identifier for this direct award bundle is the student {{identifier}}",
                eppn: "ID (EPPN)",
                email: "mail",
            },
        },
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
            SCHEDULED: "Scheduled",
            PENDING: "Pending",
            CLAIMED: "Claimed",
            REVOKED: "Revoked",
            REJECTED: "Rejected",
        },
    },
    demo: {
        info:
            "This is the demo environment of edubadges.<br/><br/>All of the data is cleared each month and after each new " +
            "deployment.<br/><br/>" +
            "If you have any question about the demo environment please contact us" +
            " at <a href='mailto:support@edubadges.nl'>support@edubadges.nl</a> ",
    },
    feedback: {
        title: "Provide Feedback",
        subTitle: "Share your thoughts",
        info: "Like what you see? Have a suggestion? Let us know what you think here!",
        disclaimer:
            "The SURF edubadges team will use this information, in conjunction with other information we may have regarding your account, to fix problems, improve our products and help you. " +
            "We may follow up with you regarding your feedback using the email address associated with your account. " +
            "You are responsible for ensuring that your feedback does not contain any confidential, sensitive, or personal information.",
        send: "Send feedback",
        flash: "Your feedback has successfully been send. Thanks!",
    },
    insights: {
        awardedBadges: "Edubadges in backpack",
        totalAwarded: "Total edubadges in backpack",
        directAwarded: "Direct awarded and claimed",
        requested: "Requested and awarded",
        enrollments: "Requested",
        pending: "Pending by institution",
        acceptedAndApproved: "Requested and awarded",
        unclaimed: "Unclaimed by student",
        directAwards: "Direct awarded",
        directAwardDenied: "Rejected by student",
        requestedDeniedTooltip: "Denied by teacher after request",
        revoked: "Revoked after awarded",
        revokedBefore: "Revoked before awarded",
        requestedDenied: "Denied by institution",
        claimRate: "Claim rate",
        numbers: "The numbers add up",
        badgeClasses: "Badge classes",
        issuers: "Issuers",
        issuerGroups: "Issuer groups",
        institution: "Institution",
        users: "Portal users",
        backpack: "Backpack users",
        crunching: "Crunching the numbers just for you...",
        date: "Date",
        reset: "Reset",
        total: "Total",
        totalDirectAwards: "Total send",
        totalRequested: "Total requested",
        directAwardedAccepted: "Direct awarded and claimed",
        public: "Public edubadges",
        noContent: "No edubadges were awarded with the provided filters",
        term: "Term",
        month: "Month",
        tableHeader: "Edubadges for {{institution}} in {{year}}",
        allYears: "all years",
        allInstitutions: "all institutions",
        tooltips: {
            awardedBadges:
                "Here you can see the total of all edubadges that are included in the backpack with the recipients.<br/><br/> " +
                "These are divided into edubadges issued directly by the educational institution and accepted by the recipient and edubadges requested and awarded by the educational institution.<br/><br/> " +
                "Finally, you can see how many edubadges are shared in the backpack.",
            directAwards:
                "Here you can see the total of all edubadges issued directly by the institution. Then you will see the number per status.<br/><br/>" +
                "The claim rate is the percentage of edubadges that have been awarded and accepted directly by the institution.<br/><br/>" +
                "Claim rate = (claimed)/total sent) x 100%",
            enrollments:
                "Here you can see the total of all edubadges that have been requested by students.",
            totalAwarded:
                "The total number of awarded badge classes resulting in edubadge instances",
            directAwarded: "The number of the awarded badges through direct awarding",
            requested:
                "The number of the awarded badges requested by students and accepted by teachers",
            public: "The number of badges that are made public available by students",
            totalDirectAwards: "Total number of direct awards created",
            unclaimed: "Direct awards that have not been accepted by students",
            claimRate:
                "The claim rate is the total number of accepted direct awarded badges as a percentage of the total of direct awards.",
            revoked:
                "Awarded badges that has been revoked by the teacher and as such are no longer valid",
            revokedBefore:
                "Direct awards that have been revoked by a teacher and as such have not been awarded the student",
            directAwardDenied: "Direct awards that have been denied by the student",
            totalEnrollments: "Total number of enrollments created",
            pendingEnrollments:
                "Student enrollments that have not been accepted / denied by a teacher",
            requestedDenied: "Student enrollments that have been denied by a teacher",
        },
    },
    collections: {
        title: "Collections",
        info: "A collection of edubadges that you as a whole can share with others.",
        zeroState: "You have not created any collections of edubadges yet...",
        zeroStateBadges: "You have not added any edubadges yet...",
        create: "Create a new collection",
        shareable: "Collections that you can share",
        requiresPublicBadgePresent:
            "A public collection requires at least one public edubadge",
        all: "All your collections",
        byRecent: "Most recent",
        bySize: "Number of edubadges",
        byPublic: "Public / private",
        deleteConfirmation: "Delete collection {{name}}",
        deleteConfirmationQuestion:
            "Are you sure you want to delete collection {{name}}.",
        deleteFlash: "Collection {{name}] deleted.",
        privatePublic: "Check to make this collection public",
        share: {
            title: "Not shareable",
            publish: "Make this collection publicly visible",
            publishConfirmation:
                "Are you sure you want to make this collection publicly visible?<br/><br/>If you make this collection public then it is viewable for everyone with the link.",
            private: "Make this collection private",
            privateConfirmation:
                "Are you sure you want to make this collection private?",
        },
        placeholders: {
            name: "Name of the collection",
            description: "Description of the collection",
            chosenBadges: "Edubadges in this collection",
        },
        new: "New collection",
    },
    impersonate: {
        confirmation: "Are you sure you want to impersonate {{name}}?",
        title: "Impersonate",
    },
    importedBadges: {
        title: "Imported badges",
        info: "All the digital badges that you acquired and imported.",
        zeroState: "You have not imported any external badges yet...",
        import: "Import badge",
        importWindow: {
            title: "Import your external badge",
            question:
                "Upload an edubadge image that you’ve acquired from an external issuer.",
            disclaimer: "Badge image must be in either .svg or .png format.",
            submit: "Import Badge",
            urlPlaceholder:
                "https://api.eu.badgr.io/public/assertions/-kDl8isfQoKrMHrqOx5Thw",
            urlInfo: "Or paste the URL where the badge is hosted.",
            emailInfo: "Enter the email which this badge was issued to.",
        },
        codeWindow: {
            title: "Validation code",
            question:
                "An email has been send to {{email}}. Please enter the 6 characters code from the email to finish the import.",
            submit: "Verify",
            codePlaceholder: "Enter the verification code",
        },
        error: {
            url: "The URL is not a valid badge URL",
            image: "The uploaded image is not a valid edubadge image",
            email: "This email does not match the email of the imported badge",
            duplicate:
                "You have already imported this badge. Duplicates are not allowed",
        },
        codeMismatch: "The entered code is invalid",
        details: {
            delete: "Remove imported badge {{name}}",
            import: "Imported badges",
            imported: "Imported badge",
            remove: "Remove",
            validate: "Validate",
            validation: "Badge validation",
            validationResults: "Badge validation results",
            publicInfo: "This badge is hosted at {{url}} and is public.",
            deleteConfirmation:
                "Are you sure you want to remove the imported badge {{name}} from your backback. Note that this does not delete the original badge.",
            flashDeleted: "Removed imported badge {{name}} from your backback",
        },
    },
    ltiBadgeClass: {
        title: "LTI Course information",
        linked:
            "Badgeclass <strong>{{name}}</strong> is linked to LTI course <strong>{{lti}}</strong>.",
        notLinked:
            "Badgeclass <strong>{{name}}</strong> is currently not linked to a LTI course.",
        linkPossible:
            "You can link badge class <strong>{{name}}</strong> to LTI course {{lti}}.",
        linkNotPossible:
            "To link badge classes to a LTI course you need to access Edubadges from within a LTI platform.",
        unlinkNotPossible:
            "The link between badge class {{name}} and LTI course {{lti}} can be removed if you access Edubadges from within the LTI platform {{platform}}.",
        course: {
            title: "Title",
            label: "Label",
            createdAt: "Linked at",
            platform: "Platform",
            identifier: "LTI id",
        },
        tool: {
            info: "You are currently logged in with LTI platform <strong>{{platform}}</strong> from institution <strong>{{institution}}</strong> with LTI context course <strong>{{lti}}</strong>.",
        },
        actions: {
            link: "Link",
            unlink: "Unlink",
        },
        confirmations: {
            link: "Are you sure you want to link badge class {{name}} to LTI course {{lti}}?",
            unlink:
                "Are you sure you want to remove the link between badge class {{name}} and LTI course {{lti}}?",
        },
        flash: {
            link: "Linked badge class {{name}} to LTI course {{lti}}",
            unlink: "Unlinked badge class {{name}} from LTI course {{lti}}",
        },
    },
    lti: {
        path: "LTI",
        title: "LTI Information",
        info: "The edubadges applications currently runs within a LMS LTI context.",
        login:
            "You are logged in as <strong>{{name}}</strong> in LMS <strong>{{lti}}</strong>.",
        context: {
            title: "LTI message launch",
            issuer: "Issuer",
            version: "Version",
            email: "Email",
            course: "Course context",
            platform: {
                name: "Naam",
                vendor: "Vendor",
            },
            roles: "Roles",
            placement: "Placement",
        },
        users: {
            title: "LTI members",
            subTitle: "LTI members",
            name: "Name",
            email: "Email",
            sisId: "SIS Id",
            status: "Status",
            roles: "Roles",
        },
        grades: {
            title: "LTI grades",
            subTitle: "LTI grades",
            user: "user",
            assignment: "Assignment",
            resultScore: "Results score",
            resultMaximum: "Max result",
        },
    },
    notifications: {
        update: "Update",
        title: "Your notifications settings",
        info: "For each selected badge class you will receive a mail notification if a student enrolls for this edubadge or if someone requests an endorsement for this edubadge.",
        confirmationTitle: "Confirmation",
        confirmationQuestion:
            "Are you sure you want to update your notification settings?",
        updated: "Your notification settings were updated",
    },
    toggle: {
        showMore: "Show more...",
        showLess: "Show less...",
    },
    endorsements: {
        request: "Request endorsement",
        info: "The endorsement request will be send to all awarders of the badge class for approval.",
        description: "Description",
        descriptionPlaceholder: "Description of the endorsement",
        badgeClassDescription: "Description badge class",
        claimPlaceholder: "Claim of the endorsement",
        badgeClassPlaceholder: "Search and select a badge class...",
        badgeClass: "The endorsed badge class",
        claim: "Claim",
        submit: "Request",
        requested: "Requested",
        status: "Status",
        endorser: "Endorser",
        endorsee: "Endorsee",
        statuses: {
            unaccepted: "Pending acceptance",
            accepted: "Accepted",
            rejected: "Rejected",
            revoked: "Revoked",
        },
        created: "Requested on",
        reasons: {
            revoke: "Revocation reason",
            reject: "Rejection reason",
            resend: "Personal message",
        },
        tableTitle: "All endorsements",
        tableTitleEndorsed: "All endorsements requests",
        accept: "Accept",
        reject: "Reject",
        revoke: "Revoke",
        delete: "Delete",
        resend: "Resend",
        confirm: {
            accept: "Accept endorsement request",
            reject: "Reject endorsement request",
            revoke: "Revoke endorsement",
            delete: "Delete endorsement",
            resend: "Resend endorsement request",
        },
        confirmations: {
            accept: "Are you sure you want to accept this endorsement request?",
            reject: "Are you sure you want to reject this endorsement request?",
            revoke: "Are you sure you want to revoke this endorsement request?",
            delete: "Are you sure you want to delete this endorsement request?",
            resend: "Are you sure you want to resend this endorsement request?",
        },
        flash: {
            created: "Endorsement request has been send",
            accept: "Endorsement request has been accepted",
            reject: "Endorsement request has been rejected",
            revoke: "Endorsement has been revoked",
            delete: "Endorsement has been deleted",
            resend: "Endorsement request has been resend",
        },
    },
    managementQueries: {
        title: "Management queries",
        institutionAdmins: "Institution admins",
        institutionBadges: "Badge overview",
        institutionMicroCredentials: "Microcredentials count",
        countMicroCredentials: "Microcredentials assertions per user",
        microCredentialsBadges: "Microcredentials badges",
        institutionBadgeOverview: "Awarded badges overview",
        issuerMembers: "Issuer members",
        clear: "Clear",
        download: "Download",
        copy: "Copy",
        show: "Show",
        hide: "Hide",
        select: "Select the query to run...",
        loaded:
            "{{name}} query loaded in {{time}}ms and ready to copy, download or show.....",
    },
    newBadgeClassForm: {
        badgeClassType: "Type edubadge",
        modal: {
            choose: "Choose a badge class type",
            tipPre: "Tip: You can also duplicate an ",
            tipAction: "existing badge class",
            tip: "Clik on an existing badge class and choose the option to copy the badge class in the right header section. Go to the ",
            issuerLink: "overview of all badge classes for issuer {{name}}",
            shortCopy: "",
            create: "Create",
            types: {
                micro_credential: "Microcredential",
                regular: "Regular",
                extra_curricular: "Extra curricular",
            },
            info: {
                micro_credential:
                    "A badge class for micro-credentials with the quality framework for professionals HBO/WO or MBO and all metadata in accordance with the EU recommendations.",
                regular:
                    "A badge class for acquired knowledge and skills that fall within the curriculum of a recognized study program. ECTS/SBU are attached to this badge class.",
                extra_curricular:
                    "A badge class for acquired knowledge and skills that are not part of the curriculum of a recognized program. There are no ECTS/SBU attached to badge class.",
            },
            notAvailableTypeInfo: {
                micro_credential:
                    "Your institution {{name}} is not configured to award mirco-credential badges.",
                regular:
                    "Your institution {{name}} is missing the formal 'grondslag' and therefore can't issue regular badges.",
                extra_curricular:
                    "Your institution {{name}} is missing the informal 'grondslag' and therefore can't issue extra curricular badges.",
            },
        },
        form: {
            placeHolder: "Please select...",
            markupExample: "Insert an example in MarkDown",
            programmeInformation: "Program information",
            assessmentInformation: "Assessment information",
            qualityAssurance: "Quality assurance",
            awardSettings: "Award settings",
            relatedEducationalFramework: "Related Educational Frameworks",
            switchToStudyLoad: "Switch to using study load (hours) instead of ECTS",
            switchToECTS: "Switch to using Credit Points (ECTS) instead of hours",
            other: "Other",
            participation: {
                name: "Form of participation",
                options: {
                    online: "Online",
                    onsite: "On-site",
                    blended: "Blended",
                    work_experience: "Work experience",
                },
            },
            assessment: {
                name: "Type of assessment",
                options: {
                    written_exam: "(Written) Exam",
                    report_paper: "Report / paper",
                    behavioural_assessment: "Behavioural assessment",
                    professional_product: "Professional product",
                    development_report: "Development report / reflection report",
                    portfolio_assessment: "Portfolio / portfolio assessment",
                    oram_exam: "Presentation / Oral exam",
                    personalized_assessment: "Personalized type of assessment",
                },
                supervision: "Supervision & ID verification",
                supervised: "Was the assessment supervised?",
                idVerification: "Was the student's identity verified?",
                supervisionOptions: {
                    o1: "Supervised with identity verification",
                    o2: "Supervised",
                    o3: "With identity verification",
                    o4: "Not supervised without identity verification",
                },
            },
            directAward: {
                title: "Direct awards",
                directAwardAllowed: "Direct awarding allowed?",
                details: "Direct award details",
                awardNonValidatedNameAllowed: "Award to non-validated account allowed?",
                evidenceURL: "Evidence (URL) required when issuing?",
                narrative: "Narrative required when issuing?",
            },
            selfEnrollment: {
                title: "Self enrollment",
                selfEnrollmentAllowed: "Self enrollment allowed?",
                details: "Self enrollment details",
                evidenceURL: "Evidence (URL) required for enrollment?",
                narrative: "Motivation required for enrollment?",
            },
            stackable: {
                notStackable: "No, stand alone badge",
                stackable: "Yes, stackable",
            },
            gradeAchieved: {
                name: "Grade / result achieved",
                yes: "Grade achieved required",
                no: "Grade achieved not required",
            },
        },
        saveAsDraft: "Save as draft",
        draft: "Draft",
        preview: "Preview badge class",
        publish: "Publish",
        requiredMicroCredentialFramework:
            "Quality framework Microcredentials for Professionals HBO and WO",
        requiredMicroCredentialFrameworkMBO:
            "Quality framework Microcredentials for Professionals MBO",
        link: " - (link)",
        programme: "The programme",
        assessment: "The assessment",
        badge: "The badge",
        errors:
            "There are required attributes missing or invalid. Please review the input errors.",
        stackable: "Stackable",
        isStackable: "Stackable towards another badge?",
    },
    institutionTags: {
        action: "Perform action...",
        addTag: "Add new tag",
        noAutoFlush:
            "If you make changes to the tags or add tags, be sure to save those changes.",
        status: {
            new: "New",
            active: "Active",
            archived: "Archive",
            deleted: "Delete",
        },
        usages: "Tag is being used in the following badges: {{badges}}",
        noUsages: "Tag is not being used in badges, consider deleting it",
        and: "and",
    },
};
