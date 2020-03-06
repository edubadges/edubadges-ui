<script>
  import { Badges } from "./teachers";
  import { SideBar } from "../components";

  export let bookmark;

  const pages = [{ bm: "badges", component: Badges }];
  const currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];

  let filteredBadgeIds = [];
</script>

<style>
  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

<SideBar
    bind:filteredBadgeIds={filteredBadgeIds}
/>

<div class="content">
    <svelte:component
        this={currentPage.component}
        bind:filteredBadgeIds={filteredBadgeIds}
    />
</div>
