<script>
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";
  import moment from "moment";
  import {badgeclassIcon} from "../../icons";

  export let badgeclasses = [];
  export let mayCreate;
  export let issuer;

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
      width: "20%"
    },
    {
      name: I18n.t("teacher.badgeclasses.created"),
      attribute: "createdAt",
      reverse: false,
      sortType: sortType.DATE,
      width: "8%"
    },
    {
      name: I18n.t("teacher.badgeclasses.recipients"),
      attribute: "assertionCount",
      reverse: false,
      sortType: sortType.NUMERIC,
      width: "6%",
      center: true
    },
    {
      name: I18n.t("teacher.badgeclasses.enrollments"),
      attribute: "pendingEnrollmentCount",
      reverse: false,
      sortType: sortType.NUMERIC,
      width: "8%",
      center: true
    },
    {
      name: I18n.t("teacher.badgeclasses.studyLoad"),
      attribute: "studyLoad",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "9%",
      right: true
    },
    {
      name: I18n.t("teacher.badgeclasses.timeInvestment"),
      attribute: "timeInvestment",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "12%",
      right: true
    },
    {
      name: I18n.t("placeholders.badgeClass.status.name"),
      attribute: "archived",
      reverse: false,
      sortType: sortType.BOOLEAN,
      width: "11%",
      center: true
    },
    {
      name: "",
      width: "20%"
    },
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("teacher.badgeclasses.title")} (${badgeclasses.length})`,
    tableHeaders: tableHeaders
  };

  let badgeclassSearch = "";
  $: searchedBadgeclassIds = search(badgeclasses, badgeclassSearch, "name");

  let badgeclassSort = tableHeaders[1];

  $: sortedFilteredBadgeclasses = sort(
    badgeclasses.filter(el => searchedBadgeclassIds.includes(el.entityId)),
    badgeclassSort.attribute,
    badgeclassSort.reverse,
    badgeclassSort.sortType
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
</style>

<Table
  {...table}
  bind:search={badgeclassSearch}
  pathParameters={[issuer.entityId]}
  isEmpty={badgeclasses.length === 0}
  bind:sort={badgeclassSort}
  {mayCreate}>
  {#each sortedFilteredBadgeclasses as badgeclass (badgeclass.entityId)}
    <tr
        class="click"
        on:click={() => navigate(`/manage/badgeclass/${badgeclass.entityId}`)}>
      <td>
        {#if badgeclass.image}
          <div class="img-container">
            <div class="img-icon">
              <img src={badgeclass.image} alt=""/>
            </div>
          </div>
        {:else}
          <div class="img-container">
            <div class="img-icon">
              <span class="icon">{@html badgeclassIcon}</span>
            </div>
          </div>
        {/if}
      </td>
      <td>{badgeclass.name}</td>
      <td>{moment(badgeclass.createdAt).format('MMM D, YYYY')}</td>
      <td class="center">{badgeclass.assertionCount === 0 ? "-" : badgeclass.assertionCount}</td>
      <td class="center">{badgeclass.pendingEnrollmentCount === 0 ? "-" : badgeclass.pendingEnrollmentCount}</td>
      <td class="right">{badgeclass.studyLoad}</td>
      <td class="right">{badgeclass.timeInvestment}</td>
      <td class="center">{I18n.t(`placeholders.badgeClass.status.${badgeclass.archived ? "archived" : "active"}`) }</td>
      <td></td>
    </tr>
  {/each}
  {#if badgeclasses.length === 0}
    <tr>
      <td colspan="4">{I18n.t("zeroState.badgeClasses",{name:issuer.name})}</td>
    </tr>
  {/if}
</Table>
