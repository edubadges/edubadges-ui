<script>
  import { isEmpty } from "../util/emptyObject"
  import {collectFilters, filteredData, toggleFilter, filterCounts, freeTextSearch} from "../util/filterFunctions";
  import { onMount } from "svelte";
  import FilterItem from "./FilterItem.svelte";

  export let filterAttributes = [];
  export let teacherBadgesData = {};
  export let institution = '';
  export let filterSubject = '';

  let allBadges = [];
  export let filteredBadges = [];
  let allFilters = {};
  let activeFilters = {};
  let badgeFilterCounts = {};
  let expandedList = [];

  const filterListMaxLength = 2;

  onMount(() => {
    allBadges = teacherBadgesData;
    filteredBadges = allBadges;
    allFilters = collectFilters(allBadges, filterAttributes);
    badgeFilterCounts = filterCounts(allFilters, filteredBadges);
  });

  const setFilters = (attr, filterValue) => {
    activeFilters = toggleFilter(activeFilters, attr, filterValue);
    filteredBadges = filteredData(freeTextSearch(allBadges, searchText, additionalSearchFields), activeFilters);
    badgeFilterCounts = filterCounts(allFilters, filteredBadges);
  };

  let searchText = '';
  const additionalSearchFields = ['name'];
  const setTextSearch = () => {
    filteredBadges = filteredData(freeTextSearch(allBadges, searchText, additionalSearchFields), activeFilters);
    badgeFilterCounts = filterCounts(allFilters, filteredBadges);
  };

  const expandFilterList = (filterValue) => {
    expandedList = [filterValue, ...expandedList];
  };

  const shrinkFilterList = (filterValue) => {
    expandedList = expandedList.filter(el => el !== filterValue);
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

  .expand-shrink-button {
    cursor:pointer;
    color:blue;
    text-decoration:underline;
  }
</style>

<div class="side-bar">
  <div>Filter {filterSubject}</div>
  <div class="institution">{institution}</div>
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
              {#if !allFilters[attr].length > filterListMaxLength || expandedList.includes(attr)}
                {#each allFilters[attr] as filterValue}
                  <li
                      on:click={() => setFilters(attr, filterValue)}
                  >
                    <FilterItem
                        {filterValue}
                        hidden={Boolean(activeFilters[attr]) && activeFilters[attr] !== filterValue}
                        count={badgeFilterCounts[attr][filterValue]}
                        active={activeFilters[attr] === filterValue}
                    />
                  </li>
                {/each}
              {:else}
                {#each allFilters[attr].slice(0, filterListMaxLength) as filterValue}
                  <li
                      on:click={() => setFilters(attr, filterValue)}
                  >
                    <FilterItem
                        {filterValue}
                        hidden={Boolean(activeFilters[attr]) && activeFilters[attr] !== filterValue}
                        count={badgeFilterCounts[attr][filterValue]}
                        active={activeFilters[attr] === filterValue}
                    />
                  </li>
                {/each}
              {/if}
              {#if allFilters[attr].length > filterListMaxLength}
                {#if !expandedList.includes(attr) && !activeFilters[attr]}
                  <li class="expand-shrink-button" on:click={() => expandFilterList(attr)}>show all</li>
                {:else if !activeFilters[attr]}
                  <li class="expand-shrink-button" on:click={() => shrinkFilterList(attr)}>show less</li>
                {/if}
              {/if}
            </ul>
          </li>
          <hr>
        {/each}
      </ul>
    </div>
  {/if}
</div>
