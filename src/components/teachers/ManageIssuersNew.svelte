<script>
    import {navigate} from "svelte-routing";
    import I18n from "i18n-js";
    import {Table} from "../teachers";
    import {search} from "../../util/searchData";
    import {sort, sortType} from "../../util/sortData";
    import {issuerIcon} from "../../icons";
    import {pageCount} from "../../util/pagination";
    import {onMount} from "svelte";
    import {fetchRawIssuers} from "../../api";
    import {translatePropertiesRawQueriesDirectAward} from "../../util/utils";

    export let institutionName;

    //TODO from the results get if the user may create new issuers
    let mayCreate = false;
    let issuers = [];
    let facultyEntityId;

     onMount(() => {
         fetchRawIssuers().then(res => {
             res.forEach(issuer => {
                 translatePropertiesRawQueriesDirectAward(issuer)
             })
             issuers = res;
             facultyEntityId = issuers.length > 0 ? issuers[0].f_entity_id : null;
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
            name: I18n.t("teacher.badgeclasses.title"),
            attribute: "badgeclassCount",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%",
            center: true
        },
        {
            name: I18n.t("teacher.badgeclasses.badges"),
            attribute: "assertionCount",
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
            name: I18n.t("placeholders.badgeClass.status.name"),
            attribute: "archived",
            reverse: false,
            sortType: sortType.BOOLEAN,
            width: "10%",
            center: false
        },
        {
            name: "",
            width: "15%"
        }
    ];

    let table;
    $: table = {
        entity: "issuer",
        title: `${I18n.t("teacher.issuers.title")} (${issuers.length})`,
        tableHeaders: tableHeaders
    };

    let issuerSearch = "";
    let searchedIssuerIds = [];
    $: searchedIssuerIds = search(issuers, issuerSearch, "name");

    let issuerSort = tableHeaders[2];

    let sortedFilteredIssuers;
    $: sortedFilteredIssuers = sort(
        issuers.filter(el => searchedIssuerIds.includes(el.entityId)),
        issuerSort.attribute,
        issuerSort.reverse,
        issuerSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredIssuers.length / pageCount));

</script>

<style>
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

    .center {
        text-align: center;
    }
</style>

<Table
        {...table}
        bind:search={issuerSearch}
        bind:sort={issuerSort}
        isEmpty={issuers.length === 0}
        filteredCount={sortedFilteredIssuers.length}
        page={minimalPage}
        onPageChange={nbr => page = nbr}
        pathParameters={facultyEntityId ? [facultyEntityId] : []}
        {mayCreate}>
    {#each sortedFilteredIssuers.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as issuer (issuer.entityId)}
        <tr
                class="click"
                on:click={() => navigate(`/manage/issuer/${issuer.entityId}`)}>
            <td>
                {#if issuer.image}
                    <div class="img-container">
                        <div class="img-icon">
                            <img src={issuer.image} alt=""/>
                        </div>
                    </div>
                {:else}
                    <div class="img-container">
                        <div class="img-icon">
              <span class="icon">
                {@html issuerIcon}
              </span>
                        </div>
                    </div>
                {/if}
            </td>
            <td>
                {issuer.name}
                <br/>
                <span class="sub-text">({issuer.f_name})</span>
            </td>
            <td class="center">{issuer.badgeclassCount === 0 ? "-" : issuer.badgeclassCount}</td>
            <td class="center">{issuer.assertionCount === 0 ? "-" : issuer.assertionCount}</td>
            <td class="center">{issuer.pendingEnrollmentCount === 0 ? "-" : issuer.pendingEnrollmentCount}</td>
            <td>{I18n.t(`placeholders.badgeClass.status.${issuer.archived ? "archived" : "active"}`) }</td>
            <td></td>
        </tr>
    {/each}
    {#if issuers.length === 0}
        <tr>
            <td colspan="4">{I18n.t("zeroState.issuers", {name: institutionName})}</td>
        </tr>
    {/if}

</Table>
