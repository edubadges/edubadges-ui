<script>
  import I18n from "i18n-js";
  import Cookies from "js-cookie";
  import {userRole} from "../stores/user";
  import {role} from "../util/role";
  import surf from "../img/logo-surf.svg";
  import {ModalTerms} from "./forms";

  let showModal = false;
  let termsUrl;
  let termsTitle;

  const changeLanguage = lang => () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("lang", lang);
    Cookies.set("lang", lang, {expires: 365});
    window.location.search = urlSearchParams.toString();
  };

  const showTerms = (title, url) => () => {
    showModal = true;
    termsUrl = url;
    termsTitle = title;
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
    <a href="/terms"
        on:click|preventDefault|stopPropagation={showTerms(I18n.t("terms.termsTitle"),
        I18n.t(`terms.${$userRole}.termsOfUseRaw`))}>
      {I18n.t("terms.termsTitle")}
    </a>
    <a href="/privacy"
        on:click|preventDefault|stopPropagation={showTerms(I18n.t("terms.privacyPolicyTitle"),
        I18n.t(`terms.${$userRole}.privacyPolicyRaw`))}>
      {I18n.t("terms.privacyPolicyTitle")}
    </a>
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

{#if showModal}
  <ModalTerms
      title={termsTitle}
      submit={() => showModal = false}
      cancel={() => showModal = false}
      url={termsUrl}/>
{/if}
