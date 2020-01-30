<script>

    import I18n from "i18n-js";
    import logo from "../img/logo_SURFconext_blue.svg";
    import openConextLogo from "../img/logo_OPEN_conext_blue.svg";
    import {navigate} from "svelte-routing";
    import {logout} from "../api";
    import {user} from "../stores/user";
    import Button from "./Button.svelte";

    const logoutUser = () => {
        logout().then(() => {
            $user = {
                id: "",
                email: "",
                givenName: "",
                familyName: "",
                guest: true,
                usePassword: false
            };
            navigate("/landing?logout=true");
        });
    }

</script>

<style>

    .header {
        width: 100%;
        max-width: var(--width-app);
        margin: 0 auto;
        display: flex;
        background-color: var(--color-primary-blue);
        align-items: center;
        align-content: center;
        position: relative;
        flex-direction: row;
        height: 80px;
        color: #94d6ff;
    }

    .logo {
        padding: 10px 0;
    }

    @media (max-width: 800px) {
        h1 {
            display: none;
        }
    }

    div.logout {
        margin: 0 25px 0 auto;
    }

</style>
<div class="header">

    <div class="logo">
        <a href="/" on:click|preventDefault|stopPropagation={() => navigate("/")}>
            {#if I18n.branding !== "SURFconext"}
                {@html openConextLogo}
            {:else}
                {@html logo}
            {/if}
        </a>
    </div>
    <h1>{I18n.ts("header.title")}</h1>
    {#if !$user.guest}
        <div class="logout">
            <Button href="/logout" label={I18n.t("header.logout")} onClick={logoutUser} className="cancel small"/>
        </div>
    {/if}
</div>
