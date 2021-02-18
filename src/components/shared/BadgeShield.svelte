<script>
  import shieldUnlocked from "../../icons/shield-unlock.svg";
  import shieldLocked from "../../icons/lock-shield.svg";

  export let badge;

</script>
<style lang="scss">
  .shield {
    position: absolute;
    right: 8px;
    top: 8px;

    :global(svg) {
      width: 28px;
      height: 28px;
    }
  }

</style>
{#if badge}
  <div class="shield">
    {#if badge.public}
      {@html shieldUnlocked}
    {:else}
      {@html shieldLocked}
    {/if}
  </div>
{/if}
