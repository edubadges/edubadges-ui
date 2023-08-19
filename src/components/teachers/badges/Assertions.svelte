<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {Table} from "../../teachers";
    import {sort, sortType} from "../../../util/sortData";
    import {Button, CheckBox} from "../../../components";
    import {deleteDirectAwards, resendDirectAwards, revokeAssertions, revokeDirectAwards} from "../../../api";
    import singleNeutralCheck from "../../../icons/single-neutral-check.svg";
    import {constructUserEmail, constructUserName} from "../../../util/users";
    import {searchMultiple} from "../../../util/searchData";
    import {Modal} from "../../forms";
    import {flash} from "../../../stores/flash";
    import filter from "../../../icons/filter-1.svg";
    import SideBarAssertions from "../award/SideBarAssertions.svelte";
    import {awardTypes, filterTypes, issuedTypes, statusTypes} from "../../../stores/filterAssertions";
    import {ACTIONS, assertionStatusClass, isRevoked} from "../../../util/assertions";
    import Spinner from "../../Spinner.svelte";
    import {pageCount} from "../../../util/pagination";

    export let assertions = [];
    export let badgeclass;
    export let refresh;
    export let filterOptions = [filterTypes.ISSUED, filterTypes.AWARD_TYPE, filterTypes.STATUS];
    export let actions = [ACTIONS.DELETE_DIRECT_AWARD, ACTIONS.REVOKE_ASSERTION, ACTIONS.RESEND_DIRECT_AWARD];
    export let title;
    export let type = "awarded";

    let selection = [];
    let checkAllValue = false;
    let revocationReason = "";
    let revocationReasonRequired = false;

    //Sidebar filtering
    let issuedSelected = [];//[issuedTypes.LAST_30_DAYS];
    let awardTypeSelected = [];
    let statusSelected = [];

    let issuedOptions = [];
    let awardTypeOptions = [];
    let statusOptions = [];

    let filteredAssertions = [];
    let serverBusy = false;
    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let revocationReasonLabel;

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
        //TODO do we want to include the LAST_30_DAYS in the LAST_60_DAYS
        // [[issuedTypes.LAST_60_DAYS, issuedTypes.LAST_30_DAYS], [issuedTypes.LAST_90_DAYS, issuedTypes.LAST_60_DAYS]]
        //     .forEach(arr => {
        //         const days = options.find(item => item.value === arr[0]);
        //         const toAdd = options.find(option => option.value === arr[1]);
        //         days.count += toAdd.count
        //     });
        issuedOptions = options;
        awardTypeOptions = filteredAssertions.reduce((acc, assertion) => {
                const item = acc.find(v => v.value === (assertion.isDirectAward ? awardTypes.DIRECT_AWARD : awardTypes.REQUESTED));
                if (item) {
                    ++item.count;
                }
                return acc;
            },
            Object.keys(awardTypes).map(type => ({
                name: I18n.t(`assertions.awardType.${type}`),
                value: awardTypes[type],
                count: 0
            })));
        statusOptions = filteredAssertions.reduce((acc, assertion) => {
                const item = acc.find(v => v.value === assertion.status);
                if (item) {
                    ++item.count;
                }
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
            revocationReasonLabel = I18n.t("models.badge.confirmation.revocationReason");
            modalQuestion = I18n.t("models.badge.confirmation.revokeConfirmation");
            modalAction = () => revoke(false);
            revocationReasonRequired = true;
            showModal = true;
        } else {
            showModal = false;
            //If a directAward is claimed it is converted to an assertion
            const selectedAssertions = filteredAssertions
                .filter(assertion => selection.includes(assertion.entityId) &&
                    (!assertion.isDirectAward || assertion.status === "ACCEPTED"))
                .map(assertion => assertion.entityId);

            const selectedDirectAwards = filteredAssertions
                .filter(assertion => selection.includes(assertion.entityId) &&
                    (assertion.isDirectAward && assertion.status !== "ACCEPTED"))
                .map(assertion => assertion.entityId);

            const promises = [];
            if (selectedAssertions.length > 0) {
                promises.push(revokeAssertions(selectedAssertions, revocationReason));
            }
            if (selectedDirectAwards.length > 0) {
                promises.push(revokeDirectAwards(selectedDirectAwards, revocationReason));
            }
            if (promises.length > 0) {
                serverBusy = true;
                Promise.all(promises).then(() => {
                    flash.setValue(I18n.t("models.badge.flash.revoked"));
                    refreshAssertions();
                    serverBusy = false;
                });
            }
        }
    }

    const doDeleteDirectAwards = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.directAwards.confirmation.delete");
            revocationReasonLabel = I18n.t("models.directAwards.confirmation.deletionReason");
            modalQuestion = I18n.t("models.directAwards.confirmation.deleteConfirmation");
            modalAction = () => doDeleteDirectAwards(false);
            revocationReasonRequired = true;
            showModal = true;
        } else {
            showModal = false;
            const selectedAssertions = filteredAssertions
                .filter(assertion => selection.includes(assertion.entityId))
                .map(assertion => assertion.entityId);
            const promises = [];
            if (selectedAssertions.length > 0) {
                promises.push(deleteDirectAwards(selectedAssertions, revocationReason));
            }
            if (promises.length > 0) {
                serverBusy = true;
                Promise.all(promises).then(() => {
                    flash.setValue(I18n.t("models.directAwards.flash.deleted"));
                    refreshAssertions();
                    serverBusy = false;
                });
            }
        }
    }

    const resend = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.directAwards.confirmation.resend");
            modalQuestion = I18n.t("models.directAwards.confirmation.resendConfirmation");
            modalAction = () => resend(false);
            revocationReasonRequired = false;
            showModal = true;
        } else {
            showModal = false;
            serverBusy = true;
            const selectedAssertions = filteredAssertions
                .filter(assertion => selection.includes(assertion.entityId))
                .map(assertion => assertion.entityId);
            resendDirectAwards(selectedAssertions)
                .then(() => {
                    refreshAssertions();
                    serverBusy = false;
                    flash.setValue(I18n.t("models.directAwards.flash.resend"));
                });
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
            attribute: "awardType",
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
            attribute: "statusSort",
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
            name: I18n.t(`models.badge.${type === "awarded" ? "expires" : "deleted"}`),
            attribute: type === "awarded" ? "expiresAt" : "deleteAt",
            reverse: false,
            sortType: sortType.DATE,
            width: "12%",
            right: true
        }
    ];

    $: table = {
        entity: "badgeclass",
        title: title,
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

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredAssertions.length / pageCount));

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

    &.accepted, &.awarded {
      background-color: var(--green-light);
    }

    &.revoked {
      background-color: var(--red-strong-dark);
      color: white;
    }

    &.unaccepted, &.pending, &.scheduled {
      background-color: var(--grey-3);
    }

    &.rejected {
      background-color: var(--red-dark);
      color: white;
    }
  }


