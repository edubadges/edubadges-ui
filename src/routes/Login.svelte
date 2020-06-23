<script>
  import I18n from "i18n-js";
  import {Button} from "../components";
  import {
    AccountCreationSteps,
    Card,
    CardSubtext,
    LoginButton
  } from "../components/guests";
  import {userRole} from "../stores/user";
  import {role} from "../util/role";
  import {getService} from "../util/getService";
  import {requestLoginToken} from "../api";
  import {navigateBack} from "../icons";
  import schoolbag from "../icons/school-bag.svg";
  import hand from "../icons/hand.svg";

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
  h1 {
    color: var(--black);
    font-size: 48px;
    margin-bottom: 5px;
  }

  h2 {
    color: var(--purple);
    font-size: 32px;
  }

  h4 {
    font-weight: 300;
  }

  .login-page {
    flex: 1;
    font-size: 18px;

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
    padding-top: var(--login-spacing);
  }

  h4 {
    color: var(--black);
    margin-top: 5px;
  }

  .svg-container {
    margin: 35px 0 15px 0;
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

  .login {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .create-account-content > * {
    margin-bottom: 20px;
    text-align: left;
  }
</style>

<div class="login-page">
  <h1>{I18n.t('login.title')}</h1>

  <p>{I18n.t('login.description')}</p>

  <div class="login-cards">
    <div class="login-element">
      <Card none={!showLoginCards}>
        <h2 class="bold">
          {@html I18n.t('login.student.title')}
        </h2>
        <h4>{I18n.t('login.student.subtitle')}</h4>
        <div class="svg-container">
          {@html schoolbag}
        </div>
        <div class="login">
          <LoginButton
            label={I18n.t('login.student.action')}
            onClick={() => logIn(role.STUDENT)}/>
          {#if showLoginCards}
            <CardSubtext
              styleAsLink
              handleClick={toggleLoginCreateAccount}
              lineOne={I18n.t('login.student.accountCreation.askAccountNo')}
              lineTwo={I18n.t('login.student.accountCreation.startAccount')}/>
          {:else}
            <CardSubtext
              styleAsLink
              handleClick={toggleLoginCreateAccount}
              lineOne={I18n.t('login.createEduId.askAccountYes')}
              lineTwo={I18n.t('login.createEduId.logInAccount')}/>
          {/if}

        </div>
      </Card>

      <Card none={showLoginCards}>
        <div class="titleAndBackButton">
          <span
            class="click navigateBackButton"
            on:click={toggleLoginCreateAccount}>
            {@html navigateBack}
          </span>
          <span>
            <h2>
              {@html I18n.t('login.createEduId.title')}
            </h2>
          </span>
        </div>
        <p class="text-align-left">{I18n.t('login.createEduId.require')}</p>
        <AccountCreationSteps activeStep={accountCreationStep}/>
        <Button
          action={() => logIn(role.STUDENT, true)}
          text={I18n.t('login.createEduId.step1')} />
      </Card>

    </div>

    <div class="login-element">
      <Card outOfFocus={!showLoginCards}>
        <h2 class="bold">
          {@html I18n.t('login.teacher.title')}
        </h2>
        <h4>{I18n.t('login.teacher.subtitle')}</h4>
        <div class="svg-container">
          {@html hand}
        </div>
        <LoginButton
          label={I18n.t('login.teacher.action')}
          onClick={() => logIn(role.TEACHER)}/>
        <CardSubtext
          hidden={!showLoginCards}
          lineOne={I18n.t('login.teacher.accountCreation.askAccount')}
          lineTwo={I18n.t('login.teacher.accountCreation.startAccount')}/>
      </Card>

    </div>
  </div>
</div>
