<script>
  import I18n from "i18n-js";
  import { formatAdminNames } from "../../util/entityHeader";

  export let faculty = { staff: [] };
</script>

<style>
  .faculty-header {
    display: flex;
    padding-bottom: var(--ver-padding-m);
  }

  .details {
    display: flex;
    width: 50%;
    flex-direction: column;
  }

  .details p {
    margin-bottom: var(--ver-padding-m);
    font-style: italic;
  }

  table {
    width: 50%;
    margin-top: auto;
    border-collapse: collapse;
  }

  table th {
    text-align: left;
    color: var(--color-text-light-grey);
  }

  table th:not(:last-child),
  table td:not(:last-child) {
    border-right: 1px solid var(--color-text-light-grey);
  }

  table th:not(:first-child),
  table td:not(:first-child) {
    padding-left: 15px;
  }

  table th:not(:last-child),
  table td:not(:last-child) {
    padding-right: 15px;
  }
</style>

<div class="faculty-header">
  <div class="details">
    <p>{faculty.description}</p>
    <table>
      <thead>
        <tr>
          <th>{I18n.t('models.faculty.created')}</th>
          <th>{I18n.t('models.faculty.admin')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{new Date(faculty.createdAt).toLocaleDateString()}</td>
          <td>{formatAdminNames(faculty)}</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
