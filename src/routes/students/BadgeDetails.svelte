<script>
    import I18n from "i18n-js";
    import {userName} from "../../stores/user";

    import {onMount} from "svelte";
    import shieldUnlocked from "../../icons/shield-unlock.svg";
    import shieldLocked from "../../icons/lock-shield.svg";
    import {link} from "svelte-routing";
    import {queryData} from "../../api/graphql";
    import chevronRightSmall from "../../icons/chevron-right-small.svg";
    import Button from "../../components/Button.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
    import {Modal, Select} from "../../components/forms";
    import DownloadButton from "../../components/DownloadButton.svelte";
    import {
        acceptAssertion,
        claimAssertion,
        deleteAssertion,
        editBadgeInstanceCollection, ob3WalletImport,
        publicAssertion
    } from "../../api";
    import {flash} from "../../stores/flash";
    import ToggleSwitch from "../../components/ToggleSwitch.svelte";
    import ShareDialog from "./ShareDialog.svelte";
    import BadgeInstanceEvidence from "../../components/shared/BadgeInstanceEvidence.svelte";
    import CheckBox from "../../components/CheckBox.svelte";
    import {translateProperties} from "../../util/utils";
    import StudentBreadCrumb from "../../components/students/StudentBreadCrumb.svelte";
    import BadgeHeader from "../../components/students/BadgeHeader.svelte";
    import {alignments, endorsements} from "../../api/queries";
    import linkedInEn from "../../img/en_US.png";
    import linkedInNl from "../../img/nl_NL.png";

    export let entityId;

    let badge = {};

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let showShareFeedback = false;
    let showShareDialog = false;
    let includeEvidence = true;
    let makePublicAction = false;

    //Collections
    let badgeInstanceCollections = [];
    let showCollectionsModal = false;
    let selectedCollection = null;

    //ob3
    let showOb3SsiAgentModal = false;
    let qrCode = null;

    const cancel = () => {
        showModal = false;
        showShareDialog = false;
        showCollectionsModal = false;
        showOb3SsiAgentModal = false;
    }

    const copiedLink = () => {
        showShareDialog = false;
        showShareFeedback = true;
        setTimeout(() => showShareFeedback = false, 2500)

    }

    const publicUrl = () => {
        const currentUrl = window.location.href;
        return currentUrl.replace("/details/", "/public/assertions/");
    }

    const copyToClipboard = () => {
        showShareDialog = true;
    }

    const downloadFileName = badge => {
        const sanitizedName = badge.badgeclass.name.replace(/ /g, "_").toLowerCase();
        const ext = badge.image.endsWith("svg") ? "svg" : "png";
        return `${sanitizedName}_edubadge.${ext}`;
    }

    const showCollectionModal = () => {
        showCollectionsModal = true;
    }

    const startOb3SsiAgentImport = () => {
        loaded = false
        ob3WalletImport(badge).then(res => {
            showOb3SsiAgentModal = true
            loaded = true
            qrCode = res.qr_code_base64;
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
        public,
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
      public,
      expiresAt,
      revoked,
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
        criteriaUrl,
        awardNonValidatedNameAllowed,
        criteriaText,
        issuer {
          nameDutch,
          nameEnglish,
          imageDutch,
          imageEnglish,
          entityId,
          faculty {
            nameDutch,
            nameEnglish,
            onBehalfOf,
            onBehalfOfDisplayName,
            onBehalfOfUrl,
            institution {
              nameDutch,
              nameEnglish,
              entityId,
              linkedinOrgIdentifier,
              ob3SsiAgentEnabled
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
    let linkedInUrl;
    let ob3SsiAgentEnabled;

    const refreshBadgeDetails = () => {
        loaded = false;
        queryData(query, {entityId}).then(res => {
            const theBadge = res.badgeInstance;
            if (!theBadge.public && theBadge.acceptance === 'UNACCEPTED') {
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
            linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&` +
                `name=${encodeURIComponent(badge.badgeclass.name)}&` +
                `organizationId=${badge.badgeclass.issuer.faculty.institution.linkedinOrgIdentifier || 206815}&` +
                `issueYear=${issuedOn.getFullYear()}&` +
                `issueMonth=${issuedOn.getMonth()}&` +
                `certUrl=${encodeURIComponent("https://" + window.location.hostname + "/public/assertions/")}${entityId}&` +
                `certId=${entityId}&` +
                `original_referer=${encodeURIComponent("https://" + window.location.hostname)}`;
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

    const makePublic = (showConfirmation, isPublic) => {
        makePublicAction = isPublic;
        if (showConfirmation) {
            modalTitle = isPublic ? I18n.t("student.confirmation.publish") : I18n.t("student.confirmation.private");
            modalQuestion = isPublic ? I18n.t("student.confirmation.publishConfirmation", {name: $userName}) : I18n.t("student.confirmation.privateConfirmation");
            modalAction = () => makePublic(false, isPublic);
            showModal = true;

        } else {
            showModal = false;
            publicAssertion(badge.entityId, isPublic, includeEvidence)
                .then(() => {
                    flash.setValue(isPublic ? I18n.t("student.flash.published") : I18n.t("student.flash.private"));
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

  div.public-private {
    background-color: var(--grey-3);
    border-radius: 8px;
    padding: 12px;

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .switch-container {
        margin-left: auto;
      }
    }
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

  img.linkedin {
    width: auto;
    height: 41px;

    &.disabled {
      opacity: .2;
      cursor: not-allowed;
    }
  }

 .qr-code-container img {
        width: 225px;
        height: auto;
        margin-left: 122px;
        margin-top: 20px;
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
            <div class="shield">
                {#if badge.public}
                    {@html shieldUnlocked}
                {:else}
                    {@html shieldLocked}
                {/if}
            </div>
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
                <div class="public-private">
                    <div class="header">
                        <h3>{I18n.t("student.privateBadge")}</h3>
                        <div class="switch-container">
                            <ToggleSwitch disabled={badge && badge.acceptance === "REJECTED"}
                                          value={!badge.public} onChange={val => makePublic(true, !val)}/>
                        </div>
                    </div>

                    <p>{I18n.t(badge.public ? "student.publicPrivatePublic" : "student.publicPrivate")}</p>
                    {#if badge && badge.acceptance === "REJECTED"}
                        <p class="rejected">{I18n.t("student.publicPrivateRejected")}</p>
                    {/if}

                </div>
                <div class="actions">
                    <div class="button-container">
                        <Button text={I18n.t("models.badge.addToCollection")}
                                secondary={true}
                                disabled={badgeInstanceCollections.length === 0}
                                action={showCollectionModal}/>
                    </div>
                    <div class="button-container">
                        <DownloadButton text={I18n.t("models.badge.download")}
                                        secondary={true}
                                        filename={downloadFileName(badge)}
                                        disabled={badge && (badge.acceptance === "REJECTED" || !badge.public)}
                                        url={badge.image}/>
                    </div>
                    <div class="button-container">
                        {#if showShareFeedback}
                            <div class="tooltip">
                                {I18n.t("copyToClipboard.copied")}
                            </div>
                        {/if}
                        <Button text={I18n.t("models.badge.share")}
                                action={copyToClipboard}
                                disabled={!badge.public}/>
                    </div>
                    <div class="button-container">
                        {#if ob3SsiAgentEnabled}
                            <Button text={I18n.t("models.badge.ob3SsiAgent")}
                                    action={startOb3SsiAgentImport}/>
                        {/if}
                    </div>
                    <div class="button-container">
                        {#if badge.public}
                            <a href={linkedInUrl} target="_blank">
                                <img class="linkedin" src={I18n.locale === "nl" ? linkedInNl:linkedInEn}
                                     alt="LinkedIn Add to Profile button"/>
                            </a>
                        {:else}
                            <img class="linkedin disabled" src={I18n.locale === "nl" ? linkedInNl:linkedInEn}
                                 alt="LinkedIn Add to Profile button"/>
                        {/if}
                    </div>
                </div>
            {/if}
            <BadgeClassDetails badgeclass={badge.badgeclass} badge={badge}/>

            <BadgeInstanceEvidence evidences={badge.evidences} isPrivate={true}/>
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
        {#if makePublicAction && (badge.evidences || []).length > 0}
            <div class="evidence-question">
                <CheckBox value={includeEvidence} label={I18n.t("student.confirmation.publishEvidenceConfirmation")}
                          onChange={e => includeEvidence = !includeEvidence} inForm={true} adjustTop={true}/>
            </div>
        {/if}
    </Modal>
{/if}

{#if showShareDialog}
    <ShareDialog
            copied={copiedLink}
            cancel={cancel}
            publicUrl={publicUrl()}/>
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

{#if showOb3SsiAgentModal}
    <Modal
            submit={() => showOb3SsiAgentModal = false}
            question={I18n.t("models.badge.ob3SsiAgentQRCodeQuestion")}
            title={I18n.t("models.badge.ob3SsiAgentQRCode")}
            submitLabel={I18n.t("error.close")}>
            <div class="qr-code-container">
                    <img alt="QR code" src={`data:image/png;base64,${qrCode}`}/>
            </div>
    </Modal>
{/if}
