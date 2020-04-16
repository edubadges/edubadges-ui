<script>
  import I18n from "i18n-js";
  import Cookies from "js-cookie";

  const changeLanguage = lang => () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("lang", lang);
    Cookies.set("lang", lang, { expires: 365 });
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
    <span>{I18n.t('footer.tip')}</span>
    <a href="https://surf.nl" target="_blank">{I18n.t('footer.help')}</a>
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
    <a href="https://surf.nl" target="_blank">{I18n.t('footer.surf')}</a>
  </div>
</footer>
