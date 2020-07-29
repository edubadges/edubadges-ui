<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {Breadcrumb, EntityHeader, Issuers, FacultyUserManagement, InviteUser} from "../teachers";
  import {issuerIcon, userManagementIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";
  import {entityType} from "../../util/entityTypes"
  import Spinner from "../Spinner.svelte";
  import {permissionsRole} from "../../util/rolesToPermissions";

  export let entityId;
  export let subEntity;

  let faculty = {staff: [], institution: {}, issuers: []};
  let permissions;
  let issuers = [];

  let contentType;
  let loaded;

  const query = `{
    faculty(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      contentTypeId,
      institution {
        name
      },
      issuers {
        name,
        entityId,
        badgeclasses {
          entityId,
          badgeAssertions {
            entityId
          }
        },
        faculty {
          name
        }
      },
      permissions {
        mayCreate
        mayUpdate,
        mayDelete
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      faculty = res.faculty;
      issuers = res.faculty.issuers;
      permissions = res.faculty.permissions;
      contentType = res.faculty.contentTypeId;
      loaded = true;
    });
  });

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
  $: mayCreate = permissions && permissions.mayCreate;
  $: mayUpdate = permissions && permissions.mayUpdate;

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
    }
  ];

  const permissionsRoles = [{value: permissionsRole.ADMIN, name: I18n.t("editUsers.faculty.admin")}];

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
  />

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
          disabledRole={true}
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
