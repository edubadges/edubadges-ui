<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { filteredIds } from "../../util/filterData";

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
  $: filteredIssuerIds = filteredIds(issuers.map(element => [element.name, element.entityId]), issuerSearch);
</script>

<Table {...table} bind:search={issuerSearch}>
  {#each issuers.filter(el => filteredIssuerIds.includes(el.entityId)) as issuer (issuer.entityId)}
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
