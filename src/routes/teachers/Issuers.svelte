<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";
  import { requestProfile } from "../../api";

  let scope = "";
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

    requestProfile()
      .then(({ institution }) => (scope = institution.name))
      .catch(error => console.error(error));
  });
</script>

<style>
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
    padding: 16px 0px;
    width: 50%;
  }

  tbody tr:not(:last-of-type) td {
    border-bottom: var(--card-border);
  }
</style>

<h2>
  {I18n.t('teacher.issuers.title')}
  {#if scope}
    <span class="blue-text">in</span>
    {scope}
  {/if}
</h2>

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
          <div>
            <b>{issuer.name}</b>
          </div>
          <span class="sub-text">({issuer.faculty.name})</span>
        </td>
        <td>{issuer.badgeclasses.length}</td>
      </tr>
    {/each}
  </tbody>
</table>
