<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { link } from "svelte-routing";

  export let entity = "";
  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let defaultSort;
  export let sort = [];
  export let mayCreate;

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

  div.header {
    display: flex;
    justify-content: flex-end;
  }

  div.header > *:not(:last-child) {
    margin-right: var(--hor-padding-s);
  }

  h4 {
    flex: 1;
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
    <h4>{title}</h4>
    <input
      bind:value={search}
      placeholder="{I18n.t('teacher.sidebar.search')}..." />
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
            class:asc={sort[0] === th && sort[1]}
            class:desc={sort[0] === th && !sort[1]}>
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
