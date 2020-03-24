<script>
  import I18n from "i18n-js";
  import { Link } from "svelte-routing";
  import { EntityHeaderTabs } from "../teachers";
  import { institutionIcon } from "../../icons";

  export let institution;
  export let tabs;
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

    <EntityHeaderTabs {tabs} />
  </div>
</div>
