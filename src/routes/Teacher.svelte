<script>
  import { Badges } from "./teachers";
  import { SideBar } from "../components";

  export let bookmark;

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];
</script>

<style>
  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

<SideBar />

<div class="content">
  <svelte:component this={currentPage.component} />
</div>
