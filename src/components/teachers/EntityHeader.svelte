<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";
  import { EntityHeaderTabs, HeaderList } from "../teachers";

  export let entity;
  export let object = {};
  export let mayUpdate;
  export let tabs;
  export let headerItems;
</script>

<style lang="scss">
  :global(.entity .tab svg) {
    width: 20px;
    margin-right: 14px;
  }

  .entity {
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    background: var(--grey-2);

    .content {
      display: flex;
      margin-bottom: var(--ver-padding-m);

      .img-container {
        flex-shrink: 0;
        height: 100px;
        width: 100px;
        background: white;
        margin-right: var(--hor-padding-m);
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }

  a {
    height: fit-content;
  }
</style>

<div class="entity">
  <div class="content">
    {#if object.image}
      <div class="img-container">
        <img src={object.image} alt={`${entity} logo`} />
      </div>
    {/if}

    <div class="info">
      <h2>{object.name}</h2>
      <p>{object.description}</p>

      <div class="slots">
        <HeaderList {entity} {headerItems} />
      </div>
    </div>

    {#if mayUpdate}
      <a use:link href="edit" class="btn">
        {I18n.t(['manage', 'edit', entity])}
      </a>
    {/if}
  </div>

  <EntityHeaderTabs {tabs} />
</div>
