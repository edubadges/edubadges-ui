<script>
  import { onMount } from "svelte";
  import { teacherMainRoutes } from "../util/routes";
  import { SideBar } from "../components";

  export let bookmark;

  let searchText;
  let facultyIdFilter;
  let issuerIdFilter;

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

<SideBar {bookmark} bind:searchText bind:facultyIdFilter bind:issuerIdFilter />

{#if currentPage}
  <div class="content">
    <svelte:component
      this={currentPage.component}
      bind:searchText
      bind:facultyIdFilter
      bind:issuerIdFilter />
  </div>
{/if}
