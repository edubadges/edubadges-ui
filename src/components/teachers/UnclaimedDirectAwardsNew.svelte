<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {link} from "svelte-routing";
    import {Table} from "../teachers";
    import {
        badgeClassSelected,
        directAwards,
        facultySelected,
        issuerSelected,
        search,
        tree
    } from "../../stores/filterUnclaimedDirectAwardsNew"
    import {sort, sortType} from "../../util/sortData";
    import {Button, CheckBox} from "../../components";
    import {deleteDirectAwards, fetchRawDirectAwards} from "../../api";
    import {flash} from "../../stores/flash";
    import singleNeutralCheck from "../../icons/single-neutral-check.svg";
    import {Modal} from "../forms";
    import {onMount} from "svelte";
    import Spinner from "../Spinner.svelte";
    import {pageCount} from "../../util/pagination";
    import {isEmpty, translatePropertiesRawQueries} from "../../util/utils";
    import UnclaimedDirectAwardsSideBarNew from "./UnclaimedDirectAwardsSideBarNew.svelte";

    export let allUnclaimed = true;

    let selection = [];
    let checkAllValue = false;
    let loaded = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let revocationReason = "";


    const loadDirectAwards = () => {
        selection = [];
        checkAllValue = false;
        $search = "";
        $facultySelected = [];
        $issuerSelected = [];
        $badgeClassSelected = [];
        fetchRawDirectAwards(allUnclaimed ? "unclaimed" : "deleted").then(res => {
            res.forEach(obj => {
                translatePropertiesRawQueries(obj);
                obj.created_at_millis = new Date(obj.created_at).getTime();
                obj.resend_at_millis = new Date(obj.resend_at).getTime();
                obj.delete_at_millis = new Date(obj.delete_at).getTime();
            });
            $directAwards = res;
            loaded = true;

        })
    }

    onMount(loadDirectAwards)

    const doDeleteDirectAwards = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.directAwards.confirmation.delete");
            modalQuestion = I18n.t("models.directAwards.confirmation.deleteConfirmation");
            modalAction = () => doDeleteDirectAwards(false);
            showModal = true;
        } else {
            showModal = false;
            loaded = false;
            deleteDirectAwards(selection, revocationReason)
                .then(() => {
                    loadDirectAwards();
                    selection = [];
                    checkAllValue = false;
                    flash.setValue(I18n.t("models.directAwards.flash.deleted"));
                    revocationReason = "";
                });
        }
    }

    const onCheckOne = (val, entityId) => {
        if (val) {
            selection = [...selection, entityId];
        } else {
            selection = selection.filter(id => id !== entityId);
            table.checkAllValue = false;
        }
    }

    const onCheckAll = val => {
        table.checkAllValue = val;
        if (val) {
            selection = sortedFilteredDirectAwards.map(e => e.entityId);
        } else {
            selection = [];
        }
    }

    const tableHeaders = [
        {
            name: null,
        },
        {
            name: I18n.t("models.directAwards.recipient"),
            attribute: "recipientEmail",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "25%"
        },
        {
            name: I18n.t("models.directAwards.badgeClass"),
            attribute: "name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwards.issuer"),
            attribute: "i_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "12%"
        },
        {
            name: I18n.t("models.directAwards.faculty"),
            attribute: "f_name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "12%"
        },
        {
            name: I18n.t("models.directAwards.createdAt"),
            attribute: "created_at_millis",
            reverse: false,
            sortType: sortType.NUMERIC,
            width: "9%",
            center: true
        },
        allUnclaimed ? null :
        {
            name: I18n.t("models.badge.deleted"),
            attribute: "delete_at_millis",
            reverse: false,
            sortType: sortType.DATE,
            width: "9%",
            center: true
        },
        {
            name: I18n.t("models.directAwards.expirationDate"),
            attribute: "expiration_date",
            reverse: false,
            sortType: sortType.DATE,
            width: "9%",
            center: true
        }
    ].filter(header => header !== null);

    $: table = {
        entity: "directAwards",
        title: I18n.t(`models.directAwards.${allUnclaimed ? "title" : "titleDeleted"}`),
        tableHeaders: tableHeaders
    };

    let directAwardSort = tableHeaders[1];

    $: sortedFilteredDirectAwards = sort(
        $tree.directAwards,
        directAwardSort.attribute,
        directAwardSort.reverse,
        directAwardSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredDirectAwards.length / pageCount));

