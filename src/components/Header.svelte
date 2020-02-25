<script>
  import I18n from "i18n-js";
  import { link, navigate } from "svelte-routing";

  import logo from "../img/logo.svg";
  import Button from "./Button.svelte";
  import { userLoggedIn, userRole, authToken } from "../stores/user";
  import { role } from "../util/role";

  const logoutUser = () => {
    $userLoggedIn = "";
    $userRole = "";
    $authToken = "";
    navigate("/");
  };

  const tabs =
    $userRole === role.TEACHER
      ? [{ name: I18n.t("header.nav.badges"), path: "/" }]
      : [];
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
    background: white;
    padding: 6px 20px;
    font-weight: bold;
    border-radius: var(--button-border-radius);
  }
</style>

<header class="header">
  <a href="/" use:link class="logo">
    {@html logo}
  </a>

  <nav>
    {#each tabs as { name, path }}
      <a href={path} class="button" use:link>{name}</a>
    {/each}
  </nav>

  {#if $userLoggedIn}
    <Button
      label={I18n.t('header.logout')}
      onClick={logoutUser}
      className="cancel xs" />
  {/if}
</header>
