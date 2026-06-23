<script>
    import I18n from "i18n-js";
    import Cookies from "js-cookie";
    import app_backpack from "../img/app_backpack.png";
    import app_badge from "../img/app_badge.png";
    import app_apple from "../img/app_apple.png";
    import app_google from "../img/app_google.png";
    import app_swirl from "../img/app_swirl.png";

    const changeLanguage = lang => () => {
        lang = ["en", "nl"].indexOf(lang) > -1 ? lang : "en";
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set("lang", lang);
        Cookies.set("lang", lang, {expires: 365, secure: true});
        window.location.search = urlSearchParams.toString();
    };
</script>

<style global lang="css">
    @import "../stylesheets/landing.css";

    .nav-bar {
        height: 80px;
        padding-inline: var(--space-xl);
        display: flex;
        align-items: center;
    }

    .nav-container {
        display: flex;
        align-items: center;
        gap: var(--space-lg);
    }

    .nav-container > :first-child {
        margin-right: auto;
    }

    .nav-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-sm);
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-sm);
        text-decoration: none;
        font-weight: 500;
    }

    .nav-link {
        color: var(--color-muted);
    }

    .button--outline {
        border: 1px solid var(--color-primary);
    }

    .toggle {
        display: inline-flex;
        gap: var(--space-xs);
        padding: var(--space-xs);
        border-radius: var(--radius-lg);
        background: var(--color-bg-soft);
    }

    .toggle__button {
        border: none;
        background: transparent;
        padding: 4px 8px;
        border-radius: var(--radius-md);
        font: inherit;
        font-weight: 500;
        color: var(--color-muted);
        cursor: pointer;
    }

    .toggle__button.is-active {
        background: #fff;
        color: var(--color-text);
        box-shadow: var(--shadow-sm);
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

    .footer-powered-by {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        font-size: 12px;
        font-weight: 600;
    }

    .footer-logo {
        margin-top: 18px;
    }

    .footer-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-sm);
        border-radius: var(--radius-sm);
        text-decoration: none;
        font-weight: 400;
    }

</style>