</style>
{#if serverBusy}
    <Spinner/>
{/if}

<div class="assertions">
    {#if assertions.length > 0}
        <div class="filters">
            <SideBarAssertions
                    assertions={filteredAssertions}
                    bind:issuedSelected={issuedSelected}
                    bind:awardTypeSelected={awardTypeSelected}
                    bind:statusSelected={ statusSelected }
                    { filterOptions }
                    { issuedOptions}
                    { awardTypeOptions}
                    { statusOptions }/>
        </div>
    {/if}
    <Table
            {...table}
            bind:search={assertionSearch}
            bind:sort={assertionsSort}
            withCheckAll={actions.length > 0}
            checkAllDisabled={!badgeclass.permissions.mayAward}
            full={true}
            isEmpty={filteredAssertions.length === 0}
            filteredCount={sortedFilteredAssertions.length}
            page={minimalPage}
            onPageChange={nbr => page = nbr}
            bind:checkAllValue>
        <div class="action-buttons" slot="check-buttons">
            {#if actions.includes(ACTIONS.REVOKE_ASSERTION)}
                <Button small disabled={selection.length === 0 || serverBusy}
                        action={() => revoke(true)}
                        text={I18n.t('teacher.badgeRevoked.revoke')}/>
            {/if}
            {#if actions.includes(ACTIONS.DELETE_DIRECT_AWARD)}
                <Button small disabled={selection.length === 0 || serverBusy}
                        action={() => doDeleteDirectAwards(true)}
                        text={I18n.t('models.directAwards.delete')}/>
            {/if}
        </div>

        {#each sortedFilteredAssertions.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as assertion}
            <tr>
                {#if actions.length > 0}
                    <td>
                        <CheckBox
                                value={selection.includes(assertion.entityId)}
                                name={`select-${assertion.entityId}`}
                                disabled={isRevoked(assertion) || !badgeclass.permissions.mayAward}
                                onChange={val => onCheckOne(val, assertion.entityId)}/>
                    </td>
                {/if}
                <td class="single-neutral-check">
                    <div class="single-neutral-check">
                        {@html singleNeutralCheck}
                    </div>
                </td>
                <td>
                    <div class="recipient">
                        <span>{constructUserName(assertion)}</span>
                        <span>{constructUserEmail(assertion)}</span>
                        {#if assertion.eppn }
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
                    <span class={assertionStatusClass(assertion)}>{I18n.t(`models.badge.statuses.${assertion.statusDisplay}`)}</span>
                </td>
                <td class="center">
                    {assertion.updatedAt && (!assertion.isDirectAward || assertion.acceptance === "ACCEPTED") ?
                        moment(assertion.updatedAt).format('MMM D, YYYY') : ""}
                </td>
                {#if type === "awarded"}
                    <td class="right">
                        {assertion.expiresAt ? moment(assertion.expiresAt).format('MMM D, YYYY') : ""}
                    </td>
                {:else}
                    <td class="right">
                        {assertion.deleteAt ? moment(assertion.deleteAt).format('MMM D, YYYY') : ""}
                    </td>
                {/if}
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
            disabled={revocationReason.length === 0 || !revocationReasonRequired}>
        {#if revocationReasonRequired}
            <div class="slots">
                <label for="revocation-reason">{revocationReasonLabel}</label>
                <input id="revocation-reason" class="input-field" bind:value={revocationReason }/>
            </div>
        {/if}
    </Modal>
{/if}
