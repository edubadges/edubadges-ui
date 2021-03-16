<script>
  import I18n from "i18n-js";
  import Spinner from "../../components/Spinner.svelte";
  import {onMount} from "svelte";
  import {userHasClosedWelcome} from "../../stores/user";
  import {Welcome} from "../../components/students";
  import {queryData} from "../../api/graphql";
  import {studentBadgeInstances} from "../../api/queries";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import {sortCreatedAt} from "../../stores/filterBadges";
  import {ects, eqf, extensionValue, studyLoad} from "../../components/extensions/badges/extensions";
  import ViewSelector from "../../components/shared/ViewSelector.svelte";
  import BadgeListView from "../../components/shared/BadgeListView.svelte";
  import {translateProperties} from "../../util/utils";

  let loaded = false;
  let badges = [];
  let view = "cards";

  onMount(() => {
    queryData(studentBadgeInstances).then(res => {
      const badgeInstances = res.badgeInstances;
      badgeInstances.forEach(badgeInstance => {
        const issuer = badgeInstance.badgeclass.issuer;
        translateProperties(issuer);
        translateProperties(issuer.faculty);
        translateProperties(issuer.faculty.institution);
      });
      badges = sortCreatedAt(badgeInstances);
      for (const badge of badges) {
        badge.badgeclass.studyLoad = extensionValue(badge.badgeclass.extensions, studyLoad);
        badge.badgeclass.ects = extensionValue(badge.badgeclass.extensions, ects);
        badge.badgeclass.eqf = extensionValue(badge.badgeclass.extensions, eqf);
      }
      loaded = true;
    });
  });

  $: showWelcome = loaded && !badges.some(badge => badge.acceptance !== "UNACCEPTED") && !$userHasClosedWelcome;
</script>

<style lang="scss">

  .header {
    display: flex;
    align-content: center;
  }

  h3 {
    font-size: 22px;
    margin-bottom: 30px;
  }

  div.content {
    &.cards {
      display: grid;
      grid-template-columns: 31% 31% 31%;
      grid-row: auto;
      grid-column-gap: 25px;
      grid-row-gap: 25px;
    }

    &.list {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 1120px) {
    div.content {
      grid-template-columns: 48% 48%;
    }
  }

  @media (max-width: 820px) {
    div.content {
      grid-template-columns: 100%;
    }
  }
</style>

<div>
  <div class="header">
    <h3>{I18n.t('backpack.title')}</h3>
    <ViewSelector bind:view={view}/>
  </div>
  {#if showWelcome}
    <Welcome/>
  {/if}
  {#if loaded}
    <div class={`content ${view === "list" ? "list" : "cards"}`}>
      {#if view === "list"}
        <BadgeListView badges={badges}/>
      {:else}
        {#each badges as badge}
          <BadgeCard badge={badge} badgeClass={badge.badgeclass} withHeaderData={true}/>
        {/each}
      {/if}
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
