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
        alignments,
        assertionsQuery,
        directAwardBundleQuery,
        endorsed,
        endorsements,
        enrollmentsQuery,
        headerStaff
    } from "../../../api/queries";
    import {expirationPeriod} from "../../../util/entityHeader";
    import {entityType} from "../../../util/entityTypes"
    import Spinner from "../../Spinner.svelte";
    import LinkEye from "../LinkEye.svelte";
    import {facultyIds, issuerIds} from "../../../stores/filterBadges";
    import {translateBadgeClassProperties, translateProperties} from "../../../util/utils";
    import BadgeAwardOptions from "./BadgeAwardOptions.svelte";
    import {currentPath} from "../../../stores/currentPath";
    import AwardBadge from "./AwardBadge.svelte";
    import BulkAwardBadge from "./BulkAwardBadge.svelte";
    import DirectAwardBundles from "./DirectAwardBundles.svelte";
    import {issuedTypes} from "../../../stores/filterAssertions";
    import BulkAwardDetails from "./BulkAwardDetails.svelte";
    import {config} from "../../../util/config";
    import Endorsements from "../endorsements/Endorsements.svelte";
    import Endorsed from "../endorsements/Endorsed.svelte";
    import {assertionStatusClass} from "../../../util/assertions";

    export let entityId;
    export let subEntity;

    let issuer;
    let faculty;
    let badgeclass = {extensions: [], issuer: {faculty: {institution: {}}}, endorsements: [], endorsed: []};
    let publicInstitutions = [];
    let enrollments = [];
    let assertions = [];
    let existingDirectAwardsEppns = [];
    let directAwardBundles = [];
    let loaded;

    const publicUrl = () => {
        const currentUrl = window.location.origin;
        return `${currentUrl}/public/${entityId}`;
    };

    const query = `query ($entityId: String, $days: Int){
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    badgeClass(id: $entityId, days: $days) {
      entityId,
      name,
      description,
      createdAt,
      ${headerStaff},
      image,
      criteriaUrl,
      awardNonValidatedNameAllowed,
      awardAllowedInstitutions,
      archived,
      isPrivate,
      narrativeRequired,
      evidenceRequired,
      narrativeStudentRequired,
      evidenceStudentRequired,
      criteriaText,
      expirationPeriod,
      directAwardingDisabled,
      selfEnrollmentDisabled,
      issuer {
        nameEnglish,
        nameDutch,
        entityId,
        faculty {
          nameEnglish,
          nameDutch,
          entityId,
          onBehalfOf,
          onBehalfOfDisplayName,
          onBehalfOfUrl,
          institution {
            entityId,
            identifier,
            nameEnglish,
            nameDutch,
            directAwardingEnabled,
            ltiEnabled,
            eppnRegExpFormat,
            sisIntegrationEnabled
          }
        }
      },
      permissions { mayUpdate, mayAward },
      extensions { name, originalJson },
      ${alignments},
      ${endorsements},
      ${endorsed},
      ${directAwardBundleQuery},
      ${enrollmentsQuery},
      ${assertionsQuery}
    }
  }`;

    const refreshEndorsements = callback => {
        const endorsementsQuery = `query ($entityId: String, $days: Int) {
            badgeClass(id: $entityId, days: $days) {
                entityId,
                ${endorsements}
            }
        }`;
        loaded = false;
        queryData(endorsementsQuery, {entityId, days: 1}).then(res => {
            res.badgeClass.endorsements.forEach(endorsement => translateBadgeClassProperties(endorsement.endorser));
            badgeclass = {...badgeclass, endorsements: res.badgeClass.endorsements};
            callback && callback(res.badgeClass);
            loaded = true;
        });
    }

    const refreshEndorsed = callback => {
        const endorsedQuery = `query ($entityId: String, $days: Int) {
            badgeClass(id: $entityId, days: $days) {
                entityId,
                ${endorsed}
            }
        }`;
        loaded = false;
        queryData(endorsedQuery, {entityId, days: 1}).then(res => {
            res.badgeClass.endorsed.forEach(endorsement => translateBadgeClassProperties(endorsement.endorsee));
            badgeclass = {...badgeclass, endorsed: res.badgeClass.endorsed};
            callback && callback(res.badgeClass);
            loaded = true;
        });

    }

    const refreshQuery = `query ($entityId: String, $days: Int){
    badgeClass(id: $entityId, days: $days) {
      ${directAwardBundleQuery},
      ${enrollmentsQuery},
      ${assertionsQuery}
    }
  }`;

    const issuedOn = award => {
        const createdAt = new Date(award.issuedOn);
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
        enrollments = res.badgeClass.pendingEnrollmentsIncludingDenied;
        directAwardBundles = res.badgeClass.directAwardBundles;
        const badgeAssertions = res.badgeClass.badgeAssertions;
        badgeAssertions.forEach(ba => {
            ba.isDirectAward = ba.awardType === "DIRECT_AWARD";
            ba.status = ba.revoked ? "REVOKED" : ba.acceptance;
            if (ba.awardType === "REQUESTED" && ba.status === "UNACCEPTED") {
                //We don't show pending / in afwachting anymore after 5.3 release
                ba.status = "ACCEPTED";
            }
            issuedOn(ba);
        });
        const directAwards = res.badgeClass.directAwardBundles.map(dab => dab.directAwards).flat();
        directAwards.forEach(da => {
            da.isDirectAward = true;
            issuedOn(da);
        });

        res.badgeClass.directAwards = directAwards;
        assertions = badgeAssertions.concat(directAwards);
        assertions.forEach(assertion => {
            assertion.statusDisplay = assertionStatusClass(assertion);
            assertion.statusSort = I18n.t(`models.badge.statuses.${assertion.statusDisplay}`)
        });
        existingDirectAwardsEppns = directAwards
            .filter(da => da.status.toLowerCase() === "unaccepted" || da.status.toLowerCase() === "scheduled");
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
        queryData(query, {entityId, days: 90})
            .then(res => {
                badgeclass = res.badgeClass;
                if (badgeclass === null) {
                    loaded = true;
                    navigate("/404");
                } else {
                    translateBadgeClassProperties(badgeclass);
                    badgeclass.endorsements.forEach(endorsement => translateBadgeClassProperties(endorsement.endorser));
                    badgeclass.endorsed.forEach(endorsement => translateBadgeClassProperties(endorsement.endorsee));
                    publicInstitutions = res.publicInstitutions;
                    issuer = res.badgeClass.issuer;
                    faculty = issuer.faculty;
                    refreshAwardsAndEnrolments(res);
                }
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
            count: enrollments.filter(enrollment => !enrollment.denied).length,
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
        },
        {
            entity: "endorsements",
            count: badgeclass.endorsements.length,
            href: `/badgeclass/${entityId}/endorsements`
        },
        {
            entity: "endorsed",
            count: badgeclass.endorsed.length,
            href: `/badgeclass/${entityId}/endorsed`
        }
    ].filter(tab => tab.entity !== "assertions" || badgeclass.name !== config.welcomeBadgeClassName)
        .filter(tab => tab.entity !== "endorsements" || badgeclass.endorsements.length > 0 || subEntity === "endorsements")
        .filter(tab => tab.entity !== "endorsed" || badgeclass.endorsed.length > 0)
        .filter(tab => tab.entity !== "directAwardBundle" || (badgeclass.issuer.faculty.institution.directAwardingEnabled
            && directAwardBundles.length > 0))


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
    padding: 27px 174px 67px 74px;
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
            <a use:link
               href={`/badgeclass/${badgeclass.entityId}${$currentPath.indexOf("award-details") > 0 ? "/direct-awards-bundles" : ""}`}>
                {badgeclass.name}
            </a>
            {#if $currentPath.endsWith("direct-award")}
                <span class="crumb">{@html chevronRightSmall}</span>
                <span>{I18n.t("badgeAwardOptions.directAward")}</span>
            {/if}
            {#if $currentPath.endsWith("bulk-award")}
                <span class="crumb">{@html chevronRightSmall}</span>
                <span>{I18n.t("badgeAwardOptions.bulkAward")}</span>
            {/if}
            {#if $currentPath.endsWith("lti-award")}
                <span class="crumb">{@html chevronRightSmall}</span>
                <span>{I18n.t("badgeAwardOptions.ltiAward")}</span>
            {/if}
            {#if $currentPath.indexOf("award-details") > 0}
                <span class="crumb">{@html chevronRightSmall}</span>
                <span>{I18n.t("badgeAward.bulkAward.details.breadCrumb")}</span>
            {/if}
            <LinkEye badgeclass={badgeclass} isAdminView={false}/>
        </div>

        <div>
            <Router>
                <Route path="/direct-award">
                    <AwardBadge badgeclass={badgeclass}
                                ltiContextEnabled={false}
                                enrollments={enrollments}
                                existingDirectAwardsEppns={existingDirectAwardsEppns}
                                refresh={refresh}/>
                </Route>
                <Route path="/lti-award">
                    <AwardBadge badgeclass={badgeclass}
                                ltiContextEnabled={true}
                                existingDirectAwardsEppns={existingDirectAwardsEppns}
                                enrollments={enrollments}
                                refresh={refresh}/>
                </Route>
                <Route path="/bulk-award">
                    <BulkAwardBadge badgeclass={badgeclass}
                                    existingDirectAwardsEppns={existingDirectAwardsEppns}
                                    enrollments={enrollments}
                                    refresh={refresh}/>
                </Route>
                <Route path="/award-details/:entityId" let:params>
                    <BulkAwardDetails
                            directAwardBundle={directAwardBundles.find(dab => dab.entityId === params.entityId)}/>
                </Route>
            </Router>
        </div>

        {#if !$currentPath.endsWith("bulk-award") && !$currentPath.endsWith("direct-award") &&
        !$currentPath.endsWith("lti-award") && $currentPath.indexOf("award-details") === -1}
            <BadgeClassHeader
                    object={badgeclass}
                    entity={entityType.BADGE_CLASS}
                    {tabs}
                    {headerItems}
                    mayUpdate={false}>
                <div class="slots">
                    {#if badgeclass.permissions.mayAward}
                        <BadgeAwardOptions badgeclass={badgeclass}/>
                    {/if}
                </div>
            </BadgeClassHeader>

            <div>
                <Router>
                    <Route path="/overview">
                        <div class="overview-container">
                            <Overview {badgeclass} {publicInstitutions}/>
                        </div>
                    </Route>

                    <Route path="/enrollments">
                        <Enrollments {entityId} bind:enrollments badgeClass={badgeclass} refresh={refresh}/>
                    </Route>
                    {#if badgeclass.name !== config.welcomeBadgeClassName}
                        <Route path="/awarded">
                            <Assertions {badgeclass} assertions={assertions} refresh={refresh}/>
                        </Route>
                    {/if}
                    <Route path="/direct-awards-bundles">
                        <DirectAwardBundles badgeClass={badgeclass} {directAwardBundles}/>
                    </Route>
                    {#if config.features.endorsements}
                        <Route path="/endorsements">
                            <Endorsements badgeClass={badgeclass} refresh={refreshEndorsements}/>
                        </Route>
                        <Route path="/endorsed">
                            <Endorsed badgeClass={badgeclass} refresh={refreshEndorsed}/>
                        </Route>
                    {/if}
                </Router>
            </div>
        {/if}
    {:else}
        <Spinner/>
    {/if}
</div>
