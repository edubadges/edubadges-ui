<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 70px;
  }

  .breadcrumb {
    padding: var(--ver-padding-m) var(--hor-padding-s);
  }

  .entity {
    display: flex;
    padding-top: var(--ver-padding-m);
    background: var(--color-background-grey-light);
  }

  .entity .icon {
    padding: 0 var(--hor-padding-s);
    width: var(--entity-icon-width);
  }

  .entity .content .info {
    margin-bottom: var(--ver-padding-m);
  }

  .table {
    margin-left: var(--entity-icon-width);
  }
</style>

<div class="page-container">
  <div class="breadcrumb">Institution</div>
  <div class="entity">
    <div class="icon">Icon</div>
    <div class="content">
      <div class="info">Info</div>
      <div class="tabs">Tabs</div>
    </div>
  </div>
  <div class="table">Table</div>
</div>
