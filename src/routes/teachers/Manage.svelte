<script>
  import {
    Breadcrumb,
    InstitutionHeader,
    Issuers,
    Faculties
  } from "../../components/teachers";
  import { issuerIcon, facultyIcon } from "../../icons";

  let tabs = [
    {
      entity: "issuers",
      icon: issuerIcon,
      component: Issuers,
      active: true
    },
    {
      entity: "faculties",
      icon: facultyIcon,
      component: Faculties,
      active: false
    }
  ];

  function onTabChange(newTab) {
    tabs = tabs.map(tab => ({
      ...tab,
      active: tab === newTab
    }));
  }
</script>

<style>
  .page-container {
    flex: 1;
    --entity-icon-width: 66px;
  }
</style>

<div class="page-container">
  <Breadcrumb path="Institution" />
  <InstitutionHeader {tabs} {onTabChange} />
  <svelte:component this={tabs.find(({ active }) => active).component} />
</div>
