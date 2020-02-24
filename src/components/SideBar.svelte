<script>
  export let faculties = [];
  export let issuers = [];
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
    {#each faculties as fac (fac.id)}
      <li>{fac.name}</li>
    {/each}
  </ul>

  <p>
    <b>Issuers</b>
  </p>

  <ul>
    {#each issuers as iss (iss.id)}
      <li>{iss.name}</li>
    {/each}
  </ul>
</div>
