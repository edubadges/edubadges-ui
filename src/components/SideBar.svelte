<script>
  import { isEmpty } from "../util/emptyObject"
  import { collectFilters, filteredData, toggleFilter, filterCounts } from "../util/filter";
  import { onMount } from "svelte";
  import FilterItem from "./FilterItem.svelte";

  export let filterAttributes = [];
  export let teacherBadgesData = {};

  let allBadges = [];
  export let filteredBadges = [];
  let allFilters = {};
  let activeFilters = {};
  let badgeFilterCounts = {};
  onMount(() => {
    allBadges = teacherBadgesData;
    filteredBadges = allBadges;
    allFilters = collectFilters(allBadges, filterAttributes);
    badgeFilterCounts = filterCounts(allFilters, filteredBadges);
  });

  const setFilters = (attr, filter) => {
    if (badgeFilterCounts[attr][filter] > 0) {
      activeFilters = toggleFilter(activeFilters, attr, filter);
      filteredBadges = filteredData(allBadges, activeFilters);
      badgeFilterCounts = filterCounts(allFilters, filteredBadges);
    }
  };

</script>

<style>
  .side-bar {
    width: var(--width-side-bar);
    padding: 8px;
    background: var(--color-background-grey-light);
  }

  li {
    margin-bottom: 8px;
  }
</style>


<div class="side-bar">
  {#if !isEmpty(allFilters)}
    <div>
      <div style="width: 100%">
        <ul>
          {#each filterAttributes as attr}
            <li>
              <h4>{attr}</h4>
              <ul>
                {#each allFilters[attr] as filter}
                  <li
                      on:click={() => setFilters(attr, filter)}
                  >
                    <FilterItem
                        {filter}
                        count={badgeFilterCounts[attr][filter]}
                        active={activeFilters[attr] === filter}
                    />
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</div>
