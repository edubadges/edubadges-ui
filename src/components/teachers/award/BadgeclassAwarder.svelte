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
  import {
    assertionsQuery,
    directAwardBundleQuery,
    directAwardsQuery,
    enrollmentsQuery,
    headerStaff
  } from "../../../api/queries";
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
  import DirectAwardBundles from "./DirectAwardBundles.svelte";
  import {issuedTypes} from "../../../stores/filterAssertions";

  export let entityId;
  export let subEntity;

  let issuer;
  let faculty;
  let badgeclass = {extensions: [], issuer: {faculty: {institution: {}}}};

  let enrollments = [];
  let assertions = [];
  let directAwardBundles = [];
  let loaded;

  const publicUrl = () => {
    const currentUrl = window.location.origin;
    return `${currentUrl}/public/${entityId}`;
  };

  const query = `query ($entityId: String, $days: Int){
    badgeClass(id: $entityId, days: $days) {
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
      },
      ${directAwardBundleQuery},
      ${directAwardsQuery},
      ${enrollmentsQuery},
      ${assertionsQuery}
    }
  }`;

  const refreshQuery = `query ($entityId: String, $days: Int){
    badgeClass(id: $entityId, days: $days) {
      ${directAwardBundleQuery},
      ${directAwardsQuery},
      ${enrollmentsQuery},
      ${assertionsQuery}
    }
  }`;

  const issuedOn = award => {
    const createdAt = new Date(award.createdAt);
    const today = new Date().getTime();
    const day = 1000 * 60 * 60 * 24;
    const minus30 = new Date(today - (day * 30));
    const minus60 = new Date(today - (day * 60));
    const minus90 = new Date(today - (day * 90));
    if (createdAt > minus30) {
      award.issued = issuedTypes.LAST_30_DAYS;
    } else if (createdAt > minus60) {
      award.issued = issuedTypes.LAST_60_DAYS;
    } else if (createdAt > minus90) {
      award.issued = issuedTypes.LAST_90_DAYS;
    } else {
      award.issued = issuedTypes.ALL;
    }
  }

  const refreshAwardsAndEnrolments = (res, callback) => {
    enrollments = res.badgeClass.pendingEnrollments;
    directAwardBundles = res.badgeClass.directAwardBundles;

    const badgeAssertions = res.badgeClass.badgeAssertions;
    badgeAssertions.forEach(ba => {
      ba.isDirectAward = false;
      ba.status = ba.revoked ? "REVOKED" : ba.acceptance;
      issuedOn(ba);
    });
    const directAwards = res.badgeClass.directAwards;
    res.badgeClass.directAwards.forEach(da => {
      da.isDirectAward = true;
      issuedOn(da);
    });

    assertions = badgeAssertions.concat(directAwards);

    loaded = true;
    callback && callback();
  }


  const refresh = callback => {
    loaded = false;
    queryData(refreshQuery, {entityId, days: 90}).then(res => {
      refreshAwardsAndEnrolments(res, callback);
    });
  }

  onMount(() => {
    loaded = false;
    queryData(query, {entityId, days: 90}).then(res => {
      badgeclass = res.badgeClass;

      translateProperties(badgeclass);
      translateProperties(badgeclass.issuer);
      translateProperties(badgeclass.issuer.faculty);
      translateProperties(badgeclass.issuer.faculty.institution);

      issuer = res.badgeClass.issuer;
      faculty = issuer.faculty;

      refreshAwardsAndEnrolments(res);
    });

  });

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
    },
    {
      entity: "directAwardBundle",
      count: directAwardBundles.length,
      href: `/badgeclass/${entityId}/direct-awards-bundles`
    }
  ].filter(tab => tab.entity !== "directAwardBundle" || (badgeclass.issuer.faculty.institution.directAwardingEnabled
      && directAwardBundles.length));

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
          <AwardBadge badgeclass={badgeclass}
                      existingDirectAwardsEppns={assertions
                            .filter(da => da.isDirectAward && da.status.toLowerCase() === "unaccepted")
                            .map(da => da.eppn)}
                      enrollments={enrollments}
                      refresh={refresh}/>
        </Route>

        <Route path="/bulk-award">
          <BulkAwardBadge badgeclass={badgeclass}
                          existingDirectAwardsEppns={assertions
                            .filter(da => da.isDirectAward && da.status.toLowerCase() === "unaccepted")
                            .map(da => da.eppn)}
                          enrollments={enrollments}
                          refresh={refresh}/>
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
            <Assertions {badgeclass} assertions={assertions} refresh={refresh}/>
          </Route>

          <Route path="/direct-awards-bundles">
            <DirectAwardBundles badgeclassName={badgeclass.name} {directAwardBundles}/>
          </Route>
        </Router>
      </div>
    {/if}
  {:else}
    <Spinner/>
  {/if}
</div>
