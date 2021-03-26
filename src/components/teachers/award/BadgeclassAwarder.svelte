<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {link, navigate, Route, Router} from "svelte-routing";
  import {BadgeClassHeader} from "../index";
  import chevronRightSmall from "../../../icons/chevron-right-small.svg";
  import {Overview} from "../badgeclass";
  import Assertions from "../badges/Assertions.svelte";
  import Enrollments from "../badges/Enrollments.svelte";
  import {queryData} from "../../../api/graphql";
  import {assertionsQuery, enrollmentsQuery, headerStaff} from "../../../api/queries";
  import {expirationPeriod} from "../../../util/entityHeader";
  import {entityType} from "../../../util/entityTypes"
  import Spinner from "../../Spinner.svelte";
  import LinkEye from "../LinkEye.svelte";
  import {facultyIds, issuerIds} from "../../../stores/filterBadges";
  import {translateProperties} from "../../../util/utils";
  import BadgeAwardOptions from "./BadgeAwardOptions.svelte";
  import {currentPath} from "../../../stores/currentPath";
  import AwardBadge from "./AwardBadge.svelte";
  import BulkAwardBadge from "./BulkAwardBadge.svelte";

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

  const query = `query ($entityId: String){
    badgeClass(id: $entityId) {
      entityId,
      name,
      description,
      createdAt,
      ${headerStaff},
      image,
      criteriaUrl,
      isPrivate,
      criteriaText,
      expirationPeriod,
      issuer {
        nameEnglish,
        nameDutch,
        entityId,
        faculty {
          nameEnglish,
          nameDutch,
          entityId,
          institution {
            entityId,
            nameEnglish,
            nameDutch,
            directAwardingEnabled
          }
        }
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
    ${enrollmentsQuery},
    ${assertionsQuery},
  }`;

  let loaded;

  const refresh = callback => {
    queryData(query, {entityId}).then(res => {
      badgeclass = res.badgeClass;

      translateProperties(badgeclass);
      translateProperties(badgeclass.issuer);
      translateProperties(badgeclass.issuer.faculty);
      translateProperties(badgeclass.issuer.faculty.institution);

      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;

      enrollments = res.badgeClass.pendingEnrollments;
      assertions = res.badgeClass.badgeAssertions;
      loaded = true;
      callback && callback();
    });
  }

  onMount(() => refresh());

  const navigateWithFilter = includeIssuer => () => {
    $facultyIds = [badgeclass.issuer.faculty.entityId]
    $issuerIds = includeIssuer ? [badgeclass.issuer.entityId] : [];
    navigate("/");
  }

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

  $: if (!subEntity) {
    navigate(tabs[0].href, {replace: true});
  }

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

  @media (max-width: 1120px) {
    .overview-container {
      padding: 20px;
    }
  }


  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;
    font-size: 14px;

    a {
      color: var(--text-color-grey);
    }

    a:last-of-type {
      font-weight: var(--semi-bold);
    }

    a:not(:last-of-type) {
      color: var(--text-grey-dark);
      text-decoration: underline;
    }

    span.crumb {
      height: 14px;
      width: 14px;
      margin: auto 4px;
    }

  }

</style>
<div class="container">

  {#if loaded}
    <div class="bread-crumb">
      <a use:link href={`/`}>
        {badgeclass.issuer.faculty.institution.name}
      </a>
      <span class="crumb">{@html chevronRightSmall}</span>
      <a on:click|preventDefault|stopPropagation={navigateWithFilter(false)} href={`/`}>
        {badgeclass.issuer.faculty.name}
      </a>
      <span class="crumb">{@html chevronRightSmall}</span>
      <a on:click|preventDefault|stopPropagation={navigateWithFilter(true)} href={`/`}>
        {badgeclass.issuer.name}
      </a>
      <span class="crumb">{@html chevronRightSmall}</span>
      <a on:click|preventDefault|stopPropagation={() => false}
         href={window.location.href}>{badgeclass.name}</a>
      {#if $currentPath.endsWith("direct-award")}
        <span class="crumb">{@html chevronRightSmall}</span>
        <span>{I18n.t("badgeAwardOptions.directAward")}</span>
      {/if}
      {#if $currentPath.endsWith("bulk-award")}
        <span class="crumb">{@html chevronRightSmall}</span>
        <span>{I18n.t("badgeAwardOptions.bulkAward")}</span>
      {/if}
      <LinkEye badgeclass={badgeclass} isAdminView={false}/>
    </div>

    <div>
      <Router>
        <Route path="/direct-award">
          <AwardBadge badgeclass={badgeclass} enrollments={enrollments} refresh={refresh}/>
        </Route>

        <Route path="/bulk-award">
          <BulkAwardBadge badgeclass={badgeclass} enrollments={enrollments} refresh={refresh}/>
        </Route>
      </Router>
    </div>

    {#if !$currentPath.endsWith("bulk-award") && !$currentPath.endsWith("direct-award")}
      <BadgeClassHeader
        object={badgeclass}
        entity={entityType.BADGE_CLASS}
        {tabs}
        {headerItems}
        mayUpdate={false}>
        <div class="slots">
          <BadgeAwardOptions badgeclass={badgeclass}/>
        </div>
      </BadgeClassHeader>

      <div>
        <Router>
          <Route path="/overview">
            <div class="overview-container">
              <Overview {badgeclass}/>
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
    {/if}
  {:else}
    <Spinner/>
  {/if}
</div>
