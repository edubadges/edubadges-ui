<script>
  import I18n from "i18n-js";
  import { Link } from "svelte-routing";
  import { institutionIcon } from "../../icons";
  import { currentPath } from "../../stores/currentPath";

  export let tabs = [];
</script>

<style lang="scss">
  .tab {
    // display: flex;
    display: inline-block;

    padding: var(--ver-padding-m) var(--hor-padding-m);
    margin-right: 4px;
    white-space: nowrap;

    border-top-style: solid;
    border-top-width: 2px;
    font-weight: bold;

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

    :global(svg) {
      width: 20px;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
</style>

{#each tabs as { href, icon, entity, count } (entity)}
  <Link to={href}>
    <div class="tab click" class:active={($currentPath).includes(href)}>
      {#if icon}
        {@html icon}
      {/if}
      {I18n.t(['manage', 'tabs', entity])}
      {#if !isNaN(count)}({count}){/if}
    </div>
  </Link>
{/each}
