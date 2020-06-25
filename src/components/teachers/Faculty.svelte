<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers, FacultyUserManagement, InviteUser } from "../teachers";
  import { issuerIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";
  import {entityType} from "../../util/entityTypes"

  export let entityId;
  export let subEntity;

  let faculty = { staff: [] };
  let mayUpdate = false;
  let mayCreate = false;
  let issuers = [];

  const query = `{
    currentUser {
      facultyStaffs {
        mayUpdate,
        mayCreate
      },
      institutionStaff {
        mayUpdate,
        mayCreate
      }
    },
    faculty(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
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
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      mayCreate = res.currentUser.institutionStaff.mayCreate || res.currentUser.facultyStaffs.mayCreate
      mayUpdate = res.currentUser.institutionStaff.mayUpdate || res.currentUser.facultyStaffs.mayUpdate
      faculty = res.faculty;
      issuers = res.faculty.issuers;
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

  $: if (!subEntity) navigate(tabs[0].href, { replace: true });

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

<Breadcrumb {faculty} />
<EntityHeader
  {tabs}
  {headerItems}
  object={faculty}
  mayUpdate={mayUpdate}
  entity="faculty" />

<Router>
  <Route path="/issuers">
    <Issuers
      {issuers}
      mayCreate={mayCreate} />
  </Route>
  <Route path="/user-management/invite-new-user">
      <InviteUser permissionsRoles={permissionsRoles} defaultValue={0} disabledRole={true} />
  </Route>
  <Route path="/user-management">
    <FacultyUserManagement entity={entityType.ISSUER_GROUP} entityId={entityId} />
  </Route>
</Router>
