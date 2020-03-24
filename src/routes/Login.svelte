<script>
  import I18n from "i18n-js";
  import { Button } from "../components";
  import {
    AccountCreationSteps,
    LoginButton,
    CardSubtext
  } from "../components/guests";
  import { role } from "../util/role";
  import { userRole } from "../stores/user";
  import { getService } from "../util/getService";
  import { requestLoginToken } from "../api";
  import { navigateBack } from "../icons";

  const logIn = chosenRole => {
    $userRole = chosenRole;
    const service = getService(chosenRole);
    requestLoginToken(service);
  };

  let visible = true;

  const toggleLoginCreateAccount = () => (visible = !visible);
</script>

<style>
  .login-page {
    flex: 1;

    --login-spacing: 30px;
    padding: var(--login-spacing) calc(var(--login-spacing) + 10px);

    display: flex;
    flex-direction: column;
  }

  .login-cards {
    margin-right: calc(var(--login-spacing) * -1);

    display: flex;
    flex-wrap: wrap;
  }

  .login-element {
    flex: 1;

    position: relative;

    display: flex;
    flex-direction: column;

    min-width: 315px;
    margin-right: var(--login-spacing);
  }

  .login-card {
    flex: 1;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20px;
    padding: 20px;

    border: var(--card-border);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);

    text-align: center;
  }

  .action {
    margin-top: 20px;
    font-size: 30px;
  }

  .titleAndBackButton {
    width: 100%;
  }

  .navigateBackButton {
    float: left;
    height: 30px;
    width: 30px;
    cursor: pointer;
  }

  .account-creation-steps {
    margin-top: 20px;
  }

  .create-account-button {
    margin-top: 20px;
  }

  .overlay::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: gray;
    opacity: 0.5;
  }

  @media only screen and (max-width: 819px) {
    .small-screen-none {
      display: none;
    }
  }

  .text-align-left {
    text-align: left;
  }

  .none {
    display: none;
  }
</style>

<div class="login-page">
  <h2>{I18n.t('login.title')}</h2>

  <p>{I18n.t('login.description')}</p>

  <div class="login-cards">
    <div class="login-element">
      <div class="login-card" class:none={!visible}>
        <h1 class="bold">
          {@html I18n.t('login.student.title')}
        </h1>
        <h1>{I18n.t('login.student.subtitle')}</h1>
        <img
          src="https://via.placeholder.com/200?text=Placeholder"
          alt="student login" />
        <p class="action">{I18n.t('login.student.action')}</p>
        <LoginButton
          label={I18n.t('login.student.button')}
          onClick={() => logIn(role.STUDENT)} />
      </div>

      <div class="login-card" class:none={visible}>
        <div class="titleAndBackButton">
          <span
            class="navigateBackButton"
            on:click={() => toggleLoginCreateAccount()}>
            {@html navigateBack}
          </span>
          <span>
            <h1 class="bold">
              {@html I18n.t('login.createEduId.title')}
            </h1>
          </span>
        </div>
        <h1>{I18n.t('login.createEduId.subtitle')}</h1>
        <p class="text-align-left">{I18n.t('login.createEduId.require')}</p>
        <div class="account-creation-steps">
          <AccountCreationSteps activeStep={1} />
        </div>
        <div class="create-account-button">
          <Button
            onClick={() => alert('make account')}
            label={I18n.t('login.createEduId.step1')} />
        </div>
      </div>

      {#if visible}
        <CardSubtext
          styleAsLink
          handleClick={toggleLoginCreateAccount}
          lineOne={I18n.t('login.student.accountCreation.askAccountNo')}
          lineTwo={I18n.t('login.student.accountCreation.startAccount')} />
      {:else}
        <CardSubtext
          styleAsLink
          handleClick={toggleLoginCreateAccount}
          lineOne={I18n.t('login.createEduId.askAccountYes')}
          lineTwo={I18n.t('login.createEduId.logInAccount')} />
      {/if}

    </div>

    <div class="login-element">
      <div class="login-card {visible ? '' : 'overlay small-screen-none'}">
        <h1 class="bold">
          {@html I18n.t('login.teacher.title')}
        </h1>
        <h1>{I18n.t('login.teacher.subtitle')}</h1>
        <img
          src="https://via.placeholder.com/200?text=Placeholder"
          alt="teacher login" />
        <p class="action">{I18n.t('login.teacher.action')}</p>
        <LoginButton
          label={I18n.t('login.teacher.button')}
          onClick={() => logIn(role.TEACHER)} />
      </div>

      <CardSubtext
        hidden={!visible}
        lineOne={I18n.t('login.teacher.accountCreation.askAccount')}
        lineTwo={I18n.t('login.teacher.accountCreation.startAccount')} />

    </div>
  </div>
</div>
