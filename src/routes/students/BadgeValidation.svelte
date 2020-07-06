<script>

  import I18n from "i18n-js";
  import {formatDate} from "../../util/utils";
  import {validateBadge} from "../../api";
  import {Button} from "../../components";
  import Modal from "../../components/forms/Modal.svelte";
  import ValidationSpinners from "./ValidationSpinners.svelte";

  export let validatedName;
  export let badge;

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
    margin-bottom: 30px;
    align-items: center;

    div.button-container {
      margin-left: auto;
    }
  }

</style>
<h3>{I18n.t("publicBadge.verification")}</h3>
<div class="validation">

  <div class="info">
    <p>{@html I18n.t("publicBadge.issuedTo", {name: validatedName, date: formatDate(badge.issuedOn)})}</p>
    <p>{badge.expires ? I18n.t("publicBadge.expires", {date: formatDate(badge.expires)}) : I18n.t("publicBadge.neverExpires")}</p>
  </div>
  <div class="button-container">
    <Button text={I18n.t("publicBadge.verify")} action={validate}/>
  </div>


</div>
{#if fetchingValidation}
  <ValidationSpinners badge={badge} validatedName={validatedName} close={() => fetchingValidation = false}/>
{/if}

