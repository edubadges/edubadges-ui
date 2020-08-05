<script>
  import {onMount} from "svelte";
  import moment from "moment";
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";
  import shieldUnlocked from "../../icons/shield-unlock.svg";
  import shieldLocked from "../../icons/lock-shield.svg";

  export let badge;
  export let badgeClass;
  export let standAlone = false;
  export let withHeaderData;

  const detailLink = () => {
    if (!standAlone) {
      navigate(badge ? `/details/${badge.entityId}` : `/badgeclass/${badgeClass.entityId}`);
    }
  }

</script>

<style lang="scss">
  .badge {
    display: flex;
    flex-direction: column;
    background-color: var(--grey-2);
    position: relative;

    &:not(.stand-alone) {
      cursor: pointer;
      margin: 0;
    }

    &.stand-alone {
      margin: auto;
    }
  }

  .header-regular-height {
    height: 230px;
  }

  .header-extra-height {
    height: 280px;
  }

  .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: white;

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

  .details img {
    max-width: 55px;
    margin-right: 15px;
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

</style>

{#if badge || badgeClass}
  <div class="card badge" class:stand-alone={standAlone} on:click|preventDefault|stopPropagation={detailLink}>
    {#if badge && badge.revoked}
      <span class="status-indicator revoked">{I18n.t("models.badge.statuses.revoked")}</span>
    {:else if badge && badge.acceptance === "UNACCEPTED"}
      <span class="status-indicator new">{I18n.t("models.badge.statuses.new")}</span>
    {:else if badge && badge.acceptance === "REJECTED"}
      <span class="status-indicator rejected">{I18n.t("models.badge.statuses.rejected")}</span>
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
      <img src={badgeClass.image} alt=""/>
    </div>
    <div class="content">
      <div class="content-header">
        <span class="name">{badgeClass.name}</span>
      </div>

      <div class="details">
        <img src={badgeClass.issuer.image} alt=""/>
        <div class="issued">
          <span class="issued-by">{I18n.t("models.badge.issuedBy")}</span>
          <span class="issuer">{badgeClass.issuer.name}</span>
          {#if badgeClass.issuer.faculty}
            <span class="faculty">({badgeClass.issuer.faculty.name})</span>
          {/if}
        </div>
      </div>
    </div>
  </div>

{/if}
