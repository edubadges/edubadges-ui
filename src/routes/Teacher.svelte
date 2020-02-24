<script>
  import { onMount } from "svelte";
  import { Badges } from "./teachers";

  export let bookmark;

  const pages = [{ bm: "badges", component: Badges }];

  let currentPage = pages[0];

  onMount(() => {
    currentPage = pages.find(({ bm }) => bm === bookmark) || pages[0];
  });
</script>

<style>
  .content {
    flex: 1;
    padding: 30px 20px;
  }
</style>

<div class="content">
  <svelte:component this={currentPage.component} />
</div>
