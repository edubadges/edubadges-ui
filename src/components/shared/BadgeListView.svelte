<script>
  import BadgeListItem from "./BadgeListItem.svelte";

  export let badges = [];
  export let isBadgesClass = false;

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
      <BadgeListItem badgeClass={badge}/>
    {:else}
      <BadgeListItem badge={badge} badgeClass={badge.badgeclass}/>
    {/if}

  {/each}
  </tbody>
</table>

