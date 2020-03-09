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
    padding: 8px;
    background: var(--color-background-grey-light);
  }

  div.search input {
    width: 100%;
    height: 30px;
  }

  input[type="checkbox"] {
    display: none;
  }
</style>

<div class="side-bar">
  <div class="search">
    <p>
      <b>Search</b>
    </p>
    <input bind:value={searchText} />
  </div>

  <p>
    <b>Issuer groups</b>
  </p>

  {#each faculties as fac (fac.entityId)}
    <label>
      <input
        type="checkbox"
        bind:group={facultyIdFilter}
        value={fac.entityId} />
      {fac.name}
    </label>
  {/each}

  <p>
    <b>Issuers</b>
  </p>

  <ul>
    {#each issuers as iss (iss.entityId)}
      <label>
        <input
          type="checkbox"
          bind:group={issuerIdFilter}
          value={iss.entityId} />
        {iss.name}
      </label>
    {/each}
  </ul>
</div>
