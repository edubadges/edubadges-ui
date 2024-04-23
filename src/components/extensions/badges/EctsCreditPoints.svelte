<script>
    import I18n from "i18n-js";
    import arrowDown from "../../../icons/forms/arrow-down.svg";
    import arrowUp from "../../../icons/forms/arrow-up.svg";

    export let ectsValue;
    export let disabled = false;
    export let isMicroCredentials = false;

    const decrement = () => {
        ectsValue = Math.max((ectsValue || 0) - 0.5, isMicroCredentials ? 3 : 0.5);
    }

    const increment = () => {
        ectsValue = Math.min((ectsValue || 0) + 0.5, isMicroCredentials ? 30 : 240);
    }

    const onValid = `validity.valid||(value=${isMicroCredentials ? '3' : '0.5'})`;

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

<div class="ects-points" {disabled}>
    <span class="control" on:click={decrement}>{@html arrowDown}</span>
    <input type="number"
           max={`${isMicroCredentials ? "30" : "240"}`}
           min={`${isMicroCredentials ? "3" : "0.5"}`}
           step="0.5"
           oninput={onValid}
           class="value"
           bind:value={ectsValue}/>
    <span class="control" on:click={increment}>{@html arrowUp}</span>
    <p class="info">{@html I18n.t(`models.badgeclass.info.${isMicroCredentials ? "ectsMicroCredentials" : "ects"}`)}</p>

</div>