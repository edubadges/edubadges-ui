<script>
  import {onMount} from "svelte";
  import moment from "moment";
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";
  import shieldUnlocked from "../../icons/shield-unlock.svg";
  import shieldLocked from "../../icons/lock-shield.svg";
  import {issuerIcon} from "../../icons";

  export let badge;
  export let badgeClass;
  export let standAlone = false;
  export let withHeaderData;

  const detailLink = () => {
    if (!standAlone) {
      navigate(badge ? `/details/${badge.entityId}` : `/badgeclass/${badgeClass.entityId}`);
    }
  }

  onMount(() => {
    badgeClass.studyLoadValue = badgeClass.studyLoad ?
      I18n.t("teacher.badgeclasses.hours", {value: badgeClass.studyLoad}) : badgeClass.ects ?
      I18n.t("teacher.badgeclasses.ects", {value: badgeClass.ects}) : null;
  });
</script>

<style lang="scss">
  .badge {
    display: flex;
    flex-direction: column;
    background-color: var(--grey-2);
    position: relative;
    width: 100%;

    &:not(.stand-alone) {
      cursor: pointer;
      margin: 0;
    }

    &.stand-alone {
      margin: auto;
    }
  }

  .header-regular-height {
    min-height: 230px;
  }

  .header-extra-height {
    min-height: 280px;
  }

  .header {
    display: flex;
    text-align: center;
    flex-direction: column;
    background-color: white;
    border-radius:14px;

    .shield {
      position: absolute;
      right: 8px;
      top: 8px;

      :global(svg) {
        width: 28px;
        height: 28px;
      }
    }
  }

  .header span {
    font-size: 22px;
    margin: 15px 0 0 0;
  }

  .header img {
    max-height: 200px;
    max-width: 200px;
    margin: 15px auto;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 15px;
    height: 100%;
  }

  .content-header span.name {
    font-size: 22px;
    margin-bottom: 15px;
    display: inline-block;
    line-height: 24px;
  }

  .details {
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .vert-center {
    display: flex;
    justify-content: space-around;
    width: 66px;
    height: 66px;
  }

  .details .issuer-img {
    width: 55px;
    height: 55px;
    margin-right: 15px;
    display: flex;
    justify-content: space-around;
    background-color: white;
  }

  .image-center-v {
    min-height: 230px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .issuer-icon {
    display: block;
    height: 70%;
    width: 70%;
    align-self: center;
  }

  .details div.issued {
    display: flex;
    flex-direction: column;
  }

  .details div.issued span {
    margin-bottom: 4px;
  }

  .details span.issued-by {
    color: var(--purple);
    font-size: 16px;
  }

  .details span.faculty {
    font-size: 13px;
    color: var(--grey-8);
  }

  .details div.study-load {
    margin-left: auto;
    align-self: end;
    display: flex;
    flex-direction: column;
  }

  .details div.study-load span.study-load-label {
    font-size: 16px;
    color: var(--purple);
    margin-bottom: 4px;
    width: 72px;
  }

  .details div.study-load span.study-load-value {
    align-self: flex-end;
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
    left: 10px;
    top: -14px
  }

  span.status-indicator.new {
    background-color: var(--green-light);
    max-width: 55px;
  }

  span.status-indicator.rejected {
    background-color: var(--red-dark);
    color: white;
    max-width: 85px;
  }

  span.status-indicator.revoked {
    background-color: var(--red-strong-dark);
    color: white;
    max-width: 85px;
  }

  span.status-indicator.expired {
    background-color: var(--red-medium);
    color: white;
    max-width: 85px;
  }
</style>

{#if badge || badgeClass}
  <div class="card badge" class:stand-alone={standAlone} on:click|preventDefault|stopPropagation={detailLink}>
    {#if badge && badge.revoked}
      <span class="status-indicator revoked">{I18n.t("models.badge.statuses.revoked")}</span>
    {:else if badge && badge.acceptance === "UNACCEPTED"}
      <span class="status-indicator new">{I18n.t("models.badge.statuses.new")}</span>
    {:else if badge && badge.acceptance === "REJECTED"}
      <span class="status-indicator rejected">{I18n.t("models.badge.statuses.rejected")}</span>
    {:else if badge && badge.expiresAt && new Date(badge.expiresAt) < new Date()}
      <span class="status-indicator expired">{I18n.t("models.badge.statuses.expired")}</span>
    {/if}
    <div class="header {withHeaderData ? 'header-extra-height' : 'header-regular-height'}">
      {#if badge}
        <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
        <div class="shield">
          {#if badge.public}
            {@html shieldUnlocked}
          {:else}
            {@html shieldLocked}
          {/if}
        </div>
      {/if}
      <div class="image-center-v">
        <img src={badgeClass.image} alt=""/>
      </div>
    </div>
    <div class="content">
      <div class="content-header">
        <span class="name">{badgeClass.name}</span>
      </div>

      <div class="details">
        <div class="vert-center">
          <div class="issuer-img">
            {#if badgeClass.issuer.image}
              <img src={badgeClass.issuer.image} alt=""/>
            {:else}
              <span class="issuer-icon">{@html issuerIcon}</span>
            {/if}
          </div>
        </div>
        <div class="issued">
          <span class="issued-by">{I18n.t("models.badge.issuedBy")}</span>
          <span class="issuer">{badgeClass.issuer.name}</span>
          {#if badgeClass.issuer.faculty}
            <span class="faculty">({badgeClass.issuer.faculty.name})</span>
          {/if}
        </div>
        {#if badgeClass.studyLoadValue}
          <div class="study-load">
            <span class="study-load-label">{I18n.t('models.badgeclass.studyLoad')}</span>
            <span class="study-load-value">{badgeClass.studyLoadValue}</span>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
