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

  export let entityId;
  export let subEntity;

  let issuer;
  let faculty;
  let badgeclass = {};
  let requestCount;
  let recipientCount;
  let revokedCount;

  const query = `{
    badgeClass(id: "${entityId}") {
      entityId,
      name,
      image,
      description,
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
        entityId
      },
      badgeAssertions {
        entityId
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;
      requestCount = res.badgeClass.enrollments.length;
      recipientCount = res.badgeClass.badgeAssertions.filter(el => el.revoked === false).length;
      revokedCount = res.badgeClass.badgeAssertions.filter(el => el.revoked === true).length;
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
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 150px;
  }

  .content {
    margin: var(--ver-padding-l) var(--hor-padding-m);
  }
</style>

<div class="page-container">
  <Breadcrumb {faculty} {issuer} badgeclassName={badgeclass.name} />

  <EntityHeader
    entity="badgeclass"
    title={badgeclass.name}
    logo={badgeclass.image}
    {tabs}
    mayUpdate={badgeclass.permissions && badgeclass.permissions.mayUpdate} />

  <div class="content">
    <Router>
      <Route path="/requested">
        <BadgesRequested entityId={entityId} />
      </Route>

      <Route path="/awarded">
        <BadgesAwarded entityId={entityId} />
      </Route>

      <Route path="/revoked">
        <BadgesRevoked entityId={entityId} />
      </Route>
    </Router>
  </div>
</div>
