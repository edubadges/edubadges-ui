<script>
  import { link, navigate } from "svelte-routing";
  import I18n from "i18n-js";
  import { currentPath } from "../../stores/currentPath";

  import { Header } from "../../components";

  $: tabs = [
    {
      path: "/",
      active: $currentPath === "/",
      name: "badgeclasses"
    },
    {
      path: "/manage/institution/issuers",
      active: $currentPath.includes("/manage"),
      name: "manage"
    }
  ];
</script>

<style>
  nav {
    white-space: nowrap;
  }

  nav a {
    font-weight: bold;
    letter-spacing: 0.34px;

    padding: 4px 0;
    margin-right: 30px;

    border-bottom-width: 3px;
    border-bottom-style: solid;
  }

  nav a:not(.active) {
    color: var(--text-grey-dark);
    border-color: transparent;
  }

  nav a.active {
    color: var(--purple);
    border-color: var(--purple);
  }
</style>

<Header logout>
  <nav>
    {#each tabs as { path, active, name } (path)}
      <a href={path} use:link class="button" class:active>
        {I18n.t(['header', 'nav', name])}
      </a>
    {/each}
  </nav>
</Header>
