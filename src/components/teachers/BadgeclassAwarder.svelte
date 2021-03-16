<script>
  import {onMount} from "svelte";
  import {link, navigate, Route, Router} from "svelte-routing";
  import I18n from "i18n-js";
  import info from "../../icons/informational.svg";
  import warning from "../../icons/warning.svg";
  import {BadgeClassHeader} from "../teachers";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import {Overview} from "../teachers/badgeclass";
  import Assertions from "../teachers/badges/Assertions.svelte";
  import Enrollments from "../teachers/badges/Enrollments.svelte";
  import {queryData} from "../../api/graphql";
  import {assertionsQuery, enrollmentsQuery, headerStaff} from "../../api/queries";
  import {expirationPeriod} from "../../util/entityHeader";
  import CopyToClipboardButton from "../CopyToClipboardButton.svelte";
  import {entityType} from "../../util/entityTypes"
  import Spinner from "../Spinner.svelte";
  import LinkEye from "./LinkEye.svelte";
  import {facultyIds, issuerIds} from "../../stores/filterBadges";
  import {translateProperties} from "../../util/utils";

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

  const refresh = () => {
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
      color: var(--text-grey-dark)
    }

    span.crumb {
      height: 14px;
      width: 14px;
      margin: auto 4px;
    }

  }

  div.public-link {
    background-color: var(--blue-light);
    margin-bottom: 25px;
    padding: 25px;
    border-radius: 8px;

    &.private {
      background-color: var(--red-light);
      //color: var(--purple)
    }
  }

  div.info {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    span:first-child {
      margin-right: 15px;
      max-width: 100%;
    }

    :global(span.warning svg) {
      width: 28px;
      height: auto;
      fill: var(--red-dark);
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
      <LinkEye badgeclass={badgeclass} isAdminView={false}/>
    </div>

    <BadgeClassHeader
      object={badgeclass}
      entity={entityType.BADGE_CLASS}
      {tabs}
      {headerItems}
      mayUpdate={false}>
      <!--  <div class="slots">-->
      <!--    <Button href={`/invite-enrollements/${badgeclass.entityId}`} text={I18n.t("models.badgeclass.inviteEnrollements")}/>-->
      <!--  </div>-->
    </BadgeClassHeader>

    <div>
      <Router>
        <Route path="/overview">
          <div class="overview-container">
            <Overview {badgeclass}>
              <div class="public-link" class:private={badgeclass.isPrivate}>
                {#if badgeclass.isPrivate}
                  <div class="info">
                    <span class="warning">{@html warning}</span>
                    <span>{I18n.t("invites.copyPublicUrlDisabled")}</span>
                  </div>
                {:else}
                  <div class="info">
                    <span>{@html info}</span>
                    <span>{I18n.t("invites.copyPublicUrl")}</span>
                  </div>
                  <div class="options">
                    <input class="input-field full" disabled={true} value={publicUrl()}/>
                    <CopyToClipboardButton toCopy={publicUrl()} text={I18n.t("invites.copyUrl")}/>
                  </div>
                {/if}
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