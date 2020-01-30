<script>
    import Footer from "./components/Footer.svelte";
    import {Route, Router, navigate} from "svelte-routing";
    import {onMount} from "svelte";
    import Landing from "./routes/Landing.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import EditName from "./routes/EditName.svelte";
    import Migration from "./routes/Migration.svelte";
    import MigrationError from "./routes/MigrationError.svelte";
    import Password from "./routes/Password.svelte";
    import RememberMe from "./routes/RememberMe.svelte";
    import Home from "./routes/Home.svelte";
    import Header from "./components/Header.svelte";
    import {me, configuration} from "./api";
    import {user, config, redirectPath} from "./stores/user";
    import I18n from "i18n-js";

    export let url = "";
    let loaded = false;

    onMount(() => configuration()
            .then(json => {
                $config = json;
                I18n.branding = json.branding;
                me()
                        .then(json => {
                            loaded = true;
                            $user = {$user, ...json, guest: false};
                        })
                        .catch(() => {
                            loaded = true;
                            $redirectPath = window.location.pathname;
                            const urlSearchParams = new URLSearchParams(window.location.search);
                            const logout = urlSearchParams.get("logout");
                            const afterDelete = urlSearchParams.get("delete");
                            if ($redirectPath.indexOf("migration-error") > -1) {
                                const email = decodeURIComponent(urlSearchParams.get("email"));
                                navigate(`/migration-error?email=${email}`);
                            } else if (logout) {
                                navigate("/landing?logout=true");
                            } else if (afterDelete) {
                                navigate("/landing?delete=true");
                            } else {
                                navigate("/landing");
                            }
                        })
            })
    );

</script>

<style>

    :global(:root) {
        --color-primary-blue: #0061b0;
        --color-primary-green: #008738;
        --color-primary-black: #202020;
        --color-primary-red: #d00000;
        --color-primary-grey: #c4cdd5;
        --width-app: 1244px;
    }

    .myconext {
        display: flex;
        flex-direction: column;
        height: 100%;
        margin-bottom: 100px;
    }

    .content {
        display: flex;
        flex-direction: column;
        background-color: white;
        align-items: stretch;
        max-width: var(--width-app);
        width: 100%;
        margin: 0 auto;
        border-left: 2px solid var(--color-primary-blue);
        border-right: 2px solid var(--color-primary-blue);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-bottom: 4px solid var(--color-primary-blue);
    }

    @media (max-width: 1250px) {
        .myconext {
            margin: 0 15px;
        }

        .content {
            width: 100%;
        }
    }

    .loader:empty,
    .loader:empty:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }

    .loader:empty {
        margin: 60px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border: 1.1em solid white;
        border-top-color: var(--color-primary-green);
        border-bottom-color: var(--color-primary-blue);
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.5s infinite linear;
        animation: load8 1.5s infinite linear;
    }

    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
{#if loaded && !$user.guest}
    <div class="myconext">
        <Header/>
        <div class="content">
            <Router url="{url}">
                <Route path="/" component={Home}/>
                <Route path="/profile">
                    <Home bookmark="profile"/>
                </Route>
                <Route path="/account">
                    <Home bookmark="account"/>
                </Route>
                <Route path="/security">
                    <Home bookmark="security"/>
                </Route>
                <Route path="/landing" component={Landing}/>
                <Route path="/edit" component={EditName}/>
                <Route path="/migration">
                    <Home bookmark="migration"/>
                </Route>
                <Route path="/password" component={Password}/>
                <Route path="/rememberme" component={RememberMe}/>
                <Route component={NotFound}/>
            </Router>
        </div>
        <Footer/>
    </div>
{:else if loaded && $user.guest}
    <div class="myconext">
        <Header/>
        <div class="content">
            <Router url="{url}">
                <Route path="/" component={Landing}/>
                <Route path="/landing" component={Landing}/>
                <Route path="/migration-error" component={MigrationError}/>
            </Router>
        </div>
        <Footer/>
    </div>
{:else}
    <div class="loader"></div>
{/if}