</script>

<style lang="scss">

    div.unclaimed-direct-awards {
        display: flex;
    }

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
{#if loaded}
    <div class="unclaimed-direct-awards">
        <UnclaimedDirectAwardsSideBarNew/>
        <Table
                {...table}
                bind:search={$search}
                bind:sort={directAwardSort}
                isEmpty={$tree.directAwards.length === 0}
                filteredCount={sortedFilteredDirectAwards.length}
                page={minimalPage}
                onPageChange={nbr => page = nbr}
                withCheckAll={allUnclaimed}
                checkAllDisabled={$tree.directAwards.every(e => e.evidenceNarrativeRequired)}
                {onCheckAll}
                full={true}
                bind:checkAllValue>
            <div class="action-buttons" slot="check-buttons">
                {#if allUnclaimed}
                    <Button small action={() => doDeleteDirectAwards(true)}
                            text={I18n.t('models.directAwards.delete')}
                            disabled={selection.length === 0}
                            secondary={true}/>
                {/if}
            </div>
            {#each sortedFilteredDirectAwards.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as directAward}
                <tr>
                    {#if allUnclaimed}
                        <td>
                            <CheckBox
                                    value={selection.includes(directAward.entityId)}
                                    name={`select-${directAward.entityId}`}
                                    onChange={val => onCheckOne(val, directAward.entityId)}/>
                        </td>
                    {/if}
                    <td class="single-neutral-check">
                        <div class="single-neutral-check">
                            {@html singleNeutralCheck}
                        </div>
                    </td>
                    <td>
                        <div class="recipient">
                            <span>{directAward.recipientEmail}</span>
                            <span>{directAward.eppn} <em>(eppn)</em></span>
                        </div>
                    <td>
                        <a use:link
                           href={`/badgeclass/${directAward.bc_entity_id}/awarded`}>
                            {directAward.name}
                        </a>
                    </td>
                    <td>
                        <a use:link
                           href={`/manage/issuer/${directAward.i_entity_id}/badgeclasses`}>
                            {directAward.i_name}
                        </a>
                    </td>
                    <td>
                        <a use:link
                           href={`/manage/faculty/${directAward.f_entity_id}/issuers`}>
                            {directAward.f_name}
                        </a>
                    </td>
                    <td class="center">
                        {moment(directAward.created_at_millis).format('MMM D, YYYY')}
                    </td>
                    {#if !allUnclaimed}
                        <td class="center">
                            {directAward.delete_at ? moment(directAward.delete_at_millis).format('MMM D, YYYY') : "-"}
                        </td>
                    {/if}
                    <td class="center">
                        {directAward.expiration_date ? moment(directAward.expiration_date).format('MMM D, YYYY') : "-"}
                    </td>

                </tr>
            {/each}
            {#if $tree.directAwards.length === 0}
                <tr>
                    <td colspan="6">{I18n.t(`models.directAwards.zeroState${allUnclaimed ? "" : "Deleted"}`)}</td>
                </tr>
            {/if}
        </Table>
    </div>
{:else}
    <Spinner/>
{/if}

{#if showModal}
    <Modal
            submit={modalAction}
            cancel={() => showModal = false}
            evaluateQuestion={true}
            question={modalQuestion}
            disabled={isEmpty(revocationReason)}
            title={modalTitle}>
        <div class="slots">
            <label for="revocation-reason">{I18n.t("models.directAwards.confirmation.deletionReason")}</label>
            <input id="revocation-reason" class="input-field" bind:value={revocationReason}/>
        </div>
    </Modal>
{/if}

