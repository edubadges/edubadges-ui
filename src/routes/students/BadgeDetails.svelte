<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
  import {link} from "svelte-routing";
  import {queryData} from "../../api/graphql";
  import {isEmpty} from "lodash";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";
  import trash from "../../icons/trash.svg";
  import Button from "../../components/Button.svelte";
  import Spinner from "../../components/Spinner.svelte";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";
  import BadgeClassDetails from "../../components/shared/BadgeClassDetails.svelte";
  import moment from "moment";
  import Modal from "../../components/forms/Modal.svelte";
  import DownloadButton from "../../components/DownloadButton.svelte";
  import {revokeAssertion, publicAssertion, deleteAssertion} from "../../api";
  import {flash} from "../../stores/flash";
  import CopyToClipboardButton from "../../components/CopyToClipboardButton.svelte";
  import BadgeValidation from "./BadgeValidation.svelte";

  export let entityId;

  let badge = {};

  let fetchingValidation = false;
  let validation = {valid: false, messages: [], unloaded: true};

  //Modal
  let showModal = false;
  let modalTitle;
  let modalQuestion;
  let modalAction;

  const cancel = () => {
    showModal = false;
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
        entityId,
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

  const validationQuery = `{
    badgeInstance(id: "${entityId}") {
      validation
    }
  }`;

  const refreshBadgeDetails = () => {
    queryData(query).then(res => {
      badge = res.badgeInstance;
      showModal = false;
      if (badge.public && validation.unloaded) {
        fetchingValidation = true;
        queryData(validationQuery).then(res => {
          validation = res.badgeInstance.validation.report;
          fetchingValidation = false;
        })
      }
    });
  }

  onMount(() => refreshBadgeDetails());

  const publicBadgePageUrl = () => {
    const currentUrl = window.location.href;
    return currentUrl.replace("/details/", "/public/assertions/");
  }

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

  :global(div.actions svg.svg-inline--fa) {
    width: 22px;
    height: 22px;
    display: inline-block;

    path {
      fill: var(--grey-7);
    }
  }

  div.actions {
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    span.thrash {
      background-color: var(--grey-3);
      padding: 9px;
      display: flex;
      cursor: pointer;

      &:hover {
        background-color: var(--grey-4);
      }

    }

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

  p.revoked {
    color: var(--red-dark);
    font-size: 22px;
    margin: 25px 0;
  }

  p.public {
    color: var(--yellow-dark);
    font-size: 18px;
    margin: 25px 0;
  }

  @media (max-width: 1120px) {
    .badge-detail {
      padding: 40px 20px !important;
    }
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
      <div class="badge-card-container">
        <BadgeCard badgeClass={badge.badgeclass} standAlone={true}/>
      </div>
      {#if badge.revoked}
        <p class="revoked">{I18n.t("student.badgeRevoked")}</p>
      {:else if badge.public}
        <div class="actions">
      <span class="thrash" on:click={() => deleteBadge(true)}>
        {@html trash}
      </span>
          <div class="button-container">
            <DownloadButton text={I18n.t("models.badge.download")} secondary={true} filename="assertion.png"
                            url={badge.image}/>
          </div>
          <div class="button-container">
            <Button action={() => makePublic(true, false)} secondary={true} text={I18n.t("student.private")}/>
          </div>
          <div class="button-container">
            <CopyToClipboardButton text={I18n.t("models.badge.share")} toCopy={publicBadgePageUrl()}/>
          </div>
        </div>
      {:else}
        <p class="public">{I18n.t("student.notPublic")}</p>
        <div class="actions">
          <Button action={() => makePublic(true, true)} text={I18n.t("student.publish")}/>
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

      <BadgeClassDetails badgeclass={badge.badgeclass}/>
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
