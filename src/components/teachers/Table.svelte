<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";

  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let defaultSort;
  export let sort = [];

  onMount(() => {
    sort = [defaultSort, false];
  });

  const setSort = attribute => {
    if (sort[0] === attribute) {
      if (sort[1]) {
        sort.length = 0;
      } else {
        sort[1] = true;
      }
    } else {
      sort[0] = attribute;
      sort[1] = false;
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
            class={sort[0] === th ? (sort[1] ? 'asc' : 'desc') : ''}>
            {th}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</div>
