<script>
  import { isEmpty } from "../util/emptyObject"
  import { collectFilters, filteredData, toggleFilter, setVisibilityFilters } from "../util/filter";
  import { onMount } from "svelte";

  export let filterAttributes = [];
  export let teacherBadgesData = {};

  let allBadges = [];
  export let filteredBadges = [];
  let allFilters = {};
  let activeFilters = {};
  let visibleFilters = {};

  onMount(() => {
    allBadges = teacherBadgesData;
    filteredBadges = allBadges;
    allFilters = collectFilters(allBadges, filterAttributes);
    visibleFilters = allFilters;
  });

  const setFilters = (attr, filter) => {
    activeFilters = toggleFilter(activeFilters, attr, filter);
    filteredBadges = filteredData(allBadges, activeFilters);
    visibleFilters = setVisibilityFilters(allFilters, filteredBadges);
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

  .filter-item {
    border: solid black 1px;
  }

  .filter-active {
    background-color: deepskyblue;
  }

  .filter-hidden {
    visibility: hidden;
  }
</style>


<div class="side-bar">
  <button on:click={() => console.log(filteredBadges)}>print</button>
  {#if !isEmpty(allFilters)}
    <div>
      <div style="display: inline-block; overflow: scroll">
        <ul>
          {#each filterAttributes as attr}
            <li>
              <h4>{attr}</h4>
              <ul>
                {#each allFilters[attr] as filter}
                  <li
                      class="filter-item {activeFilters[attr] === filter ? 'filter-active' : ''} {isEmpty(visibleFilters) || visibleFilters[attr].includes(filter) ? '' : 'filter-hidden'}"
                      on:click={() => setFilters(attr, filter)}
                  >
                    {filter}
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
