<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { EntityHeader, Breadcrumb } from "../teachers";
  import { Overview, UserManagement } from "../teachers/badgeclass/index";
  import { badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";

  export let entityId;
  export let tab;

  let issuer;
  let faculty;
  let badgeclass = {};

  const query = `{
    badgeClass(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      image,
      criteriaUrl,
      criteriaText,
      expirationPeriod,
      issuer {
        name,
        entityId,
        faculty {
          name,
          entityId,
        }
      },
      permissions {
        mayUpdate
      },
      enrollments {
        entityId,
        dateAwarded
      },
      badgeAssertions {
        entityId,
        revoked
      },
      extensions {
        name,
        originalJson
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
    });
  });

  $: tabs = [
    {
      entity: "badgeclassOverview",
      href: `/badgeclasses/${entityId}/overview`
    },
    {
      entity: "userManagement",
      href: `/badgeclasses/${entityId}/users`
    }
  ];

  $: if (!tab) navigate(tabs[0].href, { replace: true });

  $: headerItems = [
    {
      attr: "created",
      type: "date",
      value: badgeclass.createdAt
    },
    {
      attr: "admin",
      type: "adminNames",
      value: badgeclass
    }
  ];
</script>

<Breadcrumb {faculty} {issuer} badgeclassName={badgeclass.name} />

<EntityHeader object={badgeclass} entity="badgeclass" {tabs} {headerItems} />

<div class="main-content-margin">
  <Router>
    <Route path="/overview" component={Overview} />
    <Route path="/users" component={UserManagement} />
  </Router>
</div>
