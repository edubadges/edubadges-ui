<script>
  import { onMount } from "svelte";
  import { teacherMainRoutes } from "../util/routes";

  export let bookmark;
  let currentPage;

  onMount(() => {
    currentPage = teacherMainRoutes.find(route => route.bookmark === bookmark);
  });
</script>

{#if currentPage}
  <svelte:component this={currentPage.component} />
{/if}
