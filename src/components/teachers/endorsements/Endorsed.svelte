<script>
    import I18n from "i18n-js";
    import moment from "moment";
    import {Table} from "../index";
    import {sort, sortType} from "../../../util/sortData";
    import {Button, CheckBox} from "../../index";
    import {flash} from "../../../stores/flash";
    import {searchMultiple} from "../../../util/searchData";
    import {userNameCreatedBy} from "../../../util/users";
    import externalLink from "../../../icons/external-link-alt.svg";
    import {Modal} from "../../forms";
    import Tooltip from "../../Tooltip.svelte";
    import {pageCount} from "../../../util/pagination";
    import {endorsementActions, endorsementStatus} from "../../../util/endorsements";
    import EllipsisText from "../../EllipsisText.svelte";

    export let refresh;
    export let badgeClass = {};

    let selection = [];
    let filteredEndorsed = badgeClass.endorsed;

    //Modal
    let showConfirmationModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let actionName;
    let includeReason;
    let reason = "";

    const refreshEndorsed = () => {
        selection = [];
        refresh();
    };

    const statusEndorsement = () => {
        const endorsement = badgeClass.endorsed.find(e => e.entityId === selection[0]);
        return endorsement ? endorsement.status.toLowerCase() : ""
    }

    const action = (showConfirmation, endorsementAction) => {
        if (showConfirmation) {
            modalAction = () => action(false, endorsementAction);
            modalQuestion = I18n.t(`endorsements.confirmations.${endorsementAction.name}`);
            modalTitle = I18n.t(`endorsements.confirm.${endorsementAction.name}`);
            includeReason = endorsementAction.includeReason;
            actionName = endorsementAction.name;
            reason = "";
            showConfirmationModal = true;
        } else {
            showConfirmationModal = false;
            const endorsement = badgeClass.endorsed.find(e => e.entityId === selection[0]);
            endorsementAction.fn(endorsement, reason).then(() => {
                refresh();
                selection = [];
                reason = "";
                flash.setValue(I18n.t(`endorsements.flash.${endorsementAction.name}`));
            });
        }
    }

    const onCheckOne = (val, entityId) => {
        if (val) {
            selection = [entityId];
        } else {
            selection = [];
        }
    }

    const tableHeaders = [
        {
            name: null,
            width: "70px"
        },
        {
            name: null,
            attribute: "endorsee.image",
            width: "140px"
        },
        {
            name: I18n.t("endorsements.requested"),
            attribute: "createdBy.email",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "15%"
        },
        {
            name: I18n.t("endorsements.endorser"),
            attribute: "endorser",
            width: "20%"
        },
        {
            name: I18n.t("endorsements.claim"),
            attribute: "claim",
            width: "20%"
        },
        {
            name: I18n.t("endorsements.description"),
            attribute: "description",
            width: "20%"
        },
        {
            name: I18n.t("endorsements.status"),
            attribute: "status",
            reverse: false,
            sortType: sortType.ALPHA,
            width: "10%",
        },
        {
            name: I18n.t("endorsements.created"),
            attribute: "createdAt",
            reverse: false,
            sortType: sortType.DATE,
            width: "10%",
            center: true
        },
    ];

    $: table = {
        entity: "endorsement",
        title: `${I18n.t("endorsements.tableTitleEndorsed")}`,
        tableHeaders: tableHeaders,
    };

    let endorsementSearch = "";
    $: searchedEndorsementIds = searchMultiple(filteredEndorsed, endorsementSearch, "entityId", "status", "createdBy.firstName", "createdBy.lastName", "createdBy.email");

    let endorsementSort = tableHeaders[1];

    $: sortedFilteredEndorsed = sort(
        filteredEndorsed.filter(el => searchedEndorsementIds.includes(el.entityId)),
        endorsementSort.attribute,
        endorsementSort.reverse,
        endorsementSort.sortType
    );

    let page = 1;
    $: minimalPage = Math.min(page, Math.ceil(sortedFilteredEndorsed.length / pageCount));

</script>

