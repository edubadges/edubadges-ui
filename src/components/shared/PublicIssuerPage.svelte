<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {BadgeClassHeader} from "../teachers";
  import {Spinner} from "../index";
  import {entityType} from "../../util/entityTypes"
  import {queryData} from "../../api/graphql";
  import mailIcon from "../../icons/mail-white.svg";
  import globeIcon from "../../icons/network-information.svg";
  import trophyIcon from "../../icons/school-book-trophy.svg";
  import PublicBreadcrumb from "./PublicBreadcrumb.svelte";
  import {ects, eqf, extensionValue, studyLoad} from "../extensions/badges/extensions";
  import BadgeCard from "./BadgeCard.svelte";
  import BadgeListView from "./BadgeListView.svelte";
  import ViewSelector from "./ViewSelector.svelte";

  export let entityId;
  export let visitorRole;

  let issuer = {faculty: {institution: {}}};
  let view = "cards";
  let loaded;

  const currentLanguage = I18n.locale;
  const query = `query ($entityId: String){
    publicIssuer(id: $entityId) {
      name,
      descriptionEnglish,
      descriptionDutch,
      url,
      email,
      image,
      entityId,
      createdAt,
      faculty {
        name,
        institution {
          name,
          entityId,
          brin,
          gradingTable
        }
      },
      publicBadgeclasses {
        name,
        image,
        entityId,
        assertionsCount,
        createdAt,
        extensions {
          name,
          originalJson
        }
      }
    }
  }`

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      issuer = res.publicIssuer;
      issuer.description = currentLanguage === "en" ? issuer.descriptionEnglish : issuer.descriptionDutch;
      issuer.publicBadgeclasses.forEach(badgeClass => {
        badgeClass.issuer = issuer;
        badgeClass.institution = issuer.faculty.institution;
        //used in the filtering
        badgeClass.studyLoad = extensionValue(badgeClass.extensions, studyLoad);
        badgeClass.ects = extensionValue(badgeClass.extensions, ects);
        badgeClass.eqf = extensionValue(badgeClass.extensions, eqf);
      });
      loaded = true;
    });
  });

</script>

<style lang="scss">
  .info {
    margin-bottom: 30px;
    word-break: break-all;
  }

  section.icons {
    padding: 0 25px;

    div {
      border-bottom: 1px solid var(--grey-4);
      padding: 20px;
      display: flex;
      align-content: center;

      &:last-child {
        border-bottom: none;
      }

      a {
        padding-left: 20px;
        display: inline-block;
      }
    }
  }

  :global(section.icons svg) {
    width: 24px;
    height: auto;
  }

  @media (max-width: 1120px) {
    .issuer-detail {
      padding: 20px !important;
    }
  }

  div.issuer-detail {
    padding: 40px 140px;
  }

  div.page-container {
    width: 100%;

    div.view-selector {
      display: flex;
      padding: 10px ;
    }

    div.badges {
      padding: 0 20px 30px 20px;
      --badge-margin-right: 20px;
      flex: 1;

      &.cards {
        display: grid;
        grid-template-columns: 31% 31% 31%;
        grid-row: auto;
        grid-column-gap: 25px;
        grid-row-gap: 25px;
        margin-right: calc(var(--badge-margin-right) * -1);
      }

      &.list {
        display: flex;
        flex-direction: column;
      }

    }

    @media (max-width: 1120px) {
      div.badges.cards {
        grid-template-columns: 48% 48%;
      }
    }

    @media (max-width: 820px) {
      div.badges.cards {
        grid-template-columns: 97%;
      }
    }

  }
</style>

<div class="page-container">
  <PublicBreadcrumb issuer={issuer}/>
  {#if loaded}
    <BadgeClassHeader
      entity={entityType.ISSUER}
      object={issuer}
      hasDescription={true}
      visitorRole={visitorRole}
      entityId={entityId}>
      <span slot="institution">
        {@html I18n.t("catalog.issuer.institution", {
          name: issuer.faculty.institution.name,
          link: `/public/institutions/${issuer.faculty.institution.entityId}`
        })}
	    </span>
      <section class="icons">
        {#if issuer.email}
          <div>
            {@html mailIcon}
            <a href={`mailto:${issuer.email}`}>{I18n.t("catalog.issuer.contact")}</a>
          </div>
        {/if}
        {#if issuer.url}
          <div>
            {@html globeIcon}
            <a href={issuer.url} target="_blank">{I18n.t("catalog.issuer.website")}</a>
          </div>
        {/if}
        {#if issuer.faculty.institution.gradingTable}
          <div>
            {@html trophyIcon}
            <a href={issuer.faculty.institution.gradingTable}>{I18n.t("catalog.issuer.gradingTable")}</a>
          </div>
        {/if}
      </section>
    </BadgeClassHeader>
    <div class="content">
    <div class="view-selector">
      <ViewSelector bind:view={view}/>
    </div>
    <div class={`badges ${view === "list" ? "list" : "cards"}`}>
      {#if view === "list"}
        <BadgeListView badges={issuer.publicBadgeclasses} isBadgesClass={true} isPublic={true}/>
      {:else}
        {#each issuer.publicBadgeclasses as badge}
          <BadgeCard isPublic={true} badgeClass={badge} withHeaderData={false}/>
        {/each}
      {/if}
    </div>
    </div>

  {:else}
    <Spinner/>
  {/if}
</div>
