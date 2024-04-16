<script>
    import {onMount} from "svelte";
    import {navigate, Route, Router} from "svelte-routing";
    import {BadgeClassHeader, BadgeclassUserManagement, Breadcrumb, InviteUser} from "../teachers";
    import {Overview} from "./badgeclass";
    import {importIcon, overview, userManagementIcon} from "../../icons";
    import {queryData} from "../../api/graphql";
    import {alignments, endorsed, endorsements, headerStaff} from "../../api/queries";
    import I18n from "i18n-js";
    import {expirationPeriod} from "../../util/entityHeader";
    import {entityType} from "../../util/entityTypes"
    import Spinner from "../Spinner.svelte";
    import {permissionsRole} from "../../util/rolesToPermissions";
    import {translateBadgeClassProperties, translateProperties} from "../../util/utils";
    import Button from "../Button.svelte";
    import {flash} from "../../stores/flash";
    import Modal from "../forms/Modal.svelte";
    import {archiveBadgeclass} from "../../api";
    import BadgeclassLTI from "./badgeclass/BadgeclassLTI.svelte";
    import {config} from "../../util/config";
    import Endorsements from "./endorsements/Endorsements.svelte";
    import Endorsed from "./endorsements/Endorsed.svelte";

    export let entityId;
    export let tab;

    let issuer;
    let faculty;
    let badgeclass = {extensions: [], issuer: {}, endorsements: [], endorsed: []};
    let permissions;
    let publicInstitutions = [];
    let allowedIssuers;
    let ltiCourse;

    let contentType;
    let loaded;
    let mayUpdatePermission;
    let mayUpdateBadgeclass;
    let mayArchiveBadgeclass;

    let showArchiveModal = false;
    let archiveTitle = null;
    let archiveQuestion = null;

    const query = `query ($entityId: String){
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    issuers {
      nameEnglish,
      nameDutch,
      entityId,
    },
    badgeClass(id: $entityId) {
      id,
      entityId,
      name,
      description,
      createdAt,
      isPrivate,
      ${headerStaff},
      image,
      contentTypeId,
      awardNonValidatedNameAllowed,
      awardAllowedInstitutions,
      archived,
      criteriaText,
      expirationPeriod,
      issuer {
        nameEnglish,
        nameDutch,
        entityId,
        faculty {
          nameEnglish,
          nameDutch,
          onBehalfOf,
          onBehalfOfDisplayName,
          onBehalfOfUrl,
          entityId,
          institution {
            identifier,
            entityId,
            nameEnglish,
            nameDutch,
            ltiEnabled,
            sisIntegrationEnabled
          }
        }
      },
      enrollments {
        entityId,
        dateAwarded,
        denied
      },
      directAwardBundles {
        directAwardCount,
      },
      badgeAssertions {
        entityId,
        revoked
      },
      extensions {
        name,
        originalJson
      },
      ${alignments},
      ${endorsements},
      ${endorsed},
      permissions {
        mayUpdate,
        mayAward
      }
    },
    ltiCourse(badgeClassId: $entityId) {
      entityId,
      createdAt,
      identifier,
      title,
      label,
      tool {
        id, title, description, issuer
      }
    }
  }`;

    const refreshEndorsements = callback => {
        const endorsementsQuery = `query ($entityId: String, $days: Int) {
            badgeClass(id: $entityId, days: $days) {
                entityId,
                ${endorsements}
            }
        }`;
        loaded = false;
        queryData(endorsementsQuery, {entityId, days: 1}).then(res => {
            res.badgeClass.endorsements.forEach(endorsement => translateBadgeClassProperties(endorsement.endorser));
            badgeclass = {...badgeclass, endorsements: res.badgeClass.endorsements};
            callback && callback(res.badgeClass);
            loaded = true;
        });
    }

    const refreshEndorsed = callback => {
        const endorsedQuery = `query ($entityId: String, $days: Int) {
            badgeClass(id: $entityId, days: $days) {
                entityId,
                ${endorsed}
            }
        }`;
        loaded = false;
        queryData(endorsedQuery, {entityId, days: 1}).then(res => {
            res.badgeClass.endorsed.forEach(endorsement => translateBadgeClassProperties(endorsement.endorsee));
            badgeclass = {...badgeclass, endorsed: res.badgeClass.endorsed};
            callback && callback(res.badgeClass);
            loaded = true;
        });

    }

    const refresh = () => {
        loaded = false;
        queryData(query, {entityId}).then(res => {
            publicInstitutions = res.publicInstitutions;
            allowedIssuers = res.issuers;
            badgeclass = res.badgeClass;
            ltiCourse = res.ltiCourse;
            const ltiTabPresent = tabs.some(t => t.entity === "lti")
            if (!ltiTabPresent && badgeclass.issuer.faculty.institution.ltiEnabled) {
                tabs = [...tabs, {
                    entity: "lti",
                    href: `/manage/badgeclass/${entityId}/lti`,
                    icon: importIcon
                }]
            }

            translateProperties(badgeclass.issuer);
            translateProperties(badgeclass.issuer.faculty);
            translateProperties(badgeclass.issuer.faculty.institution);
            badgeclass.endorsements.forEach(endorsement => translateBadgeClassProperties(endorsement.endorser));
            badgeclass.endorsed.forEach(endorsement => translateBadgeClassProperties(endorsement.endorsee));

            issuer = res.badgeClass.issuer;
            faculty = issuer.faculty;
            contentType = res.badgeClass.contentTypeId;
            permissions = res.badgeClass.permissions;
            const hasOpenEnrollments = badgeclass.enrollments.some(enrollment => !enrollment.denied && enrollment.dateAwarded === null);
            const hasPendingDirectAwards = badgeclass.directAwardBundles.some(bundle => bundle.directAwardCount > 0);
            mayUpdatePermission = badgeclass.permissions && badgeclass.permissions.mayUpdate
            mayUpdateBadgeclass = mayUpdatePermission;
            mayArchiveBadgeclass = mayUpdatePermission && !hasOpenEnrollments && !hasPendingDirectAwards;
            loaded = true;
        });
    }

    onMount(refresh);

    const doArchiveBadgeclass = showConfirmation => () => {
        const action = badgeclass.archived ? 'unarchive' : 'archive';
        if (showConfirmation) {
            archiveTitle = I18n.t(`models.badgeclass.${action}.confirmation`);
            archiveQuestion = I18n.t(`models.badgeclass.${action}.confirmationQuestion`);
            showArchiveModal = true;
        } else {
            showArchiveModal = false;
            loaded = false;
            archiveBadgeclass(badgeclass.entityId, badgeclass.archived).then(() => {
                flash.setValue(I18n.t(`models.badgeclass.${action}.flash`, {name: badgeclass.name}));
                refresh();
            });
        }
    }

    $: tabs = [
        {
            entity: "badgeclassOverview",
            href: `/manage/badgeclass/${entityId}/overview`,
            icon: overview

        },
        {
            entity: "userManagement",
            href: `/manage/badgeclass/${entityId}/user-management`,
            icon: userManagementIcon
        },
        {
            entity: "endorsements",
            count: badgeclass.endorsements.length,
            href: `/manage/badgeclass/${entityId}/endorsements`
        },
        {
            entity: "endorsed",
            count: badgeclass.endorsed.length,
            href: `/manage/badgeclass/${entityId}/endorsed`
        }
    ].filter(t => t.count === undefined || t.count > 0 || tab === t.href.substring(t.href.lastIndexOf('/') + 1));

    $: if (!tab) {
        navigate(tabs[0].href, {replace: true});
    }
    $: mayUpdate = permissions && permissions.mayUpdate;
    $: headerItems = [
        {
            attr: "created",
            type: "date",
            value: badgeclass.createdAt
        },
        {
            attr: "expiresAfter",
            type: "none",
            value: expirationPeriod(badgeclass)
        },
        {
            attr: "issuer",
            type: "none",
            value: badgeclass.issuer.name
        },
        {
            attr: "status",
            type: "none",
            value: I18n.t(`placeholders.badgeClass.status.${badgeclass.archived ? "archived" : badgeclass.isPrivate ? "private" : "active"}`)
        }
    ];

    const permissionsRoles = [
        {value: permissionsRole.ADMIN, name: I18n.t("editUsers.badgeclass.owner")},
        {value: permissionsRole.EDITOR, name: I18n.t("editUsers.badgeclass.editor")},
        {value: permissionsRole.AWARDER, name: I18n.t("editUsers.badgeclass.awarder")}
    ];
