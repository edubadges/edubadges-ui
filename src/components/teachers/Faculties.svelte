<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";

  let faculties = [];

  const query = `{
      faculties {
        name,
        issuers {
          entityId
        },
      }
    }`;

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.faculties;
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
  <h4>{I18n.t('teacher.faculties.title')} ({faculties.length})</h4>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>#{I18n.t('teacher.issuers.title').toLowerCase()}</th>
      </tr>
    </thead>
    <tbody>
      {#each faculties as faculty}
        <tr>
          <td>{faculty.name}</td>
          <td>{faculty.issuers.length}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
