<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { EntityHeader } from "../teachers";
  import { Overview } from "../teachers/badgeclass";
  import { Awarded, Requested, Revoked } from "../teachers/badges";
  import { badgeclassIcon, chevronLeft } from "../../icons";
  import { queryData } from "../../api/graphql";
  import { headerStaff, headerEntity } from "../../api/queries";

  export let entityId;
  export let subEntity;

  let issuer;
  let faculty;
  let badgeclass = { extensions: [] };

  let requested = [];
  let awarded = [];
  let revoked = [];

  const enrollmentsQuery = `
    enrollments {
      entityId,
      dateCreated,
      dateAwarded,
      user {
        entityId,
        firstName,
        lastName,
        email
      }
    }
  `;

  const assertionsQuery = `
    badgeAssertions {
      entityId,
      createdAt,
      revoked,
      user {
        entityId,
        firstName,
        lastName,
        email
      }
    }
  `;

  const query = `{
    badgeClass(id: "${entityId}") {
      ${headerEntity},
      ${headerStaff},
      ${enrollmentsQuery},
      ${assertionsQuery},
      image,
      criteriaUrl,
      criteriaText,
      expirationPeriod,
      issuer {
        name,
        entityId,
        faculty { name, entityId }
      },
      permissions { mayUpdate },
      extensions { name, originalJson }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;

      requested = res.badgeClass.enrollments.filter(el => !el.dateAwarded);
      awarded = res.badgeClass.badgeAssertions.filter(el => !el.revoked);
      revoked = res.badgeClass.badgeAssertions.filter(el => el.revoked);
    });
  });

  $: tabs = [
    {
      entity: "badgeclassOverview",
      href: `/badgeclass/${entityId}/overview`
    },
    {
      entity: "badgesRequested",
      count: requested.length,
      href: `/badgeclass/${entityId}/requested`
    },
    {
      entity: "badgesAwarded",
      count: awarded.length,
      href: `/badgeclass/${entityId}/awarded`
    },
    {
      entity: "badgesRevoked",
      count: revoked.length,
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

<style lang="scss">
  div.nav {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;

    span {
      font-weight: bold;
    }

    :global(svg) {
      height: 16px;
    }

    > :global(*) {
      vertical-align: middle;
    }
  }
</style>

<div class="nav">
  {@html chevronLeft}
  <span class="click" on:click={() => window.history.back()}>
    {I18n.t('teacher.breadcrumb.back')}
  </span>
</div>

<EntityHeader
  object={badgeclass}
  entity="badgeclass"
  {tabs}
  {headerItems}
  mayUpdate={badgeclass.permissions && badgeclass.permissions.mayUpdate && badgeclass.badgeAssertions.length === 0} />

<div class="main-content-margin">
  <Router>
    <Route path="/overview">
      <Overview {badgeclass} />
    </Route>

    <Route path="/requested">
      <Requested {entityId} enrollments={requested} />
    </Route>

    <Route path="/awarded">
      <Awarded assertions={badgeclass.badgeAssertions} />
    </Route>

    <Route path="/revoked">
      <Revoked {entityId} />
    </Route>
  </Router>
</div>
