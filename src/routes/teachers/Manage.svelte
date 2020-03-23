<script>
  import { Breadcrumb, InstitutionHeader } from "../../components/teachers";
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 70px;
  }

  .table {
    margin-left: var(--entity-icon-width);
  }
</style>

<div class="page-container">
  <Breadcrumb path="Institution" />
  <InstitutionHeader />

  <div class="table">Table</div>
</div>
