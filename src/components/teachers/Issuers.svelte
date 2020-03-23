<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";

  let issuers = [];

  const query = `{
      issuers {
        name,
        faculty {
          name
        },
        badgeclasses {
          entityId
        }
      }
    }`;

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
    });
  });
</script>

<style>
  div.container {
    margin: var(--ver-padding-l) var(--entity-icon-width);
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  thead th {
    text-align: left;
    border-bottom: 3px solid var(--color-background-grey-dark);
  }

  th,
  td {
    padding: var(--ver-padding-s) 0;
    width: 50%;
  }

  tbody tr:not(:last-of-type) td {
    border-bottom: var(--card-border);
  }
</style>

<div class="container">
  <h4>{I18n.t('teacher.issuers.title')} ({issuers.length})</h4>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>#badgeclasses</th>
      </tr>
    </thead>
    <tbody>
      {#each issuers as issuer}
        <tr>
          <td>
            {issuer.name}
            <br />
            <span class="sub-text">({issuer.faculty.name})</span>
          </td>
          <td>{issuer.badgeclasses.length}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
