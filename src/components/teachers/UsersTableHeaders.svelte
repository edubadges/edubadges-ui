<script>
  export let tableHeaders;
</script>

<style>
  th {
    text-transform: capitalize;
  }
</style>

{#each tableHeaders as th}
  <th>
    {th.name || ""}
  </th>
{/each}
