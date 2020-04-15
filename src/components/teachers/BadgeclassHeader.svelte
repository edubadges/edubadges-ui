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
    color: var(--color-text-light-grey);
  }

  table th:not(:last-child), table td:not(:last-child) {
    border-right: 1px solid var(--color-text-light-grey);
  }

  table th:not(:first-child), table td:not(:first-child) {
    padding-left: 15px;
  }

  table th.created {
    width: 25%;
  }

  table th.admin {
    width: 25%;
  }

  table td.created {
    color: var(--color-text-blue);
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
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="created">{new Date(badgeclass.createdAt).toLocaleDateString()}</td>
        <td class="admin">{formatAdminNames(badgeclass)}</td>
      </tr>
      </tbody>
    </table>
  </div>

</div>
