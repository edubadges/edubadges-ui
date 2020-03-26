<script>
  import { link } from "svelte-routing";
  import { LogoutButton } from "../components";
  import logo from "../img/logo.svg";

  export let logout;
</script>

<style>
  header {
    display: flex;
    align-items: center;

    padding-top: var(--ver-padding-s);
    padding-bottom: var(--ver-padding-s);
    padding-right: var(--hor-padding-s);

    background-color: var(--color-background-grey-dark);
  }

  a {
    margin-left: var(--hor-padding-s);
    width: calc(var(--width-side-bar) - var(--hor-padding-s));
  }

  a :global(svg.edubadges-logo) {
    vertical-align: middle;
    width: 150px;
  }
</style>

<header class="header">
  <a href="/" use:link>
    {@html logo}
  </a>
  <slot />
  {#if logout}
    <LogoutButton />
  {/if}
</header>
