<script>
  import { institution, issuer } from "../../icons";
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

  .tab {
    padding: var(--ver-padding-s) var(--hor-padding-m);
    background: white;
    white-space: nowrap;
    cursor: pointer;
  }
</style>

<div class="entity">
  <div class="icon">
    {@html institution}
  </div>
  <div class="content">
    <div class="info">Info</div>
    <div class="tabs">
      <div class="tab">
        {@html issuer}
        Issuers
      </div>
    </div>
  </div>
</div>
