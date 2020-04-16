<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";
  import { Search } from "../../components";
  import { sortType } from "../../util/sortData";

  export let entity = "";
  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let mayCreate;
  export let sort = {
    attribute: null,
    reverse: false,
    sortType: sortType.ALPHA
  };

  const setSort = tableHeader => {
    if (sort.attribute === tableHeader.attribute) {
      sort.reverse = !sort.reverse;
    } else {
      sort = tableHeader;
    }
  };
</script>

<style lang="scss">
  div.container {
    margin: var(--ver-padding-l) var(--entity-icon-width);
  }

  div.header {
    display: flex;
    justify-content: flex-end;

    a {
      margin-left: var(--hor-padding-s);
    }
  }

  div.header > *:not(:last-child) {
    margin-right: var(--hor-padding-s);
  }

  h3 {
    flex: 1;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead th {
    text-align: left;
    border-bottom: 3px solid var(--grey-3);
    cursor: pointer;
  }

  .desc:after {
    content: " ▾";
  }

  .asc:after {
    content: " ▴";
  }

  :global(table.entity-table th, table.entity-table td) {
    padding: var(--ver-padding-s) 0;
  }

  :global(table.entity-table tbody tr:not(:last-of-type) td) {
    border-bottom: var(--card-border);
  }
</style>

<div class="container">
  <div class="header">
    <h3>{title}</h3>
    <Search bind:value={search} />

    {#if mayCreate}
      <a use:link href={`/manage/${entity}/new`} class="btn">
        {I18n.t(['manage', 'new', entity])}
      </a>
    {/if}
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
