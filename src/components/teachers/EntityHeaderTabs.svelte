<script>
  import I18n from "i18n-js";
  import { Link } from "svelte-routing";
  import { institutionIcon } from "../../icons";
  import { currentPath } from "../../stores/currentPath";

  export let tabs = [];
</script>

<style>
  .entity-tabs :global(.tab svg) {
    width: 20px;
    margin-right: 14px;
  }

  .entity-tabs :global(.tab.active) {
    background: white;
  }

  .entity-tabs :global(.tab:not(.active)) {
    background: var(--grey-3);
  }

  .entity-tabs {
    display: flex;
  }

  .tab {
    width: fit-content;
    padding: var(--ver-padding-s) var(--hor-padding-m);
    margin-right: var(--hor-padding-m);
    white-space: nowrap;

    color: var(--text-grey-dark);
    border-radius: var(--button-border-radius);
  }
</style>

<div class="entity-tabs">
  {#each tabs as { href, icon, entity, count } (entity)}
    <Link to={href}>
      <div class="tab click" class:active={href === $currentPath}>
        {#if icon}
          {@html icon}
        {/if}
        {I18n.t(['manage', 'tabs', entity])}
        {#if !isNaN(count)}({count}){/if}
      </div>
    </Link>
  {/each}
</div>
