<script>
  import I18n from "i18n-js";
  import { FilterBlock } from "../../components/teachers";
  import { Search } from "../../components";
  import { search, tree, facultyIds, issuerIds } from "../../stores/filter";
</script>

<style lang="scss">
  div.sidebar {
    border-top-left-radius: var(--card-border-radius);
    border-bottom-left-radius: var(--card-border-radius);
    width: var(--width-side-bar);
    padding: 30px 12px;
    background: var(--color-background-grey-light);

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
    <h3 class="purple">{I18n.t('teacher.sidebar.search')}</h3>
    <Search bind:value={$search} />
  </div>

  <div>
    <FilterBlock
      bind:value={$facultyIds}
      collection={$tree.faculties}
      title="faculties" />
  </div>

  <div>
    <FilterBlock
      bind:value={$issuerIds}
      collection={$tree.issuers}
      title="issuers" />
  </div>
</div>
