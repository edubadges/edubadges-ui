<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";
  import { EntityHeaderTabs } from "../teachers";

  export let entity;
  export let title;
  export let logo;
  export let mayUpdate;
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
    background: var(--grey-2);
  }

  a {
    height: fit-content;
  }

  .icon {
    padding: 0 var(--hor-padding-m);
  }

  .img-container {
    flex-shrink: 0;
    height: var(--entity-icon-width);
    width: var(--entity-icon-width);
    background: white;
    margin-left: var(--hor-padding-m);
    margin-right: var(--hor-padding-m);
    margin-bottom: var(--ver-padding-l);
  }

  img {
    width: 100%;
    height: 100%;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: var(--hor-padding-m);
  }

  .content .info {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: var(--ver-padding-m);
  }

  .slots {
    margin-bottom: var(--ver-padding-m);
  }
</style>

<div class="entity">
  {#if icon}
    <div class="icon">
      {@html icon}
    </div>
  {:else if logo}
    <div class="img-container">
      <img src={logo} alt={`#{entity} logo`} />
    </div>
  {/if}
  <div class="placeholder-for-tabs" />

  <div class="content">
    <div class="info">
      <h2>{title}</h2>
      {#if mayUpdate}
        <a use:link href="edit" class="btn">
          {I18n.t(['manage', 'edit', entity])}
        </a>
      {/if}
    </div>
    <div class="slots">
      <slot />
    </div>

    <EntityHeaderTabs {tabs} />
  </div>

</div>
