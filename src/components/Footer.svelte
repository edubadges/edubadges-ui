<script>
  import I18n from "i18n-js";
  import Cookies from "js-cookie";
  import surf from "../img/logo-surf.svg";

  const changeLanguage = lang => () => {
    lang = ["en", "nl"].indexOf(lang) > -1 ? lang : "en";
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("lang", lang);
    Cookies.set("lang", lang, {expires: 365, secure: true});
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
    display: flex;
    align-content: center;
  }

  .info .inner {
    text-align: right;
    display: flex;
    flex-direction: row;
    align-content: center;
  }

  .info span {
    display: inline-block;
    margin-right: 5px;
  }

  .info a.about {
    margin-top: -17px;
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
    <a href="/terms">{I18n.t("terms.termsTitle")}</a>
    <a href="/privacy">{I18n.t("terms.privacyPolicyTitle")}</a>
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
    <div class="inner">
      <span>{I18n.t('footer.poweredBy')}</span>
      <a href={I18n.locale === 'en' ? "https://www.surf.nl/en" : "https://www.surf.nl"} target="_blank"
         rel="noreferrer noopener">
        {@html surf}
      </a>
    </div>
    <div class="inner">
      <a class="about" href={I18n.t("footer.aboutLink")} target="_blank"
         rel="noreferrer noopener">{I18n.t("footer.about")}</a>
    </div>
  </div>
</footer>