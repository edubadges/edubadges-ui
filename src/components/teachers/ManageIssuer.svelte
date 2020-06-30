<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import {Breadcrumb, EntityHeader, Badgeclasses, IssuerUserManagement, InviteUser} from "../teachers";
  import {badgeclassIcon} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {headerStaff, headerEntity} from "../../api/queries";

  export let entityId;
  export let subEntity;

  let issuer = {staff: []};
  let faculty = {};
  let badgeclasses = [];
  let mayUpdate;
  let mayCreate;

  let contentType;

  const query = `{
    currentUser {
      institutionStaff {
        mayUpdate,
        mayCreate
      },
      facultyStaffs {
        mayUpdate,
        mayCreate
      },
      issuerStaffs {
        mayUpdate,
        mayCreate
      }
    },
    issuer(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      image,
      email,
      url,
      contentTypeId,
      faculty {
        name,
        entityId,
      },
      badgeclasses {
        name,
        entityId,
        createdAt,
        badgeAssertions {
          entityId
        },
        enrollments {
          entityId
        }
      },
      permissions {
        mayUpdate,
        mayCreate
      }
  	}
  }`;

  onMount(() => {
    queryData(query).then(res => {
      issuer = res.issuer;
      faculty = issuer.faculty;
      badgeclasses = issuer.badgeclasses;
      mayCreate = res.currentUser.institutionStaff.mayCreate || res.currentUser.facultyStaffs.mayCreate || res.currentUser.issuerStaffs.mayCreate;
      mayUpdate = res.currentUser.institutionStaff.mayUpdate || res.currentUser.facultyStaffs.mayUpdate || res.currentUser.issuerStaffs.mayUpdate;
      contentType = res.issuer.contentTypeId;
    });
  });

  const tabs = [
    {
      entity: "badgeclasses",
      href: `/manage/issuer/${entityId}/badgeclasses`,
      icon: badgeclassIcon
    },
    {
      entity: "userManagement",
      href: `/manage/issuer/${entityId}/user-management`,
      icon: badgeclassIcon
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
    }
  ];

  const permissionsRoles = [
    {name: 'admin'}
  ];
</script>

<Breadcrumb {faculty} {issuer}/>
<EntityHeader
  {tabs}
  {headerItems}
  object={issuer}
  entity="issuer"
  mayUpdate={mayUpdate}/>

<Router>
  <Route path="/badgeclasses">
    <Badgeclasses
      {badgeclasses}
      mayCreate={mayCreate}
      issuer={issuer}/>
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
    <IssuerUserManagement entity="issuer" entityId={entityId} />
  </Route>
</Router>
