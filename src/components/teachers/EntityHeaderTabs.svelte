<script>
  import I18n from "i18n-js";
  import {Link} from "svelte-routing";
  import {institutionIcon} from "../../icons";
  import {currentPath} from "../../stores/currentPath";

  export let tabs = [];
</script>

<style lang="scss">

  .tabs {
    display: flex;
  }

  .tab {
    display: flex;
    align-content: center;
    align-items: center;
    height: 100%;

    padding: var(--ver-padding-m) var(--hor-padding-m);
    white-space: nowrap;
    margin-right: 2px;

    border-top-style: solid;
    border-top-width: 2px;
    font-weight: var(--semi-bold);
    font-size: 18px;

    &.active {
      background: white;
      color: var(--purple);

      border-color: var(--purple);

      :global(svg) {
        fill: var(--purple);
      }
    }

    &:not(.active) {
      background: var(--grey-3);
      color: var(--text-grey-dark);
      border-color: var(--grey-3);

      &:hover {
        background: var(--grey-5);
        color: var(--black);
        border-color: var(--grey-5);
      }
    }
    span.count {
      display: inline-block;
      margin-left: 5px;
    }
    :global(svg) {
      width: 20px;
      margin-right: 8px;
      vertical-align: middle;
    }

    span.icon {
      display: inline-block;
      margin: 0 8px 0 6px;
    }
  }
</style>
<div class="tabs">
  {#each tabs as { href, icon, entity, count } (entity)}

    <Link to={href}>
      <div class="tab click" class:active={($currentPath).includes(href)}>

        {#if icon}
          <span class="icon">{@html icon}</span>
        {/if}
        <span class="title">{I18n.t(['manage', 'tabs', entity])}</span>
        {#if !isNaN(count)}
          <span class="count">{`(${count})`}</span>
        {/if}
      </div>
    </Link>

  {/each}
</div>