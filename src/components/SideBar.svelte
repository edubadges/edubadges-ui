<script>
  import { onMount } from "svelte";
  import { queryData } from "../api/graphql";

  let _faculties = [];
  let issuers = [];

  const query = `{
      faculties {
        entityId,
        name,
        issuers {
          entityId,
          name
        }
      }
    }`;

  onMount(() => {
    queryData(query).then(({ faculties }) => {
      _faculties = faculties;
      issuers = faculties.map(({ issuers }) => issuers).flat();
    });
  });
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
  <p>
    <b>Filter badgeclasses</b>
  </p>

  <p>
    <b>Issuer groups</b>
  </p>

  <ul>
    {#each _faculties as fac (fac.entityId)}
      <li>{fac.name}</li>
    {/each}
  </ul>

  <p>
    <b>Issuers</b>
  </p>

  <ul>
    {#each issuers as iss (iss.entityId)}
      <li>{iss.name}</li>
    {/each}
  </ul>
</div>
