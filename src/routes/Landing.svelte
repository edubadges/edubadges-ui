<script>
    import {user, config, redirectPath} from "../stores/user";
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import Button from "../components/Button.svelte";

    let isLogoutRedirect = false;
    let isAccountDeletionRedirect = false;

    onMount(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        isLogoutRedirect = urlSearchParams.get("logout");
        isAccountDeletionRedirect = urlSearchParams.get("delete");
        if ($user.id) {
            navigate("/");
        }
    });

    const login = () => {
        const path = isLogoutRedirect ? "/" : encodeURIComponent($redirectPath || "/");
        window.location.href = `${$config.loginUrl}?redirect_path=${path}`;
    };


</script>

<style>
    .landing {
        display: flex;
        justify-content: center;
        flex-direction: column;
        background-color: white;
        height: auto;
        min-height: 500px;
        padding: 25px;
        align-items: center;
        align-content: center;
    }


    h1 {
        margin-bottom: 35px;
        text-align: center;
    }

    h2 {
        margin-bottom: 60px;
        color: var(--color-primary-green);
        text-align: center;
    }

    p.logout {
        color: var(--color-primary-black);
        font-size: 22px;
        margin-bottom: 74px;
    }

</style>


<div class="landing">
    {#if isLogoutRedirect}
        <p class="logout">{I18n.ts("landing.logoutStatus")}</p>
    {/if}
    {#if isAccountDeletionRedirect}
        <p class="logout">{I18n.ts("landing.deletionStatus")}</p>
    {/if}
    <h1>{I18n.ts("header.title")}</h1>
    <h2>{I18n.ts("landing.info")}</h2>
    <Button label={I18n.ts("landing.login")} className="short" href={I18n.ts("landing.login")} onClick={login}/>

</div>
