<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getIssuer, getTeacherBadges } from "../../api";
  import { collectFilters, toggleFilter, filteredData, setVisibilityFilters } from "../../util/filter";
  import { isEmpty } from "../../util/emptyObject";

  let badges = [];
  let allFilters = {};
  let activeFilters = {};
  let visibleFilters = {};
  const filterAttributes = ["myFaculty", "myIssuer"];
  let filteredBadges = [];

  onMount(() => {
    getTeacherBadges().then(teacherBadgesData => {
      for (const badge of teacherBadgesData) {
        const issuerSlug = badge.issuer.split('/').pop();
        getIssuer(issuerSlug).then(issuerData => {
          badge['myFaculty'] = issuerData['faculty']['name'];
          badge['myIssuer'] = issuerData['name'];

          badges = teacherBadgesData;
          filteredBadges = badges;
          allFilters = collectFilters(badges, filterAttributes);
        })
      }
    })
  });

  const setFilters = (attr, filter) => {
    activeFilters = toggleFilter(activeFilters, attr, filter);
    filteredBadges = filteredData(badges, activeFilters);
    visibleFilters = setVisibilityFilters(allFilters, filteredBadges);
  };

  export let scope = "";
</script>

<style>
  h2 span {
    color: var(--color-text-blue);
  }

  .badges {
    --badge-margin-right: 20px;

    display: flex;
    flex-wrap: wrap;

    margin-right: calc(var(--badge-margin-right) * -1);
  }

  div.badge {
    margin-bottom: 20px;
    margin-right: var(--badge-margin-right);
  }

  div.image {
    width: 200px;
    height: 200px;

    padding: 12px;
    margin-bottom: 6px;

    border: var(--card-border);
    border-radius: 7px;
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

{#if !isEmpty(allFilters)}
  <div>
    <div style="width: 25%; display: inline-block; overflow: scroll">
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

    <div class="badges" style="width: 70%; display: inline-block">
      <h2>
        {I18n.t('teacher.badges.title')}
        {#if scope}
          <span>in</span>
          {scope}
        {/if}
      </h2>
      {#each filteredBadges as badge}
        <div class="badge">
          <div class="image">
            <img src={badge.image} alt={`image for ${badge.name}`} />
          </div>
          <b>{badge.name}</b>
        </div>
      {/each}
    </div>
  </div>
{/if}