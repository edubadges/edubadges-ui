<script>
  import { getContext } from "svelte";
  import { link, navigate } from "svelte-routing";
  import { ROUTER } from "svelte-routing/src/contexts";
  import I18n from "i18n-js";

  import logo from "../img/logo.svg";
  import Button from "./Button.svelte";
  import { userLoggedIn, userRole, authToken } from "../stores/user";

  export let tabs = [];

  let currentPath = "";
  let { activeRoute } = getContext(ROUTER);
  $: if ($activeRoute) currentPath = $activeRoute.uri;

  const logoutUser = () => {
    $userLoggedIn = "";
    $userRole = "";
    $authToken = "";
    navigate("/");
  };
</script>

<style>
  header {
    display: flex;
    align-items: center;

    padding-top: 4px;
    padding-bottom: 4px;
    padding-right: var(--hor-padding-s);

    background-color: var(--color-background-grey-dark);
  }

  a.logo {
    margin-left: var(--hor-padding-s);
    width: calc(var(--width-side-bar) - var(--hor-padding-s));
  }

  nav {
    flex: 1;
    align-self: flex-end;
  }

  nav a {
    padding: 6px 20px;
    font-weight: bold;
    border-radius: var(--button-border-radius);
  }

  nav a:not(.active) {
    background: var(--color-background-grey-light);
  }

  nav a.active {
    background: white;
  }

  nav a:not(:last-child) {
    margin-right: 20px;
  }
</style>

<header class="header">
  <a href="/" use:link class="logo">
    {@html logo}
  </a>

  <nav>
    {#each tabs as tab}
      <a href={tab} use:link class="button" class:active={currentPath === tab}>
        {I18n.t(['header', 'nav', tab])}
      </a>
    {/each}
  </nav>

  {#if $userLoggedIn}
    <Button
      label={I18n.t('header.logout')}
      onClick={logoutUser}
      className="cancel xs" />
  {/if}
</header>
