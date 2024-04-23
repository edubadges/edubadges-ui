<script>
    import I18n from "i18n-js";
    import {expirationPeriods} from "../extensions/badges/expiration_period";

    import RadioButton from "../forms/RadioButton.svelte";
    import Select from "../forms/Select.svelte";
    import Tooltip from "../Tooltip.svelte";
    import Error from "../forms/Error.svelte";

    export let expireValueSet = false;
    export let disabled = false;
    export let number;
    export let period;
    export let errors;

</script>

<style>
    .options {
        display: flex;
        align-items: center;
    }

    input.number {
        height: 42px;
        width: 48px;
        border-radius: 8px;
        border: solid 1px var(--text-grey-dark);
        font-size: 18px;
        text-align: center;
        display: block;
        margin-right: 20px;
    }

    input.number[disabled] {
        border: solid 1px var(--text-grey-light);
        cursor: not-allowed;
    }

    .expiration {
        width: 100%;
        display: flex;
        padding-top: 3px;
    }
</style>

<div class="expiration-settings">

    <Tooltip label={I18n.t("models.badgeclass.expireSettings")}
             marginBottom={true}
             tipKey="badgeClassExpireSettings"/>

    <div class="options">

        <RadioButton bind:values={expireValueSet} readOnly={disabled}
                     label={I18n.t('models.badgeclass.expiresAfterNever')}
                     value={false}/>

        <RadioButton bind:values={expireValueSet} readOnly={disabled}
                     label={I18n.t('models.badgeclass.expiresAfterOption')}
                     value={true}/>

        <div class="expiration">
            <input
                    class="number"
                    type="number"
                    min="1"
                    bind:value={number}
                    oninput="validity.valid||(value=1);"
                    disabled={!expireValueSet || disabled}/>

            <Select
                    bind:value={period}
                    items={expirationPeriods()}
                    optionIdentifier="key"
                    clearable={false}
                    disabled={!expireValueSet || disabled}/>
        </div>
    </div>
    {#if errors}
        {#each errors as {error_code, error_message}}
            <Error {error_code} {error_message}/>
        {/each}
    {/if}
</div>
