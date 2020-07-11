<script>
  export let tableHeaders;
  export let setSort;
  export let sort;
  export let hide;
</script>

<style lang="scss">
  th.table-header {
    text-transform: capitalize;
  }

  :global(th.table-header svg) {
    width: 16px;
  }

  .hide {
    opacity: 0;
  }

  .desc:after {
    content: " ▾";
  }

  .asc:after {
    content: " ▴";
  }
</style>

{#each tableHeaders as th}
  <th class="table-header"
      on:click={() => !hide && setSort(th)}
      class:hide
      class:asc={sort.attribute === th.attribute && sort.reverse}
        class:desc={sort.attribute === th.attribute && !sort.reverse}>
    {th.name || ""}
    {#if th.icon}
      {@html th.icon}
    {/if}
  </th>
{/each}
