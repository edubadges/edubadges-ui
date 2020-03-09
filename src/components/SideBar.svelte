<script>
  import { onMount } from "svelte";
  import { queryData } from "../api/graphql";
  import { filterData, toggleFilter, filterCounts, freeTextSearch } from "../util/filterFunctions";
  import { isEmpty } from "../util/emptyObject"
  import FilterItem from "./FilterItem.svelte";
  import I18n from "i18n-js";

  export let filteredBadgeIds;

  let institutionName = '';

  let data = [];
  let filteredData = [];
  let filterAttributes = ['Issuer Group', 'Issuer'];
  const filterListMaxLength = 4;

  let allFilters = {};
  let activeFilters = {};
  let dataFilterCounts = {};
  let expandedList = [];

  const query = `{
    currentUser {
      institution {
        name
      }
    },
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
    },
    issuers {
      name
    },
    faculties {
      name
    }
  }`;

  onMount(() => {
    queryData(query).then(
      ({ badgeClasses, issuers, faculties, currentUser }) => {
        data = badgeClasses;
        for (const badge of data) {
          badge["Issuer Group"] = badge["issuer"]["faculty"]["name"];
          badge["Issuer"] = badge["issuer"]["name"];
        }
        institutionName = currentUser.institution.name;
        filteredData = data;
        allFilters = {
          "Issuer Group": faculties.map(el => el.name),
          Issuer: issuers.map(el => el.name)
        };
        filteredBadgeIds = filteredData.map(el => el["entityId"]);
        dataFilterCounts = filterCounts(allFilters, filteredData);
      }
    );
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

  .list-header {
    margin-bottom: 8px;
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
  <div>Filter {I18n.t('teacher.badges.title')}</div>
  <div class="institution">{institutionName}</div>
  {#if !isEmpty(allFilters)}
    <div>
      <h4>Search:</h4>
      <input type="search" size="35" bind:value={searchText} on:input={setTextSearch} />
    </div>
      <div>
        <ul>
          {#each filterAttributes as attr}
            <li class="filter-block">
              <h4 class="list-header">{attr + 's'}</h4>
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
