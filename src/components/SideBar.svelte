<script>
  import { isEmpty } from "../util/emptyObject"
  import {collectFilters, filterData, toggleFilter, filterCounts, freeTextSearch} from "../util/filterFunctions";
  import { onMount } from "svelte";
  import FilterItem from "./FilterItem.svelte";
  import { queryData } from "../api/graphql";

  export let institution = '';
  export let filterSubject = '';

  export let filteredBadgeIds;

  let data = [];
  let filteredData = [];
  let filterAttributes = ['Issuer Group', 'Issuer'];
  const filterListMaxLength = 2;

  let allFilters = {};
  let activeFilters = {};
  let dataFilterCounts = {};
  let expandedList = [];


  const query = `{
    badgeClasses {
      name,
      image,
      entityId,
      issuer {
        name,
        faculty {
          name
        }
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      data = res['badgeClasses'];
      console.log(data);
      for (const badge of data) {
        badge['Issuer Group'] = badge['issuer']['faculty']['name'];
        badge['Issuer'] = badge['issuer']['name'];
      }
      filteredData = data;
      allFilters = collectFilters(data, filterAttributes);
      dataFilterCounts = filterCounts(allFilters, filteredData);
    })
  });

  const setFilters = (attr, filterValue) => {
    if(Boolean(activeFilters[attr]) && activeFilters[attr] !== filterValue) {  // can't click on hidden filter
      return;
    }
    activeFilters = toggleFilter(activeFilters, attr, filterValue);
    filteredData = filterData(freeTextSearch(data, searchText, additionalSearchFields), activeFilters);
    filteredBadgeIds = filteredData.map(el => el['entityId']);
    dataFilterCounts = filterCounts(allFilters, filteredData);
  };

  let searchText = '';
  const additionalSearchFields = ['name'];
  const setTextSearch = () => {
    filteredData = filterData(freeTextSearch(data, searchText, additionalSearchFields), activeFilters);
    filteredBadgeIds = filteredData.map(el => el['entityId']);
    dataFilterCounts = filterCounts(allFilters, filteredData);
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
                          count={dataFilterCounts[attr][filterValue]}
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
                          count={dataFilterCounts[attr][filterValue]}
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
