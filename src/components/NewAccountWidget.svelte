<script>
  import AccountCreationSteps from "../routes/AccountCreationSteps.svelte";
  import I18n from "i18n-js";

  let expanded = true;
</script>

<style>
  .widget {
    margin-top: 10px;
    width: 100%;
    background-color: cadetblue;
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
</style>

<div class="widget">
  <div class="text-align-left" on:click={() => expanded = !expanded}>
    {I18n.t('login.student.accountCreation.askAccount')}
    <div class="float-right">{expanded}</div>
  </div>
  <div class={expanded ? '' : 'hidden'}>
    <div class="text-align-left">{I18n.t('login.student.accountCreation.note')}</div>
    <div>{I18n.t('login.student.accountCreation.follow')}</div>
    <AccountCreationSteps />
    <div>{I18n.t('login.student.accountCreation.createAccountButton')}</div>
  </div>
</div>
