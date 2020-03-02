<script>
  import { isEmpty } from "../util/emptyObject"
  import {collectFilters, filteredData, toggleFilter, filterCounts, freeTextSearch} from "../util/filter";
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

  let searchText = '';
  const additionalSearchFields = ['name'];
  const setTextSearch = () => {
    filteredBadges = filteredData(freeTextSearch(allBadges, searchText, [...additionalSearchFields, ...filterAttributes]), activeFilters);
    if (filteredBadges.length === 0) {
      badgeFilterCounts = filterCounts(allFilters, filteredData(allBadges, activeFilters));
    } else {
      badgeFilterCounts = filterCounts(allFilters, filteredBadges);
    }
  }
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
      <h4>Free text search:</h4>
      <input bind:value={searchText} on:input={setTextSearch} />
    </div>
    <div>
      <ul>
        {#each filterAttributes as attr}
          <li>
            <h4>{attr + 's'}</h4>
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
  {/if}
</div>
