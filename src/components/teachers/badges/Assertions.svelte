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
  import { search } from "../../../util/searchData";
  import { sort, sortType } from "../../../util/sortData";


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
      attribute: "user.name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.awardType.name"),
      attribute: "email",
      reverse: false,
      sortType: sortType.ALPHA
    },

    {
      name: "created",
      attribute: "created",
      reverse: false,
      sortType: sortType.ALPHA
    }
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("teacher.badgeclasses.title")}`,
    tableHeaders: tableHeaders,
    onCheckAll
  };

  let assertionSearch = "";
  $: searchedAssertionIds = search(assertions, assertionSearch, "name");

  let facultySort = tableHeaders[1];

  $: sortedFilteredFaculties = sort(
    faculties.filter(el => searchedFacultyIds.includes(el.entityId)),
    facultySort.attribute,
    facultySort.reverse,
    facultySort.sortType
  );

</script>

<style lang="scss">

  div.single-neutral-check {
    width: 28px;
  }

  div.recipient {
    span {
      display: block;
    }
  }

</style>

<Table
  {...table}
  withCheckAll
  bind:checkAllValue
  showCheckActions={selection.length > 0}>
  <span slot="check-buttons">
    <Button small action={revoke} text={I18n.t('teacher.badgeRevoked.revoke')}/>
  </span>

  {#each assertions as assertion}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(assertion.entityId)}
          onChange={val => onCheckOne(val, assertion.entityId)}/>
      </td>
      <td>
        <div class="single-neutral-check">
          {@html singleNeutralCheck}
        </div>
      </td>
      <td>
        <!--  ToDo     -->
        {I18n.t("models.")}
      </td>
      <td>
        <div class="recipient">
          <span>{userName(assertion.user)}</span>
          <span>{assertion.user.email}</span>
        </div>
      </td>
      <td>{moment(assertion.dateCreated).format('MMM D, YYYY')}</td>
    </tr>
  {/each}
</Table>
