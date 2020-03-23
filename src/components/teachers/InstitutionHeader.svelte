<script>
  import { institution } from "../../icons";
</script>

<style>
  :global(.entity svg.icon-institution) {
    width: calc(var(--entity-icon-width) - (2 * var(--hor-padding-m)));
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
    {@html institution}
  </div>
  <div class="content">
    <div class="info">Info</div>
    <div class="tabs">Tabs</div>
  </div>
</div>
