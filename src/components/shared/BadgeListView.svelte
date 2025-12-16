<script>
  import BadgeListItem from "./BadgeListItem.svelte";

  export let badges = [];
  export let isBadgesClass = false;
  export let isPublic = false;
  export let linksEnabled = true;

</script>

<style lang="scss">
  table.badges {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }
</style>
<table class="badges">
  <thead/>
  <tbody>
  {#each badges as badge}
    {#if isBadgesClass}
      <BadgeListItem badgeClass={badge} isPublic={isPublic} linksEnabled={linksEnabled}/>
    {:else}
      <BadgeListItem badge={badge} isPublic={isPublic} badgeClass={badge.badgeclass} linksEnabled={linksEnabled}/>
    {/if}

  {/each}
  </tbody>
</table>

