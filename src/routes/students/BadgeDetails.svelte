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
  import moment from "moment";
  import {Modal} from "../../components/forms";
  import DownloadButton from "../../components/DownloadButton.svelte";
  import {acceptAssertion, claimAssertion, deleteAssertion, publicAssertion} from "../../api";
  import {flash} from "../../stores/flash";
  import ToggleSwitch from "../../components/ToggleSwitch.svelte";
  import ShareDialog from "./ShareDialog.svelte";
  import BadgeInstanceEvidence from "../../components/shared/BadgeInstanceEvidence.svelte";
  import CheckBox from "../../components/CheckBox.svelte";
  import {translateProperties} from "../../util/utils";

  export let entityId;

  let badge = {};
  // let validation = {valid: false, messages: [], unloaded: true};

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;
  let showShareFeedback = false;
  let showShareDialog = false;
  let includeEvidence = true;
  let makePublicAction = false;


  const cancel = () => {
    showModal = false;
  }

  const cancelShareDialog = () => {
    showShareDialog = false;
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
    return `${sanitizedName}_edubadge.png`;
  }

  const query = `query ($entityId: String){
    badgeInstance(id: $entityId) {
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
            institution {
              nameDutch,
              nameEnglish,
              entityId
            }
          }
        },
        extensions {
          name,
          originalJson
        },
        alignments {
          targetName,
          targetUrl,
          targetCode,
          targetFramework,
          targetDescription
        },
      }
    }
  }`;

  let loaded;

  const refreshBadgeDetails = () => {
    loaded = false;
    queryData(query, {entityId}).then(res => {
      badge = res.badgeInstance;
      const issuer = badge.badgeclass.issuer;
      translateProperties(issuer);
      translateProperties(issuer.faculty);
      translateProperties(issuer.faculty.institution);

      showModal = false;
      if (!badge.public && badge.acceptance === 'UNACCEPTED') {
        claimAssertion(badge.entityId);
      }
      loaded = true;
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

  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;

    span.icon {
      height: 14px;
      width: 14px;
      margin: auto 4px;
    }

    a {
      color: var(--text-grey-dark);
      text-decoration: underline;
    }

    span.current {
      font-weight: bold;
    }
  }

  div.badge-header {
    background-color: var(--purple-2);
    color: var(--purple);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 60px;

    h1 {
      font-size: 28px;
    }
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

  div.dates {
    display: flex;
    width: 100%;
    align-content: space-between;

    div.issued-on {
      flex-grow: 1;
    }
    div.expires {
      margin-left: auto;
      padding-left: 25px;
      min-width: 30%;
    }

    margin-bottom: 40px;
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

  p.revoked {
    background-color: var(--grey-2);
    border-radius: 8px;
    padding: 12px;
    color: var(--red-strong-dark);
    margin: 30px 0;
    display: inline-block;
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
    <div class="bread-crumb">
      <a use:link href={`/backpack`}>{I18n.t("student.badges")}</a>
      <span class="icon">{@html chevronRightSmall}</span>
      <span class="current">{badge.badgeclass.name}</span>
    </div>
    <div class="badge-header">
      <h1>{badge.badgeclass.name}</h1>
    </div>
    <!--    <BadgeValidation validation={validation} public={badge} name={$userName}/>-->
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
        <p class="revoked">{ I18n.t("student.badgeRevoked")}</p>
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
            <DownloadButton text={I18n.t("models.badge.download")} secondary={true}
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
            <Button text={I18n.t("models.badge.share")} action={copyToClipboard}
                    disabled={!badge.public}/>
          </div>
        </div>
      {/if}
      <div class="dates">
        <div class="issued-on">
          <h3>{I18n.t("models.badge.issuedOn")}</h3>
          <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
        </div>
        <div class="expires">
          <h3>{I18n.t("models.badge.expires")}</h3>
          <span>{badge.expiresAt ? moment(badge.expiresAt).format('MMM D, YYYY') : I18n.t("models.badge.expiresNever")}</span>
        </div>
      </div>

      <BadgeClassDetails badgeclass={badge.badgeclass}/>

      <BadgeInstanceEvidence evidences={badge.evidences} isPrivate={true}/>
    </div>
    {#if !badge.revoked && (!badge.expiresAt && new Date(badge.expiresAt) < new Date())}
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
    cancel={cancelShareDialog}
    publicUrl={publicUrl()}/>
{/if}
