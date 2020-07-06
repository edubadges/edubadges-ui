<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {Breadcrumb, EntityHeader, Issuers, FacultyUserManagement, InviteUser} from "../teachers";
  import {issuerIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";
  import {entityType} from "../../util/entityTypes"
  import Spinner from "../Spinner.svelte";

  export let entityId;
  export let subEntity;

  let faculty = {staff: []};
  let permissions;
  let issuers = [];

  let contentType;
  let loaded;

  const query = `{
    faculty(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      contentTypeId,
      issuers {
        entityId
      },
      institution {
        name
      },
      issuers {
        name,
        entityId,
        badgeclasses {
          entityId
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
      icon: issuerIcon
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, {replace: true});
  $: mayCreate = permissions && permissions.mayCreate;
  $: mayUpdate = permissions && permissions.mayUpdate;
  $: mayDelete = permissions && permissions.mayDelete;

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

  const permissionsRoles = [
    {name: 'admin'}
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
    mayDelete={mayDelete && faculty.issuers.length === 0}
  />

  <Router>
    <Route path="/issuers">
      <Issuers
        {issuers}
        mayCreate={mayCreate}/>
    </Route>
    <Route path="/user-management/invite-new-user">
      <InviteUser
        permissionsRoles={permissionsRoles}
        entityId={entityId}
        defaultValue={0}
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
