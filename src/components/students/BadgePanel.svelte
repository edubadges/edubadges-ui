<script>
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import BadgeListView from "../../components/shared/BadgeListView.svelte";

    export let badges = [];
    export let view = "cards";
    export let linksEnabled = true;
</script>

<style lang="scss">

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
    div.content.cards {
      grid-template-columns: 48% 48%;
    }
  }

  @media (max-width: 820px) {
    div.content.cards {
      grid-template-columns: 100%;
    }
  }
</style>


<div class={`content ${view === "list" ? "list" : "cards"}`}>
  {#if view === "list"}
    <BadgeListView badges={badges} linksEnabled={linksEnabled}/>
  {:else}
    {#each badges as badge}
      <BadgeCard badge={badge}
                 badgeClass={badge.badgeclass}
                 linksEnabled={linksEnabled}
                 withHeaderData={true}
                 />
    {/each}
  {/if}
</div>

