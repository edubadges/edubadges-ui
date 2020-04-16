<script>
  import I18n from "i18n-js";
  import { verifyUserIdentity } from "../../api";
  import {
    userVerifiedByInstitution,
    userInVerificationFlow,
    userLoggedIn,
    userRole,
    authToken
  } from "../../stores/user";
  import AccountCreationSteps from "../../components/guests/AccountCreationSteps.svelte";
  import Button from "../../components/Button.svelte";
  import close from "../../icons/close_smll.svg";

  export let activeStep = 2;

  const stepUp = () => {
    $userLoggedIn = "";
    $userRole = "";
    $authToken = "";
    $userInVerificationFlow = true;
    verifyUserIdentity();
  };

  const closeWelcome = () => {
    $userInVerificationFlow = false;
  };

  $: showCloseButton =
    $userInVerificationFlow === true || $userInVerificationFlow === "true"
      ? true
      : false;
</script>

<style>
  .account-welcome {
    width: 100%;
    background: var(--yellow-light);
    display: flex;
    padding: 20px;
    border-radius: var(--card-border-radius);
    margin: 20px auto;
    position: relative;
  }

  .left {
    width: 50%;
    padding: 20px 40px 0 20px;
  }

  p.info {
    margin-top: 40px;
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

  <div class="left">
    {#if activeStep === 2}
      <h1>{I18n.t('login.createEduId.welcome')}</h1>
      <p>{I18n.t('login.createEduId.awarded')}</p>
      <p class="info">
        {@html I18n.t('login.createEduId.infoStep2')}
      </p>
    {:else}
      <h1>{I18n.t('login.createEduId.verification')}</h1>
      <p>{I18n.t('login.createEduId.infoStep3')}</p>
    {/if}
  </div>
  <div class="right">
    <AccountCreationSteps {activeStep} />
    {#if activeStep === 2}
      <Button
        className="full"
        onClick={stepUp}
        label={I18n.t('login.createEduId.step2')} />
    {/if}

  </div>
</div>
