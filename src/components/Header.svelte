<script>
  import I18n from "i18n-js";
  import logo from "../img/logo.svg";
  import { link, navigate } from "svelte-routing";
  import Button from "./Button.svelte";
  import { userLoggedIn, userRole, authToken } from "../stores/user";

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
    justify-content: space-between;
    align-items: center;

    padding-top: 4px;
    padding-bottom: 4px;

    background-color: var(--color-background-grey-dark);
  }
</style>

<header class="header">
  <a href="/" use:link>
    {@html logo}
  </a>
  {#if $userLoggedIn}
    <Button
      label={I18n.t('header.logout')}
      onClick={logoutUser}
      className="cancel xs" />
  {/if}
</header>
