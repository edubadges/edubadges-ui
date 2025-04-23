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
    } from "../../stores/filterUnclaimedDirectAwards"
    import {sort, sortType} from "../../util/sortData";
    import {Button, CheckBox} from "../../components";
    import {resendDirectAwards, deleteDirectAwards} from "../../api";
    import {flash} from "../../stores/flash";
    import singleNeutralCheck from "../../icons/single-neutral-check.svg";
    import {Modal} from "../forms";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";
    import {pageCount} from "../../util/pagination";
    import {translateProperties} from "../../util/utils";
    import {isEmpty} from "../../util/utils";
    import UnclaimedDirectAwardsSideBar from "./UnclaimedDirectAwardsSideBar.svelte";

    export let allUnclaimed = true;

    let selection = [];
    let checkAllValue = false;
    let loaded = false;

    //Modal
    let showModal = false;
    let showResendModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let revocationReason = "";

    const query = `query {
    ${allUnclaimed ? "allUnclaimedDirectAwards" : "allDeletedDirectAwards"} {
      entityId,
      eppn,
      createdAt,
      resendAt,
      deleteAt,
      status,
      recipientEmail,
      badgeclass {
        name,
        entityId,
        issuer {
            nameDutch,
            nameEnglish,
            entityId
            faculty {
                nameDutch,
                nameEnglish,
                entityId
            }
        }
      }
    }
  }`;

    const loadDirectAwards = () => {
        selection = [];
        checkAllValue = false;
        $search = "";
        $facultySelected = [];
        $issuerSelected = [];
        $badgeClassSelected = [];

        queryData(query).then(res => {
            const attr =  allUnclaimed? "allUnclaimedDirectAwards" : "allDeletedDirectAwards";
            res[attr].forEach(da => {
                translateProperties(da.badgeclass.issuer);
                translateProperties(da.badgeclass.issuer.faculty);
            });
            $directAwards = res[attr];
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
                    flash.setValue(I18n.t("models.directAwards.flash.deleted"));
                    revocationReason = "";
                });
        }
    }

    const resend = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.directAwards.confirmation.resend");
            modalQuestion = I18n.t("models.directAwards.confirmation.resendConfirmation");
            modalAction = () => resend(false);
            showResendModal = true;
        } else {
            showResendModal = false;
            loaded = false;
            resendDirectAwards(selection)
                .then(() => {
                    loadDirectAwards();
                    flash.setValue(I18n.t("models.directAwards.flash.resend"));
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
            width: "30%"
        },
        {
            name: I18n.t("models.directAwards.badgeClass"),
            attribute: "badgeclass.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwards.issuer"),
            attribute: "badgeclass.issuer.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwards.faculty"),
            attribute: "badgeclass.issuer.faculty.name",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("models.directAwards.createdAt"),
            attribute: "createdAt",
            reverse: false,
            sortType: sortType.DATE,
            width: "10%",
            center: true
        },
        {
            name: I18n.t(`models.${allUnclaimed ? "directAwards.resendAt" : "badge.deleted"}`),
            attribute: allUnclaimed ? "resendAt" : "deleteAt",
            reverse: false,
            sortType: sortType.DATE,
            width: "10%",
            center: true
        },
        {
            name: I18n.t("models.directAwards.expirationDate"),
            attribute: "expirationDate",
            reverse: false,
            sortType: sortType.DATE,
            width: "10%",
            center: true
        }
    ];

    $: table = {
        entity: "directAwards",
        title: I18n.t(`models.directAwards.${allUnclaimed ? "title": "titleDeleted"}`),
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
        <UnclaimedDirectAwardsSideBar/>
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
                    <Button small action={() => resend(true)}
                            text={I18n.t('models.directAwards.resend')}
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
                           href={`/badgeclass/${directAward.badgeclass.entityId}/awarded`}>
                            {directAward.badgeclass.name}
                        </a>
                    </td>
                    <td>
                        <a use:link
                           href={`/manage/issuer/${directAward.badgeclass.issuer.entityId}/badgeclasses`}>
                            {directAward.badgeclass.issuer.name}
                        </a>
                    </td>
                    <td>
                        <a use:link
                           href={`/manage/faculty/${directAward.badgeclass.issuer.faculty.entityId}/issuers`}>
                            {directAward.badgeclass.issuer.faculty.name}
                        </a>
                    </td>
                    <td class="center">
                        {moment(directAward.createdAt).format('MMM D, YYYY')}
                    </td>
                    {#if allUnclaimed}
                        <td class="center">
                            {directAward.resendAt ? moment(directAward.resendAt).format('MMM D, YYYY') : "-"}
                        </td>
                    {:else}
                        <td class="center">
                            {directAward.deleteAt ? moment(directAward.deleteAt).format('MMM D, YYYY') : "-"}
                        </td>
                    {/if}
                     <td class="center">
                        {directAward.expirationDate ? moment(directAward.expirationDate).format('MMM D, YYYY') : "-"}
                    </td>
                </tr>
            {/each}
            {#if $tree.directAwards.length === 0}
                <tr>
                    <td colspan="6">{I18n.t("models.directAwards.zeroState")}</td>
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

{#if showResendModal}
    <Modal
            submit={modalAction}
            cancel={() => showResendModal = false}
            evaluateQuestion={true}
            question={modalQuestion}
            title={modalTitle}>
    </Modal>
{/if}

