<script>
  import I18n from "i18n-js";
  import {
    userHasClosedWelcome,
    userLoggedIn,
    userRole,
    authToken
  } from "../../stores/user";

  import close from "../../icons/close_smll.svg";

  const closeWelcome = () => {
    $userHasClosedWelcome = true;
  };

  $: showCloseButton = !$userHasClosedWelcome;
</script>

<style lang="scss">
  .account-welcome {
    width: 100%;
    background: var(--yellow-light);
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: var(--card-border-radius);
    margin: 20px auto;
    position: relative;
  }

  h1 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 25px;
    font-size: 18px;

    &:last-child {
      margin-bottom: 5px;
    }
  }

  div.close {
    position: absolute;
    right: 17px;
    top: 5px;
    cursor: pointer;
  }
</style>

<div class="account-welcome">
  {#if showCloseButton}
    <div class="close" on:click={closeWelcome}>
      {@html close}
    </div>
  {/if}

  <h1>{I18n.t('login.createEduId.welcome')}</h1>
  <p>{I18n.t('login.createEduId.info')}</p>
  <p>{I18n.t('login.createEduId.awarded')}</p>

</div>
