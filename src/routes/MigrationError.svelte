<script>
    import I18n from "i18n-js";
    import {config} from "../stores/user";
    import {onMount} from 'svelte';

    let email = null;

    onMount(() => {
        if (typeof window !== "undefined") {
            const urlSearchParams = new URLSearchParams(window.location.search);
            email = decodeURIComponent(urlSearchParams.get("email"));
        }
    });

</script>

<style>
    .migration {
        width: 100%;
        display: flex;
        height: 100%;
    }

    .left {
        background-color: #f3f6f8;
        width: 270px;
        height: 100%;
        border-bottom-left-radius: 8px;
    }

    .inner {
        margin: 20px 0 190px 0;
        padding: 15px 15px 0 40px;
        border-left: 2px solid var(--color-primary-grey);
        display: flex;
        flex-direction: column;
        background-color: white;
    }

    h2 {
        color: var(--color-primary-red);
        margin-bottom: 18px;
    }

    h3 {
        margin-bottom: 28px;
    }

    p.info {
        margin: 12px 0 16px 0;
    }

    input {
        border-radius: 8px;
        border: solid 1px #676767;
        padding: 14px;
        font-size: 16px;
        margin: 15px 55px 15px 25px;
    }

    @media (max-width: 820px) {
        .left {
            display: none;
        }

        .inner {
            border-left: none;
        }

        input {
            margin: 15px 0;
        }
    }

</style>
<div class="migration">
    <div class="left"></div>
    <div class="inner">
        <h2>{I18n.ts("migrationError.header")}</h2>
        <h3>{I18n.ts("migrationError.header2")}</h3>
        <p class="info">{I18n.t("migrationError.info")}</p>
        <p class="info">{I18n.t("migrationError.info2")}</p>
        <input type="text" disabled={true} value={$config.migrationLandingPageUrl}>
        <p class="info">{@html I18n.t("migrationError.info3", {email: encodeURI(email), url: $config.myConextUrlGuestIdp})}</p>
    </div>

</div>