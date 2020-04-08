<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";

  export let badgeclasses = [];

  const tableHeaders = [
    {name: I18n.t("teacher.name"), attribute: "name", reverse: false, sortType: sortType.ALPHA}
  ];

  $: table = {
    title: `${I18n.t("teacher.badgeclasses.title")} (${badgeclasses.length})`,
    tableHeaders: tableHeaders
  };

  let badgeclassSearch = "";
  $: searchedBadgeclassIds = search(badgeclasses, badgeclassSearch, "name");

  let badgeclassSort = tableHeaders[0];

  $: sortedFilteredBadgeclasses = sort(
    badgeclasses.filter(el => searchedBadgeclassIds.includes(el.entityId)),
    badgeclassSort.attribute,
    badgeclassSort.reverse,
    badgeclassSort.sortType
  );
</script>

<Table
  {...table}
  bind:search={badgeclassSearch}
  bind:sort={badgeclassSort}>
  {#each sortedFilteredBadgeclasses as badgeclass (badgeclass.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/badgeclass/${badgeclass.entityId}`)}>
      <td>{badgeclass.name}</td>
    </tr>
  {/each}
</Table>
