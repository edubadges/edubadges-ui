<script>
    import {navigate} from "svelte-routing";
    import I18n from "i18n-js";
    import {Table} from "../teachers";
    import {search} from "../../util/searchData";
    import {sort, sortType} from "../../util/sortData";
    import {entityType} from "../../util/entityTypes";
    import {facultyIcon} from "../../icons";

    export let faculties = [];
    export let mayCreate;
    export let institutionName;

    const tableHeaders = [
        {
            name: "",
            width: "5%"
        },
        {
            name: I18n.t("teacher.name"),
            attribute: "name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("teacher.issuers.title"),
            attribute: "issuerCount",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%",
            center: true
        },
        {
            name: I18n.t("teacher.badgeclasses.requestedBadges"),
            attribute: "pendingEnrollmentCount",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%",
            center: true
        },
        {
            name: "",
            width: "40%"
        }
    ];

    $: table = {
        entity: entityType.ISSUER_GROUP,
        title: `${I18n.t("teacher.faculties.title")} (${faculties.length})`,
        tableHeaders: tableHeaders
    };

    let facultySearch = "";
    $: searchedFacultyIds = search(faculties, facultySearch, "name");

    let facultySort = tableHeaders[2];

    $: sortedFilteredFaculties = sort(
        faculties.filter(el => searchedFacultyIds.includes(el.entityId)),
        facultySort.attribute,
        facultySort.reverse,
        facultySort.sortType
    );
</script>

<style>
    .icon {
        display: block;
        height: 20px;
    }
</style>

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
      <td>
        <span class="icon">{@html facultyIcon}</span>
      </td>
      <td>{faculty.name}</td>
      <td class="center">{faculty.issuerCount === 0 ? "-" : faculty.issuerCount}</td>
      <td class="center">{faculty.pendingEnrollmentCount === 0 ? "-" : faculty.pendingEnrollmentCount}</td>
      <td></td>
    </tr>
  {/each}
  {#if faculties.length === 0}
    <tr>
      <td colspan="3">{I18n.t("zeroState.faculties", {name: institutionName})}</td>
    </tr>
  {/if}

</Table>
