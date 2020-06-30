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

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === assertions.filter(assertion => !assertion.revoked).length;
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
    span {
      display: block;
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



</style>

<Table
  {...table}
  bind:search={assertionSearch}
  bind:sort={assertionsSort}
  withCheckAll={true}
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
      <td>{assertion.acceptance}</td>
      <td>
        <CheckBox name={assertion.entityId} value={assertion.revoked} disabled={true}/>
      </td>
    </tr>
  {/each}
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
