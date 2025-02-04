<script>
    import {onMount} from "svelte";
    import * as jwt_decode from "jwt-decode";
    import I18n from "i18n-js";
    import {role as roleConstants} from "../util/role";
    import {requestLoginToken} from "../api";
    import terms2Icon from "../icons/voorwaarden-icon2.svg"
    import Button from "../components/Button.svelte";
    import Spinner from "../components/Spinner.svelte";
    import {userRole} from "../stores/user";
    import {getService} from "../util/getService";

    let idToken;
    let claims;
    let loaded = false;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        idToken = urlParams.get("id_token");
        claims = jwt_decode(idToken);
        $userRole = roleConstants.STUDENT;
        loaded = true
    });

    const goToEduId = () => {
        const service = getService(roleConstants.STUDENT);
        requestLoginToken(service, true);
    };


</script>

<style lang="scss">
    .page-container {
        display: flex;
        flex: 1;
    }

    .content {
        padding: 40px;
    }

    h3 {
        color: var(--grey-9);
        font-size: 22px;
        margin: 35px 0 20px 0;
    }

    @media (max-width: 820px) {
        .content {
            width: 100%;
        }
    }

    div.validate {
        display: flex;
        align-items: center;
        margin: 12px 0 22px 0;
        padding: 12px;
        background-color: var(--grey-1);
        border-radius: 8px;

        p {
            margin-left: 25px;
        }
    }

    div.actions {
        margin-top: 20px;
        display: inline-block;
        width: 100%;
    }
</style>

<div class="page-container">
    <p class="content">
        {#if loaded}
            <h1>{I18n.t("validateName.welcome", {name: claims.given_name + " " + claims.family_name})}</h1>
            <div class="validate">
                {@html terms2Icon}
                <p>{I18n.t(`validateName.info`)}</p>
            </div>
            <p>{I18n.t(`validateName.proceedInfo`)}</p>

            <div class="actions">
                <Button text={I18n.t(`validateName.proceed`)} action={goToEduId}/>
            </div>
        {:else}
            <Spinner/>
        {/if}
</div>
