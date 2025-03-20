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
    import {constructUserName} from "../../../util/users";
    import {Modal} from "../../forms";
    import filter from "../../../icons/filter-1.svg";
    import AwardBadgeModal from "../award/AwardBadgeModal.svelte";
    import {onMount} from "svelte";
    import Spinner from "../../Spinner.svelte";
    import Tooltip from "../../../components/Tooltip.svelte";
    import {pageCount} from "../../../util/pagination";
    import {ACTIONS} from "../../../util/assertions";

    export let entityId;
    export let enrollments = [];
    export let refresh;
    export let actions = [ACTIONS.DENY_ENROLLMENT, ACTIONS.AWARD_ENROLLMENT];
    export let title;
    export let denied = false;

    export let badgeClass = {};

    let selection = [];
    let filteredEnrollments = [];
    let checkAllValue = false;
    let narrative = "";
    let url = "";
    let name = "";
    let description = "";
    let gradeAchieved = null;
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
        enrollments.forEach(enrollment => {
            enrollment.evidenceNarrativeRequired = badgeClass.evidenceRequired || badgeClass.narrativeRequired;
            enrollment.gradeAchievedRequired = badgeClass.gradeAchievedRequired;
        });
        filteredEnrollments = enrollments;
    });

    const refreshEnrollments = () => {
        selection = [];
        refresh();
    };

    const award = showConfirmation => {
        if (showConfirmation) {
            const enrollment = enrollments.find(enrollment => enrollment.entityId === selection[0]);
            description = enrollment.narrative;
            url = enrollment.evidenceUrl;
            showAwardModal = true;
        } else {
            showAwardModal = false;
            serverBusy = true;
            awardBadges(entityId, selection, useEvidence, narrative, url, name, description, gradeAchieved).then(() => {
                refreshEnrollments();
                narrative = "";
                url = "";
                name = "";
                description = "";
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
        selection = val ? enrollments.map(({entityId}) => entityId) : [];
        table.checkAllValue = val;
    }

    const onCheckOne = (val, entityId) => {
        if (val) {
            if (badgeClass.evidenceRequired ||
                badgeClass.narrativeRequired ||
                badgeClass.evidenceStudentRequired ||
                badgeClass.narrativeStudentRequired ||
                badgeClass.gradeAchievedRequired) {
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
            width: "15%"
        },
        {
            name: I18n.t("models.enrollment.enrolledOn"),
            attribute: "dateCreated",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%",
            center: true
        },
        denied ?
            {
                name: I18n.t("models.enrollment.rejectedReason"),
                attribute: "denyReason",
                reverse: false,
                sortType: sortType.ALPHA,
                width: "15%",
                center: true
            } : null
    ].filter(header => header !== null);

    $: table = {
        entity: "badgeclass",
        title: title,
        tableHeaders: tableHeaders,
        onCheckAll
    };

    let enrollmentSearch = "";
    $: searchedEnrollmentsIds = searchMultiple(filteredEnrollments, enrollmentSearch, "entityId", "user.fullName", "user.email");

    let enrollmentSort = tableHeaders[1];

    $: sortedFilteredEnrollments = sort(
        filteredEnrollments.filter(el => searchedEnrollmentsIds.includes(el.entityId)),
        enrollmentSort.attribute,
        enrollmentSort.reverse,
        enrollmentSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredEnrollments.length / pageCount));

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

    :global(td.assertion-status span) {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: bold;

        &.open {
            background-color: var(--green-light);
        }

        &.denied {
            background-color: var(--red-dark);
            color: white;
        }

    }

    :global(td.assertion-status span.title) {
        padding: 0;
    }

    :global(td.assertion-status span.tooltip-slot) {
        padding: 0;
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
        filteredCount={sortedFilteredEnrollments.length}
        page={minimalPage}
        onPageChange={nbr => page = nbr}
        withCheckAll={true}
        checkAllDisabled={!badgeClass.permissions.mayAward || badgeClass.evidenceRequired || badgeClass.narrativeRequired || badgeClass.gradeAchievedRequired}
        bind:checkAllValue>
    <div class="action-buttons" slot="check-buttons">
        {#if actions.includes(ACTIONS.AWARD_ENROLLMENT)}
            <Button small action={() => award(true)}
                    marginRight={true}
                    text={I18n.t('models.enrollment.award')}
                    disabled={selection.length === 0 || serverBusy}/>
        {/if}
        {#if actions.includes(ACTIONS.DENY_ENROLLMENT)}
            <Button small action={() => deny(true)}
                    text={I18n.t('models.enrollment.deny')}
                    disabled={selection.length === 0  || serverBusy}
                    secondary={true}/>
        {/if}
    </div>

    {#each sortedFilteredEnrollments.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as enrollment}
        <tr>
            <td>
                <CheckBox
                        value={selection.includes(enrollment.entityId)}
                        name={`select-${enrollment.entityId}`}
                        disabled={!badgeClass.permissions.mayAward}
                        onChange={val => onCheckOne(val, enrollment.entityId)}/>
            </td>
            <td class="single-neutral-check">
                <div class="single-neutral-check">
                    {@html singleNeutralCheck}
                </div>
            </td>
            <td>
                <div class="recipient">
                    <span>{constructUserName(enrollment)}</span>
                    <span>{enrollment.user.email}</span>
                </div>
            </td>
            <td class="center">
                {I18n.t("models.enrollment.enrollmentType.enrolled")}
            </td>
            <td class="evidenceNarrativeRequired">
                {#if enrollment.evidenceNarrativeRequired || badgeClass.gradeAchievedRequired}
                    {#if badgeClass.evidenceRequired}
                        <span>{I18n.t("models.enrollment.enrollmentType.evidence")}</span>
                    {/if}
                    {#if badgeClass.narrativeRequired}
                        <span>{I18n.t("models.enrollment.enrollmentType.narrative")}</span>
                    {/if}
                    {#if badgeClass.gradeAchievedRequired}
                        <span>{I18n.t("models.enrollment.enrollmentType.gradeAchieved")}</span>
                    {/if}
                {:else}
                    <span>-</span>
                {/if}
            </td>
            <td class="center">
                {moment(enrollment.dateCreated).format('MMM D, YYYY')}
            </td>
            {#if denied}
                <td class="assertion-status center">
                    <Tooltip tooltipText={enrollment.denyReason}/>
                </td>
            {/if}
        </tr>
    {/each}
    {#if enrollments.length === 0}
        <tr>
            <td colspan="6">{I18n.t(`zeroState.${denied ? "enrollmentsDenied" : "enrollments"}`, {name: badgeClass.name})}</td>
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
            bind:grade={gradeAchieved}
            narrativeRequired={badgeClass.narrativeRequired}
            gradeAchievedRequired={badgeClass.gradeAchievedRequired}
            evidenceRequired={badgeClass.evidenceRequired}
            submit={() => award(false)}
            narrativeAllowed={selection.length === 1}
            awardMode={true}
            cancel={cancelAwardDialog}/>
{/if}
