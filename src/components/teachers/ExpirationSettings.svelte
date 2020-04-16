<script>
  import I18n from "i18n-js";
  import RadioButton from "../forms/RadioButton.svelte";

  export let expireValueSet;
  export let disabled;


</script>
<style>
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 25px;
  }
  .options {
    display: flex;
  }
</style>


<div class="expiration-settings" {disabled}>

  <label for="expiration-settings">{I18n.t("models.badgeclass.expireSettings")}</label>
  <div class="options">

    <RadioButton bind:values={expireValueSet} label="Never" value={false}/>

    <RadioButton bind:values={expireValueSet} label="After" value={true}/>
  </div>
</div>
