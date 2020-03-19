<script>
  import I18n from "i18n-js";
  import LoginButton from "../components/LoginButton.svelte";
  import logo_eduid from "../img/logo_eduid.svg";
  import { role } from "../util/role";
  import { userRole } from "../stores/user";
  import { getService } from "../util/getService";
  import { requestLoginToken } from "../api";

  const logIn = chosenRole => {
    $userRole = chosenRole;
    const service = getService(chosenRole);
    requestLoginToken(service);
  };
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

  .login-card {
    flex: 1;

    min-width: 230px;
    margin-top: 20px;
    margin-right: var(--login-spacing);
    padding: 20px;

    border: var(--card-border);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .eduid {
    text-align: left;
    display: flex;
    min-height: 100px;
    max-width: 300px;
    margin-top: 20px;
  }

  .eduid span {
    margin-left: 15px;
  }
</style>

<div class="login-page">
  <h2>{I18n.t('login.title')}</h2>

  <p>{I18n.t('login.description')}</p>

  <div class="login-cards">
    <div class="login-card">
      <h1>{I18n.t('login.student.title')}</h1>
      <img
        src="https://via.placeholder.com/200?text=Placeholder"
        alt="student login" />
      <LoginButton
        label={I18n.t('login.student.button')}
        onClick={() => logIn(role.STUDENT)}
        sub={`(${I18n.t('login.student.button_sub')})`} />
      <div class="eduid">
        <div>
          {@html logo_eduid}
        </div>
        <span>
          {@html I18n.t('login.student.edu_id_info', {
            url: 'https://www.surf.nl/'
          })}
        </span>
      </div>
    </div>

    <div class="login-card">
      <h1>{I18n.t('login.teacher.title')}</h1>
      <img
        src="https://via.placeholder.com/200?text=Placeholder"
        alt="teacher login" />
      <LoginButton
        label={I18n.t('login.teacher.button')}
        className="grey"
        onClick={() => logIn(role.TEACHER)} />
    </div>
  </div>
</div>
