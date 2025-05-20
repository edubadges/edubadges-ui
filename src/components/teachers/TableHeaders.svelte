<script>
  export let tableHeaders;
  export let setSort;
  export let sort;
  export let hide;
</script>

<style lang="scss">
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
  {#if th.sortType}
    <th class="table-header"
        on:click={() => !hide && setSort(th)}
        class:hide
        class:asc={sort.attribute === th.attribute && sort.reverse}
        class:desc={sort.attribute === th.attribute && !sort.reverse}
        class:center={th.center}
        class:right={th.right}
        width={th.width}>
      {th.name || ""}
      {#if th.icon}
        {@html th.icon}
      {/if}
    </th>
  {:else if th.name}
    <th class="table-header" width={th.width}>{th.name}</th>
  {:else}
    <th class="table-header" width={th.width}></th>
  {/if}
{/each}
