<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";
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
  import {getPublicBadge, getPublicIssuer, revokeAssertion, validateName} from "../../api";
  import {flash} from "../../stores/flash";
  import CopyToClipboardButton from "../../components/CopyToClipboardButton.svelte";
  import {publicBadgeInformation} from "../extensions/badges/extensions";
  import BadgeValidation from "../../routes/students/BadgeValidation.svelte";
  import {config} from "../../util/config";

  export let entityId;

  let badge = {};

  let validation = {};
  let validatedName;
  let loaded;

  onMount(() => {
    getPublicBadge(entityId).then(res => {
      badge = res.badge;
      badge.issuedOn = res.issuedOn;
      badge.expires = res.expires;
      badge.updatedAt = res.updatedAt;
      badge.verfication = res.verification.type;
      badge.entityId = entityId;
      publicBadgeInformation(badge, res.badge);
      validateName(encodeURIComponent(res.recipient.identity), encodeURIComponent(res.recipient.salt))
        .then(res => {
          validatedName = res.name;
          loaded = true
        });
    });
  });

</script>

<style lang="scss">

  div.badge-public-detail-container {
    display: flex;
    flex-direction: column;
  }

  div.badge-public-detail {
    padding: 10px 40px;
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

  div.badge-card-container {
    display: flex;
    max-width: 320px;
    margin: 0 auto 40px auto;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  div.issuer {
    margin-bottom: 12px;
  }

  @media (max-width: 1120px) {
    .badge-public-detail {
      padding: 40px 20px !important;
    }
  }

</style>
<div class="badge-public-detail-container">
  <div class="badge-header">
    <h1>{badge.name}</h1>
  </div>

  <div class="badge-public-detail">
    {#if !isEmpty(badge)}
      <div class="badge-card-container">
        <BadgeCard badgeClass={badge} standAlone={true}/>
      </div>
      <BadgeValidation badge={badge} validatedName={validatedName}/>
      <div class="issuer">
        <h3>{I18n.t("models.badgeclass.issuer")}</h3>
        <span><a href={badge.issuer.id} target="_blank">{badge.issuer.name}</a></span>
      </div><BadgeClassDetails badgeclass={badge}/>
    {:else}
      <Spinner/>
    {/if}
  </div>
</div>
