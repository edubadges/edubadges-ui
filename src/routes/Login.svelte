<script>
  import I18n from "i18n-js";
  import LoginButton from "../components/LoginButton.svelte";
  import { role } from "../util/role";
  import { userRole } from "../stores/user";
  import { getService } from "../util/getService";
  import { requestLoginToken } from "../api";
  import AccountCreationSteps from "./AccountCreationSteps.svelte";
  import Button from "../components/Button.svelte";
  import navigateBack from "../icons/navigation-left-2.svg"

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

  .text-align-left {
    text-align: left;
  }

  .titleAndBackButton {
    width: 100%
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

  .button-title {
    margin-top: 20px;
    font-size: 30px;
  }

  .no-account {
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }

  .account-creation {
    font-size: 20px;
    margin-top: 15px;
  }

  @media only screen and (max-width: 819px) {
    .no-account {
      margin-top: 0;
      margin-bottom: 30px;
    }

    .no-account-active {
      margin-bottom: 10px;
    }

    .small-screen-none {
      display: none;
    }
  }

  .styleAsLink {
    color: blue;
    cursor: pointer;
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

  .none {
    display: none;
  }

  .hidden {
    visibility: hidden;
  }

  .bold {
    font-weight: bolder;
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
        <p class="button-title">{I18n.t('login.student.action')}</p>
        <LoginButton
          label={I18n.t('login.student.button')}
          onClick={() => logIn(role.STUDENT)} />
      </div>
      <div class="login-card" class:none={visible}>
        <div class="titleAndBackButton">
          <span class="navigateBackButton" on:click={() => toggleLoginCreateAccount()}>{@html navigateBack}</span>
          <span>
            <h1 class="bold">
              {@html I18n.t('login.student.accountCreation.title')}
            </h1>
          </span>
        </div>
        <h1>{I18n.t('login.student.accountCreation.subtitle')}</h1>
        <p class="text-align-left">
          {I18n.t('login.student.accountCreation.require')}
        </p>
        <div class="account-creation-steps">
          <AccountCreationSteps activeStep={1} />
        </div>
        <div class="create-account-button">
          <Button
            onClick={() => alert('make account')}
            label={I18n.t('login.student.accountCreation.step1')} />
        </div>
      </div>
      <div class="no-account" class:no-account-active={!visible}>
        <div class="account-creation {visible ? '' : 'hidden small-screen-none'}">
          <p>{@html I18n.t('login.student.accountCreation.askAccount')}</p>
        </div>
        <div class="account-creation {visible ? '' : 'hidden small-screen-none'}">
          <p class="styleAsLink" on:click={() => toggleLoginCreateAccount()}>
            {@html I18n.t('login.student.accountCreation.startAccount')}
          </p>
        </div>
      </div>
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
        <p class="button-title">{I18n.t('login.teacher.action')}</p>
        <LoginButton
          label={I18n.t('login.teacher.button')}
          onClick={() => logIn(role.TEACHER)} />
      </div>

      <div class="no-account {visible ? '' : 'hidden small-screen-none'}">
        <div class="account-creation">
          <p>
            {@html I18n.t('login.teacher.accountCreation.askAccount')}
          </p>
        </div>
        <div class="account-creation">
          <p>
            {@html I18n.t('login.teacher.accountCreation.startAccount')}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
