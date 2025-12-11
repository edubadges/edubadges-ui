<script>
  import Error from "../../forms/Error.svelte";
  import check from "../../../icons/check-green.svg";
  import I18n from "i18n-js";

  export let results = [];
  export let warning = false;
  export let localeName;
  let view = false;

</script>
<style lang="scss">
  div.toggle-container {
    display: flex;
    align-items: center;
    margin: 10px 0;

    :global(svg) {
      width: 24px;
    }

    a.toggle {
      margin-left: 3px;
    }

    span {
      margin-left: 10px;
    }
  }

  ul {
    margin-left: 30px;
    color: var(--green-dark);

    &.error {
      color: var(--red-dark);
    }

  }


</style>
{#if results.length > 0}
  <div class="toggle-container">
    {#if warning}
      <Error standAlone={true} ignoreEmail={true} error_message={I18n.t(`badgeAward.bulkAward.${localeName}`, {count: results.length})}/>
    {:else}
      {@html check}
      <span>{I18n.t(`badgeAward.bulkAward.${localeName}`, {count: results.length})}</span>
    {/if}
    <a href="/#" class="toggle" on:click|preventDefault|stopPropagation={() => view = !view}>
      {I18n.t(`badgeAward.bulkAward.${view ? "hide" : "view"}`, {count: results.length})}
    </a>
  </div>
  {#if view}
    <ul class:error={warning}>
      {#each results as err}
        <li>{err}</li>
      {/each}
    </ul>
  {/if}
{/if}
