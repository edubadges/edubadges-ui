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
  import {getPublicBadge, revokeAssertion, validateBadge} from "../../api";
  import {flash} from "../../stores/flash";
  import CopyToClipboardButton from "../../components/CopyToClipboardButton.svelte";
  import {publicBadgeInformation} from "../extensions/badges/extensions";
  import BadgeValidation from "../../routes/students/BadgeValidation.svelte";

  export let entityId;

  let badge = {};

  let fetchingValidation = false;
  let validation = {valid: false, messages: [], unloaded: true};

  onMount(() => {
    getPublicBadge(entityId).then(res => {
      badge = res.badge;
      publicBadgeInformation(badge, res.badge);
      if (validation.unloaded) {
        fetchingValidation = true;
        validateBadge(entityId).then(res => {
          validation = res.report;
          fetchingValidation = false;
        })
      }
    })
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

  div.dates {
    display: flex;
    width: 100%;
    align-content: space-between;

    div {
      flex-grow: 1;
    }

    margin-bottom: 40px;
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
      <BadgeValidation fetchingValidation={fetchingValidation} validation={validation}/>
      <div class="dates">
        <div class="issued-on">
          <h3>{I18n.t("models.badge.issuedOn")}</h3>
          <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
        </div>
      </div>
      <BadgeClassDetails badgeclass={badge}/>
    {:else}
      <Spinner/>
    {/if}
  </div>
</div>
