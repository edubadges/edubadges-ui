<script>
  import shieldUnlocked from "../../icons/shield-unlock.svg";
  import shieldLocked from "../../icons/lock-shield.svg";

  export let badge;
  export let cardView = true;

</script>
<style lang="scss">
  .shield {
    &.card-view {
      position: absolute;
      right: 8px;
      top: 8px;
    }

    :global(svg) {
      width: 28px;
      height: 28px;
    }
  }

</style>
{#if badge}
  <div class="shield" class:card-view={cardView}>
    {#if badge.public}
      {@html shieldUnlocked}
    {:else}
      {@html shieldLocked}
    {/if}
  </div>
{/if}
