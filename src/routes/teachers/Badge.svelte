<script>
  import { onMount } from "svelte";
  import { getTeacherBadge } from "../../api";

  export let slug;

  let badge = [];

  onMount(() => {
    getTeacherBadge(slug).then(
      res => {
        badge = res;
        console.log("badge", res);
      },
      error => console.error("badge", error)
    );
  });
</script>

<div>
  <h3>Badge</h3>
  <li>Name: {badge.name}</li>
  <li>Description: {badge.description}</li>
</div>
