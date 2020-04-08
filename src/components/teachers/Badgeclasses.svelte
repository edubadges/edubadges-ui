<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";
  import { sort } from "../../util/sortData";

  export let badgeclasses = [];

  $: table = {
    entity: "badgeclass",

    title: `${I18n.t("teacher.badgeclasses.title")} (${badgeclasses.length})`,
    tableHeaders: ["Name"]
  };

  let badgeclassSearch = "";
  $: searchedBadgeclassIds = search(badgeclasses, badgeclassSearch, "name");

  let badgeclassSort = [];
  const defaultSortBadgeclasses = "name";

  $: sortedFilteredBadgeclasses = sort(
    badgeclasses.filter(el => searchedBadgeclassIds.includes(el.entityId)),
    badgeclassSort[0],
    badgeclassSort[1]
  );
</script>

<Table
  {...table}
  bind:search={badgeclassSearch}
  bind:sort={badgeclassSort}
  defaultSort={defaultSortBadgeclasses}>
  {#each sortedFilteredBadgeclasses as badgeclass (badgeclass.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/badgeclass/${badgeclass.entityId}`)}>
      <td>{badgeclass.name}</td>
    </tr>
  {/each}
</Table>
