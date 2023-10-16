<script>
    import I18n from "i18n-js";

    import {onMount} from "svelte";
    import shieldUnlocked from "../../icons/shield-unlock.svg";
    import {link, navigate} from "svelte-routing";
    import chevronRightSmall from "../../icons/chevron-right-small.svg";
    import Button from "../../components/Button.svelte";
    import Spinner from "../../components/Spinner.svelte";
    import BadgeCard from "../../components/shared/BadgeCard.svelte";
    import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
    import {Modal} from "../../components/forms";
    import {deleteImportedAssertion, importedAssertionByEntityId, importedAssertionValidate} from "../../api";
    import {flash} from "../../stores/flash";
    import ShareDialog from "./ShareDialog.svelte";
    import StudentBreadCrumb from "../../components/students/StudentBreadCrumb.svelte";
    import BadgeHeader from "../../components/students/BadgeHeader.svelte";
    import BadgeValidation from "./BadgeValidation.svelte";

    export let entityId;

    let importedBadge = {};
    let loaded;
    let validationLoading = false;

    //Modal
    let showModal = false;
    let modalTitle;
    let modalQuestion;
    let modalAction;
    let showShareDialog = false;
    let validation = null;
    let showShareFeedback = false;

    const cancel = () => {
        showModal = false;
        showShareDialog = false;
    }

    const copiedLink = () => {
        showShareDialog = false;
        showShareFeedback = true;
        setTimeout(() => showShareFeedback = false, 2500)

    }

    const copyToClipboard = () => {
        showShareDialog = true;
    }

    const validate = () => {
        validationLoading = true;
        importedAssertionValidate(entityId).then(res => {
            validation = res;
            validationLoading = false;
        });
    }

    const downloadFileName = badge => {
        const sanitizedName = badge.badgeclass.name.replace(/ /g, "_").toLowerCase();
        const ext = "png";//badge.image.endsWith("svg") ? "svg" : "png";
        return `${sanitizedName}_edubadge.${ext}`;
    }

    const refreshBadgeDetails = () => {
        importedAssertionByEntityId(entityId).then(res => {
            importedBadge = res;
            importedBadge.issuer = res.badgeclass.issuer;
            importedBadge.updatedAt = importedBadge.issuedOn;
            importedBadge.entityId = entityId;
            loaded = true;
        });
    };

    onMount(() => refreshBadgeDetails());

    const deleteBadge = showConfirmation => {
        if (showConfirmation) {
            const model = {name: importedBadge.badgeclass.name};
            modalTitle = I18n.t("importedBadges.details.delete", model);
            modalQuestion = I18n.t("importedBadges.details.deleteConfirmation", model);
            modalAction = () => deleteBadge(false);
            showModal = true;
        } else {
            showModal = false;
            deleteImportedAssertion(entityId)
                .then(() => {
                    flash.setValue(I18n.t("importedBadges.details.flashDeleted", {name: importedBadge.badgeclass.name}));
                    navigate("/import");
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

  @media (max-width: 1120px) {
    .badge-detail {
      padding: 40px 20px !important;
    }
  }

  div.delete {
    display: flex;
    padding: 0 0 44px 0;
    justify-content: center;
  }
</style>

<div class="badge-detail-container">
    {#if loaded}
        <StudentBreadCrumb>
            <a use:link href={`/import`}>{I18n.t("importedBadges.details.import")}</a>
            <span class="icon">{@html chevronRightSmall}</span>
            <span class="current">{importedBadge.badgeclass.name}</span>
        </StudentBreadCrumb>
        <BadgeHeader title={importedBadge.badgeclass.name}/>
        <div class="badge-detail">
            <div class="shield">
                {@html shieldUnlocked}
            </div>
            <div class="badge-card-container">
                <span class="status-indicator revoked">{I18n.t("models.badge.statuses.imported")}</span>
                <BadgeCard badgeClass={importedBadge.badgeclass} standAlone={true} withHeaderData={false}/>
            </div>
            <BadgeValidation badge={importedBadge} validatedName={importedBadge.email} importedBadge={true}/>
            <div class="public-private">
                <div class="header">
                    <h3>{I18n.t("importedBadges.details.imported")}</h3>
                </div>
                <p>{I18n.t("importedBadges.details.publicInfo", {url: new URL(importedBadge.import_url).hostname})}</p>
            </div>
            <div class="actions">
                <div class="button-container">
                    <Button secondary={true} text={I18n.t("models.badge.open")} disabled={!loaded}
                            externalUrl={importedBadge.import_url}/>
                    <!--          <DownloadButton text={I18n.t("models.badge.download")} secondary={true}-->
                    <!--                          filename={downloadFileName(importedBadge)}-->
                    <!--                          disabled={!loaded}-->
                    <!--                          url={importedBadge.import_url}/>-->
                </div>
                <div class="button-container">
                    {#if showShareFeedback}
                        <div class="tooltip">
                            {I18n.t("copyToClipboard.copied")}
                        </div>
                    {/if}
                    <Button text={I18n.t("models.badge.share")} disabled={!loaded} action={copyToClipboard}/>
                </div>
            </div>
            <BadgeClassDetails badgeclass={importedBadge.badgeclass} badge={importedBadge}/>

        </div>
        <div class="delete">
            <Button action={() => deleteBadge(true)} secondary={true} text={I18n.t("importedBadges.details.remove")}/>
        </div>
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

{#if validation}
    <Modal
            hideSubmit={true}
            cancelLabel={I18n.t("importedBadges.details.ok")}
            cancel={() => validation = null}
            question={I18n.t("importedBadges.details.validationResults")}
            title={I18n.t("importedBadges.details.validation")}>
        <div class="validation-results">{JSON.stringify(validation)}</div>
    </Modal>
{/if}

{#if showShareDialog}
    <ShareDialog
            copied={copiedLink}
            cancel={cancel}
            publicUrl={importedBadge.import_url}/>
{/if}
