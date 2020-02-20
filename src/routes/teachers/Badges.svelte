<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getTeacherBadges } from "../../api";

  let badges = [];

  onMount(() => {
    getTeacherBadges().then(
      res => {
        badges = res;
        console.log("badges", res);
      },
      error => console.error("badges", error)
    );
  });
</script>

<div>
  <h3>Badges</h3>
  {#each badges as badge}
    <li>
      <a href={`/badge/${badge.slug}`} use:link>{badge.name}</a>
    </li>
  {/each}
</div>
