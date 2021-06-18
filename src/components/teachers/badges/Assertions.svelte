<script>
  import I18n from "i18n-js";
  import moment from "moment";
  import {Table} from "../../teachers";
  import {sort, sortType} from "../../../util/sortData";
  import {Button, CheckBox} from "../../../components";
  import {revokeAssertions, revokeDirectAwards} from "../../../api";
  import singleNeutralCheck from "../../../icons/single-neutral-check.svg";
  import {userName} from "../../../util/users";
  import {searchMultiple} from "../../../util/searchData";
  import {Modal} from "../../forms";
  import {flash} from "../../../stores/flash";
  import filter from "../../../icons/filter-1.svg";
  import SideBarAssertions from "../award/SideBarAssertions.svelte";
  import {awardTypes, issuedTypes, statusTypes} from "../../../stores/filterAssertions";

  export let assertions = [];
  export let badgeclass;
  export let refresh;

  let selection = [];
  let checkAllValue = false;
  let revocationReason = "";

  //Side bar filtering
  let issuedSelected = [];//[issuedTypes.LAST_30_DAYS];
  let awardTypeSelected = [];
  let statusSelected = [];

  let issuedOptions = [];
  let awardTypeOptions = [];
  let statusOptions = [];

  let filteredAssertions = [];

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;


  $: filteredAssertions = assertions;

  $: invariant(issuedSelected, awardTypeSelected, statusSelected);

  const invariant = (issuedSelected, awardTypeSelected, statusSelected) => {
    filteredAssertions = filterAssertion(issuedSelected, awardTypeSelected, statusSelected);
    const options = filteredAssertions.reduce((acc, assertion) => {
        const item = acc.find(v => v.value === assertion.issued);
        if (item) {
          ++item.count;
        }
        return acc;
      },
      Object.keys(issuedTypes)
        .filter(issuedType => issuedType !== "ALL")
        .map(issuedType => ({
          name: I18n.t(`assertions.issued.${issuedType}`),
          value: issuedTypes[issuedType],
          count: 0
        })))
      .concat({
        name: I18n.t(`assertions.issued.ALL`),
        value: issuedTypes.ALL,
        count: assertions.length
      });
    [[issuedTypes.LAST_60_DAYS, issuedTypes.LAST_30_DAYS], [issuedTypes.LAST_90_DAYS, issuedTypes.LAST_60_DAYS]]
      .forEach(arr => {
        const days = options.find(item => item.value === arr[0]);
        const toAdd = options.find(option => option.value === arr[1]);
        days.count += toAdd.count
      });

    issuedOptions = options;
    awardTypeOptions = filteredAssertions.reduce((acc, assertion) => {
        const item = acc.find(v => v.value === (assertion.isDirectAward ? awardTypes.DIRECT_AWARD : awardTypes.REQUESTED));
        ++item.count;
        return acc;
      },
      Object.keys(awardTypes).map(type => ({
        name: I18n.t(`assertions.awardType.${type}`),
        value: awardTypes[type],
        count: 0
      })));
    statusOptions = filteredAssertions.reduce((acc, assertion) => {
        const item = acc.find(v => v.value === assertion.status);
        ++item.count;
        return acc;
      },
      Object.keys(statusTypes).map(type => ({
        name: I18n.t(`assertions.status.${type}`),
        value: statusTypes[type],
        count: 0
      })));

  }


  const filterAssertion = (issuedSelected, awardTypeSelected, statusSelected) => {
    return assertions.filter(assertion => {
      let issued = true;
      let awardType = true;
      let status = true;
      if (issuedSelected && issuedSelected.length > 0) {
        issued = assertion.issued <= issuedSelected[0];
      }
      if (awardTypeSelected && awardTypeSelected.length > 0) {
        awardType = awardTypeSelected[0] === awardTypes.DIRECT_AWARD ? assertion.isDirectAward : !assertion.isDirectAward;
      }
      if (statusSelected && statusSelected.length > 0) {
        status = assertion.status === statusSelected[0];
      }
      return issued && awardType && status;
    });
  };

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
      const selectedAssertions = filteredAssertions
        .filter(assertion => selection.includes(assertion.entityId) && !assertion.isDirectAward)
        .map(assertion => assertion.entityId);

      const selectedDirectAwards = filteredAssertions
        .filter(assertion => selection.includes(assertion.entityId) && assertion.isDirectAward)
        .map(assertion => assertion.entityId);

      const promises = [];
      if (selectedAssertions.length > 0) {
        promises.push(revokeAssertions(selectedAssertions, revocationReason));
      }
      if (selectedDirectAwards.length > 0) {
        promises.push(revokeDirectAwards(selectedDirectAwards, revocationReason));
      }
      if (promises.length > 0) {
        Promise.all(promises).then(() => {
          flash.setValue(I18n.t("models.badge.flash.revoked"));
          refreshAssertions();
        });
      }
    }
  }

  const refreshAssertions = () => {
    selection = [];
    revocationReason = "";
    refresh();
  };

  const onCheckAll = val => {
    selection = val ? filteredAssertions
        .filter(assertion => !isRevoked(assertion))
        .map(assertion => assertion.entityId)
      : [];
    table.checkAllValue = val;
  };

  const onCheckOne = (val, entityId) => {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === filteredAssertions
        .filter(assertion => !isRevoked(assertion)).length;
    } else {
      selection = selection.filter(id => id !== entityId);
      table.checkAllValue = false;
    }
  }

  const isRevoked = assertion => {
    return (assertion.isDirectAward && assertion.status.toLowerCase() === "revoked") || (!assertion.isDirectAward && assertion.revoked);
  }

  const assertionStatus = assertion => {
    if (!assertion.isDirectAward && assertion.revoked) {
      return I18n.t("models.badge.statuses.revoked");
    }
    return I18n.t(`models.badge.statuses.${assertion.isDirectAward ? assertion.status.toLowerCase() : assertion.acceptance.toLowerCase()}`);
  }

  const assertionStatusClass = assertion => {
    if (!assertion.isDirectAward && assertion.revoked) {
      return "revoked"
    }
    return assertion.isDirectAward ? assertion.status.toLowerCase() : assertion.acceptance.toLowerCase();
  }

  const tableHeaders = [
    {
      name: null,
    },
    {
      name: I18n.t("models.badge.recipient"),
      attribute: "user.email",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "40%"
    },
    {
      name: I18n.t("models.badge.awardType.name"),
      attribute: "award_type",
      reverse: false,
      icon: filter,
      sortType: sortType.ALPHA,
      width: "12%",
      center: true
    },
    {
      name: I18n.t("models.badge.issuedOn"),
      attribute: "issuedOn",
      reverse: false,
      sortType: sortType.DATE,
      width: "12%",
      center: true
    },
    {
      name: I18n.t("models.badge.status"),
      attribute: "acceptance",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "12%",
      center: true
    },
    {
      name: I18n.t("models.badge.claimed"),
      attribute: "updatedOn",
      reverse: false,
      sortType: sortType.DATE,
      width: "12%",
      center: true
    },
    {
      name: I18n.t("models.badge.expires"),
      attribute: "expiresAt",
      reverse: false,
      sortType: sortType.DATE,
      width: "12%",
      right: true
    }
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("models.badge.awarded")}`,
    tableHeaders: tableHeaders,
    onCheckAll
  };

  let assertionSearch = "";
  $: searchedAssertionIds = searchMultiple(filteredAssertions, assertionSearch, "entityId", "user.firstName", "user.lastName",
    "user.email", "eppn", "recipientEmail");

  let assertionsSort = tableHeaders[2];

  $: sortedFilteredAssertions = sort(
    filteredAssertions.filter(el => searchedAssertionIds.includes(el.entityId)),
    assertionsSort.attribute,
    assertionsSort.reverse,
    assertionsSort.sortType
  );

</script>

<style lang="scss">

  div.assertions {
    display: flex;

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

    &.unaccepted, &.pending {
      background-color: var(--grey-3);
    }

    &.rejected {
      background-color: var(--red-dark);
      color: white;
    }
  }


</style>
<div class="assertions">

  <div class="filters">
    <SideBarAssertions
      assertions={filteredAssertions}
      bind:issuedSelected={issuedSelected}
      bind:awardTypeSelected={awardTypeSelected}
      bind:statusSelected={ statusSelected }
      { issuedOptions}
      { awardTypeOptions}
      {statusOptions }/>
  </div>

  <Table
    {...table}
    bind:search={assertionSearch}
    bind:sort={assertionsSort}
    withCheckAll={true}
    full={true}
    isEmpty={filteredAssertions.length === 0}
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
            disabled={isRevoked(assertion)}
            onChange={val => onCheckOne(val, assertion.entityId)}/>
        </td>
        <td class="single-neutral-check">
          <div class="single-neutral-check">
            {@html singleNeutralCheck}
          </div>
        </td>
        <td>
          <div class="recipient">
            <span>{userName(assertion)}</span>
            <span>{assertion.isDirectAward ? assertion.recipientEmail : assertion.user.email}</span>
            {#if assertion.isDirectAward}
              <span>{assertion.eppn} <em>(eppn)</em></span>
            {/if}
          </div>
        </td>
        <td class="center">
          {I18n.t(`models.badge.awardType.${assertion.isDirectAward ? "DIRECT_AWARD" : assertion.awardType}`)}
        </td>
        <td class="center">
          {moment(assertion.isDirectAward ? assertion.createdAt : assertion.issuedOn).format('MMM D, YYYY')}
        </td>
        <td class="assertion-status center">
          <span class={assertionStatusClass(assertion)}>{assertionStatus(assertion)}</span>
        </td>
        <td class="center">
          {assertion.updatedAt && !assertion.isDirectAward ? moment(assertion.updatedAt).format('MMM D, YYYY') : ""}
        </td>
        <td class="right">
          {assertion.expiresAt ? moment(assertion.expiresAt).format('MMM D, YYYY') : ""}
        </td>
      </tr>
    {/each}
    {#if filteredAssertions.length === 0}
      <tr>
        <td colspan="8">{I18n.t("zeroState.assertions", {name: badgeclass.name})}</td>
      </tr>
    {/if}

  </Table>
</div>
{#if showModal}
  <Modal
    submit={modalAction}
    cancel={cancel}
    question={modalQuestion}
    evaluateQuestion={true}
    title={modalTitle}
    disabled={revocationReason.length === 0}>
    <div class="slots">
      <label for="revocation-reason">{I18n.t("models.badge.confirmation.revocationReason")}</label>
      <input id="revocation-reason" class="input-field" bind:value={revocationReason }/>
    </div>
  </Modal>
{/if}
