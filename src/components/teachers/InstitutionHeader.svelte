<script>
  import I18n from "i18n-js";

  export let institution = {staff: []};

  const formatAdminNames = () => {
    let names = institution.staff.map(user => (user.first_name + user.last_name) || user.email).slice(0, 2);
    if (institution.staff.length > 2) {
      names += ` (+${institution.staff.length - 2})`
    }
    return names;
  }

</script>

<style>

  .institution-header {
    display: flex;
  }

  .image-container {
    max-width: 150px;
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
        <th>{I18n.t("models.institution.created")}</th>
        <th>{I18n.t("models.institution.admin")}</th>
        <th>{I18n.t("models.institution.brin")}</th>
        <th>{I18n.t("models.institution.grading_table")}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="created">{institution.createdAt}</td>
        <td class="admin">{formatAdminNames()}</td>
        <td>{institution.brin}</td>
        <td>{institution.gradingTable || I18n.t("models.institution.no_grading_table")}</td>
      </tr>
      </tbody>
    </table>
  </div>

</div>
