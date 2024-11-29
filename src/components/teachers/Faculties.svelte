<script>
    import {navigate} from "svelte-routing";
    import I18n from "i18n-js";
    import {Table} from "../teachers";
    import {search} from "../../util/searchData";
    import {sort, sortType} from "../../util/sortData";
    import {entityType} from "../../util/entityTypes";
    import {facultyIcon} from "../../icons";
    import {pageCount} from "../../util/pagination";
    import CheckBox from "../CheckBox.svelte";

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
            name: I18n.t("teacher.badgeclasses.virtualOrganisation"),
            attribute: "onBehalfOf",
            reverse: false,
            sortType: sortType.BOOLEAN,
            width: "15%",
            center: true
        },
        {
            name: "",
            width: "25%"
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

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredFaculties.length / pageCount));

</script>

<style lang="scss">
    .icon {
        display: block;
        height: 20px;
    }

    .checkbox-container {
        width: 100%;
        display: flex;
        align-items: center;

        :global(label.checkboxed) {
            margin: auto;
        }

    }
</style>

<Table
        {...table}
        bind:search={facultySearch}
        bind:sort={facultySort}
        isEmpty={faculties.length === 0}
        filteredCount={sortedFilteredFaculties.length}
        page={minimalPage}
        onPageChange={nbr => page = nbr}

        {mayCreate}>
    {#each sortedFilteredFaculties.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as faculty (faculty.entityId)}
        <tr
                class="click"
                on:click={() => navigate(`/manage/faculty/${faculty.entityId}`)}>
            <td>
                <span class="icon">{@html facultyIcon}</span>
            </td>
            <td>{faculty.name}</td>
            <td class="center">{faculty.issuerCount === 0 ? "-" : faculty.issuerCount}</td>
            <td class="center">{faculty.pendingEnrollmentCount === 0 ? "-" : faculty.pendingEnrollmentCount}</td>
            <td class="center">
                <div class="checkbox-container">
                    <CheckBox value={faculty.onBehalfOf} disabled={true}/>
                </div>
            </td>
            <td></td>
        </tr>
    {/each}
    {#if faculties.length === 0}
        <tr>
            <td colspan="3">{I18n.t("zeroState.faculties", {name: institutionName})}</td>
        </tr>
    {/if}

</Table>
