<script>
    import I18n from "i18n-js";
    import arrowDown from "../../../icons/forms/arrow-down.svg";
    import arrowUp from "../../../icons/forms/arrow-up.svg";
    import {onMount} from "svelte";

    export let ectsValue;
    export let disabled = false;
    export let isMicroCredentials = false;

    let minValue = 0;
    let maxValue = 0;

    onMount(() => {
        minValue = isMicroCredentials ? 3 : 0.5;
        maxValue = isMicroCredentials ? 30 : 240;
    })

    const decrement = () => {
        ectsValue = Math.max((ectsValue || 0) - 0.5, minValue);
    }

    const increment = () => {
        ectsValue = Math.min((ectsValue || 0) + 0.5, maxValue);
    }

    const onInput = e => {
        const val = parseFloat(e.target.value, 10);
        if (val < 0 || val > maxValue) {
            ectsValue = minValue;
        }
    }

    const onBlur = e => {
        const val = parseFloat(e.target.value, 10);
        const validDecimal = val % 1 ;
        if (val < minValue || val > maxValue || (validDecimal !== 0 && validDecimal !== 0.5)  ) {
            ectsValue = minValue;
        }
    }


</script>

<style lang="scss">

    .ects-points {
        display: flex;
        gap: 20px;
        width: 100%;
        align-content: space-between;
    }

    input, span {
        height: 42px;
        width: 48px;
        border-radius: 8px;
        border: solid 1px var(--grey-8);
        font-size: 18px;
        text-align: center;
        display: block;
    }

    span.control {
        color: var(--purple-8);
        cursor: pointer;
        line-height: 40px;
        border: none;
        background: var(--grey-2);

        :global(svg path) {
            stroke: black;
        }
    }

    input.value {
        flex-grow: 2;
    }

    p.info {
        margin-top: 5px;
        font-size: 14px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    /* Disabled */

    div[disabled="true"] {
        cursor: not-allowed !important;
    }

    div[disabled="true"] input {
        background-color: var(--grey-2);
    }

    div[disabled="true"] span {
        background-color: var(--grey-2);
    }


</style>

<div class="ects-points" {disabled}>
    <span class="control" on:click={decrement}>{@html arrowDown}</span>
    <input type="number"
           max={`${maxValue}`}
           min={`${minValue}`}
           step="0.5"
           class="value"
           bind:value={ectsValue}
           on:blur={onBlur}
           on:change={onInput}/>
    <span class="control" on:click={increment}>{@html arrowUp}</span>
</div>
<p class="info">{@html I18n.t(`models.badgeclass.info.${isMicroCredentials ? "ectsMicroCredentials" : "ects"}`)}</p>