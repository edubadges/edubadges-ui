<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {queryData} from "../../../api/graphql";
  import {assertionsQuery} from "../../../api/queries";
  import moment from "moment";
  import {Table} from "../../teachers";
  import {sort, sortType} from "../../../util/sortData";
  import {Button, CheckBox} from "../../../components";
  import {awardBadges, revokeAssertion} from "../../../api";
  import singleNeutralCheck from "../../../icons/single-neutral-check.svg";
  import {userName} from "../../../util/users";
  import {search, searchMultiple} from "../../../util/searchData";
  import Modal from "../../forms/Modal.svelte";
  import {flash} from "../../../stores/flash";
import filter from "../../../icons/filter-1.svg";

  export let assertions = [];
  export let issuer;
  export let badgeclass;
  export let refresh;

  let selection = [];
  let checkAllValue = false;
  let revocationReason = "";

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const cancel = () => {
    showModal = false;
    revocationReason = "";
  }

  const revoke = showConfirmation => {
    if (showConfirmation) {
      modalTitle = I18n.t("models.badge.confirmation.revoke");
      modalQuestion = I18n.t("models.badge.confirmation.revokeConfirmation");
      modalAction = () => revoke(false);
      showModal = true;
    } else {
      showModal = false;
      const promises = selection.map(entityID => revokeAssertion(issuer.entityId, badgeclass.entityId, entityID, revocationReason));
      Promise.all(promises).then(() => {
        flash.setValue(I18n.t("models.badge.flash.revoked"));
        refreshEnrollments();
      });
    }
  }

  const refreshEnrollments = () => {
    selection = [];
    revocationReason = "";
    // queryData(`{ ${assertionsQuery(badgeclass.entityId)} }`).then(res => {
    //   assertions = res.badgeClass.badgeAssertions;
    // });
    refresh();
  };

  const onCheckAll = val => {
    selection = val ? assertions
        .filter(assertion => !assertion.revoked)
        .map(assertion => assertion.entityId)
      : [];
    table.checkAllValue = val;
  };

  const onCheckOne = (val, entityId) => {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === assertions.filter(assertion => !assertion.revoked).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  }

  const assertionStatus = assertion => {
    if (assertion.revoked) {
      return I18n.t("models.badge.statuses.revoked");
    }
    return I18n.t(`models.badge.statuses.${assertion.acceptance.toLowerCase()}`);
  }

  const assertionStatusClass = assertion => {
    if (assertion.revoked) {
      return "revoked";
    }
    return assertion.acceptance.toLowerCase();
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
      icon: filter,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.issuedOn"),
      attribute: "issuedOn",
      reverse: false,
      sortType: sortType.DATE
    },
    {
      name: I18n.t("models.badge.status"),
      attribute: "acceptance",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.badge.claimed"),
      attribute: "updatedOn",
      reverse: false,
      sortType: sortType.DATE
    },
    {
      name: I18n.t("models.badge.expires"),
      attribute: "expiresAt",
      reverse: false,
      sortType: sortType.DATE
    }
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("models.badge.awarded")}`,
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
    display: flex;
    flex-direction: column;

    span:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  div.action-buttons {
    display: flex;
    margin: 15px 0;
  }

  div.slots {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
    }
  }

  :global(td.assertion-status span) {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: bold;

    &.accepted {
      background-color: var(--green-light);
    }

    &.revoked {
      background-color: var(--red-strong-dark);
      color: white;
    }

    &.unaccepted {
      background-color: var(--grey-3);
    }

    &.rejected {
      background-color: var(--red-dark);
      color: white;
    }
  }


</style>

<Table
  {...table}
  bind:search={assertionSearch}
  bind:sort={assertionsSort}
  withCheckAll={true}
  isEmpty={assertions.length === 0}
  bind:checkAllValue>
  <div class="action-buttons" slot="check-buttons">
    <Button small disabled={selection.length === 0} action={() => revoke(true)}
            text={I18n.t('teacher.badgeRevoked.revoke')}/>
  </div>

  {#each sortedFilteredAssertions as assertion}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(assertion.entityId)}
          name={`select-${assertion.entityId}`}
          disabled={assertion.revoked}
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
      <td class="assertion-status">
        <span class={assertionStatusClass(assertion)}>{assertionStatus(assertion)}</span>
      </td>
      <td>{assertion.updatedAt ? moment(assertion.updatedAt).format('MMM D, YYYY') : ""}</td>
      <td>{assertion.expiresAt ? moment(assertion.expiresAt).format('MMM D, YYYY') : ""}</td>
    </tr>
  {/each}
  {#if assertions.length === 0}
    <tr>
      <td colspan="8">{I18n.t("zeroState.assertions",{name:badgeclass.name})}</td>
    </tr>
  {/if}

</Table>

{#if showModal}
  <Modal submit={modalAction}
         cancel={cancel}
         question={modalQuestion}
         title={modalTitle}
         disabled={revocationReason.length === 0}>
    <div class="slots">
      <label for="revocation-reason">{I18n.t("models.badge.confirmation.revocationReason")}</label>
      <input id="revocation-reason" class="input-field" bind:value={revocationReason }/>
    </div>
  </Modal>
{/if}
