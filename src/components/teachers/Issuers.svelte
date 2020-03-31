<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { Table } from "../teachers";
  import { search } from "../../util/searchData";

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
  $: searchedIssuerIds = search(issuers.map(element => [element.name, element.entityId]), issuerSearch);

  let issuerSort = [];

  function sort(collection, attribute) {
    console.log(collection);
    if (attribute.length === 0) return collection;
      return collection.sort((a, b) => {
          console.log(a);
          console.log(attribute[0]);
          if (attribute[0].toLowerCase() !== 'count') return a[attribute[0].toLowerCase()].localeCompare(b[attribute[0].toLowerCase()]);
          return b.count - a.count || a.name.localeCompare(b.name);
      });
  }
</script>

<button on:click={() => console.log(sort(issuers.filter(el => searchedIssuerIds.includes(el.entityId)), issuerSort))}>print sort</button>

<Table {...table} bind:search={issuerSearch} bind:sort={issuerSort}>
  {#each sort(issuers.filter(el => searchedIssuerIds.includes(el.entityId)), issuerSort) as issuer (issuer.entityId)}
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
