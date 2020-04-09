<script>
  import I18n from "i18n-js";
  import {formatAdminNames} from "../../util/entityHeader";

  export let issuer = {staff: []};

</script>

<style>

  .issuer-header {
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

  table th.url {
    width: 15%;
  }

  table th.email {
    width: 35%;
  }

  table td.created {
    color: var(--color-text-blue);
  }


</style>

<div class="issuer-header">
  {#if issuer.image}
    <div class="image-container">
      <img src={issuer.image} alt=""/>
    </div>
  {/if}
  <div class="details">
    <p>{issuer.description}</p>
    <table>
      <thead>
      <tr>
        <th class="created">{I18n.t("models.issuer.created")}</th>
        <th class="admin">{I18n.t("models.issuer.admin")}</th>
        <th class="url">{I18n.t("models.issuer.url_header")}</th>
        <th class="email">{I18n.t("models.issuer.email_header")}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="created">{new Date(issuer.createdAt).toLocaleDateString()}</td>
        <td class="admin">{formatAdminNames(issuer)}</td>
        {#if issuer.url}
          <td><a href="{issuer.url}" target="_blank">{issuer.url}</a></td>
        {:else}
          <td>{I18n.t("models.issuer.no_url")}</td>
        {/if}
        {#if issuer.email}
          <td><a href="mailto:{issuer.email}" target="_blank">{issuer.email}</a></td>
        {:else}
          <td>{I18n.t("models.issuer.no_email")}</td>
        {/if}
      </tr>
      </tbody>
    </table>
  </div>

</div>