<div>
    <nav class="nav-bar">
        <div class="container nav-container">
            <a href="/" class="nav-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="148" height="36" viewBox="0 0 148 36" fill="none">
              <g clip-path="url(#clip0_27857_92849)">
                <mask id="mask0_27857_92849" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="148" height="36">
                  <path d="M0 0H147.272V35.9999H0V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_27857_92849)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M137.454 36.0001H9.81769C4.3956 36.0001 -0.000488281 31.604 -0.000488281 26.1819V9.8183C-0.000488281 4.39539 4.3956 0.00012207 9.81769 0.00012207H137.454C142.877 0.00012207 147.272 4.39539 147.272 9.8183V26.1819C147.272 31.604 142.877 36.0001 137.454 36.0001Z" fill="black"/>
                </g>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.833 14.9407C12.529 14.9407 11.4555 16.7726 11.3246 18.2919H18.3405C18.289 16.8258 17.2941 14.9407 14.833 14.9407ZM19.6758 20.2294H11.3508C11.5341 22.1145 12.9741 23.7108 15.3296 23.7108C16.2468 23.7108 17.2941 23.4228 18.1573 22.8729C18.3405 22.7682 18.55 22.7158 18.7341 22.7158C19.3101 22.7158 19.9115 23.1871 19.9115 23.8678C19.9115 25.3078 16.6649 25.9624 15.0425 25.9624C11.2461 25.9624 8.41846 23.318 8.41846 19.313C8.41846 15.6476 11.089 12.689 14.833 12.689C17.7907 12.689 19.9376 14.4694 20.7231 17.1923C20.881 17.7159 21.0373 18.3181 21.0373 18.8679C21.0373 19.6002 20.4359 20.2294 19.6758 20.2294Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M32.663 16.8519C32.0339 15.9094 30.7256 15.1763 29.4165 15.1763C27.2696 15.1763 25.882 16.9035 25.882 19.3384C25.882 21.7471 27.2696 23.4751 29.4165 23.4751C30.7256 23.4751 32.0339 22.742 32.663 21.8257V16.8519ZM34.0499 25.8053C33.2644 25.8053 32.663 25.1769 32.663 24.4177V23.9202C31.6681 25.2031 30.2273 25.9624 28.6049 25.9624C25.3845 25.9624 23.002 23.5013 23.002 19.3384C23.002 15.2548 25.3583 12.689 28.6049 12.689C30.1758 12.689 31.642 13.4221 32.663 14.7312V9.4163C32.663 8.65703 33.2644 8.02948 34.103 8.02948C34.8353 8.02948 35.4645 8.65703 35.4645 9.4163V24.4177C35.4645 25.1769 34.8353 25.8053 34.0499 25.8053Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M48.4236 25.8056C47.6381 25.8056 47.0367 25.1764 47.0367 24.4179V23.9728C46.1204 24.9939 44.5495 25.9618 42.5596 25.9618C39.8367 25.9618 38.5015 24.5226 38.5015 21.9568V14.207C38.5015 13.4747 39.1036 12.8464 39.9415 12.8464C40.6746 12.8464 41.3029 13.4747 41.3029 14.207V20.9357C41.3029 22.8732 42.2978 23.4746 43.8156 23.4746C45.2032 23.4746 46.3822 22.6891 47.0367 21.8521V14.207C47.0367 13.4747 47.6381 12.8464 48.4759 12.8464C49.209 12.8464 49.8382 13.4747 49.8382 14.207V24.4179C49.8382 25.1764 49.209 25.8056 48.4236 25.8056Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M60.9382 15.1764C59.6823 15.1764 58.347 15.9356 57.7448 16.8782V21.8257C58.347 22.7421 59.6823 23.4752 60.9382 23.4752C63.1113 23.4752 64.4997 21.7734 64.4997 19.3385C64.4997 16.9035 63.1113 15.1764 60.9382 15.1764ZM61.776 25.9625C60.1527 25.9625 58.7127 25.2032 57.7448 23.9203V24.4177C57.7448 25.177 57.1164 25.8054 56.331 25.8054C55.5455 25.8054 54.9434 25.177 54.9434 24.4177V9.391C54.9434 8.65709 55.5455 8.02954 56.3834 8.02954C57.1165 8.02954 57.7448 8.65709 57.7448 9.391V14.7313C58.7389 13.4214 60.2051 12.6891 61.776 12.6891C65.0225 12.6891 67.3789 15.2549 67.3789 19.3385C67.3789 23.5014 65.0225 25.9625 61.776 25.9625Z" fill="#A565BF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M77.8771 20.8573C77.2487 20.0195 76.0967 19.6006 74.8932 19.6006C73.4 19.6006 72.2488 20.4384 72.2488 21.826C72.2488 23.1605 73.4 24.0253 74.8932 24.0253C76.0967 24.0253 77.2487 23.6056 77.8771 22.7424V20.8573ZM79.2917 25.8057H79.1338C78.7673 25.8057 77.8771 25.4907 77.8771 24.5219V24.2863C76.9607 25.3606 75.4692 25.9619 73.8189 25.9619C71.7514 25.9619 69.395 24.5751 69.395 21.7737C69.395 18.8675 71.7514 17.6631 73.8189 17.6631C75.4946 17.6631 76.9869 18.2138 77.8771 19.2864V17.3489C77.8771 15.9089 76.6727 15.0188 74.9447 15.0188C73.8451 15.0188 72.8502 15.3076 71.9338 15.9875C71.7776 16.093 71.5681 16.1708 71.3587 16.1708C70.835 16.1708 70.2582 15.7527 70.2582 15.0719C70.2582 14.8625 70.3376 14.6268 70.4677 14.4689C71.4634 13.2122 73.7936 12.6894 75.3898 12.6894C78.1913 12.6894 80.6786 13.8668 80.6786 17.2704V24.418C80.6786 25.1765 80.0502 25.8057 79.2917 25.8057Z" fill="#A565BF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M93.1147 16.8519C92.4855 15.9094 91.1773 15.1763 89.8682 15.1763C87.7213 15.1763 86.3336 16.9035 86.3336 19.3384C86.3336 21.7471 87.7213 23.4751 89.8682 23.4751C91.1773 23.4751 92.4855 22.742 93.1147 21.8257V16.8519ZM94.5015 25.8053C93.7161 25.8053 93.1147 25.1769 93.1147 24.4177V23.9202C92.1198 25.2031 90.679 25.9624 89.0565 25.9624C85.8362 25.9624 83.4536 23.5013 83.4536 19.3384C83.4536 15.2548 85.81 12.689 89.0565 12.689C90.6274 12.689 92.0936 13.4221 93.1147 14.7312V9.4163C93.1147 8.65703 93.7161 8.02948 94.5547 8.02948C95.287 8.02948 95.9162 8.65703 95.9162 9.4163V24.4177C95.9162 25.1769 95.287 25.8053 94.5015 25.8053Z" fill="#A565BF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.326 16.8519C107.724 15.9094 106.389 15.1763 105.106 15.1763C102.959 15.1763 101.572 16.7726 101.572 19.1821C101.572 21.59 102.959 23.1871 105.106 23.1871C106.389 23.1871 107.724 22.4278 108.326 21.4853V16.8519ZM104.609 30.779C102.933 30.779 100.786 30.4125 99.765 29.2351C99.6349 29.0518 99.5302 28.79 99.5302 28.5282C99.5302 27.8467 100.08 27.35 100.735 27.35C100.944 27.35 101.153 27.4024 101.362 27.5333C102.305 28.214 103.352 28.4758 104.609 28.4758C106.389 28.4758 108.326 27.6642 108.326 25.046V23.5807C107.358 24.8366 105.918 25.6482 104.294 25.6482C101.075 25.6482 98.6924 23.345 98.6924 19.1821C98.6924 15.0716 101.048 12.689 104.294 12.689C105.865 12.689 107.305 13.4221 108.326 14.7312V14.2338C108.326 13.4745 108.928 12.8461 109.766 12.8461C110.499 12.8461 111.128 13.4745 111.128 14.2338V24.9675C111.128 29.5493 107.724 30.779 104.609 30.779Z" fill="#A565BF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M120.318 14.9407C118.014 14.9407 116.94 16.7726 116.81 18.2919H123.825C123.774 16.8258 122.779 14.9407 120.318 14.9407ZM125.161 20.2294H116.836C117.019 22.1145 118.459 23.7108 120.815 23.7108C121.732 23.7108 122.779 23.4228 123.642 22.8729C123.825 22.7682 124.035 22.7158 124.219 22.7158C124.795 22.7158 125.396 23.1871 125.396 23.8678C125.396 25.3078 122.15 25.9624 120.527 25.9624C116.731 25.9624 113.903 23.318 113.903 19.313C113.903 15.6476 116.574 12.689 120.318 12.689C123.276 12.689 125.423 14.4694 126.208 17.1923C126.366 17.7159 126.522 18.3181 126.522 18.8679C126.522 19.6002 125.921 20.2294 125.161 20.2294Z" fill="#A565BF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M133.618 25.9621C131.916 25.9621 129.665 25.4385 128.669 24.3127C128.513 24.1302 128.408 23.8946 128.408 23.632C128.408 22.9782 128.984 22.4546 129.612 22.4546C129.821 22.4546 130.057 22.5061 130.24 22.6379C131.21 23.2916 132.518 23.7629 133.722 23.7629C135.372 23.7629 136.183 23.056 136.183 22.0881C136.183 19.627 128.539 21.4073 128.539 16.5375C128.539 14.4691 130.345 12.6888 133.566 12.6888C135.267 12.6888 137.178 13.2124 138.042 14.2073C138.199 14.3906 138.277 14.6001 138.277 14.8357C138.277 15.4379 137.754 15.9091 137.152 15.9091C136.969 15.9091 136.759 15.8568 136.576 15.7521C135.764 15.2031 134.691 14.8627 133.566 14.8627C132.151 14.8627 131.261 15.5426 131.261 16.4066C131.261 18.6321 138.88 16.9564 138.88 21.9833C138.88 24.235 137.021 25.9621 133.618 25.9621Z" fill="#A565BF"/>
              </g>
              <defs>
                <clipPath id="clip0_27857_92849">
                  <rect width="147.273" height="36" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            </a>
            <a href="#" class="nav-item nav-link">
                Catalogus
            </a>
            <a href="/login" class="nav-item nav-link">
                Support
            </a>
            <a href="#" class="nav-item button--outline">
              Inloggen issuerportal
            </a>
            <div class="toggle">
              <a href="/" class="toggle__button" class:is-active={I18n.locale === 'nl'} on:click|preventDefault|stopPropagation={changeLanguage("nl")}>
                NL
              </a>
              <a href="/" class="toggle__button" class:is-active={I18n.locale === 'en'} on:click|preventDefault|stopPropagation={changeLanguage("en")}>
                EN
              </a>
            </div>
        </div>
    </nav>
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
    <footer class="nav-bar">
        <div class="container nav-container">
            <div class="footer-powered-by">
                Powered by
                <div class="footer-logo">

                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="63" height="32" viewBox="0 0 63 32">
                        <defs>
                            <path id="prefix__a" d="M0 0.27L62.508 0.27 62.508 32 0 32z"/>
                        </defs>
                        <g fill="none" fill-rule="evenodd">
                            <mask id="prefix__b" fill="#fff">
                                <use xlink:href="#prefix__a"/>
                            </mask>
                            <path fill="#000" d="M37.853 11.144c.629 0 .937-.32.937-.935 0-.627-.308-.946-.937-.946h-2.347V7.44h3.754c.63 0 .938-.32.938-.945 0-.616-.309-.936-.938-.936h-4.737c-.641 0-.984.331-.984.981v6.724c0 .65.343.98.984.98.653 0 .983-.33.983-.98v-2.12h2.347zM28 7.439c.755 0 1.35.342 1.35 1.151 0 .798-.595 1.14-1.35 1.14h-1.67V7.439H28zm1.121 6.178c.184.41.447.627.813.627.492 0 1.143-.365 1.143-.935 0-.171-.034-.342-.125-.525l-.915-1.823c.846-.444 1.35-1.277 1.35-2.37 0-1.79-1.316-3.033-3.215-3.033h-2.838c-.64 0-.984.331-.984.981v6.724c0 .65.344.98.984.98.652 0 .995-.33.995-.98V11.52h1.809l.983 2.097zM20.05 10.22c0 1.334-.812 2.132-1.945 2.132-1.121 0-1.934-.798-1.934-2.132V6.46c0-.65-.343-.98-.995-.98-.64 0-.985.33-.985.98v3.761c0 2.473 1.66 4.069 3.914 4.069 2.266 0 3.925-1.596 3.925-4.069V6.46c0-.65-.344-.98-.995-.98-.641 0-.985.33-.985.98v3.761zM8.848 12.443c-.767 0-1.282-.171-1.717-.319-.309-.103-.584-.183-.881-.183-.572 0-.904.354-.904.924 0 .923 1.888 1.424 3.502 1.424 1.922 0 3.42-1.026 3.42-2.621 0-1.493-.995-2.144-2.082-2.474l-1.613-.49c-.675-.205-.984-.387-.984-.775 0-.433.686-.65 1.236-.65.675 0 1.166.172 1.567.32.275.09.515.182.789.182.527 0 .813-.353.813-.923 0-.923-1.716-1.425-3.17-1.425-1.875 0-3.26 1.048-3.26 2.587 0 1.277.915 2.007 1.956 2.314l1.442.433c.72.217 1.28.4 1.28.844 0 .536-.742.832-1.394.832zm48.88 6.998c2.64 0 4.78 2.13 4.78 4.76v3.04c0 2.629-2.14 4.76-4.78 4.76h-7.132c-2.639 0-4.778-2.131-4.778-4.76v-1.878c0-3.27-2.662-5.922-5.946-5.922H5.946C2.662 19.44 0 16.789 0 13.518V6.193C0 2.922 2.662.27 5.946.27h33.926c3.284 0 5.946 2.652 5.946 5.923v7.325c0 3.271 2.662 5.923 5.947 5.923h5.964z" mask="url(#prefix__b)"/>
                        </g>
                    </svg>
                </div>
            </div>
            <a href="/login" class="footer-item nav-link">
                Gebruiksvoorwaarden
            </a>
            ·
            <a href="/login" class="footer-item nav-link">
                Privacyvoorwaarden
            </a>
        </div>
    </footer>
</div>
