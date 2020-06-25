<script>
  import {onMount} from "svelte";
  import * as jwt_decode from "jwt-decode";
  import {config} from "../util/config";
  import info from "../icons/informational.svg";
  import {Button, Spinner} from "../components";
  import I18n from "i18n-js";
  import ToggleSwitch from "../components/ToggleSwitch.svelte";

  let idToken;
  let state;
  let claims;
  let provider;
  let loaded = false;
  let termsOfUseAccepted = false;
  let badgeAwardTermsAccepted = false;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    idToken = urlParams.get("id_token");
    state = urlParams.get("state");
    provider = urlParams.get("provider");
    claims = jwt_decode(idToken);
    loaded = true;
  });

  const agree = () => {
    window.location.href = `${config.serverUrl}/account/${provider}/login/terms_accepted/${encodeURIComponent(state)}/${idToken}/`;
  }

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    flex: 1;
    padding: 40px;
  }

  div.info {
    display: flex;
    align-items: center;
    width: 50%;
    background-color: var(--blue-light);
    padding: 15px 25px;
    margin: 25px 0;
    border-radius: 8px;

    span:first-child {
      margin-right: 15px;
    }
  }

  h1.edubadges {
    color: var(--grey-8);
  }

  p.terms {
    margin: 25px 0;
  }

  div.agree {
    display: flex;
    align-items: center;
    width: 50%;
    background-color: var(--grey-3);
    padding: 15px 25px;
    margin: 25px 0;
    border-radius: 8px;

    span:first-child {
      margin-right: 15px;
      color: var(--purple);
    }

    .toggle {
      margin-left: auto;
    }
  }

  @media (max-width: 820px) {
    div.agree {
      width: 100%;
    }
    div.info {
      width: 100%;
    }
  }

</style>

<div class="page-container">
  <div class="content">
    {#if loaded}
      <h1>{I18n.t("acceptTerms.welcome", {name: claims.preferred_username})}</h1>
      <div class="info">
        <span>{@html info}</span>
        <span>{I18n.t("acceptTerms.acceptTerms")}</span>
      </div>
      <h1 class="edubadges">{I18n.t("acceptTerms.eduBadges", {name: claims.preferred_username})}</h1>
      <p class="terms">{@html I18n.t("acceptTerms.termsOfUse")}</p>
      <div class="agree">
        <span>{I18n.t("acceptTerms.acceptTermsOfUse")}</span>
        <div class="toggle">
          <ToggleSwitch disabled={false} value={termsOfUseAccepted}
                        onChange={val => termsOfUseAccepted = !termsOfUseAccepted}/>
        </div>

      </div>
      <p class="terms">{@html I18n.t("acceptTerms.badgeAwardTerms")}</p>
      <div class="agree">
        <span>{I18n.t("acceptTerms.acceptTermsOfUse")}</span>
        <div class="toggle">
          <ToggleSwitch disabled={false} value={badgeAwardTermsAccepted}
                        onChange={val => badgeAwardTermsAccepted = !badgeAwardTermsAccepted}/>
        </div>
      </div>
      <div class="actions">
        <Button text={I18n.t("acceptTerms.accept")} action={agree} full={true}
                disabled={!badgeAwardTermsAccepted || !termsOfUseAccepted}/>

      </div>
    {:else}
      <Spinner/>
    {/if}
  </div>
</div>
