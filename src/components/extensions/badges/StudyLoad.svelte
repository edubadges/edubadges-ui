<script>
    import I18n from "i18n-js";
    import arrowDown from "../../../icons/forms/arrow-down.svg";
    import arrowUp from "../../../icons/forms/arrow-up.svg";

    const minValue = 84;
    const maxValue = 840;

    export let studyLoad = minValue;
    export let disabled = false;

    const decrement = () => {
        studyLoad = Math.max((studyLoad || minValue + 1) - 1, 1);
    }

    const increment = () => {
        studyLoad = Math.min((studyLoad || 0) + 1, maxValue);
    }

    const onInput = e => {
        const val = parseInt(e.target.value, 10);
        if (val < 0 || val > maxValue) {
            studyLoad = 84;
        }
    }

    const onBlur = e => {
        const val = parseInt(e.target.value, 10);
        const valFloat = parseFloat(e.target.value);
        if (val < minValue || val > maxValue || val !== valFloat) {
            studyLoad = 84;
        }
    }

</script>

<style lang="scss">

    .study-load {
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
        display: none;
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

    p.info {
        margin-top: 5px;
        font-size: 14px;
    }

</style>

<div class="study-load" {disabled}>
    <span class="control" on:click={decrement}>{@html arrowDown}</span>
    <input type="number"
           max="840"
           min="84"
           step="1"
           placeholder={I18n.t("placeholders.badgeClass.studyLoad")}
           class="value"
           bind:value={studyLoad}
           on:blur={onBlur}
           on:change={onInput}/>
    <span class="control" on:click={increment}>{@html arrowUp}</span>
</div>
<p class="info">{@html I18n.t("models.badgeclass.info.studyLoad")}</p>