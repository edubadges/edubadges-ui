<script>
  import {link} from "svelte-routing";
  import I18n from "i18n-js";
  import {currentPath} from "../../stores/currentPath";
  import {userLoggedIn} from "../../stores/user";

  import {Header} from "../../components";

  $: tabs = [
    {
      path: "/",
      active: $currentPath && !$currentPath.includes("/manage") && !$currentPath.includes("/users")
        && !$currentPath.includes("/profile") && !$currentPath.includes("/permissions")
        && !$currentPath.includes("/public"),
      name: "badgeclasses"
    },
    {
      path: "/manage/institution/issuers",
      active: $currentPath && $currentPath.includes("/manage"),
      name: "manage"
    },
    {
      path: "/users",
      active: $currentPath && $currentPath.includes("/users"),
      name: "users"
    }
  ];
</script>

<style>
  nav {
    white-space: nowrap;
  }

  nav a {
    font-weight: var(--medium);
    font-size: 18px;
    letter-spacing: 0.34px;
    font-family: Proxima Nova;

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
    {#if $userLoggedIn && $userLoggedIn !== "false"}
      {#each tabs as { path, active, name } (path)}
        <a href={path} use:link class="button" class:active>
          {I18n.t(['header', 'nav', name])}
        </a>
      {/each}
    {/if}
  </nav>
</Header>
