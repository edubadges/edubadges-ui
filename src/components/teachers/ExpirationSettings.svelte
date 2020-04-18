<script>
  import I18n from "i18n-js";
  import RadioButton from "../forms/RadioButton.svelte";
  import Select from "../forms/Select.svelte";

  const items = [
    {name: I18n.t("models.badgeclass.expirationDurations.days"), key: "D"},
    {name: I18n.t("models.badgeclass.expirationDurations.weeks"), key: "W"},
    {name: I18n.t("models.badgeclass.expirationDurations.months"), key: "M"},
    {name: I18n.t("models.badgeclass.expirationDurations.years"), key: "Y"}
  ]

  export let expireValueSet;
  export let disabled;
  export let number = 1;
  export let duration = items[3];


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
    border: solid 1px #dfe3e8;
    font-size: 18px;
    text-align: center;
    display: block;
    margin-right: 20px;
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
      <input class="number" bind:value={number} disabled={!expireValueSet}/>

      <Select bind:value={duration} items={items} optionIdentifier="key" clearable={false} disabled={!expireValueSet}
              fullWidth={true}/>
    </div>
  </div>
</div>
