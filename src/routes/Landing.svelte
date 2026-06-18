<script>
    import I18n from "i18n-js";

    import app_backpack from "../img/app_backpack.png";
    import app_badge from "../img/app_badge.png";
    import app_apple from "../img/app_apple.png";
    import app_google from "../img/app_google.png";
    import app_swirl from "../img/app_swirl.png";
</script>

<style global lang="css">
body {
    margin: 0;
}

main {
    color: #0A0A0A;
    font-family: Nunito, sans-serif;
    font-style: normal;

    display: flex;
    flex-direction: column;
}

section {
    width: 100%;

    &.bewaren {
        background: linear-gradient(180deg, #F6F0F9 52.23%, #FFF 89.19%);
    }

    &.hand {
        background-repeat: no-repeat;
    }

    &.portal {
        background: #F6F0F9;

        & > article {
            flex-direction: row-reverse;

            @media (max-width: 1000px) {
                flex-direction: column-reverse;
            }
        }
    }

    & > article {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        max-width: 1400px;

        @media (max-width: 1000px) {
            flex-direction: column;
            align-items: center;
        }

        & > article {
            width: 580px;
        }
    }
}


h2 {
    font-size: 48px;
    font-weight: 700;
    line-height: 125%;
    letter-spacing: -1px;
    margin-bottom: 16px;

    & strong {
        color: #772583;
    }
}

p {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 24px;
}

a img {
    height: 40px;
}

.bewaren div {
    display: flex;
    
    & button {
        flex-grow: 1;
    }
}

.bewaren img {
    height: 600px;
}

div > img {
    max-width: 644px;
}
</style>

<div>
    <nav></nav>
    <main>
        <section class="bewaren">
            <article>
                <article>
                    <h2>
                        {@html I18n.t('landing.bewaren.title')}
                    </h2>
                    <p>
                        {I18n.t('landing.bewaren.body')}
                    </p>
                    <div>
                        <button>{I18n.t('landing.bewaren.backpack')}</button>
                        <button>{I18n.t('landing.bewaren.app')}</button>
                    </div>
                    <span>{I18n.t('landing.bewaren.login')}</span>
                </article>
                <div>
                    <img alt="Behaalde edubadges in de mobiele app"  src={app_backpack}>
                </div>
            </article>
        </section>
        <section class="hand">
            <article>
                <article>
                    <h2>
                        {@html I18n.t('landing.hand.title')}
                    </h2>
                    <p>
                        {I18n.t('landing.hand.body')}
                    </p>
                    <p>
                        <a href="/">
                            <img alt="Download in de Apple app store" src={app_apple}>
                        </a>
                        <a href="/">
                            <img alt="Download in de Google Play store" src={app_google}>
                        </a>
                    <p>
                </article>
                <div>
                    <img alt="Details van een Edubadge in de mobiele app" src={app_badge}>
                </div>
            </article>
        </section>
        <section class="portal">
            <article>
                <article>
                    <h2>
                        {@html I18n.t('landing.portal.title')}
                    </h2>
                    <p>
                        {I18n.t('landing.portal.body')}
                    </p>
                </article>
                <div>
                    <img alt="Overzicht van de issuerportal" src={app_badge}>
                </div>
            </article>
        </section>
    </main>
    <footer></footer>
</div>
