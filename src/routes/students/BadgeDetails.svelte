<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import shieldUnlocked from "../../icons/shield-unlock.svg";
  import shieldLocked from "../../icons/lock-shield.svg";
  import {link} from "svelte-routing";
  import {queryData} from "../../api/graphql";
  import {isEmpty} from "lodash";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import Button from "../../components/Button.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
  import moment from "moment";
  import Modal from "../../components/forms/Modal.svelte";
  import DownloadButton from "../../components/DownloadButton.svelte";
  import {revokeAssertion, publicAssertion, deleteAssertion, validateBadge, claimAssertion} from "../../api";
  import {flash} from "../../stores/flash";
  import CopyToClipboardButton from "../../components/CopyToClipboardButton.svelte";
  import BadgeValidation from "./BadgeValidation.svelte";
  import ToggleSwitch from "../../components/ToggleSwitch.svelte";
  import copy from 'copy-to-clipboard';

  export let entityId;

  let badge = {};

  let fetchingValidation = false;
  let validation = {valid: false, messages: [], unloaded: true};

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;
  let showShareModal = false;

  const cancel = () => {
    showModal = false;
    showShareModal = false
  }

  const publicUrl = () => {
    const currentUrl = window.location.href;
    return currentUrl.replace("/details/", "/public/assertions/");
  }

  const copyToClipboard = () => {
    copy(publicUrl());
    showShareModal = false;
  }


  const query = `{
    badgeInstance(id: "${entityId}") {
      image,
      entityId,
      issuedOn,
      createdAt,
      acceptance,
      public,
      expiresAt,
      revoked,
      revocationReason,
      badgeclass {
        name,
        image,
        description,
        entityId,
        criteriaUrl,
        issuer {
          name,
          image,
          entityId,
          faculty {
            name
          }
        },
        extensions {
          name,
          originalJson
        }
      }
    }
  }`;

  const refreshBadgeDetails = () => {
    queryData(query).then(res => {
      badge = res.badgeInstance;
      showModal = false;
      if (!badge.public && badge.acceptance === 'UNACCEPTED') {
        claimAssertion(badge.entityId);
      }
      if (badge.public && validation.unloaded) {
        fetchingValidation = true;
        validateBadge(entityId).then(res => {
          validation = res.report;
          fetchingValidation = false;
        })
      }
    });
  }

  onMount(() => {
    refreshBadgeDetails();
  });

  const deleteBadge = showConfirmation => {
    if (showConfirmation) {
      modalTitle = I18n.t("student.confirmation.deleteBadge");
      modalQuestion = I18n.t("student.confirmation.deleteBadgeConfirmation");
      modalAction = () => deleteBadge(false);
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

  const makePublic = (showConfirmation, isPublic) => {
    if (showConfirmation) {
      modalTitle = isPublic ? I18n.t("student.confirmation.publish") : I18n.t("student.confirmation.private");
      modalQuestion = isPublic ? I18n.t("student.confirmation.publishConfirmation") : I18n.t("student.confirmation.privateConfirmation");
      modalAction = () => makePublic(false, isPublic);
      showModal = true;
    } else {
      showModal = false;
      publicAssertion(badge.entityId, isPublic)
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
  }

  div.badge-detail {
    padding: 10px 40px;
    position: relative;

    div.shield {
      position: absolute;
      right: 45px;
    }
  }

  div.badge-card-container {
    display: flex;
    max-width: 320px;
    margin: 0 auto 40px auto;
  }

  div.bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;

    span.icon {
      margin: auto 4px;
    }

    a {
      color: var(--text-color-grey);
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
    justify-content: center;
    height: 60px;
    margin-bottom: 25px;

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

    div {
      flex-grow: 1;
    }

    margin-bottom: 40px;
  }

  div.public-private {
    background-color: var(--grey-3);
    border-radius: 8px;
    padding: 12px;

    .header {
      display: flex;

      .switch-container {
        margin-left: auto;
      }
    }
  }

  p.revoked {
    color: var(--red-dark);
    font-size: 22px;
    margin: 25px 0;
  }

  @media (max-width: 1120px) {
    .badge-detail {
      padding: 40px 20px !important;
    }
  }

  div.issued {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    span.issuer {
      color: var(--purple);
      font-size: 16px;
    }

    span.faculty {
      font-size: 13px;
      color: var(--grey-8);
      margin-top: 5px;

    }
  }

  div.description {
    margin-bottom: 40px;
  }

  div.delete {
    display: flex;
    padding: 0 0 44px 0;
    justify-content: center;
  }

</style>
<div class="badge-detail-container">
  {#if !isEmpty(badge)}
    <div class="bread-crumb">
      <a use:link href={`/backpack`}>{I18n.t("student.badges")}</a>
      <span class="icon">{@html chevronRightSmall}</span>
      <span class="current">{badge.badgeclass.name}</span>
    </div>
    <div class="badge-header">
      <h1>{badge.badgeclass.name}</h1>
    </div>
    <div class="badge-detail">
      <div class="shield">
        {#if badge.public}
          {@html shieldUnlocked}
        {:else}
          {@html shieldLocked}
        {/if}
      </div>
      <div class="badge-card-container">
        <BadgeCard badgeClass={badge.badgeclass} standAlone={true}/>
      </div>
      {#if badge.revoked}
        <p class="revoked">{I18n.t("student.badgeRevoked")}</p>
      {:else}
        <div class="public-private">
          <div class="header">
            <h3>{I18n.t("student.privateBadge")}</h3>
            <div class="switch-container">
              <ToggleSwitch disabled={false} value={!badge.public} onChange={val => makePublic(true, !val)}/>
            </div>
          </div>

          <p>{I18n.t("student.publicPrivate")}</p>
        </div>
        <div class="actions">
          <div class="button-container">
            <DownloadButton text={I18n.t("models.badge.download")} secondary={true} filename="assertion.png"
                            url={badge.image}/>
          </div>
          <div class="button-container">
            {#if showShareModal}
              <Modal submit={copyToClipboard}
                     cancel={cancel}
                     question={I18n.t("student.shareYourBadgeQuestion")}
                     title={I18n.t("student.shareYourBadge")}
                     submitLabel={I18n.t("student.copyUrl")}>
                <div class="slots">
                  <input class="input-field full" value={publicUrl()} disabled/>
                </div>
              </Modal>
            {/if}
            <Button text={I18n.t("models.badge.share")} action={() => showShareModal = true}
                    disabled={!badge.public}/>
          </div>
        </div>
      {/if}
      {#if badge.public}
        <BadgeValidation fetchingValidation={fetchingValidation} validation={validation}/>
      {/if}
      <div class="dates">
        <div class="issued-on">
          <h3>{I18n.t("models.badge.issuedOn")}</h3>
          <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
        </div>
        <div class="expires">
          <h3>{I18n.t("models.badge.expires")}</h3>
          <span>{badge.expires ? moment(badge.expires).format('MMM D, YYYY') : I18n.t("models.badge.expiresNever")}</span>
        </div>
      </div>
      <div class="description">
        <h3>{I18n.t("models.badgeclass.description")}</h3>
        <span>{badge.badgeclass.description}</span>
      </div>
      <div class="issued">
        <h3>{I18n.t("models.badge.issuedBy")}</h3>
        <span class="issuer">{badge.badgeclass.issuer.name}</span>
        <span class="faculty">({badge.badgeclass.issuer.faculty.name})</span>
      </div>

      <BadgeClassDetails badgeclass={badge.badgeclass}/>
    </div>
    <div class="delete">
      <Button action={() => deleteBadge(true)} secondary={true} text={I18n.t("student.deleteBadge")}
        disabled={badge.acceptance === "REJECTED"}/>
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>

{#if showModal}
  <Modal submit={modalAction}
         cancel={cancel}
         question={modalQuestion}
         title={modalTitle}/>
{/if}
