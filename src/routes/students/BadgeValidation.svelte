<script>

    import I18n from "i18n-js";
    import {formatDate} from "../../util/utils";
    import {Button} from "../../components";
    import ValidationSpinners from "./ValidationSpinners.svelte";

    export let validatedName;
    export let badge;
    export let importedBadge = false;

    let fetchingValidation = false;
    let validation;

    const validate = () => {
        fetchingValidation = true;
    }

</script>

<style lang="scss">
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  div.validation {
    width: 100%;
    display: flex;
    align-items: center;

    p.expired {
      color: var(--red-strong-dark);
    }

    div.button-container {
      margin-left: auto;
    }
  }

</style>
<div>
  <h3>{I18n.t("publicBadge.verification")}</h3>
  <div class="validation">

    <div class="info">
      {#if validatedName}
        <p>{@html I18n.t("publicBadge.issuedTo", {name: validatedName, date: formatDate(badge.issuedOn)})}</p>
      {:else}
        <p>{@html I18n.t("publicBadge.noValidatedName", {date: formatDate(badge.issuedOn), name: badge.user})}</p>
      {/if}
      {#if badge.expires && new Date(badge.expires) < new Date()}
        <p class="expired">{I18n.t("publicBadge.hasExpired", {date: formatDate(badge.expires)})}</p>
      {:else}
        <p>{badge.expires ? I18n.t("publicBadge.expires", {date: formatDate(badge.expires)}) : I18n.t("publicBadge.neverExpires")}</p>
      {/if}
    </div>
    <div class="button-container">
      <Button text={I18n.t("publicBadge.verify")} action={validate}/>
    </div>


  </div>
</div>
{#if fetchingValidation}
  <ValidationSpinners badge={badge} importedBadge={importedBadge} validatedName={validatedName}
                      close={() => fetchingValidation = false}/>
{/if}

