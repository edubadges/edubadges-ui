<script>
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { Badges, Issuers } from "./teachers";

  export let bookmark;

  const pages = [
    { path: "badges", component: Badges },
    { path: "issuers", component: Issuers }
  ];

  let currentPage = pages[0];

  onMount(() => {
    currentPage = pages.find(({ path }) => path === bookmark) || pages[0];
  });
</script>

<style>
  nav a.active {
    font-weight: bold;
    color: var(--color-primary-green);
  }
</style>

<div>
  <nav>
    {#each pages as { path }}
      <a
        href={path}
        class="button"
        use:link
        class:active={path === currentPage.path}>
        {path}
      </a>
    {/each}
  </nav>

  <svelte:component this={currentPage.component} />
</div>
