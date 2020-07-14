<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";

  export let mayCreate;
  export let issuers = [];
  export let facultyEntityId;
  export let institutionName;

  const badgesCount = badgeClasses => {
    const count = badgeClasses.reduce((acc, badgeClass) => acc += badgeClass.badgeAssertions.length, 0);
    return count === 0 ? I18n.t("teacher.badgeclasses.noBadges") : I18n.t("teacher.badgeclasses.badgesCount", {count})
  }

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
    },
    {
      name: I18n.t("teacher.badgeclasses.badges"),
      attribute: "badgeAssertions",
      reverse: false,
      sortType: sortType.ISSUER_BADGE_CLASS_ASSERTIONS
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

<Table
  {...table}
  bind:search={issuerSearch}
  bind:sort={issuerSort}
  isEmpty={issuers.length === 0}
  pathParameters={facultyEntityId ? [facultyEntityId] : []}
  {mayCreate}>
  {#each sortedFilteredIssuers as issuer (issuer.entityId)}
    <tr
      class="click"
      on:click={() => navigate(`/manage/issuer/${issuer.entityId}`)}>
      <td>
        {issuer.name}
        <br/>
        <span class="sub-text">({issuer.faculty.name})</span>
      </td>
      <td>{issuer.badgeclasses.length}</td>
      <td>{badgesCount(issuer.badgeclasses)}</td>
    </tr>
  {/each}
  {#if issuers.length === 0}
    <tr>
      <td colspan="2">{I18n.t("zeroState.issuers",{name:institutionName})}</td>
    </tr>
  {/if}

</Table>
