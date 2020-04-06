<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";

  export let entity = "";
  export let title = "";
  export let tableHeaders = [];
  export let search = "";
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
    <input bind:value={search} />
    <a use:link href={`/manage/${entity}/new`} class="btn">
      {I18n.t(['manage', 'new', entity])}
    </a>
  </div>

  <table class="entity-table">
    <thead>
      <tr>
        {#each tableHeaders as th}
          <th>{th}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</div>
