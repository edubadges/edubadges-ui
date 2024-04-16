<script>
  import I18n from "i18n-js";

  export let badge;
  export let badgeClass;
  export let cardView = true;

</script>
<style lang="scss">
  span.status-indicator {
    display: inline-block;
    border-radius: 14px;
    box-shadow: 0 1px 0 1px var(--grey-4);
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    text-align: center;

    &.card-view {
      position: absolute;
      left: 10px;
      top: -14px;

    }
  }

  span.status-indicator.new {
    background-color: var(--green-light);
    max-width: 55px;
  }

  span.status-indicator.unclaimed {
    background-color: var(--green-dark);
    color: white;
    max-width: 155px;
  }

  span.status-indicator.rejected {
    background-color: var(--red-dark);
    color: white;
    max-width: 85px;
  }

  span.status-indicator.pending-enrollments, span.status-indicator.imported {
    background-color: var(--green-dark);
    color: white;
    max-width: 145px;
  }

  span.status-indicator.revoked, span.status-indicator.archived {
    background-color: var(--red-strong-dark);
    color: white;
    max-width: 85px;
  }

  span.status-indicator.expired {
    background-color: var(--red-medium);
    color: white;
    max-width: 85px;
  }

  span.status-indicator.draft {
    background-color: var(--yellow-medium);
    color: black;
    max-width: 85px;
  }

</style>
{#if badge}
  {#if badge.isDirectAward}
    <span class="status-indicator unclaimed" class:card-view={cardView}>{I18n.t("models.badge.statuses.unclaimed")}</span>
  {:else if badge.revoked}
    <span class="status-indicator revoked" class:card-view={cardView}>{I18n.t("models.badge.statuses.revoked")}</span>
  {:else if badge.acceptance === "UNACCEPTED"}
    <span class="status-indicator new"  class:card-view={cardView}>{I18n.t("models.badge.statuses.new")}</span>
  {:else if badge.acceptance === "REJECTED"}
    <span class="status-indicator rejected"  class:card-view={cardView}>{I18n.t("models.badge.statuses.rejected")}</span>
  {:else if badge.expiresAt && new Date(badge.expiresAt) < new Date()}
    <span class="status-indicator expired" class:card-view={cardView}>{I18n.t("models.badge.statuses.expired")}</span>
  {:else if badge.importedBadge }
    <span class="status-indicator imported" class:card-view={cardView}>{I18n.t("models.badge.statuses.imported")}</span>
  {/if}
{/if}
{#if badgeClass && badgeClass.isPrivate}
    <span class="status-indicator draft" class:card-view={cardView}>
      {I18n.t("newBadgeClassForm.draft")}
    </span>
{:else if badgeClass && badgeClass.pendingEnrollmentCount && badgeClass.pendingEnrollmentCount > 0}
    <span class="status-indicator pending-enrollments" class:card-view={cardView}>
      {I18n.t("models.badge.statuses.pendingEnrollmentCount", {count: badgeClass.pendingEnrollmentCount})}
    </span>
{:else if badgeClass && badgeClass.archived}
    <span class="status-indicator archived" class:card-view={cardView}>
      {I18n.t("models.badge.statuses.archived")}
    </span>
{/if}

