<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getIssuers } from "../../api";

  let issuers = [];

  onMount(() => {
    getIssuers().then(
      res => {
        issuers = res;
        console.log("issuers", res);
      },
      error => console.error("issuers", error)
    );
  });
</script>

<div>
  <h3>Issuers</h3>
  {#each issuers as issuer}
    <li>
      <a href={`/issuer/${issuer.slug}`} use:link>
        {issuer.name} (badges: {issuer.badgeClassCount})
      </a>
    </li>
  {/each}
</div>
