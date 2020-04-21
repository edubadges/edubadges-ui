<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers } from "../teachers";
  import { issuerIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";

  export let entityId;
  export let subEntity;

  let faculty = { staff: [] };
  let issuers = [];

  const query = `{
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
      },
      permissions {
        mayUpdate,
        mayCreate
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      faculty = res.faculty;
      issuers = res.faculty.issuers;
    });
  });

  const tabs = [
    {
      entity: "issuers",
      href: `/manage/faculty/${entityId}/issuers`,
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
</script>

<Breadcrumb {faculty} />
<EntityHeader
  {tabs}
  {headerItems}
  object={faculty}
  mayUpdate={faculty.permissions && faculty.permissions.mayUpdate}
  entity="faculty" />

<Router>
  <Route path="/issuers">
    <Issuers
      {issuers}
      mayCreate={faculty.permissions && faculty.permissions.mayCreate} />
  </Route>
</Router>
