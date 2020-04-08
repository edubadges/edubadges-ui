<script>
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";
  import { sort } from "../../util/sortData";

  export let faculties = [];
  export let mayCreate;

  $: table = {
    entity: "faculty",
    title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
    tableHeaders: ["Name", `#${I18n.t("teacher.issuers.title").toLowerCase()}`]
  };

  let facultySearch = "";
  $: searchedFacultyIds = search(faculties, facultySearch, "name");

  let facultySort = [];
  const defaultSortFaculties = "#issuers";

  $: sortedFilteredFaculties = sort(
    faculties.filter(el => searchedFacultyIds.includes(el.entityId)),
    facultySort[0],
    facultySort[1]
  );
</script>

<Table
  {...table}
  bind:search={facultySearch}
  bind:sort={facultySort}
  defaultSort={defaultSortFaculties}
  {mayCreate}>
  {#each sortedFilteredFaculties as faculty (faculty.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/faculty/${faculty.entityId}`)}>
      <td>{faculty.name}</td>
      <td>{faculty.issuers.length}</td>
    </tr>
  {/each}
</Table>
