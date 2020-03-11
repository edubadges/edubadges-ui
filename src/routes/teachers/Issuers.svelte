<script>
  import { onMount, onDestroy } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";
  import {
    collection,
    filteredCollection,
    searchFilter,
    presenceFilters,
    resetFilterStores
  } from "../../stores/filter";

  export let searchText;
  export let facultyIdFilter;

  let institution;

  const query = `{
      currentUser {
        institution {
          name
        }
      },
      issuers {
        entityId,
        name,
        faculty {
          name,
          entityId
        },
        badgeclasses {
          entityId
        }
      }
    }`;

  onMount(() => {
    queryData(query).then(({ issuers, currentUser }) => {
      $collection = issuers;
      institution = currentUser.institution;
    });

    return resetFilterStores();
  });

  $: {
    $searchFilter = searchText;
    $presenceFilters = [
      {
        attr: "faculty.entityId",
        list: facultyIdFilter
      }
    ];
  }
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
  {#if institution}
    <span class="blue-text">in</span>
    {institution.name}
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
    {#each $filteredCollection as issuer (issuer.entityId)}
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
