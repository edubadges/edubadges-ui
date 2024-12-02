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
        enrollmentsQuery,
        headerStaff
    } from "../../../api/queries";
    import {expirationPeriod} from "../../../util/entityHeader";
    import {entityType} from "../../../util/entityTypes"
    import Spinner from "../../Spinner.svelte";
    import LinkEye from "../LinkEye.svelte";
    import {facultyIds, issuerIds} from "../../../stores/filterBadges";
    import {translateBadgeClassProperties} from "../../../util/utils";
    import BadgeAwardOptions from "./BadgeAwardOptions.svelte";
    import {currentPath} from "../../../stores/currentPath";
    import AwardBadge from "./AwardBadge.svelte";
    import BulkAwardBadge from "./BulkAwardBadge.svelte";
    import DirectAwardBundles from "./DirectAwardBundles.svelte";
    import {filterTypes, issuedTypes} from "../../../stores/filterAssertions";
    import BulkAwardDetails from "./BulkAwardDetails.svelte";
    import {config} from "../../../util/config";
    import {ACTIONS, assertionStatusClass} from "../../../util/assertions";

    export let entityId;
    export let subEntity;

    let badgeclass = {extensions: [], issuer: {faculty: {institution: {}}}};
    let publicInstitutions = [];

    let openEnrollments = [];
    let rejectedEnrollments = [];
    let directAwards = [];
    let openDirectAwards = [];
    let deniedDirectAwards = [];
    let badgeAssertions = [];
    let revokedBadgeAssertions = [];
    let deletedDirectAwards = [];
    let existingDirectAwardsEppns = [];
    let directAwardBundles = [];
    let loaded;

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
      typeBadgeClass,
      participation,
      assessmentType,
      assessmentIdVerified,
      assessmentSupervised,
      qualityAssuranceName,
      qualityAssuranceUrl,
      qualityAssuranceDescription,
      gradeAchievedRequired,
      stackable,
      issuer {
        nameEnglish,
        nameDutch,
        entityId,
        faculty {
          nameEnglish,
          nameDutch,
          imageDutch,
          imageEnglish,
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
      ${directAwardBundleQuery},
      ${enrollmentsQuery},
      ${assertionsQuery}
    }
  }`;

    const refreshQuery = `query ($entityId: String, $days: Int){
    badgeClass(id: $entityId, days: $days) {
      ${directAwardBundleQuery},
      ${enrollmentsQuery},
      ${assertionsQuery}
    }
  }`;

    const issuedOn = (award, issuedOn) => {
        const createdAt = new Date(issuedOn);
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
        const enrollments = res.badgeClass.pendingEnrollmentsIncludingDenied;
        rejectedEnrollments = enrollments.filter(enrollment => enrollment.denied);
        openEnrollments = enrollments.filter(enrollment => !enrollment.denied);
        directAwardBundles = res.badgeClass.directAwardBundles;
        const allBadgeAssertions = res.badgeClass.badgeAssertions;
        allBadgeAssertions.forEach(ba => {
            ba.isDirectAward = ba.awardType === "DIRECT_AWARD";
            ba.status = ba.revoked ? "REVOKED" : ba.acceptance;
            if (ba.awardType === "REQUESTED" && ba.status === "UNACCEPTED") {
                //We don't show pending / in afwachting anymore after 5.3 release
                ba.status = "ACCEPTED";
            }
            issuedOn(ba, ba.issuedOn);
            ba.statusDisplay = assertionStatusClass(ba);
            ba.statusSort = I18n.t(`models.badge.statuses.${ba.statusDisplay}`)
        });
        revokedBadgeAssertions = allBadgeAssertions.filter(assertion => assertion.revoked);
        badgeAssertions = allBadgeAssertions.filter(assertion => !assertion.revoked);
        directAwards = res.badgeClass.directAwardBundles.map(dab => dab.directAwards).flat();
        directAwards.forEach(da => {
            da.isDirectAward = true;
            da.statusDisplay = assertionStatusClass(da);
            da.statusSort = I18n.t(`models.badge.statuses.${da.statusDisplay}`);
            issuedOn(da, da.createdAt);
        });
        openDirectAwards = directAwards.filter(da => ["scheduled", "unaccepted"].includes(da.status.toLowerCase()))
        deniedDirectAwards = directAwards.filter(da => ["rejected"].includes(da.status.toLowerCase()))
        deletedDirectAwards = directAwards.filter(da => "deleted" === da.status.toLowerCase());

        res.badgeClass.directAwards = directAwards;
        existingDirectAwardsEppns = directAwards
            .filter(da => da.status.toLowerCase() === "unaccepted" || da.status.toLowerCase() === "scheduled")
            .concat(badgeAssertions.map(ba => ba.user.eppns).flat().map(eppn => ({eppn: eppn, isAssertion: true})));
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
                    publicInstitutions = res.publicInstitutions;
                    refreshAwardsAndEnrolments(res);
                }
            });

    });

    $: tabs = [
        {
            entity: "badgeclassOverview",
            href: `/badgeclass/${entityId}/overview`
        },
        {
            entity: "directAwardBundles",
            count: directAwardBundles.length,
            href: `/badgeclass/${entityId}/direct-awards-bundles`
        },
        {
            entity: "openDirectAwards",
            count: openDirectAwards.length,
            href: `/badgeclass/${entityId}/open-direct-awards`
        },
        {
            entity: "openEnrollments",
            count: openEnrollments.length,
            href: `/badgeclass/${entityId}/open-enrollments`
        },
        {
            entity: "assertions",
            count: badgeAssertions.length,
            href: `/badgeclass/${entityId}/awarded`
        },
        {
            entity: "revokedBadgeAssertions",
            count: revokedBadgeAssertions.length,
            href: `/badgeclass/${entityId}/revoked-assertions`
        },
        {
            entity: "rejectedEnrollments",
            count: rejectedEnrollments.length,
            href: `/badgeclass/${entityId}/rejected-enrollments`
        },
        {
            entity: "deletedDirectAwards",
            count: deletedDirectAwards.length,
            href: `/badgeclass/${entityId}/deleted-direct-awards`
        },
        {
            entity: "deniedDirectAwards",
            count: deniedDirectAwards.length,
            href: `/badgeclass/${entityId}/denied-direct-awards`
        },
    ]
        .filter(tab => tab.count === undefined || tab.count > 0 || subEntity === tab.href.substring(tab.href.lastIndexOf('/') + 1))
        .filter(tab => tab.entity === "badgeclassOverview" || badgeclass.name !== config.welcomeBadgeClassName);


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
        },
        {
            attr: "status",
            type: "none",
            value: I18n.t(`placeholders.badgeClass.status.${badgeclass.archived ? "archived" : badgeclass.isPrivate ? "private" : "active"}`)
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
            <a use:link href="/manage/institution">{badgeclass.issuer.faculty.institution.name}</a>

            <span class="crumb">{@html chevronRightSmall}</span>
            <a use:link href={`/manage/faculty/${badgeclass.issuer.faculty.entityId}`}>{badgeclass.issuer.faculty.name}</a>

            <span class="crumb">{@html chevronRightSmall}</span>
            <a use:link href={`/manage/issuer/${badgeclass.issuer.entityId}`}>{badgeclass.issuer.name}</a>

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
                                enrollments={openEnrollments}
                                existingDirectAwardsEppns={existingDirectAwardsEppns}
                                refresh={refresh}/>
                </Route>
                <Route path="/lti-award">
                    <AwardBadge badgeclass={badgeclass}
                                ltiContextEnabled={true}
                                existingDirectAwardsEppns={existingDirectAwardsEppns}
                                enrollments={openEnrollments}
                                refresh={refresh}/>
                </Route>
                <Route path="/bulk-award">
                    <BulkAwardBadge badgeclass={badgeclass}
                                    existingDirectAwardsEppns={existingDirectAwardsEppns}
                                    enrollments={openEnrollments}
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
                    isPublic={false}
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
                    <Route path="/open-direct-awards">
                        <Assertions {badgeclass}
                                    assertions={openDirectAwards}
                                    refresh={refresh}
                                    directAwards={true}
                                    filterOptions={[filterTypes.ISSUED, filterTypes.STATUS]}
                                    actions={[ACTIONS.DELETE_DIRECT_AWARD, ACTIONS.RESEND_DIRECT_AWARD]}
                                    title={I18n.t("models.badge.openAwarded")}
                        />
                    </Route>
                    <Route path="/denied-direct-awards">
                        <Assertions {badgeclass}
                                    assertions={deniedDirectAwards}
                                    refresh={refresh}
                                    showStatus={false}
                                    directAwards={true}
                                    updatedTitle={I18n.t("models.enrollment.denied")}
                                    filterOptions={[filterTypes.ISSUED, filterTypes.STATUS]}
                                    actions={[ACTIONS.DELETE_DIRECT_AWARD]}
                                    title={I18n.t("models.badge.deniedAwarded")}
                        />
                    </Route>
                    <Route path="/open-enrollments">
                        <Enrollments {entityId}
                                     enrollments={openEnrollments}
                                     badgeClass={badgeclass}
                                     refresh={refresh}
                                     title={I18n.t("models.enrollment.title")}/>
                    </Route>
                    <Route path="/awarded">
                        <Assertions {badgeclass}
                                    assertions={badgeAssertions}
                                    refresh={refresh}
                                    showStatus={false}
                                    updatedTitle={I18n.t("models.badge.inBackPack")}
                                    actions={[ACTIONS.REVOKE_ASSERTION]}
                                    title={I18n.t("models.badge.awarded")}
                        />
                    </Route>
                    <Route path="/revoked-assertions">
                        <Assertions {badgeclass}
                                    assertions={revokedBadgeAssertions}
                                    refresh={refresh}
                                    actions={[]}
                                    showStatus={false}
                                    updatedTitle={I18n.t("models.badge.revoked")}
                                    title={I18n.t("models.badge.revokedAwarded")}
                        />
                    </Route>
                    <Route path="/rejected-enrollments">
                        <Enrollments {entityId}
                                     enrollments={rejectedEnrollments}
                                     badgeClass={badgeclass}
                                     refresh={refresh}
                                     denied={true}
                                     title={I18n.t("models.enrollment.titleRejected")}
                                     actions={[ACTIONS.AWARD_ENROLLMENT]}
                        />
                    </Route>
                    <Route path="/deleted-direct-awards">
                        <Assertions {badgeclass}
                                    assertions={deletedDirectAwards}
                                    refresh={refresh}
                                    actions={[]}
                                    directAwards={true}
                                    showStatus={false}
                                    type="deleted"
                                    updatedTitle={I18n.t("models.badge.statuses.deleted")}
                                    filterOptions={[filterTypes.ISSUED]}
                                    title={I18n.t("models.badge.deletedAwarded")}
                        />
                    </Route>
                    <Route path="/direct-awards-bundles">
                        <DirectAwardBundles badgeClass={badgeclass} {directAwardBundles}/>
                    </Route>
                </Router>
            </div>
        {/if}
    {:else}
        <Spinner/>
    {/if}
</div>
