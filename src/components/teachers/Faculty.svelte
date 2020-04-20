<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { Breadcrumb, EntityHeader, Issuers } from "../teachers";
  import { issuerIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let entityId;
  export let subEntity;

  let faculty = { staff: [] };
  let issuers = [];

  const query = `{
    faculty(id: "${entityId}") {
      name,
      entityId,
      description,
      createdAt,
      issuers {
        entityId
      },
      staff {
        user {
          firstName, lastName, email, entityId
        }
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

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 66px;
  }
</style>

<div class="page-container">
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
</div>
