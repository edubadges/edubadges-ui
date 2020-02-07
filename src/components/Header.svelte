<script>

    import I18n from "i18n-js";
    import logo from "../img/logo_SURFconext_blue.svg";
    import openConextLogo from "../img/logo_OPEN_conext_blue.svg";
    import {navigate} from "svelte-routing";
    import {userLoggedIn, userRole, authToken} from "../stores/user";
    import {link} from "svelte-routing";
    import Button from "./Button.svelte";

    const logoutUser = () => {
        $userLoggedIn = "";
        $userRole = "";
        $authToken = "";
        navigate("/");
    }

</script>

<style>
    header {
        background-color: var(--color-background-grey-dark);
        padding-top: 4px;
        padding-bottom: 4px;
    }
</style>

<header class="header">
    <a href="/" use:link>
        {@html logo}
    </a>
</header>
