<script>
    import I18n from "i18n-js";

    import {onMount} from "svelte";
    import {link} from "svelte-routing";
    import {queryData} from "../../api/graphql";
    import Button from "../../components/Button.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
    import {Modal, Select} from "../../components/forms";
    import SsiAgentModal from "../../components/students/SsiAgentModal.svelte";
    import {
        acceptAssertion,
        claimAssertion,
        deleteAssertion,
        editBadgeInstanceCollection,
        ob3WalletImport
    } from "../../api";
    import {flash} from "../../stores/flash";
    import BadgeInstanceEvidence from "../../components/shared/BadgeInstanceEvidence.svelte";
    import {translateProperties} from "../../util/utils";
    import StudentBreadCrumb from "../../components/students/StudentBreadCrumb.svelte";
    import BadgeHeader from "../../components/students/BadgeHeader.svelte";
    import {alignments, endorsements} from "../../api/queries";

    import chevronRightSmall from "../../icons/chevron-right-small.svg";
    import { walletIcon } from "../../icons";

    export let entityId;

    let badge = {};

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let includeEvidence = true;
    let includeGradeAchieved = true;

    //Collections
    let badgeInstanceCollections = [];
    let showCollectionsModal = false;
    let selectedCollection = null;

    //ob3
    let showOb3SsiAgentModal = false;
    let ssiAgentOffer = null;
    let ssiAgentName = "";

    const cancel = () => {
        showModal = false;
        showCollectionsModal = false;
        showOb3SsiAgentModal = false;
    }

    const showCollectionModal = () => {
        showCollectionsModal = true;
    }

    const startOb3SsiAgentImport = () => {
        loaded = false
        ob3WalletImport(badge).then(res => {
            showOb3SsiAgentModal = true;
            loaded = true;
            ssiAgentOffer = res.offer;
        })
    }

    const addToCollection = () => {
        showCollectionsModal = false;
        if (selectedCollection !== null) {
            const collection = badgeInstanceCollections.find(c => c.entityId === selectedCollection.entityId);
            const newCollection = {
                public: collection.public,
                name: collection.name,
                description: collection.description,
                badge_instances: collection.badgeInstances.map(bi => bi.id).concat(badge.id),
                entity_id: collection.entityId
            }
            editBadgeInstanceCollection(newCollection).then(() => {
                flash.setValue(I18n.t("student.collections.flash", {
                    name: badge.badgeclass.name,
                    col: collection.name
                }));
                selectedCollection = null;
                queryData(badgeInstanceCollectionsQuery).then(res => {
                    badgeInstanceCollections = res.badgeInstanceCollections.filter(coll => !coll.badgeInstances.find(b => b.id === badge.id));
                });
            });
        }
    }

    const badgeInstanceCollectionsQuery = `query {
      badgeInstanceCollections {
        entityId,
        name,
        description,
        createdAt,
        badgeInstances {
          id
        }
      }
    }`

    const query = `query ($entityId: String){
    badgeInstance(id: $entityId) {
      id,
      image,
      entityId,
      issuedOn,
      createdAt,
      acceptance,
      expiresAt,
      revoked,
      gradeAchieved,
      revocationReason,
      evidences {
        evidenceUrl,
        narrative,
        name,
        description
      },
      badgeclass {
        name,
        image,
        description,
        entityId,
        awardNonValidatedNameAllowed,
        criteriaText,
        participation,
        typeBadgeClass,
        assessmentType,
        assessmentIdVerified,
        assessmentSupervised,
        qualityAssuranceName,
        qualityAssuranceUrl,
        qualityAssuranceDescription,
        gradeAchievedRequired,
        eqfNlqfLevelVerified,
        stackable,
        issuer {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          entityId,
          faculty {
            nameDutch,
            nameEnglish,
            imageDutch,
            imageEnglish,
            onBehalfOf,
            onBehalfOfDisplayName,
            onBehalfOfUrl,
            institution {
              nameDutch,
              nameEnglish,
              entityId,
              ob3SsiAgentEnabled,
              imageDutch,
              imageEnglish
            }
          }
        },
        extensions {
          name,
          originalJson
        },
      ${alignments},
      ${endorsements}
      }
    }
  }`;

    let loaded;
    let ob3SsiAgentEnabled;

    const refreshBadgeDetails = () => {
        loaded = false;
        queryData(query, {entityId}).then(res => {
            const theBadge = res.badgeInstance;
            if (theBadge.acceptance === 'UNACCEPTED') {
                claimAssertion(theBadge.entityId);
                theBadge.acceptance = "ACCEPTED";
            }

            const issuer = theBadge.badgeclass.issuer;
            translateProperties(issuer);
            translateProperties(issuer.faculty);
            translateProperties(issuer.faculty.institution);

            badge = theBadge;

            showModal = false;
            const issuedOn = new Date(badge.issuedOn);
            ob3SsiAgentEnabled = badge.badgeclass.issuer.faculty.institution.ob3SsiAgentEnabled
            loaded = true;

            queryData(badgeInstanceCollectionsQuery).then(res => {
                badgeInstanceCollections = res.badgeInstanceCollections.filter(coll => !coll.badgeInstances.find(b => b.id === badge.id));
            });
        });
    }

    onMount(() => {
        refreshBadgeDetails();
    });

    const rejectBadge = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("student.deleteBadge");
            modalQuestion = I18n.t("student.confirmation.deleteBadgeConfirmation");
            modalAction = () => rejectBadge(false);
            showModal = true;
        } else {
            showModal = false;
            deleteAssertion(badge.entityId)
                .then(() => {
                    flash.setValue(I18n.t("student.flash.deleted"));
                    refreshBadgeDetails();
                });
        }
    }

    const acceptBadge = showConfirmation => {
        if (showConfirmation) {
            modalTitle = I18n.t("student.acceptBadge");
            modalQuestion = I18n.t("student.confirmation.acceptBadgeConfirmation");
            modalAction = () => acceptBadge(false);
            showModal = true;
        } else {
            showModal = false;
            acceptAssertion(badge.entityId)
                .then(() => {
                    flash.setValue(I18n.t("student.flash.accepted"));
                    refreshBadgeDetails();
                });
        }
    }
