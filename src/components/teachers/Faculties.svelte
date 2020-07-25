<script>
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";
  import { entityType } from "../../util/entityTypes";

  export let faculties = [];
  export let mayCreate;
  export let institutionName;

  const tableHeaders = [
    {
      name: I18n.t("teacher.name"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "75%"
    },
    {
      name: I18n.t("teacher.issuers.title"),
      attribute: "issuers",
      reverse: false,
      sortType: sortType.COLLECTION,
      width: "25%",
      center: true
    }
  ];

  $: table = {
    entity: entityType.ISSUER_GROUP,
    title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
    tableHeaders: tableHeaders
  };

  let facultySearch = "";
  $: searchedFacultyIds = search(faculties, facultySearch, "name");

  let facultySort = tableHeaders[1];

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
  bind:sort={facultySort}
  isEmpty={faculties.length === 0}
  {mayCreate}>
  {#each sortedFilteredFaculties as faculty (faculty.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/faculty/${faculty.entityId}`)}>
      <td>{faculty.name}</td>
      <td class="center">{faculty.issuers.length}</td>
    </tr>
  {/each}
  {#if faculties.length === 0}
    <tr>
      <td colspan="2">{I18n.t("zeroState.faculties",{name:institutionName})}</td>
    </tr>
  {/if}

</Table>
