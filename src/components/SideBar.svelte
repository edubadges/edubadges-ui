<script>
  import { onMount } from "svelte";
  import { sum, sumBy } from "lodash";
  import { FilterBlock, Search } from "../components";
  import { queryData } from "../api/graphql";
  import { validSearch } from "../util/filter";

  export let bookmark;
  export let searchText;
  export let facultyIdFilter = [];
  export let issuerIdFilter = [];

  let faculties = [];
  let issuers = [];

  const query = `{
    faculties {
      entityId,
      name,
      issuers {
        entityId, 
        name,
        badgeclasses {
          name
        }
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      faculties = sortByBadgeclassCount(res.faculties, facultyBadgeclassCount);
    });
  });

  $: if (faculties || facultyIdFilter || issuers || searchText) {
    issuers = sortByBadgeclassCount(
      faculties
        .filter(
          ({ entityId }) =>
            !facultyIdFilter.length || facultyIdFilter.includes(entityId)
        )
        .flatMap(({ issuers }) => issuers),
      issuerBadgeclassCount
    );
  }

  function sortByBadgeclassCount(collection, compareFunction) {
    return collection.sort((a, b) => compareFunction(b) - compareFunction(a));
  }

  function issuerBadgeclassCount(issuer) {
    return issuer.badgeclasses.filter(bc => validSearch(bc, searchText)).length;
  }

  function facultyBadgeclassCount(faculty) {
    return sumBy(faculty.issuers, issuerBadgeclassCount);
  }
</script>

<style>
  div.sidebar {
    width: var(--width-side-bar);
    padding: 12px;
    background: var(--color-background-grey-light);
  }

  div.sidebar > div {
    padding-bottom: 20px;
  }

  div.sidebar > div:not(:first-child) {
    padding-top: 20px;
    border-top: var(--card-border);
  }
</style>

<div class="sidebar">
  <div>
    <Search bind:value={searchText} />
  </div>

  <div>
    <FilterBlock
      bind:value={facultyIdFilter}
      collection={faculties}
      title="faculties"
      count={facultyBadgeclassCount} />
  </div>

  {#if bookmark === 'badges'}
    <div>
      <FilterBlock
        bind:value={issuerIdFilter}
        collection={issuers}
        title="issuers"
        count={issuerBadgeclassCount} />
    </div>
  {/if}
</div>
