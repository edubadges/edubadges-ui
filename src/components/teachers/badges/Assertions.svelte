<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {queryData} from "../../../api/graphql";
  import {enrollmentsQuery} from "../../../api/queries";
  import moment from "moment";
  import {Table} from "../../teachers";
  import {sort, sortType} from "../../../util/sortData";
  import {Button, CheckBox} from "../../../components";
  import {awardBadges, revokeAssertion} from "../../../api";
  import singleNeutralCheck from "../../../icons/single-neutral-check.svg";
  import {userName} from "../../../util/users";
  import {search, searchMultiple} from "../../../util/searchData";


  export let assertions = [];
  export let issuer;
  export let badgeclass;

  // export let entityId;

  let selection = [];
  let checkAllValue = false;

  function revoke() {
    debugger;
    revokeAssertion(issuer.entityId, badgeclass.entityId, selection[0], "some reason");
  }

  function onCheckAll(val) {
    selection = val ? assertions.map(assertion => assertion.entityId) : [];
  }

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === assertions.length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  }

  const tableHeaders = [
    {
      name: null,
    },
    {
      name: I18n.t("models.badge.recipient"),
      attribute: "user.email",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.awardType.name"),
      attribute: "award_type",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.issuedOn"),
      attribute: "issuedOn",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.status"),
      attribute: "acceptance",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.revoked"),
      attribute: "revoked",
      reverse: false,
      sortType: sortType.BOOLEAN
    }

  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("teacher.badgeclasses.title")}`,
    tableHeaders: tableHeaders,
    onCheckAll
  };

  let assertionSearch = "";
  $: searchedAssertionIds = searchMultiple(assertions, assertionSearch, "entityId", "user.firstName", "user.lastName", "user.email");

  let assertionsSort = tableHeaders[1];

  $: sortedFilteredAssertions = sort(
    assertions.filter(el => searchedAssertionIds.includes(el.entityId)),
    assertionsSort.attribute,
    assertionsSort.reverse,
    assertionsSort.sortType
  );

</script>

<style lang="scss">

  div.single-neutral-check {
    width: 26px;
  }

  div.recipient {
    span {
      display: block;
    }
  }

</style>

<Table
  {...table}
  bind:search={assertionSearch}
  bind:sort={assertionsSort}
  withCheckAll
  bind:checkAllValue
  showCheckActions={selection.length > 0}>
  <span slot="check-buttons">
    <Button small action={revoke} text={I18n.t('teacher.badgeRevoked.revoke')}/>
  </span>

  {#each sortedFilteredAssertions as assertion}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(assertion.entityId)}
          onChange={val => onCheckOne(val, assertion.entityId)}/>
      </td>
      <td class="single-neutral-check">
        <div class="single-neutral-check">
          {@html singleNeutralCheck}
        </div>
      </td>
      <td>
        <div class="recipient">
          <span>{userName(assertion.user)}</span>
          <span>{assertion.user.email}</span>
        </div>
      </td>
      <td>
        <!--  ToDo     -->
        {I18n.t("models.badge.awardType.enrolled")}
      </td>
      <td>{moment(assertion.dateCreated).format('MMM D, YYYY')}</td>
      <td>{assertion.acceptance}</td>
      <td><CheckBox value={assertion.revoked} disabled={true}/></td>
    </tr>
  {/each}
</Table>
