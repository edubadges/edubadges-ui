<script>
  import I18n from "i18n-js";
  import { FilterBlock } from "../../components/teachers";
  import { Search } from "../../components";
  import { userSearch, selectedRole, userTree, facultyIds, issuerIds, users } from "../../stores/filterUsers";
  import FilterBlockRoles from "./FilterBlockRoles.svelte";
</script>

<style lang="scss">
  div.sidebar {
    border-top-left-radius: var(--card-border-radius);
    border-bottom-left-radius: var(--card-border-radius);
    width: var(--width-side-bar);
    padding: 30px 12px;
    background: var(--grey-2);

    h3 {
      margin-bottom: 8px;
    }

    > div {
      padding-bottom: 24px;

      &:not(:first-child) {
        padding-top: 24px;
        border-top: var(--card-border);
      }
    }
  }
</style>

<div class="sidebar">
  <div>
    <h3>{I18n.t('teacher.sidebar.search')}</h3>
    <Search bind:value={$userSearch} />
  </div>

  <div>
    <FilterBlock
        bind:value={$facultyIds}
        collection={$userTree.faculties}
        title="faculties" />
  </div>

  <div>
    <FilterBlock
        bind:value={$issuerIds}
        collection={$userTree.issuers}
        title="issuers" />
  </div>
  <div>
    <FilterBlockRoles
        bind:value={$selectedRole}
        collection={$userTree.roles}
        title="roles" />
  </div>
</div>
