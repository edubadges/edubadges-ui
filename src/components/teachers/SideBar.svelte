<script>
  import { FilterBlock, Search } from "../../components";
  import { tree, facultyIds, issuerIds } from "../../stores/filter";
</script>

<style>
  div.sidebar {
    width: var(--width-side-bar);
    padding: 12px;
    background: var(--color-background-grey-light);
  }

  div.sidebar > div {
    padding-bottom: 20px;
  }

  div.sidebar > *:not(:first-child) {
    padding-top: 20px;
    border-top: var(--card-border);
  }
</style>

<div class="sidebar">
  <div>
    <Search />
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
