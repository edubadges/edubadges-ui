<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { institutionIcon } from "../../icons";
  import { queryData } from "../../api/graphql";

  export let onTabChange;
  export let tabs = [];

  let institution;

  const query = `{
    currentUser {
      institution {
        name
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institution = res.currentUser.institution;
    });
  });
</script>

<style>
  :global(.entity svg.icon-institution) {
    width: calc(var(--entity-icon-width) - (2 * var(--hor-padding-m)));
  }

  :global(.entity .tab svg) {
    width: 20px;
    margin-right: 14px;
  }

  .entity {
    display: flex;
    padding-top: var(--ver-padding-m);
    background: var(--color-background-grey-light);
  }

  .icon {
    padding: 0 var(--hor-padding-m);
  }

  .content .info {
    margin-bottom: var(--ver-padding-m);
  }

  .tabs {
    display: flex;
  }

  .tab {
    width: fit-content;
    padding: var(--ver-padding-s) var(--hor-padding-m);
    margin-right: var(--hor-padding-m);
    white-space: nowrap;

    border-radius: var(--button-border-radius);
    cursor: pointer;
  }

  .tab:not(.active) {
    background: var(--color-background-grey-medium);
  }

  .tab.active {
    background: white;
  }
</style>

<div class="entity">
  <div class="icon">
    {@html institutionIcon}
  </div>
  <div class="content">
    <div class="info">
      {#if institution}
        <h3>{institution.name}</h3>
      {/if}
    </div>
    <div class="tabs">
      {#each tabs as tab (tab.entity)}
        <div
          class="tab"
          class:active={tab.active}
          on:click={() => onTabChange(tab)}>
          {@html tab.icon}
          {I18n.t(['manage', 'tabs', tab.entity])}
        </div>
      {/each}
    </div>
  </div>
</div>
