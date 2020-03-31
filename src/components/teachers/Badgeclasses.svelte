<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";
  import { sort } from "../../util/sortData";

  export let badgeclasses = [];

  $: table = {
    title: `${I18n.t("teacher.badgeclasses.title")} (${badgeclasses.length})`,
    tableHeaders: ["Name"]
  };

  let badgeclassSearch = "";
  $: searchedBadgeclassIds = search(badgeclasses.map(element => [element.name, element.entityId]), badgeclassSearch);

  let badgeclassSort = [];
</script>

<Table {...table} bind:search={badgeclassSearch} bind:sort={badgeclassSort}>
  {#each sort(badgeclasses.filter(el => searchedBadgeclassIds.includes(el.entityId)), badgeclassSort) as badgeclass (badgeclass.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/badgeclass/${badgeclass.entityId}`)}>
      <td>{badgeclass.name}</td>
    </tr>
  {/each}
</Table>
