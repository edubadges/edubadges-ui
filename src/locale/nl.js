import I18n from "i18n-js";

I18n.translations.nl = {
    routes: {
        backpack: "Mijn backpack",
        "badge-requests": "Aanvragen voor edubadges",
        collections: "Collecties",
        archived: "Archief",
        "import": "Imports",
        profile: "Account",
    },
    header: {
        logout: "Logout",
        profile: "Mijn profiel",
        home: "Mijn backpack",
        permissions: "Mijn permissies",
        feedback: "Verstuur feedback",
        demo: "Demo omgeving",
        impersonate: "Impersoneer",
        clearImpersonation: "Stop impersonatie",
        nav: {
            badgeclasses: "Badge classes",
            manage: "Beheer",
            users: "Gebruikers",
            catalog: "Catalogus",
            insights: "Inzicht",
            lti: "LTI"
        },
    },
    login: {
        title: "Never stop learning",
        loginToEnrol: "Login om deze edubadge aan te vragen",
        loginToEnrolInfo: "<strong>Let op!</strong> Je kan deze edubadge alleen aanvragen als je staat ingeschreven bij één van deze instellingen: <strong>{{name}}</strong>.",
        loginToEnrolInfoOne: "<strong>Let op!</strong> Je kan deze edubadge alleen aanvragen als je staat ingeschreven bij <strong>{{name}}</strong>.",
        loginToEnrolInfoAll: "<strong>Let op!</strong> Je kan deze edubadge alleen aanvragen als je instelling is aangesloten op edubadges.",
        loginAllowedWithoutValidatedName: "Je kan deze badge aanvragen als een eduID gast gebruiker.",
        badgeClassArchived: "Deze edubadge is gearchiveerd en kan niet langer worden aangevraagd.",
        destination: "Wat zou je willen doen?",
        description:
            "Edubadges zijn digitale certificaten die aantonen dat de eigenaar bepaalde vaardigheden of kennis heeft verworven. Edubadges kunnen worden uitgereikt voor zowel geaccrediteerd onderwijs als voor extracurriculaire activiteiten.",
        student: {
            title: "<strong style='font-size: 38px'>C</strong>ollect",
            subtitle: "De backpack is de plek om  edubadges te ontvangen en verzamelen",
            noEduId: "Een eduID is nodig om je backpack aan te maken en te gebruiken. Het maken van een eduID duurt minder dan 30 seconden.",
            action: "Open je backpack",
        },
        catalog: {
            title: "<strong style='font-size: 38px'>B</strong>rowse",
            subtitle: "Momenteel zijn er {{badgeInstancesCount}} edubadges uitgegeven door de instellingen.",
            info: "De catalogus toont alle badge classes van alle instellingen die edubadges gebruiken.",
            beta: "{{badgeClassesCount}} Badge Classes",
            action: "Open de catalogus",
        },
        teacher: {
            title: "<strong style='font-size: 38px'>A</strong>ward",
            subtitle: "Ken edubadges, de micro credentials van de toekomst, toe aan je studenten.",
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
        university: "Instelling",
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
        deleteHeader: "Je edubadges account verwijderen",
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
        withdrawPermission: "Mijn akkoordverklaring intrekken",
        withdrawPermissionConfirmation: "Weet je zeker dat je je akkoordverklaring wil intrekken voor {{name}}?",
    },
    modal: {
        cancel: "Annuleer",
        confirm: "Bevestig",
    },
    backpack: {
        title: "Behaalde edubadges",
    },
    archived: {
        title: "Je gearchiveerde edubadges",
    },
    notFound: {
        main: "Edubadge niet gevonden",
        publicBadge: "Deze edubadge is niet meer publiek zichtbaar of is ingetrokken.",
        issuer: "Deze issuer is verwijderd."
    },
    teacher: {
        sidebar: {
            filterBadges: "Filter badge classes",
            filterAwards: "Filter awards",
            filterUsers: "Filter gebruikers",
            filters: {
                faculties: "Issuer groepen",
                issuers: "Issuers",
                educations: "Educatie niveau level",
                institutions: "Instelling",
                studyLoads: "Studyload",
                eqfs: "NLQF niveau",
                roles: "Rollen (hoogste)",
                issued: "Uitgegeven",
                awardType: "Award type",
                status: "Status",
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
            badgesCount: "{{count}} edubadges uitgegeven",
            requestedBadges: "Open aanvragen",
            noRequestedBadges: "Geen open aanvragen",
            requestedBadgesCount: "{{count}} Open aanvragen",
            created: "Datum gecreëerd",
            recipients: "Ontvangers",
            enrollments: "Open aanvragen",
            studyLoad: "Studielast",
            timeInvestment: "Tijd investering",
            educationProgramIdentifier: "Opleidingscode",
            ects: "{{value}} ECTS",
            hours: "{{value}} uren",
            canAward: "Badge classes die je kunt uitreiken",
            allBadges: "Alle badge classes",
            mostRecent: "Meest recent",
            mostAwarded: "Hoogste aantal toegekend",
            mostRequested: "Meest aangevraagd",
            awardAllowedInstitutions: "Uitreiken aan instelling",
            showMoreInstitutions: "Toon meer instellingen",
            showLessInstitutions: "Toon minder instellingen",
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
        publicPrivate: "Je edubadge staat op privé, alleen jij kan deze edubadge zien.",
        publicPrivatePublic: "Je edubadge staat niet op privé, iedereen met de publieke link kan deze edubadge zien en downloaden.",
        publicPrivateRejected: "Voordat je deze edubadge publiek zichtbaar kan maken, moet je deze edubadge eerst accepteren.",
        revoked: "Deze edubadge is ingetrokken door de uitgever",
        revokedWithReason: "Deze edubadge is ingetrokken door de uitgever met als reden: '{{revocationReason}}'",
        collections: {
            title: "Voe toe aan collectie",
            question: "Selecteer een collectie om deze edubadge aan toe te voegen",
            placeholder: "Selecteer...",
            flash: "Edubadge {{name}} toegevoegd aan de collectie {{col}}"
        },
        confirmation: {
            publish: "Maak deze edubadge publiekelijk zichtbaar",
            private: "Maak deze edubadge privé",
            publishConfirmation: "Weet je zeker dat je deze edubadge publiek zichtbaar wilt maken?<b/><br/>Als je deze edubadge publiek maakt, wordt je gevalideerde naam <strong>{{name}}</strong> weergegeven in het validatiegedeelte van de openbare badge-webpagina.",
            privateConfirmation: "Weet je het zeker dat je deze edubadge privé wilt maken",
            publishEvidenceConfirmation: "Wil je het bewijs sectie ook toevoegen aan de publiek beschikbare informatie?",
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
        none: "Je hebt geen openstaande edubadge aanvragen op dit moment.",
        noneArchived: "Je hebt nog geen gearchiveerde edubadges."
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
            directAwardBundle: "Award status",
            profile: "Profiel",
            requestedBadges: "Aangevraagde edubadges",
            lti: "LTI",
            ltiContext: "Context",
            ltiUsers: "Gebruikers",
            ltiGrades: "Cijfers"
        },
        edit: {
            edit: "wijzig",
            institution: "Wijzig onderwijsinstelling",
            faculty: "Wijzig issuer group",
            issuer: "Wijzig issuer",
            badgeclass: "Wijzig badge class",
            save: "Opslaan",
            cancel: "Annuleren",
            archive: "Archieveren"
        },
        copy: {
            badgeclass: "Kopiëer badge class",
        },
        delete: {
            delete: "verwijder",
            info: {
                assertionsBlock: {
                    faculty: "Issuer group bevat edubadges die niet ingetrokken zijn en kan niet verwijderd worden.",
                    issuer: "Issuer bevat edubadges die niet ingetrokken zijn. De issuer kan daarom niet verwijderd worden.",
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
        215: "Het is niet mogelijk een formele badge class aan te maken voor een instelling die geen grondslag heeft voor formele edubadges.",
        216: "Het is niet mogelijk een informele badge class aan te maken voor een instelling die geen grondslag heeft voor informele edubadges.",
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
        907: "Dit is een gereserveerde naam voor badge classes",
        908: "Kan een Issuer met deze Engelse naam niet aanmaken in deze Issuer group. Er bestaat er al een met dezelfde Engelse naam.",
        909: "Vul de opleidingscode of verwijder deze rubriek.",
        910: "Invullen van narratief of van URL is verplicht.",
        911: "Kan een badge class met deze naam niet aanmaken in deze Issuer. Er bestaat er al een met dezelfde naam.",
        912: "Invullen van een Nederlandse of Engelse naam is verplicht.",
        913: "Invullen van een Nederlandse of Engelse beschrijving is verplicht.",
        914: "Kan een Issuer met deze Nederlandse naam niet aanmaken in deze Issuer group. Er bestaat er al een met dezelfde Nederlandse naam.",
        915: "Invullen van een Nederlandse of Engelse url is verplicht.",
        916: "Kan een Issuer Groep met deze Nederlandse naam niet aanmaken in deze instelling. Er bestaat er al een met dezelfde Nederlandse naam.",
        917: "Kan een Issuer Groep met deze Engelse naam niet aanmaken in deze instelling. Er bestaat er al een met dezelfde Engelse naam.",
        918: "Invullen van een Nederlands of Engelse logo is verplicht.",
        919: "Kan een instelling met deze Nederlandse naam niet aanmaken. Er bestaat er al een met dezelfde Nederlandse naam.",
        920: "Kan een instelling met deze Engelse naam niet aanmaken. Er bestaat er al een met dezelfde Engelse naam.",
        921: "Ongeldige URL",
        922: "Te veel Gerelateerd onderwijskundig raamwerk objecten. De maximum is 8.",
        923: "Invullen van een Engelse of Nederlandse url is verplicht.",
        924: "Invullen van een Engelse of Nederlandse naam is verplicht.",
        925: "Invullen van een Engelse of Nederlandse beschrijving is verplicht.",
        926: "Invullen van een Engels of Nederlandse logo is verplicht.",
        927: "Email is niet valide",
        928: "EPPN is verplicht",
        929: "Email is een duplicaat",
        930: "EPPN is een duplicaat",
        931: "Er is al een nog niet geaccepteerde direct award voor deze EPPN",
        932: "Een narratief is verplicht voor het awarden van deze edubadge",
        933: "Een URL is verplicht voor het awarden van deze edubadge",
        934: "De opleidingscode is verplicht als er studiepunten zijn opgegeven.",
        935: "Vul de tijd investering of verwijder deze rubriek.",
        936: "Kan geen collectie aanmaken met deze naam. Er bestaat al een collectie met deze naam.",
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
        delete: "Verwijder gebruiker",
        deleteConfirmation: "Weet je zeker dat je gebruiker {{name}} wilt verwijderen?",
        deleteFlash: "Gebruiker {{name}} is verwijderd",
        headerControl: "Gebruikers in ",
        roles: {
            institution_staff: "Instellingsadmin",
            issuer_group_staff: "Issuer group admin",
            issuer_group_awarder: "Issuer group Awarder",
            issuer_group_admin: "Issuer group Admin",
            issuer_staff: "Issuer admin",
            issuer_admin: "Issuer admin",
            issuer_awarder: "Issuer awarder",
            badge_class_owner: "Badge class admin",
            badge_class_editor: "Badge class editor",
            badge_class_awarder: "Badge class awarder",
            viewer: "Badge raadpleger",
        },
        flash: {
            makeUserInstitutionAdmin: "{{name}} heeft de instellingsadmin-rechten gekregen",
            removeUserInstitutionAdmin: "De instellingsadmin-rechten zijn verwijderd van {{name}}",
            makeUserIssuerGroupAdmin: "{{name}} heeft de issuer group admin rechten gekregen",
            makeUserIssuerGroupAwarder: "{{name}} heeft de issuer group awarder rechten gekregen",
            removeUserIssuerGroupAdmin: "De issuer group admin rechten zijn verwijderd van {{name}}",
            makeUserIssuerAdmin: "{{name}} heeft de issuer admin rechten gekregen",
            makeUserIssuerAwarder: "{{name}} heeft de issuer awarder rechten gekregen",
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
            awarder: "Issuer group awarder",
            switchToOwner: "Permissie succesvol aangepast naar issuer group admin.",
            switchToAwarder: "Permissie succesvol aangepast naar issuer group awarder.",
            header: "Issuer group",
            allRights: "Issuer group admin",
            permissions: "Permissies op issuer group niveau"
        },
        issuer: {
            admin: "Issuer admin",
            awarder: "Issuer awarder",
            switchToOwner: "Permissie succesvol aangepast naar issuer admin.",
            switchToAwarder: "Permissie succesvol aangepast naar issuer awarder.",
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
            awarderRights: "Awarder rechten",
            institutionAllRights: "(vanwege instellingsadmin)",
            issuerGroupAllRights: "(vanwege issuer group admin)",
            issuerGroupAwarderRights: "(vanwege issuer group awarder)",
            issuerAllRights: "(vanwege issuer admin)",
            issuerAwarderRights: "(vanwege issuer awarder)",
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
            notes: 'Persoonlijke boodschap',
            badgeclass: "Selecteer badge classes",
            badgeClassPlaceholder: "Zoek en selecteer badge classes",
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
            image_english: "Logo in het Engels",
            image_dutch: "Logo in het Nederlands",
            name_english: "Naam in het Engels",
            name_dutch: "Naam in het Nederlands",
            award_allowed_institutions: "Toegestaande edubadge instellingen",
            requestedBadges: "Aangevraagde edubadges"
        },
        faculty: {
            created: "Aangemaakt",
            admin: "Admin",
            description: "Over deze issuer groep",
            description_english: "Beschrijving in het Engels",
            description_dutch: "Beschrijving in het Nederlands",
            name: "Naam",
            name_english: "Naam in het Engels",
            name_dutch: "Naam in het Nederlands",
        },
        issuer: {
            description: "Over deze issuer",
            description_english: "Beschrijving in het Engels",
            description_dutch: "Beschrijving in het Nederlands",
            email: "Contact e-mailadres",
            created: "Aangemaakt",
            admin: "Admin",
            email_header: "Contact",
            image_dutch: "Issuer Logo Nederlands",
            image_english: "Issuer Logo Engels",
            name_dutch: "Naam in het Nederlands",
            name_english: "Naam in het Engels",
            url_header: "Website",
            url: "Website URL",
            url_dutch: "Website URL voor de Nederlandse taal",
            url_english: "Website URL voor de Engelse taal",
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
            of: "van",
            admin: "Admin",
            alignment: "Gerelateerd onderwijskundig raamwerk",
            alignmentMultiple: "Gerelateerde onderwijskundige raamwerken",
            alignmentName: "Naam",
            alignmentFramework: "Raamwerk",
            alignmentUrl: "URL",
            alignmentCode: "Code",
            alignmentDescription: "Omschrijving",
            number: "Aantal",
            hours: "Uren",
            name: "Naam",
            description: "Beschrijving",
            about: "Over deze edubadge",
            criteria_text: "Aan welke criteria moet je voldoen om in aanmerking te komen voor deze edubadge?",
            criteria_url: "Of geef een link naar de criteria of meer informatie",
            criteria_url_value: "Link naar de criteria en meer informatie:",
            expiresAfter: "Verloopt na",
            expiresAfterOption: "Na",
            expiresAfterNever: "Nooit",
            expiresAfterValue: "{{nbr}} weken",
            expireSettings: "Standaard vervaldatum",
            language: "Taal van het onderwijs",
            extraOptions: "Extra opties",
            isPrivate: "Privé badge class",
            evidenceRequired: "Evidence verplicht",
            narrativeRequired: "Narrative verplicht",
            awardNonValidatedNameAllowed: "Uitreiken aan niet gevalideerd account toestaan",
            learningOutcome: "Leeruitkomst",
            studyLoad: "Studielast",
            timeInvestment: "Tijd investering",
            ects: {
                creditPoints: "Studiepunten (ECTS)",
                hours: "Uren"
            },
            sbu: "Study Belasting Uren",
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
                timeInvestment: "Tijd investering",
                alignment: "Gerelateerd onderwijskundig raamwerk",
                allowedInstituions: "Toegestaande instellingen"
            },
            addButtons: {
                educationalIdentifiers: "Opleidingscode(s) toevoegen",
                studyLoad: "Studielast toevoegen",
                timeInvestment: "Tijd investering toevoegen",
                alignment: "Gerelateerd onderwijskundig raamwerk toevoegen",
                alignmentAddition: "Nog een gerelateerd onderwijskundig raamwerk toevoegen",
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
            sorting: "Sorteer:",
            award_allowed_institutions: "Toegestaande edubadge instellingen",
            archive: {
                confirmation: "Badge class archiveren",
                confirmationQuestion: "Weet je zeker dat je deze badge class wilt archiveren?",
                flash: "Badge class {{name}} is gearchiveerd",
                action: "Archiveer"
            },
            unarchive: {
                confirmation: "Badgec lass dearchiveren",
                confirmationQuestion: "Weet je zeker dat je deze badge class wilt dearchiveren?",
                flash: "Badge class {{name}} is gedearchiveerd",
                action: "Dearchiveer"
            },
            copyBadgeClass: "Kopieer badge class"
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
                REQUESTED: "Aangevraagd",
                DIRECT_AWARD: "Direct toegekend"
            },
            claimDirectAward: "Bekijk de details om deze edubadge te claimen",
            associatedInstitution: "Van instelling",
            issuedOn: "Uitgegeven op",
            issuedBy: "Uitgegeven door",
            claimed: "Geclaimd",
            expires: "Verloopt op",
            expiresNever: "Nooit",
            download: "Download",
            open: "Open",
            share: "Deel",
            status: "Status",
            revoked: "Ingetrokken",
            validUntil: "Geldig tot",
            addToCollection: "Voeg toe aan collectie",
            statuses: {
                new: "Nieuw",
                rejected: "Geweigerd",
                revoked: "Ingetrokken",
                expired: "Verlopen",
                accepted: "Geaccepteerd",
                unaccepted: "In afwachting",
                pending: "In afwachting",
                unclaimed: "Unclaimed",
                pendingEnrollmentCount: "{{count}} open aanvragen",
                archived: "Gearchiveerd",
                imported: "Import",
                awarded: "Toegekend"
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
            deleteEnrollment: "Verwijder aanvraag",
            deleteEnrollmentConfirmation: "Weet je zeker dat je deze aanvraag wilt verwijderen?",
            award: "Ken toe",
            status: "Status",
            open: "Open",
            denied: "Geweigerd",
            deny: "Weiger verzoek",
            addEvidence: "+ Voeg persoonlijke boodschap en/of bewijs toe",
            removeEvidence: "- Verwijder persoonlijke boodschap en/of bewijs",
            enrollmentType: {
                name: "Type aanvraag",
                enrolled: "Zelf aangevraagd",
                invited: "Uitgenodigd",
                evidenceNarrativeRequired: "Verplichte attributen",
                none: "Geen",
                narrative: "Persoonlijke boodschap",
                evidence: "Bewijs",
                badgeClass: "Badge class"
            },
            confirmation: {
                award: "Ken inschrijving toe",
                awardConfirmation: "Weet je zeker dat je deze inschrijving wilt toekennen?",
                deny: "Wijs inschrijving af",
                denyConfirmation: "Weet je zeker dat je deze inschrijving wilt afwijzen?",
                denyReason: "Wat is reden voor om deze inschrijving af te wijzen (optioneel)?"
            },
            awardButton: "Toekennen",
            showDenied: "Toon afgewezen inschrijvingen ({{count}})",
            evidence: "Optionele beschrijvende metadata over het bewijs met betrekking tot de uitgifte van de edubadge.",
            evidenceRequired: "Verplichte beschrijvende metadata over het bewijs met betrekking tot de uitgifte van de edubadge.",
            evidenceHeader: "Metadata over het bewijs gerelateerd aan deze edubadge",
            evidenceNarrative: "Persoonlijke boodschap",
            evidenceURL: "URL",
            evidenceDescription: "Beschrijving",
            evidenceName: "Naam",
            flash: {
                denied: "De inschrijving(en) zijn afgewezen.",
                awarded: "De inschrijving(en) zijn toegekend."
            }
        },
        badgeAward: {
            email: "E-mail",
            eppn: "Student nummer (EPPN)",
            reject: "Weigeren",
            claim: "Claim en voeg toe aan je backpack",
            confirmation: {
                claim: "Nadat deze edubadge is geclaimd, wordt deze toegevoegd aan je backpack en kan je de edubadge openbaar maken en delen.",
                reject: "Weet u absoluut zeker dat u deze edubadge wilt afwijzen? Deze edubadge wordt na afwijzing verwijderd en deze actie kan niet ongedaan worden gemaakt."
            },
            flash: {
                claim: "Edubadge is succesvol geclaimed",
                reject: "Edubadge is afgewezen",
            }
        },
        directAwardBundle: {
            title: "Direct Award statussen",
            directAwardCount: "Pending",
            directAwardRejectedCount: "Geweigerd",
            directAwardRevokedCount: "Revoked",
            assertionCount: "Claimed",
            initialTotal: "Totaal",
            rateClaim: "Claim rate",
            createdAt: "Aangemaakt",
        },
        insights: {
            faculty: "Issuer group",
            facultyPlaceholder: "Selecteer een issuer group...",
            issuer: "Issuer",
            issuerPlaceholder: "Selecteer een issuer...",
            badgeClass: "Badge class",
            badgeClassPlaceholder: "Selecteer een badge class...",
            year: "Jaar",
            yearPlaceholder: "Selecteer een jaar...",
        },
        collections: {
            number: "Nummer",
            lastUpdated: "Laatste gemaakt",
            name: "Naam",
            description: "Omschrijving",
            privatePublic: "Privé / publiek",
            badge_instances: "Edubadges",
            createdAt: "Aangemaakt op"
        },
        importedBadges: {
            image: "Afbeelding",
            url: "Badge URL",
            email: "Email",
            code: "Verificatie code"
        }
    },
    inviteDialog: {
        title: "Nodig iemand uit om zich in te schrijven",
        publicBadgePage: "Studenten kunnen zich inschrijven voor deze edubadge op de <a href=\"{{publicBadgePage}}\" target=\"_blank\">publieke badge class pagina</a>.",
        intranet: "Als je de link naar de registratiepagina op je intranet of elektronische leeromgeving wilt plaatsen, kunt je de link kopiëren.",
        copy: "Kopieer de link"
    },
    shareDialog: {
        title: "Deel je edubadge",
        copyPublicUrl: "Als je de link naar de publieke pagina van deze edubadge wilt delen, kan je de link kopiëren",
        copy: "Kopieer de link",
        titleCollections: "Deel je collectie",
        copyPublicUrlCollections: "Als je de link naar de publieke pagina van deze collectie van edubadge wilt delen, kan je de link kopiëren<br/><br/>Alleen je publieke en niet ingetrokken badges worden getoond op de publieke collectie pagina.",
    },
    invites: {
        title: "Nodig iemand uit om zich in te schrijven",
        copyPublicUrl: "Als je de link naar de registratiepagina op je intranet of elektronische leeromgeving wilt plaatsen, kunt je de link kopiëren",
        copyPublicUrlDisabled: "Deze badge class is privé en kan niet worden uitgereikt",
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
            hosted: "Hosted bij {{val}}",
            imported: "Geïmporteerd op {{val}}",
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
            directAwards: "Je eduID account is niet gekoppeld aan een onderwijsinstelling. Dit is vereist om direct awards te claimen.<br><br>Druk op <span style='color: #540b6c'>koppel instelling</span> om doorgestuurd te worden naar eduID. Daarna wordt je terug gestuurd naar deze pagina.",
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
        userPermissions: "Deze gebruiker heeft geen permissies op {{entity}} niveau.",
        directAwardBundles: "Er is geen direct award status voor edubadge {{name}}",
        directAwards: "Alle direct awards zijn geclaimed. Er zijn geen uitstaande direct awards meer voor deze bundel.",
        requestedBatches: "Er zijn geen openstaande edubadge-verzoeken die je mag uitreiken."
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
        loggedIn: "Je bent momenteel ingelogd met je instellingsaccount, via SURFconext",
        lti: "LTI"
    },
    placeholders: {
        institution: {
            name: "(Verplicht veld) Bijv. Universiteit van Harderwijk",
            brin: "(Verplicht veld) Basisregistratie Instellingen - BRIN",
            gradingTable: "URL van de grading table",
            description: "(Verplicht veld) Bijv. De Universiteit van Harderwijk is gesticht in 1977.",
            allowedInstitutions: "Selecteer 1 of meer instellingen..."
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
            timeInvestment: "Bijv. 260",
            status: {
                name: "Status",
                archived: "Gearchiveerd",
                active: "Actief"
            },
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
        },
        enrollment: {
            evidenceNarrative: "bijv. een persoonlijke boodschap wat aan deze edubadge toegevoegd kan worden",
            evidenceURL: "bijv. https://university-example.org/persistent-url-to-evidence",
            evidenceName: "e.g. Scriptie Introductie Pysychology",
            evidenceDescription: "e.g. omschrijving van het bewijs wat aan deze edubadge is toegevoegd"
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
        //badgeClassImage: "badgeClassImage",
        badgeClassExpireSettings: "Geef hier aan of en hoelang de edubadge geldig is. Na deze datum zal een edubadge niet meer geldig zijn.",
        badgeClassName: "Vermijdt afkortingen, zorg voor herkenbare naam ook voor externen.",
        badgeClassDescription: "Deze beschrijving ondersteund opmaak in markdown formaat. " +
        "Zie <a target=\"_blank\" href=\"https://wiki.surfnet.nl/display/Edubadges/Edubadges+Example+BadgeClass\"> de wiki </a> voor voorbeelden.",
        badgeClassLanguageOfInstruction: "De voertaal die gebruikt is bij het behalen van deze edubadge. ",
        badgeClassLearningOutcome: "Beschrijf de leeruitkomst of het leerdoel. Vastgelegd in de Onderwijs- en examenregeling. Sluit mogelijk aan op de Tuning-methodiek.",
        //badgeClassLearningIssuer: "badgeClassLearningIssuer",
        badgeClassIsPrivate: "Indien aangevinkt zal deze badge-klasse niet in de catalogus verschijnen. Houd er rekening mee dat er van privé badge classes geen edubadges kunnen worden uitgegeven.",
        badgeClassEvidenceRequired: "Indien aangevinkt, moet voor alle onderscheidingen op basis van deze badge class een bewijs worden ingevuld.",
        badgeClassNarrativeRequired: "Indien aangevinkt, moet voor alle onderscheidingen op basis van deze badge class een perssonlijke toelichting worden ingevuld.",
        badgeClassAwardNonValidatedNameAllowed: "Indien aangevinkt, mogen non-formal badges uitgereikt worden aan niet-gevalideerde accounts.",
        //badgeClassCriteriaRequirements: "badgeClassCriteriaRequirements",
        //badgeClassCriteriaUrl: "badgeClassCriteriaUrl",
        //badgeClassTypeOfStudyLoad: "badgeClassTypeOfStudyLoad",
        badgeClassStudyLoadNumber: "Studie Belastings Uren (SBU in uren)",
        badgeClassTimeInvestmentNumber: "Hoeveel uren geïnvesteerd moeten worden om deze non-formal edubadge te kunnen verdienen.",
        //badgeClassSBUNumber: "badgeClassSBULoadNumber",
        badgeClassStudyLoadEcts: "Het European Credit Transfer System (ECTS) is een puntensysteem dat wordt gebruikt door universiteiten en is goedgekeurd door overheden, waardoor internationaal onderwijs beter vergelijkbaar is over de grenzen heen.",
        //badgeClassProgrammeIdentifier: "badgeClassProgrammeIdentifier",
        //badgeClassNLQFLevel: "badgeClassNLQFLevel",
        //badgeClassRelatedFrameworkName: "badgeClassRelatedFrameworkName",
        //badgeClassRelatedFrameworkFramework: "badgeClassRelatedFrameworkFramework",
        //badgeClassRelatedFrameworkURL: "badgeClassRelatedFrameworkURL",
        //badgeClassRelatedFrameworkCode: "badgeClassRelatedFrameworkCode",
        //badgeClassRelatedFrameworkDescription: "badgeClassRelatedFrameworkDescription",
        facultyName: "Vermijdt afkortingen, zorg voor herkenbare naam ook voor externen.",
        //facultyDescriptionEn: "facultyDescriptionEn",
        //facultyDescriptionNl: "facultyDescriptionNl",
        //issuerFaculty: "issuerFaculty",
        //issuerImage: "issuerImage",
        issuerName: "Vermijdt afkortingen, zorg voor herkenbare naam ook voor externen.",
        //issuerDescriptionEn: "issuerDescriptionEn",
        //issuerDescriptionNl: "issuerDescriptionNl",
        issuerURL: "Gebruik hier een URL die niet zal veranderen. (persistent URL).",
        //issuerEmail: "issuerEmail",
        //institutionImage: "institutionImage",
        //institutionName: "institutionName",
        //institutionDescriptionEn: "institutionDescriptionEn",
        //institutionDescriptionNl: "institutionDescriptionNl",
        //institutionBrin: "institutionBrin",
        institutionGradingTable: "Gebruik hier een URL die niet zal veranderen. (Persistent URL).",
        institutionAwardAllowedInstitutions: "Selecteer andere instellingen waarvan de studenten<br/>ook edubadges kunnen verdienen.",
        badgeclassAwardAllowedInstitutions: "Selecteer andere instellingen waarvan de studenten<br/>ook deze edubadge kunnen verdienen.",
        enrollmentEvidenceNarrative: "Een persoonlijke toelichting dat kan worden toegevoegd aan deze toegekende edubadge.",
        enrollmentEvidenceURL: "De URL van een webpagina met bewijs van de geleverde prestatie.",
        enrollmentEvidenceName: "Een beschrijvende titel van het bewijs van de geleverde prestatie.",
        enrollmentEvidenceDescription: "Een langere beschrijving van het bewijs van de geleverde prestatie.",
        demoEnvironment: "Alle data wordt iedere maand verwijderd.",
        claimRate: "Het claimpercentage is het totale aantal toegekende edubadges als percentage van het totaal aan directe awards en inschrijvingen.",
        directAwards: "Direct awards zijn edubadges die door de leraar per e-mail aan leerlingen worden uitgereikt. De onderstaande nummers zijn rechtstreekse toekenningen die nog niet aanvaard, geweigerd of ingetrokken zijn",
        enrollments: "Enrollments worden door leerlingen aangevraagd en na goedkeuring worden nieuwe edubadges toegekend. De nummers hieronder zijn enrollments die niet goedgekeurd zijn door de leraar of geweigerd zijn",
        toggleBadgeCollectionPublic: "Een openbare collectie kan met anderen worden gedeeld, een privé collectie niet.",
        collectionBadgeInstances: "Selecteer alle edubadges die je in deze collectie wilt plaatsen.",
        importedBadgeEmail: "Je email die is gebruikt op het moment dat deze badge aan je werd uitgereikt",
        importedBadgeImageUrl: "De URL met de badge JSON informatie",
        importedBadgeImage: "Een png of svg badge afbeelding"
    },
    badgeOverview: {
        faculty: "Faculteit",
        issuer: "Vakgroup",
    },
    catalog: {
        name: "Catalogus",
        education: {
            WO: "WO",
            HBO: "HBO",
            MBO: "MBO",
            NONE: "SURF"
        },
        studyLoad: {
            NO_STUDYLOAD: "Geen studyload",
            ECTS_0_5: "0-5 ECTS (WO/HBO)",
            ECTS_6_10: "6-10 ECTS (WO/HBO)",
            ECTS_10_MORE: "> 10 ECTS (WO/HBO)",
            HOURS_0_60: "0-60 uren (WO/HBO)",
            HOURS_61_120: "61-120 uren (WO/HBO)",
            HOURS_120_MORE: "> 120 uren (WO/HBO)"
        },
        eqf: {
            eqfNone: "Geen NLQF level",
            eqf: "NLQF niveau {{level}}",
        },
        issuer: {
            contact: "Neem contact op met de issuer",
            website: "Bezoek issuer website",
            gradingTable: "Bekijk de grading tabel",
            institution: "<span>Onderdeel van <a href=\"{{link}}\" target=\"_blank\">{{name}}</a></span>"
        }
    },
    badgeAwardOptions: {
        directAward: "Reik edubadge(s) uit",
        bulkAward: "Bulk uitreiking uit csv",
        or: "-of-",
        inviteEnrollements: "Nodig gebruikers uit om in te schrijven",
        badgeClassArchived: "Kan geen uitreikingen doen op een gearrchiveerde badge class",
        ltiAward: "Uitreiken van LTI import",
    },
    badgeAward: {
        directAward: {
            title: "Direct edubadges uitreiken",
            subtitle: "Je verzoek is verzonden en je krijgt een melding wanneer het is geaccepteerd of geweigerd.",
            waringEnrollments: "Er zijn {{count}} aanmeldingen voor deze edubadge. ",
            toToEnrollments: "Controleer ze misschien eerst?",
            addAnother: "+ Toevoegen",
            cancel: "Annuleer",
            award: "Verzenden",
            addEvidence: "Bewijs toevoegen",
            editEvidence: "Bewijs bewerken",
            processing: "Bezig om {{count}} direct awards te verwerken. Even geduld...",
            flash: {
                created: "Direct awards zijn verzonden"
            }
        },
        bulkAward: {
            title: "Bulk award vanuit CSV",
            subtitle: "Dit bestand moet in het exacte formaat van edubadges passen. Als je het niet zeker weet, download dan eerst onze " +
                "<a href=\"{{sample}}\" download=\"sample_direct_award.csv\">Voorbeeld CSV Awardfile</a>.",
            or: "- of -",
            browse: "Browse",
            award: "Upload je Awardfile",
            wrong: "De upload bevat {{count}} ongeldige entries die uit de upload zijn verwijderd.",
            duplicate: "De upload bevat {{count}} dubbele entries die uit de upload zijn verwijderd.",
            eppnExisting: "De upload bevat {{count}} EPPN's (student-ID's) met bestaande niet-geaccepteerde direct awards die uit de upload zijn verwijderd.",
            missingEvidenceOrNarrative: "De upload bevat {{count}} entries die geen narrative en / of evidence bevatten en die uit de upload zijn verwijderd.",
            good: "Verwerkte entries voor de upload: {{count}} ",
            view: "Bekijk",
            hide: "Verbergen",
            evidenceIncluded: "(inclusief evidence)",
            evidenceAndNarrativeRequired: "Deze badge class vereist zowel evidence als narrative om te worden toegekend.",
            evidenceRequired: "Deze badge class vereist evidence om te worden toegekend.",
            narrativeRequired: "Deze badge class vereist narrative om te worden toegekend.",
            flash: {
                created: "Bulk awards zijn verzonden"
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
            LAST_30_DAYS: "Laatste 30 dagen",
            LAST_60_DAYS: "Laatste 60 dagen",
            LAST_90_DAYS: "Laatste 90 dagen",
            ALL: "Allemaal",
        },
        awardType: {
            DIRECT_AWARD: "Direct award",
            REQUESTED: "Aangevraagd",
        },
        status: {
            PENDING: "In afwachting",
            CLAIMED: "Geclaimd",
            REVOKED: "Ingetrokken",
            REJECTED: "Geweigerd"
        }
    },
    demo: {
        info: "Dit is de demo-omgeving van edubadges. <br/> <br/> Alle gegevens worden maandelijks gewist en na elke nieuwe" +
            "uitrol. <br/>" +
            "Heeft u vragen over de demo-omgeving neem dan contact met ons op " +
            "via <a href='mailto:support@edubadges.nl'> support@edubadges.nl </a>"
    },
    feedback: {
        title: "Feedback geven",
        subTitle: "Deel je mening",
        info: "Werkt dit goed voor je? Heb je een suggestie? Laat ons hier weten wat je ervan vindt!",
        disclaimer: "Het SURF edubadges team zal deze informatie, in combinatie met andere informatie die we mogelijk hebben over je account, gebruiken om problemen op te lossen, ons product te verbeteren en je te helpen. " +
            "We kunnen contact met je opnemen over je feedback via het e-mailadres dat is gekoppeld met je account. " +
            "Je bent ervoor verantwoordelijk dat je feedback geen vertrouwelijke, gevoelige of persoonlijke informatie bevat. ",
        send: "Verstuur feedback",
        flash: "Je feedback is succesvol verzonden. Bedankt!"
    },
    insights: {
        awardedBadges: "Awarded edubadges",
        totalAwarded: "Totaal awarded",
        directAwarded: "Direct toegekend",
        requested: "Aangevraagd",
        enrollments: "Inschrijvingen",
        open: "Open",
        directAwards: "Direct toegekend",
        directAwardDenied: "Geweigerd door student",
        requestedDeniedTooltip: "Geweigerd door issuer na verzoek",
        revoked: "Ingetrokken na toekenning",
        requestedDenied: "Geweigerd door issuer",
        claimRate: "Claim rate",
        numbers: "De getallen tellen op",
        badgeClasses: "Badge classes",
        issuers: "Issuers",
        issuerGroups: "Issuer groups",
        users: "Portal gebruikers",
        backpack: "Backpack gebruikers",
        crunching: "Crunching the numbers just for you...",
        date: "Datum",
        reset: "Reset"
    },
    collections: {
        title: "Collecties",
        info: "Een verzameling edubadges die je als geheel met anderen kan delen.",
        zeroState: "Je hebt nog geen collectie van edubadges gemaakt...",
        zeroStateBadges: "Je hebt nog geen edubadges toegevoegd...",
        create: "Maak een nieuwe collectie",
        shareable: "Collecties die je kan delen",
        requiresPublicBadgePresent: "Een publieke collectie vereist op zijn minst 1 publieke badge",
        all: "Al je collecties",
        byRecent: "Meest recent",
        bySize: "Aantal edubadges",
        byPublic: "Publiek / privé",
        deleteConfirmation: "Verwijder collectie {{name}}",
        deleteConfirmationQuestion: "Weet je zeker dat je de collectie {{name}} wilt verwijderen?",
        deleteFlash: "Collectie {{name}] verwijderd.",
        privatePublic: "Vink aan om deze collectie openbaar te maken",
        share: {
            title: "Niet deeelbaar",
            publish: "Maak deze collectie openbaar zichtbaar",
            publishConfirmation: "Weet je zeker dat je deze collectie openbaar zichtbaar wilt maken?<br/><br/>Als je deze collectie openbaar maakt, is deze voor iedereen zichtbaar met de link.",
            private: "Maak deze collectie privé",
            privateConfirmation: "Weet je zeker dat je deze collectie privé wilt maken?",
        },
        placeholders: {
            name: "Naam van de collectie",
            description: "Beschrijving van de collectie",
            chosenBadges: "Edubadges in deze collectie"
        },
        new: "Nieuwe collectie"
    },
    impersonate: {
        confirmation: "Weet je zeker dat je je wilt voordoen als {{name}}?",
        title: "Impersonate"
    },
    importedBadges: {
        title: "Geïmporteerde badges",
        info: "Alle digitale badges die je hebt verdiend en geïmporteerd.",
        zeroState: "Je hebt nog geen externe badges geïmporteerd...",
        import: "Importeer badge",
        importWindow: {
            title: "Importeer je externe badge",
            question: "Upload een badge afbeelding die je hebt verdiend van een externe issuer.",
            disclaimer: "Badge afbeelding moet een svg of png formaat zijn.",
            submit: "Importeer badge",
            urlPlaceholder: "https://api.eu.badgr.io/public/assertions/-kDl8isfQoKrMHrqOx5Thw",
            urlInfo: "Of paste een URL waar de badge wordt gehosted.",
            emailInfo: "Voer je email in waarop je deze badge hebt verdiend.",
        },
        codeWindow: {
            title: "Validatie code",
            question: "Eem email is verstuurd naar {{email}}. Voer de 6 karakters van de validatie code uit email in om de badge import af te ronden",
            submit: "Verifiëer",
            codePlaceholder: "Validatie code"
        },
        error: {
            url: "Deze URL is geen geldige badge URL",
            image: "De geuploade afbeelding is geen geldige badge afbeelding",
            email: "Dit email adres is niet gelijk aan de email van de geïmporteerde badge",
            duplicate: "Je hebt deze badge al geimporteerd. Duplicate imports zijn niet toegestaan"
        },
        codeMismatch: "De ingevoerde code is niet geldig",
        details: {
            delete: "Verwijder geïmporteerde badge {{name}}",
            import: "Geïmporteerde badges",
            imported: "Geïmporteerde badge",
            remove: "Verwijder",
            validate: "Valideer",
            validation: "Badge validatie",
            validationResults: "Badge validatie resultaten",
            publicInfo: "Deze badge is gehost op {{url}} en is publiek beschikbaar.",
            deleteConfirmation: "Weet je zeker dat je de geïmporteerde badge {{name}} wilt verwijderen uit je backpack. Let op dat dit niet de originele badge verwijderd.",
            flashDeleted: "Verwijder geïmporteerde badge {{name}} uit je backback",
        }
    },
    ltiBadgeClass: {
        title: "LTI Cursus informate",
        linked: "Badgeclass <strong>{{name}}</strong> is gekoppeld aan LTI cursus <strong>{{lti}}</strong>.",
        notLinked: "Badgeclass <strong>{{name}}</strong> is momenteel niet gekoppeld aan een LTI cursus.",
        linkPossible: "Je kan badgeclass <strong>{{name}}</strong> koppelen aan LTI course {{lti}}.",
        linkNotPossible: "Om badgeclasses te koppelen aan een LTI cursus moet je edubadges in de context van een LTI platform gebruiken.",
        unlinkNotPossible: "De koppeling tussen badgeclass {{name}} en LTI cursus {{lti}} kan verwijderd worden als je edubadges in de context van het LTI platform {{platform}} gebruikt.",
        course: {
            title: "Titel",
            label: "Label",
            createdAt: "gekoppeld op",
            platform: "Platform",
            identifier: "LTI id"
        },
        tool: {
            info: "Je bent momenteel ingelogd met het LTI platform <strong>{{platform}}</strong> van de instelling <strong>{{institution}}</strong> met LTI context cursus {{lti}}.",
        },
        actions: {
            link: "Koppel",
            unlink: "Ontkoppel"
        },
        confirmations: {
            link: "Weet je zeker dat je badgeclass {{name}} wilt koppelen met LTI cursus {{lti}}?",
            unlink: "Weet je zker dat je de koppeling tussen badgeclass {{name}} en LTI cursus {{lti}} wilt verwijderen?"
        },
        flash: {
            link: "Badgeclass {{name}} is gekoppeld aan LTI cursus {{lti}}",
            unlink: "Badgeclass {{name}} is ontkoppeld aand LTI cursus {{lti}}",
        }
    },
    lti: {
        path: "LTI",
        title: "LTI Information",
        info: "The edubadges applications currently runs within a LMS LTI context.",
        login: "You are logged in as <strong>{{name}}</strong> in LMS <strong>{{lti}}</strong>.",
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
            placement: "Placement"
        },
        users: {
            title: "LTI members",
            subTitle: "LTI members",
            name: "Name",
            email: "Email",
            sisId: "SIS Id",
            status: "Status",
            roles: "Roles"
        },
        grades: {
            title: "LTI grades",
            subTitle: "LTI grades",
            user: "user",
            assignment: "Assignment",
            resultScore: "Results score",
            resultMaximum: "Max result"
        }
    }
};
