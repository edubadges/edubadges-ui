<script>
  import I18n from "i18n-js";
  import LoginButton from "../components/LoginButton.svelte";
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

  .eduid .img-container {
    min-width: 90px;
    margin-right: 15px;
  }

  .eduid img {
    width: 100%;
  }
</style>

<div class="login-page">
  <h2>{I18n.ts('login.title')}</h2>

  <p>{I18n.ts('login.description')}</p>

  <div class="login-cards">
    <div class="login-card">
      <h1>{I18n.ts('login.student.title')}</h1>
      <img
        src="https://via.placeholder.com/200?text=Placeholder"
        alt="student login" />
      <LoginButton
        label={I18n.ts('login.student.button')}
        onClick={() => logIn(role.STUDENT)}
        sub={`(${I18n.ts('login.student.button_sub')})`} />
      <div class="eduid">
        <div class="img-container">
          <img
            src="https://via.placeholder.com/70?text=Placeholder"
            alt="student login" />
        </div>
        <span>
          {@html I18n.ts('login.student.edu_id_info', {
            url: 'https://www.surf.nl/'
          })}
        </span>
      </div>
    </div>

    <div class="login-card">
      <h1>{I18n.ts('login.teacher.title')}</h1>
      <img
        src="https://via.placeholder.com/200?text=Placeholder"
        alt="teacher login" />
      <LoginButton
        label={I18n.ts('login.teacher.button')}
        className="grey"
        onClick={() => logIn(role.TEACHER)} />
    </div>
  </div>
</div>
