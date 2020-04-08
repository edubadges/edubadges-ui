<script>
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";

  export let faculties = [];

  const tableHeaders = [
    {name: I18n.t("teacher.name"), attribute: "name", reverse: false, sortType: sortType.ALPHA},
    {name: I18n.t("teacher.issuers.title"), attribute: "issuers", reverse: false, sortType: sortType.COLLECTION}
  ];

  $: table = {
    title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
    tableHeaders: tableHeaders
  };

  let facultySearch = "";
  $: searchedFacultyIds = search(faculties, facultySearch, "name");

  let facultySort = tableHeaders[0];

  $: sortedFilteredFaculties = sort(
    faculties.filter(el => searchedFacultyIds.includes(el.entityId)),
    facultySort.attribute,
    facultySort.reverse,
    facultySort.sortType
  );

</script>

<Table
  {...table}
  bind:search={facultySearch}
  bind:sort={facultySort}>
  {#each sortedFilteredFaculties as faculty (faculty.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/faculty/${faculty.entityId}`)}>
      <td>{faculty.name}</td>
      <td>{faculty.issuers.length}</td>
    </tr>
  {/each}
</Table>
