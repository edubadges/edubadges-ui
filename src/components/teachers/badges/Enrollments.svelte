<script>
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
  import {Modal} from "../../forms";
  import filter from "../../../icons/filter-1.svg";
  import CenterMe from "../../forms/CenterMe.svelte";
  import AwardBadgeModal from "../award/AwardBadgeModal.svelte";

  export let entityId;
  export let enrollments = [];
  export let refresh;

  export let badgeclassName;

  let selection = [];
  let checkAllValue = false;

  let narrative = "";
  let url = "";
  let name = "";
  let description = "";
  let useEvidence = false;

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  //AwardModal
  let showAwardModal = false;

  const refreshEnrollments = () => {
    selection = [];
    refresh();
  };

  const award = showConfirmation => {
    if (showConfirmation) {
      showAwardModal = true;
    } else {
      showAwardModal = false;
      if (narrative.trim() || url.trim()) {

      }
      awardBadges(entityId, selection, useEvidence, narrative, url, name, description).then(() => {
        refreshEnrollments();
        flash.setValue(I18n.t("models.enrollment.flash.awarded"));
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

  const onCheckAll = val => {
    selection = val ? enrollments.map(({entityId}) => entityId) : [];
    table.checkAllValue = val;
  }

  const onCheckOne = (val, entityId) => {
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
      sortType: sortType.ALPHA,
      width: "40%"
    },
    {
      name: I18n.t("models.enrollment.enrollmentType.name"),
      attribute: "award_type",
      reverse: false,
      icon: filter,
      sortType: sortType.ALPHA,
      width: "35%",
      center: true
    },
    {
      name: I18n.t("models.enrollment.enrolledOn"),
      attribute: "dateCreated",
      reverse: false,
      sortType: sortType.ALPHA,
      width: "15%",
      center: true
    },
    {
      name: I18n.t("models.enrollment.denied"),
      attribute: "denied",
      reverse: false,
      sortType: sortType.BOOLEAN,
      width: "10%",
      center: true
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
    display: flex;
    flex-direction: column;

    span:not(:last-child) {
      margin-bottom: 5px;
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
  isEmpty={enrollments.length === 0}
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
      <td class="center">
        <!--  ToDo     -->
        {I18n.t("models.enrollment.enrollmentType.enrolled")}
      </td>
      <td class="center">
        {moment(enrollment.dateCreated).format('MMM D, YYYY')}
      </td>
      <td class="center">
        <CenterMe>
          <CheckBox value={enrollment.denied} disabled={true}/>
        </CenterMe>
      </td>
    </tr>
  {/each}
  {#if enrollments.length === 0}
    <tr>
      <td colspan="6">{I18n.t("zeroState.enrollments", {name: badgeclassName})}</td>
    </tr>
  {/if}
</Table>

{#if showModal}
  <Modal
    submit={modalAction}
    cancel={() => showModal = false}
    question={modalQuestion}
    title={modalTitle}/>
{/if}

{#if showAwardModal}
  <AwardBadgeModal
    bind:narrative={narrative}
    bind:url={url}
    bind:useEvidence={useEvidence}
    bind:name={name}
    bind:description={description}
    submit={() => award(false)}
    cancel={() => showAwardModal = false}/>
{/if}
