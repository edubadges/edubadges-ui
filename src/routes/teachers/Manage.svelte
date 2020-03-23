<script>
  import {
    Breadcrumb,
    InstitutionHeader,
    Issuers
  } from "../../components/teachers";
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 70px;
  }
</style>

<div class="page-container">
  <Breadcrumb path="Institution" />
  <InstitutionHeader />
  <Issuers />
</div>
