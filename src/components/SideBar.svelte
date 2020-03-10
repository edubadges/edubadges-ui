<script>
  import { onMount } from "svelte";
  import { queryData } from "../api/graphql";
  import I18n from "i18n-js";

  export let searchText;
  export let facultyIdFilter = [];
  export let issuerIdFilter = [];

  const query = `{
    issuers {
      entityId,
      name
    },
    faculties {
      entityId,
      name
    }
  }`;

  let faculties = [];
  let issuers = [];

  onMount(() => {
    queryData(query).then(res => {
      faculties = res.faculties;
      issuers = res.issuers;
    });
  });
</script>

<style>
  .side-bar {
    width: var(--width-side-bar);
    padding: 12px;
    background: var(--color-background-grey-light);
  }

  p {
    font-weight: bold;
  }

  div.search input {
    width: 100%;
    height: 30px;
    border: var(--card-border);
  }

  input[type="checkbox"] {
    display: none;
  }

  label {
    display: block;
    margin: 12px 0;
    cursor: pointer;
    position: relative;

    --button-size: 20px;
    --button-offset: 5px;
  }

  label:not(.active) {
    text-decoration: underline;
  }

  label.active {
    background: white;
    margin-left: -4px;
    padding: 8px calc(var(--button-size) + (2 * var(--button-offset))) 8px 3px;
    border: var(--card-border);
  }

  label.active::after {
    content: "x";
    color: var(--color-text-grey);
    font-weight: bold;
    width: var(--button-size);
    height: var(--button-size);
    border: 1px solid var(--color-text-grey);
    border-radius: 50%;
    position: absolute;
    text-align: center;
    right: var(--button-offset);
    line-height: 18px;
  }

  label.inactive {
    color: var(--color-text-light-grey);
  }
</style>

<div class="side-bar">
  <div class="search">
    <p>{I18n.t('teacher.sidebar.search')}</p>
    <input type="text" bind:value={searchText} />
  </div>

  <div class="filter">
    <p>{I18n.t('teacher.sidebar.filters.faculties')}</p>

    {#each faculties as fac (fac.entityId)}
      <label
        class:active={facultyIdFilter.includes(fac.entityId)}
        class:inactive={facultyIdFilter.length && !facultyIdFilter.includes(fac.entityId)}>
        <input
          type="checkbox"
          bind:group={facultyIdFilter}
          value={fac.entityId} />
        {fac.name}
      </label>
    {/each}
  </div>

  <div class="filter">
    <p>{I18n.t('teacher.sidebar.filters.issuers')}</p>

    {#each issuers as iss (iss.entityId)}
      <label
        class:active={issuerIdFilter.includes(iss.entityId)}
        class:inactive={issuerIdFilter.length && !issuerIdFilter.includes(iss.entityId)}>
        <input
          type="checkbox"
          bind:group={issuerIdFilter}
          value={iss.entityId} />
        {iss.name}
      </label>
    {/each}
  </div>
</div>
