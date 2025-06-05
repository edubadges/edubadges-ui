<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {Table} from "../../teachers";
    import {sort, sortType} from "../../../util/sortData";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {pageCount} from "../../../util/pagination";

    export let directAwardBundles = [];
    export let badgeClass;

    onMount(() => {
        directAwardBundles.forEach(dab => {
            //The initialTotal is the initial number of DA's when the bundle was created
            let totalCorrected = dab.initialTotal - (dab.directAwardDeletedCount + dab.directAwardRemovedCount);
            dab.rateClaim = totalCorrected === 0 ? "0%" : `${Math.round(dab.assertionCount  / totalCorrected * 100)}%`;
        });
    })

    const tableHeaders = [
        {
            name: I18n.t("models.directAwardBundle.createdAt"),
            attribute: "createdAt",
            reverse: false,
            sortType: sortType.DATE,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardCount"),
            attribute: "directAwardCount",
            reverse: false,
            center: true,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardRejectedCount"),
            attribute: "directAwardRejectedCount",
            reverse: false,
            center: true,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardRevokedCount"),
            attribute: "directAwardRevokedCount",
            reverse: false,
            center: true,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardScheduledCount"),
            attribute: "directAwardRevokedCount",
            reverse: false,
            center: true,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.assertionCount"),
            attribute: "assertionCount",
            reverse: false,
            center: true,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardExpiredCount"),
            attribute: "directAwardExpiredCount",
            center: true,
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardDeletedCount"),
            attribute: "directAwardDeletedCount",
            center: true,
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.initialTotal"),
            attribute: "initialTotal",
            center: true,
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "8%"
        },
        {
            name: I18n.t("models.directAwardBundle.rateClaim"),
            attribute: "rateClaim",
            center: true,
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        }
    ];

    $: table = {
        entity: "directAwardBundle",
        title: `${I18n.t("models.directAwardBundle.title")}`,
        tableHeaders: tableHeaders
    };

    let directAwardBundleSort = tableHeaders[0];

    $: sortedDirectAwardBundles = sort(
        directAwardBundles,
        directAwardBundleSort.attribute,
        directAwardBundleSort.reverse,
        directAwardBundleSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedDirectAwardBundles.length / pageCount));

</script>

<style lang="scss">
</style>

<Table
        {...table}
        bind:sort={directAwardBundleSort}
        hideSearch={true}
        isEmpty={directAwardBundles.length === 0}
        filteredCount={sortedDirectAwardBundles.length}
        page={minimalPage}
        onPageChange={nbr => page = nbr}>
    {#each sortedDirectAwardBundles.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as dab}
        <tr class="click"
            on:click={() => navigate(`/badgeclass/${badgeClass.entityId}/award-details/${dab.entityId}`)}>
            <td>
                {moment(dab.createdAt).format('MMM D, YYYY')}
            </td>
            <td class="center">
                {dab.directAwardCount}
            </td>
            <td class="center">
                {dab.directAwardRejectedCount}
            </td>
            <td class="center">
                {dab.directAwardRevokedCount}
            </td>
            <td class="center">
                {dab.directAwardScheduledCount}
            </td>
            <td class="center">
                {dab.assertionCount}
            </td>
            <td class="center">
                {dab.directAwardExpiredCount}
            </td>
            <td class="center">
                {dab.directAwardDeletedCount + dab.directAwardRemovedCount}
            </td>
            <td class="center">
                {dab.initialTotal}
            </td>
            <td class="center">
                {dab.rateClaim}
            </td>
        </tr>
    {/each}
    {#if directAwardBundles.length === 0}
        <tr>
            <td colspan="6">{I18n.t("zeroState.directAwardBundles", {name: badgeClass.name})}</td>
        </tr>
    {/if}
</Table>
