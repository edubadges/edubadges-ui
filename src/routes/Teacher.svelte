<script>
  import { onMount } from "svelte";
  import { teacherMainRoutes } from "../util/routes";
  import { SideBar } from "../components";

  export let bookmark;

  let currentPage;

  onMount(() => {
    currentPage = teacherMainRoutes.find(route => route.bookmark === bookmark);
  });
</script>

<style>
  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

<SideBar {bookmark} />

{#if currentPage}
  <div class="content">
    <svelte:component this={currentPage.component} />
  </div>
{/if}
