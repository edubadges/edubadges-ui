<script>
  import I18n from "i18n-js";
  import Cookies from "js-cookie";
  import {userRole} from "../stores/user";
  import {role} from "../util/role";
  import surf from "../img/logo-surf.svg";

  const changeLanguage = lang => () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("lang", lang);
    Cookies.set("lang", lang, {expires: 365});
    window.location.search = urlSearchParams.toString();
  };
</script>

<style>
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px var(--hor-padding-s) 10px;
  }

  .help,
  .info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .info {
    text-align: right;
    display: flex;
    flex-direction: row;
    align-content: center;
  }

  .info span {
    display: inline-block;
    margin-right: 5px;
  }

  @media (max-width: 510px) {
    .info span {
      display: none
    }
  }

  .lang {
    white-space: nowrap;
  }

  .lang a {
    padding: 0 10px 0 7px;
    font-weight: normal;
  }

  .lang a.active {
    color: black;
    cursor: not-allowed;
    font-weight: bold;
  }

  .lang a:not(:last-child) {
    border-right: 1px solid black;
  }
</style>

<footer class="footer">
  <div class="help">
    <span>{@html $userRole === role.STUDENT ? I18n.t('footer.termsStudent') : I18n.t('footer.termsTeacher')}</span>
    <span>{@html I18n.t('footer.privacyPolicy')}</span>
  </div>

  <div class="lang">
    <a
      class:active={I18n.locale === 'nl'}
      href="/nl"
      on:click|preventDefault|stopPropagation={changeLanguage('nl')}>
      NL
    </a>
    <a
      class:active={I18n.locale === 'en'}
      href="/en"
      on:click|preventDefault|stopPropagation={changeLanguage('en')}>
      EN
    </a>
  </div>

  <div class="info">
    <span>{I18n.t('footer.poweredBy')}</span>
    {@html surf}
  </div>
</footer>
