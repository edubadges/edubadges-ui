<script>
    import I18n from "i18n-js";
    import {onMount} from "svelte";
    import {navigate, Route, Router} from "svelte-routing";
    import {Badgeclasses, Breadcrumb, EntityHeader, InviteUser, IssuerUserManagement} from "../teachers";
    import {badgeclassIcon, userManagementIcon} from "../../icons";
    import {queryData} from "../../api/graphql";
    import {headerEntityMultiLanguage, headerStaff} from "../../api/queries";
    import {entityType} from "../../util/entityTypes";
    import {config} from "../../util/config";


    import {ects, extensionValue, studyLoad, timeInvestment} from "../extensions/badges/extensions";
    import {isEmpty, translateProperties} from "../../util/utils";
    import {permissionsRole} from "../../util/rolesToPermissions";
    import Spinner from "../Spinner.svelte";
    import {archiveFaculty, archiveIssuer} from "../../api";
    import {flash} from "../../stores/flash";
    import {Modal} from "../forms";
    import Button from "../Button.svelte";

    export let entityId;
    export let subEntity;

    let issuer = {staff: []};
    let faculty = {};
    let badgeclasses = [];
    let mayCreate = false;
    let mayUpdate = false;

    let mayArchiveIssuer = false;
    let showArchiveModal = false;
    let archiveTitle = null;
    let archiveQuestion = null;

    let contentType;
    let loaded = false;

    const query = `query ($entityId: String){
    issuer(id: $entityId) {
      ${headerEntityMultiLanguage},
      ${headerStaff},
      imageDutch,
      imageEnglish,
      email,
      urlDutch,
      urlEnglish,
      contentTypeId,
      archived,
      faculty {
        nameDutch,
        nameEnglish,
        imageDutch,
        imageEnglish,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        archived,
        entityId,
        institution {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          countryCode
        }
      },
      badgeclasses {
        name,
        entityId,
        image,
        createdAt,
        assertionCount,
        archived,
        isPrivate,
        pendingEnrollmentCount,
        typeBadgeClass,
        extensions {
         name,
         originalJson
        }
      },
      permissions {
        mayCreate
        mayUpdate,
        mayDelete
      }
  	}
  }`;

    const refresh = () => {
        loaded = false;
        queryData(query, {entityId}).then(res => {
            issuer = res.issuer;
            translateProperties(issuer);
            translateProperties(issuer.faculty);
            translateProperties(issuer.faculty.institution);

            issuer.publicLink = `${config.serverUrl}/public/issuers/${entityId}`;
            faculty = issuer.faculty;
            badgeclasses = issuer.badgeclasses;
            badgeclasses.forEach(badgeClass => {
                const studyLoadValue = extensionValue(badgeClass.extensions, studyLoad);
                const ectsValue = extensionValue(badgeClass.extensions, ects);
                const timeInvestmentValue = extensionValue(badgeClass.extensions, timeInvestment);
                badgeClass.studyLoad = studyLoadValue ? I18n.t("teacher.badgeclasses.hours", {value: studyLoadValue}) : ectsValue ?
                    I18n.t("teacher.badgeclasses.ects", {value: ectsValue}) : "-";
                badgeClass.timeInvestment = timeInvestmentValue ? I18n.t("teacher.badgeclasses.hours", {value: timeInvestmentValue}) : "-";
                badgeClass.status = I18n.t(`placeholders.badgeClass.status.${badgeClass.archived ? "archived" : badgeClass.isPrivate ? "private" : "active"}`);
                badgeClass.badgeClassType = badgeClass.typeBadgeClass;
            });
            const permissions = res.issuer.permissions;
            mayCreate = permissions && permissions.mayCreate;
            mayUpdate = permissions && permissions.mayUpdate;

            contentType = res.issuer.contentTypeId;
            mayArchiveIssuer = mayUpdate && !res.issuer.faculty.archived && (isEmpty(res.issuer.badgeclasses) || res.issuer.badgeclasses.every(bc => bc.archived));
            loaded = true;
        });
    }

    onMount(refresh);

    const doArchiveIssuer = showConfirmation => () => {
        const action = issuer.archived ? 'unarchive' : 'archive';
        if (showConfirmation) {
            archiveTitle = I18n.t(`models.issuer.${action}.confirmation`);
            archiveQuestion = I18n.t(`models.issuer.${action}.confirmationQuestion`);
            showArchiveModal = true;
        } else {
            showArchiveModal = false;
            loaded = false;
            archiveIssuer(issuer.entityId, issuer.archived).then(() => {
                flash.setValue(I18n.t(`models.issuer.${action}.flash`, {name: issuer.name}));
                refresh();
            });
        }
    }

    const tabs = [
        {
            entity: "badgeclasses",
            href: `/manage/issuer/${entityId}/badgeclasses`,
            icon: badgeclassIcon
        },
        {
            entity: "userManagement",
            href: `/manage/issuer/${entityId}/user-management`,
            icon: userManagementIcon
        }
    ];

    $: if (!subEntity) navigate(tabs[0].href, {replace: true});

    $: headerItems = [
        {
            attr: "created",
            type: "date",
            value: issuer.createdAt
        },
        {
            attr: "admin",
            type: "adminNames",
            value: issuer
        },
        {
            attr: "url",
            type: "link",
            value: issuer.url
        },
        {
            attr: "email",
            type: "email",
            value: issuer.email
        },
    ];

    const permissionsRoles = [
        {value: permissionsRole.AWARDER, name: I18n.t("editUsers.issuer.awarder")},
        {value: permissionsRole.ADMIN, name: I18n.t("editUsers.issuer.admin")}
    ];

</script>
{#if loaded}
    <Breadcrumb {faculty} {issuer}/>
    <EntityHeader
            {tabs}
            {headerItems}
            object={issuer}
            entity={entityType.ISSUER}
            entityId={entityId}
            mayUpdate={mayUpdate}
    >
        <div slot="additional-actions">
            {#if mayArchiveIssuer}
                <Button fill={true} secondary action={doArchiveIssuer(true, !issuer.archived)}
                        marginBottom={true}
                        text={I18n.t(`models.badgeclass.${!issuer.archived ? "archive" : "unarchive"}.action`)}/>
            {/if}
        </div>
    </EntityHeader>

    <Router>
        <Route path="/badgeclasses">
            <Badgeclasses
                    {badgeclasses}
                    mayCreate={mayCreate}
                    loaded={loaded}
                    issuer={issuer}/>
        </Route>
        <Route path="/user-management/invite-new-user">
            <InviteUser
                    permissionsRoles={permissionsRoles}
                    defaultValue={0}
                    entityId={entityId}
                    disabledRole={false}
                    contentType={contentType}
            />
        </Route>
        <Route path="/user-management">
            <IssuerUserManagement
                    entity={entityType.ISSUER}
                    entityId={entityId}
                    loaded={loaded}
            />
        </Route>
    </Router>
{:else}
    <Spinner/>
{/if}
{#if showArchiveModal}
    <Modal
            submit={doArchiveIssuer(false)}
            cancel={() => showArchiveModal = false}
            question={archiveQuestion}
            title={archiveTitle}/>
{/if}