</script>

<style lang="scss">
    div.badge-detail-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    div.badge-detail {
        padding: 20px 40px 10px 40px;
        position: relative;

        div.shield {
            position: absolute;
            right: 45px;
        }
    }

    span.status-indicator {
        display: inline-block;
        position: absolute;
        border-radius: 14px;
        box-shadow: 0 1px 0 1px var(--grey-4);
        font-weight: bold;
        font-size: 14px;
        padding: 4px 8px;
        text-align: center;
        left: 30px;
        top: -14px;
        background-color: var(--red-dark);
        color: white;
        max-width: 85px;
        z-index: 9;
    }

    span.status-indicator.rejected {
        background-color: var(--red-dark);
        color: white;
    }

    span.status-indicator.revoked {
        background-color: var(--red-strong-dark);
    }

    div.badge-card-container {
        display: flex;
        max-width: 320px;
        margin: 0 auto 40px auto;
        position: relative;
    }

    div.actions {
        margin: 25px 0;
        display: flex;
        justify-content: center;

        .button-container {
            margin-left: 25px;
            display: flex;
            position: relative;
        }
        .button-container.vertical {
            flex-direction: column;
            row-gap: 8px;
        }

        div.tooltip {
            z-index: 9;
            position: absolute;
            border-radius: 4px;
            padding: 4px 8px;
            right: 22px;
            top: 120%;
            left: 40%;
            width: 134px;
            background-color: var(--grey-3);
            font-size: 13px;

            &::after {
                content: " ";
                position: absolute;
                top: -15px;
                left: 50%;
                margin-left: -5px;
                border-width: 8px;
                border-style: solid;
                border-color: transparent transparent var(--grey-3) transparent;
            }
        }

    }

    @media (max-width: 600px) {
        div.actions {
            flex-direction: column;
            align-items: flex-start;

            .button-container {
                margin-left: 0;
                margin-top: 15px;
                display: flex;
            }

        }
    }

    h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
    }

    p.rejected {
        margin-top: 15px;
    }

    div.revocation {
        display: flex;
        flex-direction: column;
        margin: 30px 0;
    }

    span.revocation-reason {
        font-style: italic;
    }

    p.revoked {
        background-color: var(--grey-2);
        border-radius: 8px;
        padding: 12px;
        color: var(--red-strong-dark);
        margin-bottom: 5px;

        &:last-child {
            margin-bottom: 0;
        }

        display: inline-block;
    }

    @media (max-width: 1120px) {
        .badge-detail {
            padding: 40px 20px !important;
        }
    }

    div.delete {
        display: flex;
        margin: 25px 0;
        justify-content: center;
    }
