<script>
  import I18n from "i18n-js";

  export let title = "";
  export let tableHeaders = [];
  export let search = "";
  export let sort = [];

  const setSort = (attribute) => {
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
  }
</script>

<style>
  div.container {
    margin: var(--ver-padding-l) var(--entity-icon-width);
  }

  input {
    height: 30px;
    border: var(--card-border);
  }

  .block {
    display: inline-block;
  }

  .right {
    float: right;
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

  .asc:after {
      content: ' ▾';
  }

  .desc:after {
      content: ' ▴';
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
  <h4 class="block">{title}</h4>
  <input class="right block" placeholder="{I18n.t('teacher.sidebar.search')}..." bind:value={search} type="search">

  <table class="entity-table">
    <thead>
      <tr>
        {#each tableHeaders as th}
          <th
              on:click={() => setSort(th)}
              class="{sort[0] === th ? (sort[1] ? 'asc' : 'desc') : ''}"
          >
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
