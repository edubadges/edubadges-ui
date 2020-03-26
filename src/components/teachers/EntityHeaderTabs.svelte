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
    background: var(--color-background-grey-medium);
  }

  .entity-tabs {
    display: flex;
  }

  .tab {
    width: fit-content;
    padding: var(--ver-padding-s) var(--hor-padding-m);
    margin-right: var(--hor-padding-m);
    white-space: nowrap;

    color: var(--color-text-grey);
    border-radius: var(--button-border-radius);
  }
</style>

<div class="entity-tabs">
  {#each tabs as { href, icon, entity } (entity)}
    <Link to={href}>
      <div class="tab click" class:active={href === $currentPath}>
        {@html icon}
        {I18n.t(['manage', 'tabs', entity])}
      </div>
    </Link>
  {/each}
</div>
