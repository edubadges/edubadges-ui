<script>
  import { onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { EntityHeader } from "../teachers";
  import { Overview } from "../teachers/badgeclass";
  import Assertions from "../teachers/badges/Assertions.svelte";
  import Enrollments  from "../teachers/badges/Enrollments.svelte";
  import { badgeclassIcon, chevronLeft } from "../../icons";
  import { queryData } from "../../api/graphql";
  import {
    headerStaff,
    headerEntity,
    enrollmentsQuery,
    assertionsQuery
  } from "../../api/queries";

  export let entityId;
  export let subEntity;

  let issuer;
  let faculty;
  let badgeclass = { extensions: [] };

  let enrollments = [];
  let assertions = [];

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
        faculty { name, entityId }
      },
      permissions { mayUpdate },
      extensions { name, originalJson }
    },
    ${enrollmentsQuery(entityId)},
    ${assertionsQuery(entityId)},
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;

      enrollments = res.badgeClass.pendingEnrollments;
      assertions = res.badgeClass.badgeAssertions;
    });
  });

  $: tabs = [
    {
      entity: "badgeclassOverview",
      href: `/badgeclass/${entityId}/overview`
    },
    {
      entity: "enrollments",
      count: enrollments.length,
      href: `/badgeclass/${entityId}/enrollments`
    },
    {
      entity: "assertions",
      count: assertions.length,
      href: `/badgeclass/${entityId}/awarded`
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

    <Route path="/enrollments">
      <Enrollments {entityId} bind:enrollments />
    </Route>

    <Route path="/awarded">
      <Assertions {issuer} {badgeclass} {assertions} />
    </Route>
  </Router>
</div>
