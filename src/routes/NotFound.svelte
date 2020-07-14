<script>
  import I18n from "i18n-js";
  import {onMount} from "svelte";

  let isPublicBadgeNotFound = false;
  let isIssuerNotFound = false;

  onMount(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (urlSearchParams.has("public")) {
      isPublicBadgeNotFound = true;
    }
    if (urlSearchParams.has("issuer")) {
      isIssuerNotFound = true;
    }

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
  <h1>{I18n.t('notFound.main')}</h1>
  {#if isPublicBadgeNotFound}
    <p>{I18n.t("notFound.publicBadge")}</p>
  {/if}
  {#if isIssuerNotFound}
    <p>{I18n.t("notFound.issuer")}</p>
  {/if}
</div>

