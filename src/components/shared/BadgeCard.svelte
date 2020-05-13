<script>
  import {onMount} from "svelte";
  import moment from "moment";
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";

  export let badge;
  export let badgeClass;
  export let standAlone = false;

  const detailLink = () => {
    if (!standAlone) {
      navigate(badge ? `/details/${badge.entityId}` : `/badgeclass/${badgeClass.entityId}`);
    }
  }

  const statusOfBadge = badge => {
    if (badge.public && !badge.revoked && badge.acceptance === "ACCEPTED") {
      return "public";
    }
    if (badge.acceptance === "REJECTED") {
      return "rejected";
    }
    if (!badge.public) {
      return "private"
    }
    if (badge.revoked) {
      return "revoked";
    }
    return "unknown";
  }

</script>

<style lang="scss">
  .badge {
    display: flex;
    flex-direction: column;
    background-color: var(--grey-2);

    &:not(.stand-alone) {
      cursor: pointer;
    }

  }

  .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: white;
  }

  .header span {
    font-size: 22px;
    margin: 15px 0 0 0;
  }

  .header img {
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

  .details span.status {
    font-size: 15px;
    position: absolute;
    right: -10px;
    top: -10px;
    transform: rotate(-45deg);
    background-color: var(--grey-4);
    border-radius: 4px;
    padding: 3px 5px;

    &.public {
      color: var(--green-dark);
    }

    &.rejected {
      color: var(--red-dark);
    }

    &.private {
      color: var(--purple);
    }

    &.revoked {
      color: var(--red-dark);
    }
  }

</style>

{#if badge || badgeClass}
  <div class="card badge" class:stand-alone={standAlone} on:click|preventDefault|stopPropagation={detailLink}>
    <div class="header">
      {#if badge}
        <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
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
        {#if badge}
          <span
            class={`status ${statusOfBadge(badge)}`}>{I18n.t(`models.badge.statuses.${statusOfBadge(badge)}`)}</span>
        {/if}
      </div>
    </div>
  </div>

{/if}
