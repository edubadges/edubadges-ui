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
    activeFilters = toggleFilter(activeFilters, attr, filter);
    filteredBadges = filteredData(freeTextSearch(allBadges, searchText, additionalSearchFields), activeFilters);
    badgeFilterCounts = filterCounts(allFilters, filteredBadges);
  };

  let searchText = '';
  const additionalSearchFields = ['name'];
  const setTextSearch = () => {
    filteredBadges = filteredData(freeTextSearch(allBadges, searchText, additionalSearchFields), activeFilters);
    badgeFilterCounts = filterCounts(allFilters, filteredBadges);
  }
</script>

<style>
  .side-bar {
    width: var(--width-side-bar);
    padding: 8px;
    background: var(--color-background-grey-light);
  }

  .institution {
      margin-top: 15px;
      margin-bottom: 15px;
  }

  li {
    margin-bottom: 8px;
  }

    .filter-block {
      margin-top: 15px;
      margin-bottom: 15px;
    }
</style>

<div class="side-bar">
  <div>Filter </div>
  <div class="institution">Institution</div>
  {#if !isEmpty(allFilters)}
    <div>
      <h4>Free text search:</h4>
      <input type="search" bind:value={searchText} on:input={setTextSearch} />
    </div>
    <div>
      <ul>
        {#each filterAttributes as attr}
          <li class="filter-block">
            <h4>{attr + 's'}</h4>
            <ul>
              {#each allFilters[attr] as filter}
                <li
                    on:click={() => setFilters(attr, filter)}
                >
                  <FilterItem
                      {filter}
                      hidden={Boolean(activeFilters[attr]) && activeFilters[attr] !== filter}
                      count={badgeFilterCounts[attr][filter]}
                      active={activeFilters[attr] === filter}
                  />
                </li>
              {/each}
            </ul>
          </li>
          <hr>
        {/each}
      </ul>
    </div>
  {/if}
</div>
