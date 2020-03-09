<script>
  import { onMount } from "svelte";
  import { teacherMainRoutes } from "../util/routes";
  import { SideBar } from "../components";

  export let bookmark;

  let searchText;
  let currentPage = teacherMainRoutes[0];

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

<SideBar bind:searchText />

<div class="content">
  <svelte:component this={currentPage.component} bind:searchText />
</div>
