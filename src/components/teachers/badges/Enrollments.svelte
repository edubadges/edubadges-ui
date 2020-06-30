<script>
  import {onMount} from "svelte";
  import {queryData} from "../../../api/graphql";
  import {enrollmentsQuery} from "../../../api/queries";
  import I18n from "i18n-js";
  import moment from "moment";
  import {Table} from "../../teachers";
  import {sort, sortType} from "../../../util/sortData";
  import {Button, CheckBox} from "../../../components";
  import {awardBadges, denyBadge} from "../../../api";
  import {flash} from "../../../stores/flash";
  import {searchMultiple} from "../../../util/searchData";
  import singleNeutralCheck from "../../../icons/single-neutral-check.svg";
  import {userName} from "../../../util/users";
  import Modal from "../../forms/Modal.svelte";


  export let entityId;
  export let enrollments = [];
  export let refresh;

  let selection = [];
  let checkAllValue = false;

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const refreshEnrollments = () => {
    selection = [];
    // queryData(`{ ${enrollmentsQuery(entityId)} }`).then(res => {
    //   enrollments = res.badgeClass.pendingEnrollments;
    // });
    refresh();
  };

  const award = showConfirmation => {
    if (showConfirmation) {
      modalTitle = I18n.t("models.enrollment.confirmation.award");
      modalQuestion = I18n.t("models.enrollment.confirmation.awardConfirmation");
      modalAction = () => award(false);
      showModal = true;
    } else {
      showModal = false;
      awardBadges(entityId, selection).then(() => {
        refreshEnrollments();
        flash.setValue(I18n.t("models.enrollment.flash.awarded"))
      });
    }
  }

  const deny = showConfirmation => {
    if (showConfirmation) {
      modalTitle = I18n.t("models.enrollment.confirmation.deny");
      modalQuestion = I18n.t("models.enrollment.confirmation.denyConfirmation");
      modalAction = () => deny(false);
      showModal = true;
    } else {
      showModal = false;
      Promise.all(selection.map(entityID => denyBadge(entityID)))
        .then(() => {
          refreshEnrollments();
          flash.setValue(I18n.t("models.enrollment.flash.denied"))
        });
    }
  }


  function onCheckAll(val) {
    selection = val ? enrollments.map(({entityId}) => entityId) : [];
    table.checkAllValue = val;
  }

  function onCheckOne(val, entityId) {
    if (val) {
      selection = selection.concat(entityId);
      table.checkAllValue = selection.length === enrollments.length;
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
      name: I18n.t("models.enrollment.enrolled"),
      attribute: "user.email",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.enrollment.enrollmentType.name"),
      attribute: "award_type",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.enrollment.enrolledOn"),
      attribute: "dateCreated",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("models.enrollment.denied"),
      attribute: "denied",
      reverse: false,
      sortType: sortType.BOOLEAN
    }
  ];

  $: table = {
    entity: "badgeclass",
    title: `${I18n.t("models.enrollment.title")}`,
    tableHeaders: tableHeaders,
    onCheckAll
  };

  let enrollmentSearch = "";
  $: searchedEnrollmentsIds = searchMultiple(enrollments, enrollmentSearch, "entityId", "user.firstName", "user.lastName", "user.email");

  let enrollmentSort = tableHeaders[1];

  $: sortedFilteredEnrollments = sort(
    enrollments.filter(el => searchedEnrollmentsIds.includes(el.entityId)),
    enrollmentSort.attribute,
    enrollmentSort.reverse,
    enrollmentSort.sortType
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

    :global(a:last-child) {
      margin-left: 15px;
    }
  }

</style>

<Table
  {...table}
  bind:search={enrollmentSearch}
  bind:sort={enrollmentSort}

  withCheckAll={true}
  bind:checkAllValue>
  <div class="action-buttons" slot="check-buttons">
    <Button small action={() => award(true)}
            text={I18n.t('models.enrollment.award')} disabled={selection.length === 0}/>
      <Button small action={() => deny(true)}
              text={I18n.t('models.enrollment.deny')} disabled={selection.length === 0} secondary={true}/>
  </div>

  {#each sortedFilteredEnrollments as enrollment}
    <tr>
      <td>
        <CheckBox
          value={selection.includes(enrollment.entityId)}
          name={`select-${enrollment.entityId}`}
          disabled={enrollment.denied}
          onChange={val => onCheckOne(val, enrollment.entityId)}/>
      </td>
      <td class="single-neutral-check">
        <div class="single-neutral-check">
          {@html singleNeutralCheck}
        </div>
      </td>
      <td>
        <div class="recipient">
          <span>{userName(enrollment.user)}</span>
          <span>{enrollment.user.email}</span>
        </div>
      </td>
      <td>
        <!--  ToDo     -->
        {I18n.t("models.enrollment.enrollmentType.enrolled")}
      </td>
      <td>{moment(enrollment.dateCreated).format('MMM D, YYYY')}</td>
      <td>
        <CheckBox value={enrollment.denied} disabled={true}/>
      </td>
    </tr>
  {/each}
</Table>

{#if showModal}
  <Modal submit={modalAction}
         cancel={() => showModal = false}
         question={modalQuestion}
           title={modalTitle}>
  </Modal>
{/if}
