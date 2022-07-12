<script>
    import I18n from "i18n-js";
    import {sort, sortType} from "../../../util/sortData";
    import filter from "../../../icons/filter-1.svg";
    import {searchMultiple} from "../../../util/searchData";
    import Table from "../Table.svelte";
    import singleNeutralCheck from "../../../icons/single-neutral-check.svg";
    import {assertionStatus, assertionStatusClass} from "../../../util/assertions";
    import moment from "moment";
    import {pageCount} from "../../../util/pagination";

    export let directAwardBundle;

    let filteredAssertions = [];

    $: filteredAssertions = directAwardBundle.directAwards;

    const tableHeaders = [
        {
            name: null,
        },
        {
            name: I18n.t("badgeAward.bulkAward.details.email"),
            attribute: "recipientEmail",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "33%"
        },
        {
            name: I18n.t("badgeAward.bulkAward.details.studentId"),
            attribute: "eppn",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "33%",
        },
        {
            name: I18n.t("badgeAward.bulkAward.details.status"),
            attribute: "status",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "33%",
            center: true
        }
    ];

    $: table = {
        entity: "badgeclass",
        title: I18n.t("badgeAward.bulkAward.details.title", {issued: moment(directAwardBundle.createdAt).format('MMM D, YYYY')}),
        tableHeaders: tableHeaders
    };

    let assertionSearch = "";
    $: searchedAssertionIds = searchMultiple(filteredAssertions, assertionSearch, "entityId", "recipient_email", "eppn", "status");

    let assertionsSort = tableHeaders[0];

    $: sortedFilteredAssertions = sort(
        filteredAssertions.filter(el => searchedAssertionIds.includes(el.entityId)),
        assertionsSort.attribute,
        assertionsSort.reverse,
        assertionsSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredAssertions.length / pageCount));

</script>

<style lang="scss">
  div.bulk-award-details {

    h2 {
      background: var(--purple-1);
      padding: var(--ver-padding-l) var(--hor-padding-l);
    }

  }
</style>
<div class="bulk-award-details">
    <h2>{I18n.t("badgeAward.bulkAward.details.header")}</h2>
    <Table
            {...table}
            bind:search={assertionSearch}
            bind:sort={assertionsSort}
            isEmpty={filteredAssertions.length === 0}
            filteredCount={sortedFilteredAssertions.length}
            page={minimalPage}
            onPageChange={nbr => page = nbr}>

        {#each sortedFilteredAssertions.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as assertion}
            <tr>
                <td class="single-neutral-check">
                    <div class="single-neutral-check">
                        {@html singleNeutralCheck}
                    </div>
                </td>
                <td>
                    <span>{assertion.recipientEmail}</span>
                </td>
                <td>
                    <span>{assertion.eppn}</span>
                </td>
                <td class="assertion-status center">
                    <span class={assertionStatusClass(assertion)}>{assertionStatus(assertion)}</span>
                </td>
            </tr>
        {/each}
        {#if filteredAssertions.length === 0}
            <tr>
                <td colspan="8">{I18n.t("zeroState.directAwards")}</td>
            </tr>
        {/if}

    </Table>
</div>





