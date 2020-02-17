<script>
  import { onMount } from "svelte";
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
    <li>{badge.name}</li>
  {/each}
</div>
