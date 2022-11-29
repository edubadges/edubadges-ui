<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {link} from "svelte-routing";
    import {Table} from "../teachers";
    import {sort, sortType} from "../../util/sortData";
    import {Button, CheckBox} from "../../components";
    import {awardBadges, denyBadge, revokeAssertions, revokeDirectAwards} from "../../api";
    import {flash} from "../../stores/flash";
    import {searchMultiple} from "../../util/searchData";
    import singleNeutralCheck from "../../icons/single-neutral-check.svg";
    import {constructUserName} from "../../util/users";
    import {Modal} from "../forms";
    import filter from "../../icons/filter-1.svg";
    import AwardBadgeModal from "./award/AwardBadgeModal.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";
    import {pageCount} from "../../util/pagination";
    import {translateProperties} from "../../util/utils";
    import {isEmpty} from "lodash";

    let directAwards = [];
    let selection = [];
    let filteredDirectAwards = [];
    let checkAllValue = false;
    let loaded = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let revocationReason = "";

    const query = `query {
    allDirectAwards {
      entityId,
      eppn,
      createdAt,
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
        queryData(query).then(res => {
            res.allDirectAwards.forEach(da => {
                translateProperties(da.badgeclass.issuer);
                translateProperties(da.badgeclass.issuer.faculty);
            });
            directAwards = res.allDirectAwards;
            filteredDirectAwards = directAwards;
            loaded = true;
        })
    }

    onMount(loadDirectAwards)

    const revoke = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("models.directAwards.confirmation.revoke");
            modalQuestion = I18n.t("models.directAwards.confirmation.revokeConfirmation");
            modalAction = () => revoke(false);
            showModal = true;
        } else {
            showModal = false;
            loaded = false;
            revokeDirectAwards(selection, revocationReason)
                .then(() => {
                    loadDirectAwards();
                    flash.setValue(I18n.t("models.directAwards.flash.revoked"));
                    revocationReason = "";
                });
        }
    }

    const findDirectAward = entityId => directAwards.find(e => e.entityId === entityId);

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
            selection = directAwards.map(e => e.entityId);
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
            width: "15%"
        },
        {
            name: I18n.t("models.directAwards.eppn"),
            attribute: "eppn",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
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
            sortType: sortType.ALPHA,
            width: "15%",
            center: true
        }
    ];

    $: table = {
        entity: "directAwards",
        title: `${I18n.t("models.directAwards.title")}`,
        tableHeaders: tableHeaders
    };

    let directAwardSearch = "";
    $: searchedDirectAwardsIds = searchMultiple(filteredDirectAwards, directAwardSearch, "entityId",
        "eppn", "recipientEmail", "badgeclass.name", "badgeclass.issuer.name", "badgeclass.issuer.faculty.name");

    let directAwardSort = tableHeaders[1];

    $: sortedFilteredDirectAwards = sort(
        filteredDirectAwards.filter(el => searchedDirectAwardsIds.includes(el.entityId)),
        directAwardSort.attribute,
        directAwardSort.reverse,
        directAwardSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredDirectAwards.length / pageCount));

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

  td.evidenceNarrativeRequired ul {
    list-style: circle;

    li {
      margin-left: 20px;
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
    <Table
            {...table}
            bind:search={directAwardSearch}
            bind:sort={directAwardSort}
            isEmpty={directAwards.length === 0}
            filteredCount={sortedFilteredDirectAwards.length}
            page={minimalPage}
            onPageChange={nbr => page = nbr}
            withCheckAll={true}
            checkAllDisabled={directAwards.every(e => e.evidenceNarrativeRequired)}
            {onCheckAll}
            bind:checkAllValue>
        <div class="action-buttons" slot="check-buttons">
            <Button small action={() => revoke(true)}
                    text={I18n.t('models.directAwards.revoke')} disabled={selection.length === 0} secondary={true}/>
        </div>
        {#each sortedFilteredDirectAwards.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as directAward}
            <tr>
                <td>
                    <CheckBox
                            value={selection.includes(directAward.entityId)}
                            name={`select-${directAward.entityId}`}
                            onChange={val => onCheckOne(val, directAward.entityId)}/>
                </td>
                <td class="single-neutral-check">
                    <div class="single-neutral-check">
                        {@html singleNeutralCheck}
                    </div>
                </td>
                <td>
                    <div class="recipient">
                        <span>{directAward.recipientEmail}</span>
                    </div>
                </td>
                <td>
                    <div class="eppn">
                        <span>{directAward.eppn}</span>
                    </div>
                </td>
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
            </tr>
        {/each}
        {#if directAwards.length === 0}
            <tr>
                <td colspan="6">{I18n.t("models.directAwards.zeroState")}</td>
            </tr>
        {/if}
    </Table>
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
            <label for="revocation-reason">{I18n.t("models.directAwards.confirmation.revocationReason")}</label>
            <input id="revocation-reason" class="input-field" bind:value={revocationReason}/>
        </div>
    </Modal>
{/if}
