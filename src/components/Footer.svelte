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

    .footer {
        background-color: #5daff1;
        padding: 0 25px;
        width: 100%;
        max-width: var(--width-app);
        height: 122px;
        margin: 0 auto;
    }

    @media (max-width: 600px) {
        .footer {
            padding: 0 28px;
        }
    }

    .inner {
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 100%;
        font-size: 16px;
        padding-top: 18px;
    }

    .help, .info {
        display: flex;
        flex-direction: column;
    }
    .info {
        text-align: right;
    }
    span {
        display: inline-block;
        margin-bottom: 5px;
    }

    ul {
        list-style: none;
    }

    li {
        display: inline-block;
        padding: 0 10px;
    }
    a {
        font-weight: bold;
        color: #002568;
    }
    li:last-child {
        border-left: 1px solid black;
    }

    li.non_active a {
        font-weight: normal;
    }
    li.active a {
        color: black;
        cursor: not-allowed;
    }


</style>
<div class="footer">
    <div class="inner">
        <div class="help">
            <span>{I18n.ts("footer.tip")}</span>
            <a href="https://surfconext.nl" target="_blank">{I18n.ts("footer.help")}</a>
        </div>

        <ul>
            <li class="{I18n.locale === 'en' ? 'active' : 'non_active'}">
                <a href="/en" on:click|preventDefault|stopPropagation={changeLanguage("en")}>EN</a>
            </li>
            <li class="{I18n.locale === 'nl' ? 'active' : 'non_active'}">
                <a href="/nl" on:click|preventDefault|stopPropagation={changeLanguage("nl")}>NL</a>
            </li>
        </ul>

        <div class="info">
            <span>{I18n.ts("footer.poweredBy")}</span>
            <a href="https://surfconext.nl" target="_blank">{I18n.ts("footer.surfconext")}</a>
        </div>
    </div>
</div>
