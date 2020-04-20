<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Badgeclasses } from "../teachers";
  import { badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";

  export let entityId;
  export let subEntity;

  let issuer = { staff: [] };
  let faculty = {};
  let badgeclasses = [];

  const query = `{
    issuer(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      image,
      email,
      url,
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
    });
  });

  const tabs = [
    {
      entity: "badgeclasses",
      href: `/manage/issuer/${entityId}/badgeclasses`,
      icon: badgeclassIcon
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, { replace: true });

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
</script>

<Breadcrumb {faculty} {issuer} />
<EntityHeader
  {tabs}
  {headerItems}
  object={issuer}
  entity="issuer"
  mayUpdate={issuer.permissions && issuer.permissions.mayUpdate} />

<Router>
  <Route path="/badgeclasses">
    <Badgeclasses
      {badgeclasses}
      mayCreate={issuer.permissions && issuer.permissions.mayCreate} />
  </Route>
</Router>
