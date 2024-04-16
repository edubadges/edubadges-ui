<script>
    import I18n from "i18n-js";
    import arrowDown from "../../../icons/forms/arrow-down.svg";
    import arrowUp from "../../../icons/forms/arrow-up.svg";

    export let studyLoad = 0;
    export let disabled = false;

    const decrement = () => {
        studyLoad = Math.max((studyLoad || 0) - 1, 1);
    }

    const increment = () => {
        studyLoad = Math.min((studyLoad || 0) + 1, 4000);
    }

    const onValid = `validity.valid||(value=${'4000'})`;

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
        background:  var(--grey-2);

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


</style>

<div class="study-load" {disabled}>
    <span class="control" on:click={decrement}>{@html arrowDown}</span>
    <input type="number"
           max="4000"
           min="0"
           step="1"
           onblur={onValid}
           placeholder={I18n.t("placeholders.badgeClass.studyLoad")}
           class="value"
           bind:value={studyLoad}/>
    <span class="control" on:click={increment}>{@html arrowUp}</span>

</div>