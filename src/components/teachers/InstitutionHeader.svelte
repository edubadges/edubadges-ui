<script>
  import I18n from "i18n-js";
  import { formatAdminNames } from "../../util/entityHeader";

  export let institution = { staff: [] };
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
    background: white;
  }

  .details {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .details p {
    margin-bottom: var(--ver-padding-m);
    font-style: italic;
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

  table th:not(:last-child),
  table td:not(:last-child) {
    border-right: 1px solid var(--text-grey-light);
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

<div class="institution-header">
  {#if institution.image}
    <div class="image-container">
      <img src={institution.image} alt="" />
    </div>
  {/if}
  <div class="details">
    <p>{institution.description}</p>
    <table>
      <thead>
        <tr>
          <th>{I18n.t('models.institution.created')}</th>
          <th>{I18n.t('models.institution.admin')}</th>
          <th>{I18n.t('models.institution.brin')}</th>
          <th>{I18n.t('models.institution.grading_table')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="created">
            {new Date(institution.createdAt).toLocaleDateString()}
          </td>
          <td class="admin">{formatAdminNames(institution)}</td>
          <td>{institution.brin}</td>
          {#if institution.gradingTable}
            <td>
              <a href={institution.gradingTable} target="_blank">
                {institution.gradingTable}
              </a>
            </td>
          {:else}
            <td>{I18n.t('models.institution.no_grading_table')}</td>
          {/if}
        </tr>
      </tbody>
    </table>
  </div>
</div>
