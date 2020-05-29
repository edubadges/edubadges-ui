<script>
  import {onMount} from "svelte";
  import {Router, Route, navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import info from "../../icons/informational.svg";
  import {EntityHeader} from "../teachers";
  import Button from "../../components/Button.svelte";
  import {Overview} from "../teachers/badgeclass";
  import Assertions from "../teachers/badges/Assertions.svelte";
  import Enrollments from "../teachers/badges/Enrollments.svelte";
  import {badgeclassIcon, chevronLeft} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {
    headerStaff,
    headerEntity,
    enrollmentsQuery,
    assertionsQuery
  } from "../../api/queries";
  import {expirationPeriod} from "../../util/entityHeader";
  import CopyToClipboardButton from "../CopyToClipboardButton.svelte";

  export let entityId;
  export let subEntity;

  let issuer;
  let faculty;
  let badgeclass = {extensions: [], issuer: {}};

  let enrollments = [];
  let assertions = [];

  const publicUrl = () => {
    const currentUrl = window.location.origin;
    return `${currentUrl}/public/${entityId}`;
  }

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

  $: if (!subEntity) navigate(tabs[0].href, {replace: true});

  $: headerItems = [
    {
      attr: "created",
      type: "date",
      value: badgeclass.createdAt
    },
    {
      attr: "expiresAfter",
      type: "none",
      value: expirationPeriod(badgeclass)
    },
    {
      attr: "issuer",
      type: "none",
      value: badgeclass.issuer.name
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

  div.public-link {
    background-color: var(--blue-light);
    margin-bottom: 25px;
    padding: 25px;
    border-radius: 8px;
  }

  div.info {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    span:first-child {
      margin-right: 15px;
      max-width: 100%;
    }

  }

  div.options {
    display: flex;

    input {
      margin-right: 25px;
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
  mayUpdate={false}>
  <!--  <div class="slots">-->
  <!--    <Button href={`/invite-enrollements/${badgeclass.entityId}`} text={I18n.t("models.badgeclass.inviteEnrollements")}/>-->
  <!--  </div>-->
</EntityHeader>

<div class="main-content-margin">
  <Router>
    <Route path="/overview">
      <Overview {badgeclass}>
        <div class="public-link">
          <div class="info">
            <span>{@html info}</span>
            <span>{I18n.t("invites.copyPublicUrl")}</span>
          </div>
          <div class="options">
            <input class="input-field full" disabled={true} value={publicUrl()}/>
            <CopyToClipboardButton toCopy={publicUrl()} text={I18n.t("invites.copyUrl")}/>
          </div>
        </div>

      </Overview>
    </Route>

    <Route path="/enrollments">
      <Enrollments {entityId} bind:enrollments/>
    </Route>

    <Route path="/awarded">
      <Assertions {issuer} {badgeclass} {assertions}/>
    </Route>
  </Router>
</div>
