<script>
  import { FilterBlock, Search } from "../components";
  import { faculties, facultyIds, issuers, issuerIds } from "../stores/filter";

  export let bookmark;
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
      collection={$faculties}
      title="faculties" />
  </div>

  {#if bookmark === 'badges'}
    <div>
      <FilterBlock
        bind:value={$issuerIds}
        collection={$issuers}
        title="issuers" />
    </div>
  {/if}
</div>
