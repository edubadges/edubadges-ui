<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";
  import {tableNumber} from "../../util/tableNumberToText";
  import {issuerIcon} from "../../icons";

  export let mayCreate;
  export let issuers = [];
  export let facultyEntityId;
  export let institutionName;

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
      attribute: "badgeclasses",
      reverse: false,
      sortType: sortType.COLLECTION,
      width: "15%",
      center: true
    },
    {
      name: I18n.t("teacher.badgeclasses.badges"),
      attribute: "badgeAssertions",
      reverse: false,
      sortType: sortType.ISSUER_BADGE_CLASS_ASSERTIONS,
      width: "15%",
      center: true
    },
    {
      name: I18n.t("teacher.badgeclasses.requestedBadges"),
      attribute: "enrollments",
      reverse: false,
      sortType: sortType.ISSUER_BADGE_CLASS_ENROLLMENTS,
      width: "15%",
      center: true
    },
    {
      name: "",
      width: "25%"
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

  let sortedFilteredIssuers = [];
  $: sortedFilteredIssuers = sort(
    issuers.filter(el => searchedIssuerIds.includes(el.entityId)),
    issuerSort.attribute,
    issuerSort.reverse,
    issuerSort.sortType
  );
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
    pathParameters={facultyEntityId ? [facultyEntityId] : []}
    {mayCreate}>
  {#each sortedFilteredIssuers as issuer (issuer.entityId)}
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
        <span class="sub-text">({issuer.faculty.name})</span>
      </td>
      <td class="center">{issuer.badgeclasses.length === 0 ? "-" : issuer.badgeclasses.length}</td>
      <td class="center">{tableNumber(issuer.badgeclasses, 'badgeAssertions')}</td>
      <td class="center">{tableNumber(issuer.badgeclasses, 'pendingEnrollments')}</td>
      <td></td>
    </tr>
  {/each}
  {#if issuers.length === 0}
    <tr>
      <td colspan="4">{I18n.t("zeroState.issuers", {name:institutionName})}</td>
    </tr>
  {/if}

</Table>
