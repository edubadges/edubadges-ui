<script>
  export let tableHeaders;
  export let setSort;
  export let sort;
  export let hide;
</script>

<style>
  .hide {
    opacity: 0%;
  }

  .desc:after {
    content: " ▾";
  }

  .asc:after {
    content: " ▴";
  }
</style>

{#each tableHeaders as th}
  <th
    on:click={() => !hide && setSort(th)}
    class:hide
    class:asc={sort.attribute === th.attribute && sort.reverse}
    class:desc={sort.attribute === th.attribute && !sort.reverse}>
    {th.name}
  </th>
{/each}
