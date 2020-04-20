<script>
  import I18n from "i18n-js";
  import {expirationPeriods} from "../extensions/badges/expiration_period";

  import RadioButton from "../forms/RadioButton.svelte";
  import Select from "../forms/Select.svelte";

  export let expireValueSet = false;
  export let disabled;
  export let number;
  export let period;


</script>
<style>
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 25px;
  }

  .options {
    display: flex;
    align-items: center;
  }

  input.number {
    height: 42px;
    width: 48px;
    border-radius: 8px;
    border: solid 1px var(--color-text-grey);
    font-size: 18px;
    text-align: center;
    display: block;
    margin-right: 20px;
  }

  input.number[disabled] {
    border: solid 1px var(--color-text-light-grey);
    cursor: var(--field-cursor-disabled);
  }

  .expiration {
    width: 100%;
    display: flex;
    padding-top: 3px;
  }


</style>


<div class="expiration-settings" {disabled}>

  <label for="expiration-settings">{I18n.t("models.badgeclass.expireSettings")}</label>
  <div class="options">

    <RadioButton bind:values={expireValueSet} label="Never" value={false}/>

    <RadioButton bind:values={expireValueSet} label="After" value={true}/>

    <div class="expiration">
      <input class="number" type="number" min="1" bind:value={number} disabled={!expireValueSet}/>

      <Select bind:value={period} items={expirationPeriods()} optionIdentifier="key" clearable={false} disabled={!expireValueSet}
              fullWidth={true}/>
    </div>
  </div>
</div>