</style>

<div class="badge-detail-container">
    {#if loaded}
        <StudentBreadCrumb>
            <a use:link href={`/backpack`}>{I18n.t("student.badges")}</a>
            <span class="icon">{@html chevronRightSmall}</span>
            <span class="current">{badge.badgeclass.name}</span>
        </StudentBreadCrumb>
        <BadgeHeader title={badge.badgeclass.name}/>
        <div class="badge-detail">
            <div class="badge-card-container">
                {#if badge && badge.revoked}
                    <span class="status-indicator revoked">{I18n.t("models.badge.statuses.revoked")}</span>
                {:else if badge && badge.acceptance === "REJECTED"}
                    <span class="status-indicator rejected">{I18n.t("models.badge.statuses.rejected")}</span>
                {:else if badge && badge.expiresAt && new Date(badge.expiresAt) < new Date()}
                    <span class="status-indicator expired">{I18n.t("models.badge.statuses.expired")}</span>
                {/if}
                <BadgeCard badgeClass={badge.badgeclass} standAlone={true} withHeaderData={false}/>
            </div>
            {#if badge.revoked}
                <div class="revocation">
                    <p class="revoked">{ I18n.t("student.badgeRevoked")}</p>
                    <p class="revoked">{ I18n.t("student.revocationReason")} <span
                            class="revocation-reason">{badge.revocationReason}</span></p>
                </div>
            {:else if badge && badge.expiresAt && new Date(badge.expiresAt) < new Date()}
                <p class="revoked">{ I18n.t("student.badgeExpired")}</p>
            {:else}
                <div class="actions">
                    <div class="button-container">
                        <Button text={I18n.t("models.badge.addToCollection")}
                                secondary={true}
                                disabled={badgeInstanceCollections.length === 0}
                                action={showCollectionModal}/>
                    </div>
                    <div class="button-container vertical">
                        {#if ob3SsiAgentEnabled}
                            <Button text={I18n.t("models.badge.ob3SsiAgent")}
                                    icon={walletIcon}
                                    action={startOb3SsiAgentImport}/>
                        {/if}
                    </div>
                </div>
            {/if}
            <BadgeClassDetails badgeclass={badge.badgeclass} badge={badge}/>

            <BadgeInstanceEvidence evidences={badge.evidences}/>
        </div>
        {#if !badge.revoked && (!badge.expiresAt || new Date(badge.expiresAt) > new Date())}
            <div class="delete">
                {#if badge && badge.acceptance === "ACCEPTED"}
                    <Button action={() => rejectBadge(true)} secondary={true} text={I18n.t("student.deleteBadge")}/>
                {:else}
                    <Button action={() => acceptBadge(true)} secondary={true} text={I18n.t("student.acceptBadge")}/>
                {/if}
            </div>
        {/if}
    {:else}
        <Spinner/>
    {/if}

</div>

{#if showModal}
    <Modal
            submit={modalAction}
            cancel={cancel}
            question={modalQuestion}
            evaluateQuestion={true}
            title={modalTitle}>
</Modal>
{/if}

{#if showCollectionsModal}
    <Modal
            submit={addToCollection}
            cancel={cancel}
            disabled={selectedCollection === null}
            question={I18n.t("student.collections.question")}
            title={I18n.t("student.collections.title")}>
        <div class="select-collection">
            <Select
                    placeholder={I18n.t("student.collections.placeholder")}
                    bind:value={selectedCollection}
                    items={badgeInstanceCollections.map(coll => ({name: coll.name, entityId: coll.entityId}))}
                    clearable={false}/>
        </div>
    </Modal>
{/if}

<SsiAgentModal
   submit={() => showOb3SsiAgentModal = false}
   showModal={showOb3SsiAgentModal}
   walletName={ssiAgentName}
   offer={ssiAgentOffer}>
</SsiAgentModal>
