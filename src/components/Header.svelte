<script>
  import I18n from "i18n-js";
  import { navigate, link } from "svelte-routing";
  import { clickOutside } from "../util/clickOutside.js";
  import logo from "../img/logo.svg";
  import { chevronUp, chevronDown } from "../icons";

  import {
    userLoggedIn,
    userRole,
    authToken,
    userVerifiedByInstitution,
    userInVerificationFlow,
    redirectPath
  } from "../stores/user";

  const logoutUser = () => {
    $userLoggedIn = "";
    $userRole = "";
    $authToken = "";
    $userVerifiedByInstitution = false;
    $userInVerificationFlow = false;
    $redirectPath = "";

    navigate("/");
  };

  let menuOpen = false;
</script>

<style lang="scss">
  header {
    display: flex;
    align-items: center;

    padding-top: var(--ver-padding-s);
    padding-bottom: var(--ver-padding-s);
    padding-right: var(--hor-padding-s);
  }

  .slot-container {
    flex: 1;
  }

  a {
    margin-left: var(--hor-padding-s);
    width: calc(var(--width-side-bar) - var(--hor-padding-s));
  }

  a :global(svg.edubadges-logo) {
    vertical-align: middle;
    width: 150px;
  }

  .expand-menu {
    position: relative;

    :global(svg.chevron-down, svg.chevron-up) {
      width: 28px;
      fill: var(--purple);
    }

    div.menu.show {
      display: block;
      position: absolute;
      right: 0;
      padding: var(--ver-padding-m) var(--hor-padding-m);
      min-width: 180px;
    }

    div.menu:not(.show) {
      display: none;
    }
  }
</style>

<header>
  <a href="/" use:link>
    {@html logo}
  </a>

  <div class="slot-container">
    <slot />
  </div>

  {#if $userLoggedIn}
    <div
      class="expand-menu click"
      on:click={() => (menuOpen = !menuOpen)}
      use:clickOutside
      on:clickOutside={() => (menuOpen = false)}>
      {@html menuOpen ? chevronUp : chevronDown}
      <div class="menu card" class:show={menuOpen}>
        <div on:click={logoutUser}>{I18n.t('header.logout')}</div>
      </div>
    </div>
  {/if}
</header>