<style lang="scss">

  .img-container {
    flex-shrink: 0;
    height: 55px;
    width: 55px;
    background: white;
    display: flex;
    justify-content: space-around;
    margin-right: 10px;
  }

  .img-icon {
    height: 50px;
    width: 50px;
    background-color: white;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  div.recipient {
    display: flex;
    flex-direction: column;

    span:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  div.rare-case {
    display: flex;
    margin: 15px 0;

    :global(a:last-child) {
      margin-left: 0!important;
    }
  }

  div.endorser {
    display: flex;
    flex-direction: column;

    span.badgeclass {
      font-weight: bold;
      margin-bottom: 5px;
      display: inline-block;
    }

    :global(a.external-link svg) {
      width: 16px;
      height: auto;
      margin: auto 0 0 8px;
      color: var(--grey-8);
    }

  }

  textarea.input-field {
    height: 50px;
  }

</style>
<Table
        {...table}
        bind:search={endorsementSearch}
        bind:sort={endorsementSort}
        isEmpty={badgeClass.endorsed.length === 0}
        filteredCount={sortedFilteredEndorsed.length}
        page={minimalPage}
        onPageChange={nbr => page = nbr}
        withCheckAll={false}>

    <div class="action-buttons rare-case" slot="check-buttons">
        {#if badgeClass.permissions.mayUpdate}
            <Button small action={() => action(true, endorsementActions.ACCEPT)} marginRight={true}
                    text={I18n.t('endorsements.accept')}
                    disabled={selection.length === 0 || statusEndorsement() !== endorsementStatus.UNACCEPTED}/>
            <Button small secondary action={() => action(true, endorsementActions.REJECT)} marginRight={true}
                    text={I18n.t('endorsements.reject')}
                    disabled={selection.length === 0 || statusEndorsement() !== endorsementStatus.UNACCEPTED}/>
            <Button small secondary action={() => action(true, endorsementActions.REVOKE)} marginRight={true}
                    text={I18n.t('endorsements.revoke')}
                    disabled={selection.length === 0 || statusEndorsement() !== endorsementStatus.ACCEPTED}/>
        {/if}
    </div>

    {#each sortedFilteredEndorsed.slice((minimalPage - 1) * pageCount, minimalPage * pageCount) as endorsement}
        <tr>
            <td class="check">
                <CheckBox
                        value={selection.includes(endorsement.entityId)}
                        name={`select-${endorsement.entityId}`}
                        disabled={!badgeClass.permissions.mayUpdate}
                        onChange={val => onCheckOne(val, endorsement.entityId)}/>
            </td>
            <td class="center">
                <div class="img-container">
                    <div class="img-icon">
                        <img src={endorsement.endorsee.image} alt=""/>
                    </div>
                </div>
            </td>
            <td>
                <div class="recipient">
                    <span>{userNameCreatedBy(endorsement)}</span>
                    <span><a href={`mailto:${endorsement.createdBy.email}`}>{endorsement.createdBy.email}</a></span>
                </div>
            </td>
            <td class="endorser">
                <div class="endorser">
                    <span class="badgeclass">{endorsement.endorsee.name}<a class="external-link" target="_blank"
                                                                           href={`/public/${endorsement.endorsee.entityId}`}>
                        {@html externalLink}
                    </a></span>
                    <span>
                        <a href={`/public/issuers/${endorsement.endorsee.issuer.entityId}`} target="_blank">
                            {endorsement.endorsee.issuer.name}
                        </a>
                        <span>{I18n.t("models.badgeclass.of")}</span>
                        <a href="/public/institutions/{endorsement.endorsee.issuer.faculty.institution.entityId}"
                           target="_blank">
                            {endorsement.endorsee.issuer.faculty.institution.name}
                        </a>
                    </span>
                </div>

            </td>
            <td>
                <EllipsisText text={endorsement.claim} maxLength={40}/>
            </td>
            <td>
                <EllipsisText text={endorsement.description} maxLength={40}/>
            </td>
            <td>
                <span>{I18n.t(`endorsements.statuses.${endorsement.status.toLowerCase()}`)}</span>
                {#if endorsement.status.toLowerCase() === endorsementStatus.REJECTED}
                    <Tooltip tooltipText={endorsement.rejectionReason}/>
                {/if}
                {#if endorsement.status.toLowerCase() === endorsementStatus.REVOKED}
                    <Tooltip tooltipText={endorsement.revocationReason}/>
                {/if}
            </td>
            <td class="center">
                {moment(endorsement.createdAt).format('MMM D, YYYY')}
            </td>
        </tr>
    {/each}
    {#if badgeClass.endorsed.length === 0}
        <tr>
            <td colspan="6">{I18n.t("zeroState.endorsed", {name: badgeClass.name})}</td>
        </tr>
    {/if}
</Table>

{#if showConfirmationModal}
    <Modal
            submit={modalAction}
            cancel={() => showConfirmationModal = false}
            question={modalQuestion}
            title={modalTitle}
            disabled={includeReason && reason.trim().length === 0}>
        {#if includeReason}
            <div class="slots">
                <label for="revocation-reason">{I18n.t(`endorsements.reasons.${actionName}`)}</label>
                <textarea id="revocation-reason" class="input-field" bind:value={reason} rows="4"></textarea>
            </div>
        {/if}
    </Modal>
{/if}
