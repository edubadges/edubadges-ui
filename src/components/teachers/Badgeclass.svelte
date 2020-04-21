<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import {
    EntityHeader,
    Breadcrumb,
    BadgesAwarded,
    BadgesRequested,
    BadgesRevoked
  } from "../teachers";
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
      entity: "badgesRequested",
      count: requestCount,
      href: `/manage/badgeclass/${entityId}/requested`
    },
    {
      entity: "badgesAwarded",
      count: recipientCount,
      href: `/manage/badgeclass/${entityId}/awarded`
    },
    {
      entity: "badgesRevoked",
      count: revokedCount,
      href: `/manage/badgeclass/${entityId}/revoked`
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

<Breadcrumb {faculty} {issuer} badgeclassName={badgeclass.name} />

<EntityHeader
  object={badgeclass}
  entity="badgeclass"
  {tabs}
  {headerItems}
  mayUpdate={badgeclass.permissions && badgeclass.permissions.mayUpdate && badgeclass.badgeAssertions.length === 0} />

<div class="main-content-margin">
  <Router>
    <Route path="/requested">
      <BadgesRequested {entityId} />
    </Route>

    <Route path="/awarded">
      <BadgesAwarded {entityId} />
    </Route>

    <Route path="/revoked">
      <BadgesRevoked {entityId} />
    </Route>
  </Router>
</div>
