<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";
  import { sort } from "../../util/sortData";

  export let issuers = [];
  export let facultyName = "";

  $: table = {
    title: `${I18n.t("teacher.issuers.title")} (${issuers.length})`,
    tableHeaders: [
      "Name",
      `#${I18n.t("teacher.badgeclasses.title").toLowerCase()}`
    ]
  };

  let issuerSearch = "";
  $: searchedIssuerIds = search(issuers, issuerSearch, 'name');

  let issuerSort = [];
  const defaultSortIssuers = '#badgeclasses';

  $: sortedFilteredIssuers = sort(issuers.filter(el => searchedIssuerIds.includes(el.entityId)), issuerSort[0], issuerSort[1]);
</script>

<Table {...table} bind:search={issuerSearch} bind:sort={issuerSort} defaultSort={defaultSortIssuers}>
  {#each sortedFilteredIssuers as issuer (issuer.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/issuer/${issuer.entityId}`)}>
      <td>
        {issuer.name}
        <br />
        <span class="sub-text">({facultyName || issuer.faculty.name})</span>
      </td>
      <td>{issuer.badgeclasses.length}</td>
    </tr>
  {/each}
</Table>
