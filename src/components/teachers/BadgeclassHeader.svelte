<script>
  import I18n from "i18n-js";
  import {formatAdminNames} from "../../util/entityHeader";

  export let badgeclass = {staff: [], alignments: []};

</script>

<style>

  .badgeclass-header {
    display: flex;
    padding-bottom: var(--ver-padding-m);
  }

  .image-container {
    max-width: 100px;
    border: var(--card-border);
    margin-right: 15px;
  }

  .details {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .details p {
    margin-bottom: var(--ver-padding-m);
    font-style: italic;
    max-width: 50%;
  }

  table {
    width: 100%;
    margin-top: auto;
    border-collapse: collapse;
  }

  table th {
    text-align: left;
    color: var(--text-grey-light);
  }

  table th:not(:last-child), table td:not(:last-child) {
    border-right: 1px solid var(--text-grey-light);
  }

  table th:not(:first-child), table td:not(:first-child) {
    padding-left: 15px;
  }

  table th.created {
    width: 20%;
  }

  table th.admin {
    width: 20%;
  }

  table th.expires {
    width: 20%;
  }

  table td.created {
    color: var(--blue-medium);
  }


</style>

<div class="badgeclass-header">
  {#if badgeclass.image}
    <div class="image-container">
      <img src={badgeclass.image} alt=""/>
    </div>
  {/if}
  <div class="details">
    <p>{badgeclass.description}</p>
    <table>
      <thead>
      <tr>
        <th class="created">{I18n.t("models.badgeclass.created")}</th>
        <th class="admin">{I18n.t("models.badgeclass.admin")}</th>
        <th class="expires">{I18n.t("models.badgeclass.expiresAfter")}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="created">{new Date(badgeclass.createdAt).toLocaleDateString()}</td>
        <td class="admin">{formatAdminNames(badgeclass)}</td>
        <td
          class="expires">{badgeclass.expirationPeriod ? I18n.t("models.badgeclass.expiresAfterValue", {nbr: badgeclass.expirationPeriod}) : I18n.t("models.badgeclass.expiresAfterNever")}</td>
      </tr>
      </tbody>
    </table>
  </div>

</div>
