<script>
  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let sort = [];

  const setSort = (attribute) => {
    if (sort[0] === attribute) {
      sort.length = 0;
    } else {
      sort[0] = attribute;
    }
  }
</script>

<style>
  div.container {
    margin: var(--ver-padding-l) var(--entity-icon-width);
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

  .entity-table :global(th, td) {
    padding: var(--ver-padding-s) 0;
    width: 50%;
  }

  .entity-table :global(tbody tr:not(:last-of-type) td) {
    border-bottom: var(--card-border);
  }
</style>

<div class="container">
  <h4>{title}</h4>
  <input bind:value={search}>

  <table class="entity-table">
    <thead>
      <tr>
        {#each tableHeaders as th}
          <th on:click={() => setSort(th)}>{th}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</div>
