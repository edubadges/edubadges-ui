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
    import AwardBadgeModal from "../award/AwardBadgeModal.svelte";
    import {onMount} from "svelte";
    import Spinner from "../../Spinner.svelte";
    import Tooltip from "../../../components/Tooltip.svelte";

    export let entityId;
    export let enrollments = [];
    export let refresh;

    export let badgeClass = {};

    let selection = [];
    let filteredEnrollments = [];
    let checkAllValue = false;
    let displayDenied = false;
    let narrative = "";
    let url = "";
    let name = "";
    let description = "";
    let useEvidence = false;
    let serverBusy = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let denyReason = "";

    //AwardModal
    let showAwardModal = false;

    onMount(() => {
        enrollments.forEach(enrollment => enrollment.evidenceNarrativeRequired = badgeClass.evidenceRequired || badgeClass.narrativeRequired);
        filteredEnrollments = enrollments.filter(enrollment => !enrollment.denied);
    });

    const displayDeniedChanged = val => {
        filteredEnrollments = val ? [...enrollments] : enrollments.filter(enrollment => !enrollment.denied)
        displayDenied = val;
    }

    const refreshEnrollments = () => {
        selection = [];
        refresh();
    };

    const award = showConfirmation => {
        if (showConfirmation) {
            showAwardModal = true;
        } else {
            showAwardModal = false;
            serverBusy = true;
            awardBadges(entityId, selection, useEvidence, narrative, url, name, description).then(() => {
                refreshEnrollments();
                flash.setValue(I18n.t("models.enrollment.flash.awarded"));
                serverBusy = false;
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
            serverBusy = true;
            Promise.all(selection.map(entityID => denyBadge(entityID, denyReason)))
                .then(() => {
                    refreshEnrollments();
                    denyReason = "";
                    flash.setValue(I18n.t("models.enrollment.flash.denied"));
                    serverBusy = false;
                });
        }
    }

    const cancelAwardDialog = () => {
        showAwardModal = false;
        narrative = "";
        url = "";
        name = "";
        description = "";
    }


    const onCheckAll = val => {
        selection = val ? enrollments.filter(enrollment => !enrollment.denied).map(({entityId}) => entityId) : [];
        table.checkAllValue = val;
    }

    const onCheckOne = (val, entityId) => {
        if (val) {
            if (badgeClass.evidenceRequired || badgeClass.narrativeRequired || badgeClass) {
                selection = [entityId];
            } else {
                selection = selection.concat(entityId);
            }
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
            width: "30%"
        },
        {
            name: I18n.t("models.enrollment.enrollmentType.name"),
            attribute: "award_type",
            reverse: false,
            icon: filter,
            sortType: sortType.ALPHA,
            width: "25%",
            center: true
        },
        {
            name: I18n.t("models.enrollment.enrollmentType.evidenceNarrativeRequired"),
            attribute: "evidenceNarrativeRequired",
            reverse: false,
            width: "20%"
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
            name: I18n.t("models.enrollment.status"),
            attribute: "denied",
            reverse: false,
            sortType: sortType.ALPHA,
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
    $: searchedEnrollmentsIds = searchMultiple(filteredEnrollments, enrollmentSearch, "entityId", "user.firstName", "user.lastName", "user.email");

    let enrollmentSort = tableHeaders[1];

    $: sortedFilteredEnrollments = sort(
        filteredEnrollments.filter(el => searchedEnrollmentsIds.includes(el.entityId)),
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

  td.evidenceNarrativeRequired span {
    display: block;
  }

  div.checkbox-container {
    margin-left: 80px;
    margin-top: 8px;
  }

</style>
{#if serverBusy}
    <Spinner/>
{/if}
<Table
        {...table}
        bind:search={enrollmentSearch}
        bind:sort={enrollmentSort}
        isEmpty={enrollments.length === 0}
        withCheckAll={true}
        checkAllDisabled={enrollments.filter(enrollment => !enrollment.denied).length === 0 || !badgeClass.permissions.mayAward || badgeClass.evidenceRequired || badgeClass.narrativeRequired}
        bind:checkAllValue>
    <div class="action-buttons" slot="check-buttons">
        <Button small action={() => award(true)} marginRight={true}
                text={I18n.t('models.enrollment.award')} disabled={selection.length === 0 || serverBusy}/>
        <Button small action={() => deny(true)}
                text={I18n.t('models.enrollment.deny')} disabled={selection.length === 0  || serverBusy}
                secondary={true}/>
        {#if enrollments.filter(enrollment => enrollment.denied).length > 0}
            <div class="checkbox-container">
                <CheckBox adjustTopFlex={true}
                          label={I18n.t('models.enrollment.showDenied', {count: enrollments.filter(enrollment => enrollment.denied).length})}
                          bind:value={displayDenied}
                          onChange={displayDeniedChanged}/>
            </div>
        {/if}

    </div>

    {#each sortedFilteredEnrollments as enrollment}
        <tr>
            <td>
                <CheckBox
                        value={selection.includes(enrollment.entityId)}
                        name={`select-${enrollment.entityId}`}
                        disabled={enrollment.denied || !badgeClass.permissions.mayAward}
                        onChange={val => onCheckOne(val, enrollment.entityId)}/>
            </td>
            <td class="single-neutral-check">
                <div class="single-neutral-check">
                    {@html singleNeutralCheck}
                </div>
            </td>
            <td>
                <div class="recipient">
                    <span>{userName(enrollment)}</span>
                    <span>{enrollment.user.email}</span>
                </div>
            </td>
            <td class="center">
                {I18n.t("models.enrollment.enrollmentType.enrolled")}
            </td>
            <td class="evidenceNarrativeRequired">
                {#if enrollment.evidenceNarrativeRequired}
                    {#if badgeClass.evidenceRequired}
                        <span>{I18n.t("models.enrollment.enrollmentType.evidence")}</span>
                    {/if}
                    {#if badgeClass.narrativeRequired}
                        <span>{I18n.t("models.enrollment.enrollmentType.narrative")}</span>
                    {/if}
                {:else}
                    <span>-</span>
                {/if}
            </td>
            <td class="center">
                {moment(enrollment.dateCreated).format('MMM D, YYYY')}
            </td>
            <td class="center">
                <span>{enrollment.denied ? I18n.t("models.enrollment.denied") : I18n.t("models.enrollment.open")}</span>
                {#if enrollment.denied}
                    <Tooltip tooltipText={enrollment.denyReason}/>
                {/if}
            </td>
        </tr>
    {/each}
    {#if enrollments.length === 0}
        <tr>
            <td colspan="6">{I18n.t("zeroState.enrollments", {name: badgeClass.name})}</td>
        </tr>
    {/if}
</Table>

{#if showModal}
    <Modal
            submit={modalAction}
            cancel={() => showModal = false}
            question={modalQuestion}
            title={modalTitle}>
        <div class="slots">
            <label for="revocation-reason">{I18n.t("models.enrollment.confirmation.denyReason")}</label>
            <input id="revocation-reason" class="input-field" bind:value={denyReason}/>
        </div>
    </Modal>
{/if}

{#if showAwardModal}
    <AwardBadgeModal
            bind:narrative={narrative}
            bind:url={url}
            bind:useEvidence={useEvidence}
            bind:name={name}
            bind:description={description}
            badgeClass={badgeClass}
            submit={() => award(false)}
            narrativeAllowed={selection.length === 1}
            cancel={cancelAwardDialog}/>
{/if}
