<script>
  export let tableHeaders;
  export let setSort;
  export let sort;
</script>

<style>
  th {
    text-transform: capitalize;
  }
</style>

{#each tableHeaders as th}
  <th
      on:click={() => setSort(th)}
      class:asc={sort.attribute === th.attribute && sort.reverse}
      class:desc={sort.attribute === th.attribute && !sort.reverse}
      class={th.class ? th.class : ""}
  >
  {th.name || ""}
  </th>
{/each}
