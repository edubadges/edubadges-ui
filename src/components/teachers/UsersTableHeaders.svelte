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
  {#if th.sortType}
    <th
        on:click={() => setSort(th)}
        class:asc={sort.attribute === th.attribute && sort.reverse}
        class:desc={sort.attribute === th.attribute && !sort.reverse}
        class={th.class ? th.class : th.attribute}
        class:center={th.center}
        class:right={th.right}
        width={th.width}>
    {th.name || ""}
    </th>
  {:else}
    <th class="table-header" width={th.width}></th>
  {/if}
{/each}
