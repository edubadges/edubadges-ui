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
  import {chevronLeft} from "../../icons";
  import {queryData} from "../../api/graphql";
  import {
    headerStaff,
    headerEntity,
    enrollmentsQuery,
    assertionsQuery
  } from "../../api/queries";
  import {expirationPeriod} from "../../util/entityHeader";
  import CopyToClipboardButton from "../CopyToClipboardButton.svelte";
  import {entityType} from "../../util/entityTypes"
  import Spinner from "../Spinner.svelte";
  import LinkEye from "./LinkEye.svelte";

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
  };

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
      extensions { name, originalJson },
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework,
        targetDescription
      }
    },
    ${enrollmentsQuery(entityId)},
    ${assertionsQuery(entityId)},
  }`;

  let loaded;

  const refresh = () => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;

      enrollments = res.badgeClass.pendingEnrollments;
      assertions = res.badgeClass.badgeAssertions;
      loaded = true;
    });
  }

  onMount(() => refresh());


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
  div.container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .overview-container {
    padding: 40px 140px;
  }

  div.nav {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;

    span {
      font-weight: bold;
    }

    :global(.svg-container svg) {
      height: 16px;
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
<div class="container">

  {#if loaded}
    <div class="nav">
      <span class="svg-container">{@html chevronLeft}</span>
      <span class="click" on:click={() => navigate("/")}>
      {I18n.t('teacher.breadcrumb.back')}
    </span>
      <LinkEye badgeclass={badgeclass} isAdminView={false}/>
    </div>

    <EntityHeader
      object={badgeclass}
      entity={entityType.BADGE_CLASS}
      {tabs}
      {headerItems}
      mayUpdate={false}>
      <!--  <div class="slots">-->
      <!--    <Button href={`/invite-enrollements/${badgeclass.entityId}`} text={I18n.t("models.badgeclass.inviteEnrollements")}/>-->
      <!--  </div>-->
    </EntityHeader>

    <div>
      <Router>
        <Route path="/overview">
          <div class="overview-container">
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
          </div>
        </Route>

        <Route path="/enrollments">
          <Enrollments {entityId} bind:enrollments badgeclassName={badgeclass.name} refresh={refresh}/>
        </Route>

        <Route path="/awarded">
          <Assertions {issuer} {badgeclass} {assertions} refresh={refresh}/>
        </Route>
      </Router>
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>