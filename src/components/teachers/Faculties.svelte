<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";
  import { sort } from "../../util/sortData";

  export let faculties = [];

  $: table = {
    title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
    tableHeaders: ["Name", `#${I18n.t("teacher.issuers.title").toLowerCase()}`]
  };

  let facultySearch = "";
  $: searchedFacultyIds = search(faculties.map(element => [element.name, element.entityId]), facultySearch);

  let facultySort = [];

  $: sortedFilteredFaculties = sort(faculties.filter(el => searchedFacultyIds.includes(el.entityId)), facultySort[0]);
</script>

<Table {...table} bind:search={facultySearch} bind:sort={facultySort}>
  {#each sortedFilteredFaculties as faculty (faculty.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/faculty/${faculty.entityId}`)}>
      <td>{faculty.name}</td>
      <td>{faculty.issuers.length}</td>
    </tr>
  {/each}
</Table>
