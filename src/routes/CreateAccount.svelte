<script>
  import I18n from "i18n-js";
  import LoginButton from "../components/LoginButton.svelte";
  import logo_eduid from "../img/logo_eduid.svg";
  import {role} from "../util/role";
  import {userRole} from "../stores/user";
  import {getService} from "../util/getService";
  import {requestLoginToken} from "../api";
  import {navigate} from "svelte-routing"
  import AccountCreationSteps from "./AccountCreationSteps.svelte";

  const logIn = chosenRole => {
    $userRole = chosenRole;
    const service = getService(chosenRole);
    requestLoginToken(service);
  };
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

    min-width: 230px;
    margin-right: var(--login-spacing);
  }

  .login-card {
    margin-top: 20px;
    padding: 20px;

    border: var(--card-border);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-title {
      margin-top: 20px;
      font-size: 30px;
  }

  .no-account {
    width: 60%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }

  .account-creation {
    font-size: 20px;
    margin-top: 15px;
  }

  .account-creation-steps {
      margin-top: 20px;
  }

  .greyed-out {

  }
</style>

<div class="login-page">
  <h2>{I18n.ts('login.title')}</h2>

  <p>{I18n.ts('login.description')}</p>

  <div class="login-cards">
    <div class="login-element">
      <div class="login-card">
        <h1>{@html I18n.ts('login.studentCreatesAccount.title')}</h1>
        <h1>{I18n.ts('login.studentCreatesAccount.subtitle')}</h1>
        <p>{I18n.ts('login.studentCreatesAccount.text')}</p>
        <div class="account-creation-steps"><AccountCreationSteps activeStep={1}/></div>
      </div>
    </div>

    <div class="login-element greyed-out">
      <div class="login-card">
        <h1>{@html I18n.ts('login.teacher.title')}</h1>
        <h1>{I18n.ts('login.teacher.subtitle')}</h1>
        <img
          src="https://via.placeholder.com/200?text=Placeholder"
          alt="teacher login" />
        <p class="button-title">{I18n.ts('login.teacher.button_title')}</p>
        <LoginButton
          label={I18n.ts('login.teacher.button')}
          onClick={() => logIn(role.TEACHER)} />
      </div>
    </div>
  </div>
</div>
