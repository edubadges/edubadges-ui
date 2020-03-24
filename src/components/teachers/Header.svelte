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
    align-self: flex-end;
    white-space: nowrap;
  }

  nav a {
    padding: var(--ver-padding-s) var(--hor-padding-m);
    font-weight: bold;
    border-radius: var(--button-border-radius);
    margin-right: 20px;
  }

  nav a:not(.active) {
    background: var(--color-background-grey-light);
  }

  nav a.active {
    background: white;
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
