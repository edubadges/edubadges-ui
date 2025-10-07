<script>
    import I18n from "i18n-js";
    import {onMount} from "svelte";
    import {Spinner} from "../components";
    import {impersonation} from "../stores/user";
    import {isEmpty} from "../util/utils";

    let isIssuerNotFound = false;
    let loaded = false;

    onMount(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        if (urlSearchParams.has("issuer")) {
            isIssuerNotFound = true;
        }
        loaded = true;
    });

</script>


<style lang="scss">
    .not-found {
        display: flex;
        flex: 1;
        width: 100%;
        align-items: center;
        align-content: center;
        text-align: center;
        flex-direction: column;
        margin-top: 25%;

        h1 {
            margin-bottom: 25px;
        }

        p {
            font-size: 18px;
        }
    }

</style>
<div class="not-found">
    {#if loaded && isEmpty($impersonation)}
        <h1>{I18n.t('notFound.main')}</h1>
        {#if isIssuerNotFound}
            <p>{I18n.t("notFound.issuer")}</p>
        {/if}
    {:else}
        <Spinner/>
    {/if}
</div>

