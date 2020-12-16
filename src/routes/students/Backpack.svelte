<script>
  import I18n from "i18n-js";
  import Spinner from "../../components/Spinner.svelte";
  import {onMount} from "svelte";
  import {
    userLoggedIn,
    userHasClosedWelcome,
    userRole,
    authToken
  } from "../../stores/user";
  import {Button} from "../../components";
  import {Welcome} from "../../components/students";
  import {queryData} from "../../api/graphql";
  import {studentBadgeInstances} from "../../api/queries";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import {sortCreatedAt} from "../../stores/filterBadges";
  import { extensionValue, studyLoad, ects } from "../../components/extensions/badges/extensions";

  let loaded = false;
  let badges = [];

  onMount(() => {
    queryData(studentBadgeInstances).then(res => {
      badges = sortCreatedAt(res.badgeInstances);
      for(const badge of badges) {
        badge.badgeclass.studyLoad = extensionValue(badge.badgeclass.extensions, studyLoad);
        badge.badgeclass.ects = extensionValue(badge.badgeclass.extensions, ects);
      }
      loaded = true;
    });
  });

  $: showWelcome = loaded && !badges.some(badge => badge.acceptance !== "UNACCEPTED") && !$userHasClosedWelcome;
</script>

<style>
  h3 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  div.content {
    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-row: auto;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
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
  <h3>{I18n.t('backpack.title')}</h3>
  {#if showWelcome}
    <Welcome/>
  {/if}
  {#if loaded}
    <div class="content">
      {#each badges as badge}
        <BadgeCard badge={badge} badgeClass={badge.badgeclass} withHeaderData={true}/>
      {/each}
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
