<script>
    import I18n from "i18n-js";
    import {onMount} from "svelte";
    import {Router, Route, navigate} from "svelte-routing";
    import {Breadcrumb, EntityHeader, Issuers, FacultyUserManagement, InviteUser} from "../teachers";
    import {issuerIcon, userManagementIcon} from "../../icons";
    import {queryData} from "../../api/graphql";
    import {headerStaff, headerEntityMultiLanguage} from "../../api/queries";
    import {entityType} from "../../util/entityTypes"
    import Spinner from "../Spinner.svelte";
    import {permissionsRole} from "../../util/rolesToPermissions";
    import {isEmpty, translateProperties} from "../../util/utils";
    import Button from "../Button.svelte";
    import {archiveBadgeclass, archiveFaculty} from "../../api";
    import {flash} from "../../stores/flash";
    import Modal from "../forms/Modal.svelte";

    export let entityId;
    export let subEntity;

    let faculty = {staff: [], institution: {}, issuers: []};
    let mayCreate = false;
    let mayUpdate = false;

    let mayArchiveFaculty = false;
    let issuers = [];

    let showArchiveModal = false;
    let archiveTitle = null;
    let archiveQuestion = null;

    let contentType;
    let loaded;

    const query = `query ($entityId: String){
    faculty(id: $entityId) {
      ${headerEntityMultiLanguage},
      ${headerStaff},
      imageDutch,
      imageEnglish,
      onBehalfOfUrl
      contentTypeId,
      archived,
      institution {
        nameEnglish,
        nameDutch
      },
      issuers {
        entityId,
        nameEnglish,
        nameDutch
        imageEnglish,
        imageDutch,
        pendingEnrollmentCount,
        badgeclassCount,
        assertionCount,
        archived,
        faculty {
          nameEnglish,
          nameDutch,
          imageDutch,
          imageEnglish,
          onBehalfOf,
          onBehalfOfDisplayName,
          onBehalfOfUrl
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
            faculty = res.faculty;

            translateProperties(res.faculty);
            translateProperties(res.faculty.institution);
            res.faculty.issuers.forEach(iss => {
                translateProperties(iss);
                translateProperties(iss.faculty);
            });

            issuers = res.faculty.issuers;
            contentType = res.faculty.contentTypeId;
            const permissions = res.faculty.permissions;
            mayCreate = permissions && permissions.mayCreate;
            mayUpdate = permissions && permissions.mayUpdate;
            mayArchiveFaculty = mayUpdate && (isEmpty(res.faculty.issuers) || res.faculty.issuers.every(iss => iss.archived));
            loaded = true;
        });
    }

    onMount(refresh);

    const doArchiveFaculty = showConfirmation => () => {
        const action = faculty.archived ? 'unarchive' : 'archive';
        if (showConfirmation) {
            archiveTitle = I18n.t(`models.faculty.${action}.confirmation`);
            archiveQuestion = I18n.t(`models.faculty.${action}.confirmationQuestion`);
            showArchiveModal = true;
        } else {
            showArchiveModal = false;
            loaded = false;
            archiveFaculty(faculty.entityId, faculty.archived).then(() => {
                flash.setValue(I18n.t(`models.faculty.${action}.flash`, {name: faculty.name}));
                refresh();
            });
        }
    }

    const tabs = [
        {
            entity: "issuers",
            href: `/manage/faculty/${entityId}/issuers`,
            icon: issuerIcon
        },
        {
            entity: "userManagement",
            href: `/manage/faculty/${entityId}/user-management`,
            icon: userManagementIcon
        }
    ];

    $: if (!subEntity) navigate(tabs[0].href, {replace: true});

    $: headerItems = [
        {
            attr: "created",
            type: "date",
            value: faculty.createdAt
        },
        {
            attr: "admin",
            type: "adminNames",
            value: faculty
        }, isEmpty(faculty.onBehalfOfUrl) ? null :
            {
                attr: "on_behalf_of_url",
                type: "link",
                value: faculty.onBehalfOfUrl
            },

    ].filter(item => item !== null);

    const permissionsRoles = [
        {value: permissionsRole.AWARDER, name: I18n.t("editUsers.faculty.awarder")},
        {value: permissionsRole.ADMIN, name: I18n.t("editUsers.faculty.admin")},
    ];

</script>
{#if loaded}
    <Breadcrumb {faculty}/>
    <EntityHeader
            {tabs}
            {headerItems}
            object={faculty}
            entity={entityType.ISSUER_GROUP}
            entityId={entityId}
            mayUpdate={mayUpdate}
    >
        <div slot="additional-actions">
            {#if mayArchiveFaculty}
                <Button fill={true} secondary action={doArchiveFaculty(true, !faculty.archived)}
                        marginBottom={true}
                        text={I18n.t(`models.badgeclass.${!faculty.archived ? "archive" : "unarchive"}.action`)}/>
            {/if}
        </div>
    </EntityHeader>

    <Router>
        <Route path="/issuers">
            <Issuers
                    facultyEntityId={entityId}
                    {issuers}
                    mayCreate={mayCreate}
                    institutionName={faculty.name}
            />
        </Route>
        <Route path="/user-management/invite-new-user">
            <InviteUser
                    permissionsRoles={permissionsRoles}
                    entityId={entityId}
                    disabledRole={false}
                    contentType={contentType}
            />
        </Route>
        <Route path="/user-management">
            <FacultyUserManagement entity={entityType.ISSUER_GROUP} entityId={entityId}/>
        </Route>
    </Router>
{:else}
    <Spinner/>
{/if}
{#if showArchiveModal}
    <Modal
            submit={doArchiveFaculty(false)}
            cancel={() => showArchiveModal = false}
            question={archiveQuestion}
            title={archiveTitle}/>
{/if}

