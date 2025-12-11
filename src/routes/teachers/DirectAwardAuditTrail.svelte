<script>
    import {filterBySearch} from "../../stores/filterDirectAwardAuditTrail";
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {Table} from "../../components/teachers";
    import {sort, sortType} from "../../util/sortData";
    import Spinner from "../../components/Spinner.svelte";
    import {fetchDirectAwardAuditTrail, getProfile} from "../../api";
    import {pageCount} from "../../util/pagination";
    import {navigate} from "svelte-routing";

    const formatter = new Intl.DateTimeFormat(I18n.locale, {
        dateStyle: "short",
        timeStyle: "short",
      });

    let allAuditTrails = [];
    let loaded = false;

    onMount(() => {
        getProfile().then(res => {
            if (res.is_superuser) {
                fetchDirectAwardAuditTrail().then(res => {
                    allAuditTrails = res;
                    loaded = true;
                });
            } else {
                navigate("/");
            }
        }).catch(() => {
            navigate("/");
        });
    });

    const tableHeaders = [
        {
            name: I18n.t("teacher.badgeclasses.created"),
            attribute: "action_datetime",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "20%"
        },
        {
            name: I18n.t("teacher.sidebar.filters.institutions"),
            attribute: "institution_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "20%"
        },
        {
            name: "Badge class",
            attribute: "badgeclass_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "20%"
        },
        {
            name: I18n.t("models.badge.recipient"),
            attribute: "recipient_email",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: "EPPN",
            attribute: "recipient_eppn",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("models.badgeclass.issuedBy"),
            attribute: "user",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "10%"
        },
    ];

    $: table = {
        entity: "directawardaudittrail",
        title: `DirectAward audit trail`,
        tableHeaders: tableHeaders
    };

    let auditTrailSort = tableHeaders[0];

    let searchAuditTrails = "";

    $: sortedFilteredDAAuditTrails = sort(filterBySearch(allAuditTrails, searchAuditTrails, ["action_datetime","institution_name", "badgeclass_name", "recipient_email", "recipient_eppn", "user"]),
        auditTrailSort.attribute,
        auditTrailSort.reverse,
        auditTrailSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredDAAuditTrails.length / pageCount));

</script>

<style lang="scss">
    .page-container {
        display: flex;
    }

    .content {
        flex: 1;
        padding: 30px 20px;
    }

</style>

<div class="page-container">
    {#if loaded}
        <div class="content">
            <Table
                    {...table}
                    bind:search={searchAuditTrails}
                    bind:sort={auditTrailSort}
                    isEmpty={sortedFilteredDAAuditTrails.length === 0}
                    filteredCount={sortedFilteredDAAuditTrails.length}
                    page={minimalPage}
                    onPageChange={nbr => page = nbr}
                    mayCreate={false}>
                {#each sortedFilteredDAAuditTrails.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as trail}
                    <tr>
                        <td>{formatter.format(Date.parse(trail.action_datetime))}</td>
                        <td>{trail.institution_name}</td>
                        <td>{trail.badgeclass_name}</td>
                        <td>{trail.recipient_email}</td>
                        <td>{trail.recipient_eppn}</td>
                        <td>{trail.user}</td>
                    </tr>
                {/each}
            </Table>
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>
