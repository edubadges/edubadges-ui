<script>
  import cardSelectedIcon from "../../icons/cards_selected.svg";
  import cardUnselectedIcon from "../../icons/cards_unselected.svg";
  import listSelectedIcon from "../../icons/list_selected.svg";
  import listUnselectedIcon from "../../icons/list_unselected.svg";


  export let view;
  export let noForceLeft = false;
  const setView = newView => () => view = newView;

</script>
<style lang="scss">
  .view {
    display: flex;
    align-items: center;
    margin-left: auto;

    &.no-force-left {
      margin-left: 0;
    }

    span {
      &.unselected-view {
        cursor: pointer;
      }

      &:last-child {
        margin-left: 15px;
      }
    }
  }

</style>

<div class="view" class:no-force-left={noForceLeft}>
  {#if view === "cards"}
    <span class="selected-view">{@html cardSelectedIcon}</span>
    <span class="unselected-view" on:click={setView("list")}>{@html listUnselectedIcon}</span>
  {:else}
    <span class="unselected-view" on:click={setView("cards")}>{@html cardUnselectedIcon}</span>
    <span class="selected-view">{@html listSelectedIcon}</span>
  {/if}
</div>
