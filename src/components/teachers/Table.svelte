<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";
  import {sortType} from "../../util/sortData";

  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let sort = {attribute: null, reverse: false, sortType: sortType.ALPHA};

  const setSort = tableHeader => {
    if (sort.attribute === tableHeader.attribute) {
      sort.reverse = !sort.reverse;
    } else {
      sort = tableHeader;
    }
  };
</script>

<style>
  div.container {
    margin: var(--ver-padding-l) var(--entity-icon-width);
  }

  input {
    height: 30px;
    border: var(--card-border);
  }

  .search {
    width: 200px;
    float: right;
  }

  .block {
    display: inline-block;
  }

  div.header {
    display: flex;
    justify-content: space-between;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead th {
    text-align: left;
    border-bottom: 3px solid var(--color-background-grey-dark);
    cursor: pointer;
  }

  .desc:after {
    content: " ▾";
  }

  .asc:after {
    content: " ▴";
  }

  .entity-table :global(th, td) {
    padding: var(--ver-padding-s) 0;
    width: 50%;
  }

  .entity-table :global(tbody tr:not(:last-of-type) td) {
    border-bottom: var(--card-border);
  }
</style>

<div class="container">
  <div class="header">
    <h4 class="block">{title}</h4>
    <input
      class="search block"
      placeholder="{I18n.t('teacher.sidebar.search')}..."
      bind:value={search}
      type="search" />
  </div>

  <table class="entity-table">
    <thead>
      <tr>
        {#each tableHeaders as th}
          <th
            on:click={() => setSort(th)}
            class={sort.attribute === th.attribute ? (sort.reverse ? 'asc' : 'desc') : ''}>
            {th.name}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</div>
