<script>
    import I18n from "i18n-js";
    import Cookies from "js-cookie";

    const changeLanguage = lang => () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set("lang", lang);
        Cookies.set("lang", lang, { expires: 365 });
        window.location.search = urlSearchParams.toString();
    }
</script>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--color-background-grey-light);
        padding-top: 12px;
        padding-bottom: 10px;
    }

    .help, .info {
        display: flex;
        flex-direction: column;
    }

    .info {
        text-align: right;
    }

    .lang a {
        color: black;
        padding: 0 10px 0 7px;
        font-weight: normal;
    }

    .lang a.active {
        cursor: not-allowed;
        font-weight: bold;
    }

    .lang a:not(:last-child) {
        border-right: 1px solid black;
    }
</style>

<footer class="footer">
    <div class="help">
        <span>{I18n.ts("footer.tip")}</span>
        <a href="https://surfconext.nl" target="_blank">{I18n.ts("footer.help")}</a>
    </div>

    <div class="lang">
        <a class:active={I18n.locale === 'nl'} href="/nl" on:click|preventDefault|stopPropagation={changeLanguage("nl")}>NL</a>
        <a class:active={I18n.locale === 'en'} href="/en" on:click|preventDefault|stopPropagation={changeLanguage("en")}>EN</a>
    </div>

    <div class="info">
        <span>{I18n.ts("footer.poweredBy")}</span>
        <a href="https://surfconext.nl" target="_blank">{I18n.ts("footer.surfconext")}</a>
    </div>
</footer>
