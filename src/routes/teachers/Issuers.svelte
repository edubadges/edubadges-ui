<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getIssuersMock } from "../../api";
  import { getFilters, toggleFilter } from "../../util/filter";

  let issuers = [];
  let possibleFilters = {};
  let activeFilters = {};
  const filterAttributes = ["name"];

  onMount(() => {
    getIssuersMock().then(
      res => {
        issuers = res;
        possibleFilters = getFilters(issuers, filterAttributes);
      },
      error => console.error("issuers", error)
    );
  });
</script>

<div>
  <div style="width: 25%; display: inline-block">
    <ul>
      {#each Object.entries(possibleFilters) as [attr, filters]}
        <li>
          <h4>{attr}</h4>
          <ul>
            {#each filters as filter}
              <li on:click={() => toggleFilter(activeFilters, attr, activeFilters[attr])}>{filter}</li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </div>

  <div style="width: 70%; display: inline-block">
    <h3>Issuers</h3>
    {#each issuers as issuer}
      <li>
        <a href={`/issuer/${issuer.slug}`} use:link>
          {issuer.name} (badges: {issuer.badgeClassCount})
        </a>
      </li>
    {/each}
  </div>
</div>
