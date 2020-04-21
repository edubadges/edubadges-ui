<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { EntityHeader } from "../teachers";
  import { Overview } from "../teachers/badgeclass";
  import { Awarded, Requested, Revoked } from "../teachers/badges";
  import { badgeclassIcon } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";

  export let entityId;
  export let subEntity;

  let issuer;
  let faculty;
  let badgeclass = { staff: [], extensions: [] };
  let requestCount;
  let recipientCount;
  let revokedCount;

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
      requestCount = res.badgeClass.enrollments.filter(el => !el.dateAwarded)
        .length;
      recipientCount = res.badgeClass.badgeAssertions.filter(
        el => el.revoked === false
      ).length;
      revokedCount = res.badgeClass.badgeAssertions.filter(
        el => el.revoked === true
      ).length;
    });
  });

  $: tabs = [
    {
      entity: "badgeclassOverview",
      href: `/badgeclass/${entityId}/overview`
    },
    {
      entity: "badgesRequested",
      count: requestCount,
      href: `/badgeclass/${entityId}/requested`
    },
    {
      entity: "badgesAwarded",
      count: recipientCount,
      href: `/badgeclass/${entityId}/awarded`
    },
    {
      entity: "badgesRevoked",
      count: revokedCount,
      href: `/badgeclass/${entityId}/revoked`
    }
  ];

  $: if (!subEntity) navigate(tabs[0].href, { replace: true });

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

<EntityHeader
  object={badgeclass}
  entity="badgeclass"
  {tabs}
  {headerItems}
  mayUpdate={badgeclass.permissions && badgeclass.permissions.mayUpdate && badgeclass.badgeAssertions.length === 0} />

<div class="main-content-margin">
  <Router>
    <Route path="/overview" component={Overview} />

    <Route path="/requested">
      <Requested {entityId} />
    </Route>

    <Route path="/awarded">
      <Awarded {entityId} />
    </Route>

    <Route path="/revoked">
      <Revoked {entityId} />
    </Route>
  </Router>
</div>
