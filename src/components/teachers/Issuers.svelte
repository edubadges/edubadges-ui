<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";
  import { sort, sortType } from "../../util/sortData";

  export let mayCreate;
  export let issuers = [];

  const tableHeaders = [
    {
      name: I18n.t("teacher.name"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("teacher.badgeclasses.title"),
      attribute: "badgeclasses",
      reverse: false,
      sortType: sortType.COLLECTION
    }
  ];

  $: table = {
    entity: "issuer",
    title: `${I18n.t("teacher.issuers.title")} (${issuers.length})`,
    tableHeaders: tableHeaders
  };

  let issuerSearch = "";
  $: searchedIssuerIds = search(issuers, issuerSearch, "name");

  let issuerSort = tableHeaders[1];

  $: sortedFilteredIssuers = sort(
    issuers.filter(el => searchedIssuerIds.includes(el.entityId)),
    issuerSort.attribute,
    issuerSort.reverse,
    issuerSort.sortType
  );
</script>

<Table {...table} bind:search={issuerSearch} bind:sort={issuerSort} {mayCreate}>
  {#each sortedFilteredIssuers as issuer (issuer.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/issuer/${issuer.entityId}`)}>
      <td>
        {issuer.name}
        <br />
        <span class="sub-text">({issuer.faculty.name})</span>
      </td>
      <td>{issuer.badgeclasses.length}</td>
    </tr>
  {/each}
</Table>
