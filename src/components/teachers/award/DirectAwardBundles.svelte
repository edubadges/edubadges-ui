<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {Table} from "../../teachers";
    import {sort, sortType} from "../../../util/sortData";
    import {onMount} from "svelte";

    export let directAwardBundles = [];
    export let badgeclassName;

    onMount(() => {
        directAwardBundles.forEach(dab => {
            dab.rateClaim = `${Math.round(dab.assertionCount / dab.initialTotal * 100)}%`;
        });
    })

    const tableHeaders = [
        {
            name: I18n.t("models.directAwardBundle.directAwardCount"),
            attribute: "directAwardCount",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwardBundle.directAwardRejectedCount"),
            attribute: "directAwardRejectedCount",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwardBundle.assertionCount"),
            attribute: "assertionCount",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwardBundle.initialTotal"),
            attribute: "initialTotal",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwardBundle.rateClaim"),
            attribute: "rateClaim",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwardBundle.createdAt"),
            attribute: "createdAt",
            reverse: false,
            sortType: sortType.DATE,
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
</script>

<style lang="scss">
</style>

<Table
  {...table}
  bind:sort={directAwardBundleSort}
  hideSearch={true}
  isEmpty={directAwardBundles.length === 0}>
  {#each sortedDirectAwardBundles as dab}
    <tr>
      <td>
        {dab.directAwardCount}
      </td>
      <td>
        {dab.directAwardRejectedCount}
      </td>
      <td>
        {dab.assertionCount}
      </td>
      <td>
        {dab.initialTotal}
      </td>
      <td>
        {dab.rateClaim}
      </td>
      <td>
        {moment(dab.createdAt).format('MMM D, YYYY')}
      </td>
    </tr>
  {/each}
  {#if directAwardBundles.length === 0}
    <tr>
      <td colspan="6">{I18n.t("zeroState.directAwardBundles", {name: badgeclassName})}</td>
    </tr>
  {/if}
</Table>
