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

  const logIn = (chosenRole) => {
    $userRole = chosenRole;
    const service = getService(chosenRole);
    requestLoginToken(service);
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
    font-size: 22px;
    color: var(--black);
    margin-top: 5px;
  }

  div.login-info {
    font-size: 20px;
  }

  p.destination {
    color: var(--purple);
    font-weight: bold;
    margin-top: 15px;
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

  .svg-container {
    margin: 35px 0 15px 0;
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

  .invite-only {
    display: flex;
    margin-top: 19px;
    background-color: var(--green-light);
    color: var(--black);
    border-radius: 18px;
    padding: 6px 18px;
    font-weight: bold;
    position: absolute;
    text-align: center;
    z-index: 9;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.67);
    font-size: 16px;
  }
</style>

<div class="login-page">

  <h1>{I18n.t('login.title')}</h1>
  <div class="login-info">
    <p>{I18n.t('login.description')}</p>
    <p class="destination">{I18n.t('login.destination')}</p>

  </div>

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
          <CardSubtext small={true} lineOne={I18n.t('login.student.noEduId')}/>

        </div>
      </Card>

    </div>

    <div class="login-element">
      <div class="invite-only">
        <p>{I18n.t("login.teacher.byInviteOnly")}</p>
      </div>
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
