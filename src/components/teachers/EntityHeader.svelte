<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";
  import { EntityHeaderTabs } from "../teachers";

  export let entity;
  export let title;
  export let icon;
  export let tabs;
</script>

<style>
  :global(.entity .icon > svg) {
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

  .content {
    flex: 1;
    padding-right: var(--hor-padding-m);
  }

  .content .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: var(--ver-padding-m);
  }
</style>

<div class="entity">
  <div class="icon">
    {@html icon}
  </div>

  <div class="content">
    <div class="info">
      <h3>{title}</h3>
      <a use:link href="edit" class="btn">
        {I18n.t(['manage', 'edit', entity])}
      </a>
    </div>

    <EntityHeaderTabs {tabs} />
  </div>
</div>
