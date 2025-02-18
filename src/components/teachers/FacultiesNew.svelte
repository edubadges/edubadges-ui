<script>
    import {navigate} from "svelte-routing";
    import I18n from "i18n-js";
    import {Table} from "../teachers";
    import {search} from "../../util/searchData";
    import {sort, sortType} from "../../util/sortData";
    import {entityType} from "../../util/entityTypes";
    import {facultyIcon, issuerIcon} from "../../icons";
    import {pageCount} from "../../util/pagination";
    import CheckBox from "../CheckBox.svelte";
    import {onMount} from "svelte";
    import {fetchRawFaculties, fetchRawIssuers} from "../../api";
    import {translatePropertiesRawQueries} from "../../util/utils";
    import Spinner from "../Spinner.svelte";
    import {currentInstitution} from "../../stores/user";

    export let institutionName;

    let faculties = [];
    let mayCreate;
    let loaded = false;

    onMount(() => {
        fetchRawFaculties().then(res => {
            res.forEach(faculty => {
                translatePropertiesRawQueries(faculty)
            });
            mayCreate = $currentInstitution.permissions?.ins_may_create;
            faculties = res;
            loaded = true;
        });
    });

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
        height: 30px;
    }

    .img-container {
        flex-shrink: 0;
        height: 55px;
        width: 55px;
        background: white;
        display: flex;
        justify-content: space-around;
    }

    .img-icon {
        height: 50px;
        width: 50px;
        background-color: white;
        align-self: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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
{#if !loaded}
    <Spinner/>
{:else}

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
                    {#if faculty.image}
                        <div class="img-container">
                            <div class="img-icon">
                                <img src={faculty.image} alt=""/>
                            </div>
                        </div>
                    {:else}
                        <div class="img-container">
                            <div class="img-icon">
                            <span class="icon">
                                {@html facultyIcon}
                            </span>
                            </div>
                        </div>
                    {/if}
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
{/if}