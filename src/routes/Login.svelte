<script>
  import I18n from "i18n-js";
  import { Button } from "../components";
  import {
    AccountCreationSteps,
    Card,
    CardSubtext,
    LoginButton
  } from "../components/guests";
  import { userRole } from "../stores/user";
  import { role } from "../util/role";
  import { getService } from "../util/getService";
  import { requestLoginToken } from "../api";
  import { navigateBack } from "../icons";

  let accountCreationStep = 1;
  let showLoginCards = true;

  const logIn = (chosenRole, isRegistration = false) => {
    $userRole = chosenRole;
    const service = getService(chosenRole);
    requestLoginToken(service, isRegistration);
  };

  const toggleLoginCreateAccount = () => (showLoginCards = !showLoginCards);

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
  }

  .text-align-left {
    text-align: left;
  }

  .create-account-content > * {
    margin-bottom: 20px;
    text-align: left;
  }
</style>

<div class="login-page">
  <h2>{I18n.t('login.title')}</h2>

  <p>{I18n.t('login.description')}</p>

  <div class="login-cards">
    <div class="login-element">
      <Card none={!showLoginCards}>
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
      </Card>

      <Card none={showLoginCards}>
        <div class="titleAndBackButton">
          <span
            class="click navigateBackButton"
            on:click={toggleLoginCreateAccount}>
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
        <AccountCreationSteps activeStep={accountCreationStep} />
        <Button
          onClick={() => logIn(role.STUDENT, true)}
          label={I18n.t('login.createEduId.step1')} />
      </Card>

      {#if showLoginCards}
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
      <Card outOfFocus={!showLoginCards}>
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
      </Card>

      <CardSubtext
        hidden={!showLoginCards}
        lineOne={I18n.t('login.teacher.accountCreation.askAccount')}
        lineTwo={I18n.t('login.teacher.accountCreation.startAccount')} />
    </div>
  </div>
</div>