</script>

<style>
    .overview-container {
        padding: 0 140px 40px 40px;
    }

    @media (max-width: 1120px) {
        .overview-container {
            padding: 20px;
        }
    }

</style>

{#if loaded}
    <Breadcrumb {faculty} {issuer} {badgeclass} badgeclassName={badgeclass.name}/>
    <BadgeClassHeader
            object={badgeclass}
            entity={entityType.BADGE_CLASS}
            entityId={entityId}
            {tabs}
            {headerItems}
            mayUpdate={mayUpdateBadgeclass && !badgeclass.archived}>
        <div slot="additional-actions">
            {#if mayArchiveBadgeclass}
                <Button fill={true} secondary action={doArchiveBadgeclass(true, !badgeclass.archived)}
                        marginBottom={true}
                        text={I18n.t(`models.badgeclass.${!badgeclass.archived ? "archive" : "unarchive"}.action`)}/>
            {/if}
            {#if allowedIssuers && allowedIssuers.length > 0}
                <Button fill={true} secondary
                        action={() => navigate(`/manage/badgeclass/${badgeclass.entityId}/edit/copy`)}
                        text={I18n.t("models.badgeclass.copyBadgeClass")}/>
            {/if}

        </div>
    </BadgeClassHeader>

    <div class="main-content-margin">
        <Router>
            <Route path="/overview">
                <div class="overview-container">
                    <Overview {badgeclass} {publicInstitutions}/>
                </div>
            </Route>
            <Route path="/user-management/invite-new-user">
                <InviteUser
                        permissionsRoles={permissionsRoles}
                        defaultValue={2}
                        disabledRole={false}
                        entityId={entityId}
                        contentType={contentType}
                />
            </Route>
            <Route path="/user-management">
                <BadgeclassUserManagement entity={entityType.BADGE_CLASS} {entityId}/>
            </Route>
            {#if config.features.endorsements}
                <Route path="/endorsements">
                    <Endorsements badgeClass={badgeclass} refresh={refreshEndorsements}/>
                </Route>
                <Route path="/endorsed">
                    <Endorsed badgeClass={badgeclass} refresh={refreshEndorsed}/>
                </Route>
            {/if}
            <Route path="/lti">
                <BadgeclassLTI {badgeclass} {ltiCourse} {refresh} {mayUpdatePermission}/>
            </Route>
        </Router>
    </div>
{:else}
    <Spinner/>
{/if}
{#if showArchiveModal}
    <Modal
            submit={doArchiveBadgeclass(false)}
            cancel={() => showArchiveModal = false}
            question={archiveQuestion}
            title={archiveTitle}/>
{/if}
