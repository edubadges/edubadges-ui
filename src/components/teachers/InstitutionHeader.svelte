<script>
  import I18n from "i18n-js";

  export let institution = {staff: []};

  const formatAdminNames = institutionInstance => {
    let names = institutionInstance.staff.map(u => u.user.firstName + ' ' + u.user.lastName).slice(0, 2).join(", ");
    if (institutionInstance.staff.length > 2) {
      names += ` (+${institutionInstance.staff.length - 2})`
    }
    return names;
  }

</script>

<style>

  .institution-header {
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
    width: 15%;
  }
  table th.admin {
    width: 35%;
  }
  table th.brin {
    width: 15%;
  }
  table th.grading {
    width: 35%;
  }
  table td.created {
    color: var(--color-text-blue);
  }


</style>

<div class="institution-header">
  {#if institution.image}
    <div class="image-container">
      <img src={institution.image} alt=""/>
    </div>
  {/if}
  <div class="details">
    <p>{institution.description}</p>
    <table>
      <thead>
      <tr>
        <th class="created">{I18n.t("models.institution.created")}</th>
        <th class="admin">{I18n.t("models.institution.admin")}</th>
        <th class="brin">{I18n.t("models.institution.brin")}</th>
        <th class="grading">{I18n.t("models.institution.grading_table")}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="created">{new Date(institution.createdAt).toLocaleDateString()}</td>
        <td class="admin">{formatAdminNames(institution)}</td>
        <td>{institution.brin}</td>
        <td>{institution.gradingTable || I18n.t("models.institution.no_grading_table")}</td>
      </tr>
      </tbody>
    </table>
  </div>

</div>
