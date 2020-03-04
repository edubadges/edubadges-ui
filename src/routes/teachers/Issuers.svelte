<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getIssuers } from "../../api";
  import { collectFilters, toggleFilter, filteredData } from "../../util/filter";

  let issuers = [];
  let allFilters = {};
  let activeFilters = {};
  const filterAttributes = ["name"];
  let filteredIssuers = [];

  onMount(() => {
    getIssuers().then(
      res => {
        issuers = res;
        filteredIssuers = issuers;
        allFilters = collectFilters(issuers, filterAttributes);
      },
      error => console.error("issuers", error)
    );
  });

  const setFilters = (attr, filter) => {
    activeFilters = toggleFilter(activeFilters, attr, filter);
    filteredIssuers = filteredData(issuers, activeFilters);
  }
</script>

<div>
  <div style="width: 25%; display: inline-block">
    <ul>
      {#each Object.entries(allFilters) as [attr, filters]}
        <li>
          <h4>{attr}</h4>
          <ul>
            {#each filters as filter}
              <li on:click={() => setFilters(attr, filter)}>{filter}</li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>

  <div style="width: 70%; display: inline-block">
    <h3>Issuers</h3>
    {#each filteredIssuers as issuer}
      <li>
        <a href={`/issuer/${issuer.slug}`} use:link>
          {issuer.name} (badges: {issuer.badgeClassCount})
        </a>
      </li>
    {/each}
  </div>
</div>
