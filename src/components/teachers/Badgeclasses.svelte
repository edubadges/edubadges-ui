<script>
  import {navigate} from "svelte-routing";
  import I18n from "i18n-js";
  import {Table} from "../teachers";
  import {search} from "../../util/searchData";
  import {sort, sortType} from "../../util/sortData";
  import moment from "moment";

  export let badgeclasses = [];
  export let mayCreate;
  export let issuer;

  const tableHeaders = [
    {
      name: I18n.t("teacher.name"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("teacher.badgeclasses.created"),
      attribute: "created",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("teacher.badgeclasses.recipients"),
      attribute: "recipients",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("teacher.badgeclasses.studyLoad"),
      attribute: "studyLoad",
      reverse: false,
      sortType: sortType.ALPHA
    }
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("teacher.badgeclasses.title")} (${badgeclasses.length})`,
    tableHeaders: tableHeaders
  };

  let badgeclassSearch = "";
  $: searchedBadgeclassIds = search(badgeclasses, badgeclassSearch, "name");

  let badgeclassSort = tableHeaders[0];

  $: sortedFilteredBadgeclasses = sort(
    badgeclasses.filter(el => searchedBadgeclassIds.includes(el.entityId)),
    badgeclassSort.attribute,
    badgeclassSort.reverse,
    badgeclassSort.sortType
  );
</script>

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
      <td>{badgeclass.name}</td>
      <td>{moment(badgeclass.dateCreated).format('MMM D, YYYY')}</td>
      <td>{badgeclass.badgeAssertions.length}</td>
      <td>{badgeclass.studyLoad}</td>
    </tr>
  {/each}
  {#if badgeclasses.length === 0}
    <tr>
      <td colspan="4">{I18n.t("zeroState.badgeClasses",{name:issuer.name})}</td>
    </tr>
  {/if}
</Table>
