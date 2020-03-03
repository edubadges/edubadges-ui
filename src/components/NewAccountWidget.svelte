<script>
  import AccountCreationSteps from "../routes/AccountCreationSteps.svelte";
  import I18n from "i18n-js";

  let expanded = true;
</script>

<style>
  .widget {
    margin-top: 10px;
    width: 100%;
  }

  .ask-account {
    background-color: whitesmoke;
    padding: 10px;
    border-radius: var(--card-border-radius);
    text-align: left;
    margin-bottom: 20px;
  }

  .text-align-left {
      text-align: left;
  }

  .float-right {
      float: right;
  }

  .hidden {
    display: none;
  }

  .account-creation-process {
    background-color: whitesmoke;
    padding: 20px 0;
    margin: 20px 0;
  }

  .account-creation-process-message {
      margin-bottom: 15px;
  }

  .create-account-button {
    width: 100%;
    background-color: var(--color-primary-blue);
    border: 0;
    color: white;
    height: 40px;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
  }
</style>

<div class="widget">
  <div class="ask-account" on:click={() => expanded = !expanded}>
    {@html I18n.t('login.student.accountCreation.askAccount')}
    <div class="float-right">{expanded}</div>
  </div>
  <div class={expanded ? '' : 'hidden'}>
    <div class="text-align-left">{I18n.t('login.student.accountCreation.note')}</div>
    <div class="account-creation-process">
      <div class="account-creation-process-message">{I18n.t('login.student.accountCreation.follow')}</div>
      <AccountCreationSteps />
    </div>
    <button class="create-account-button">{I18n.t('login.student.accountCreation.createAccountButton')}</button>
  </div>
</div>
