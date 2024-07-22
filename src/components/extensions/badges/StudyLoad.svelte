<script>
    import I18n from "i18n-js";
    import arrowDown from "../../../icons/forms/arrow-down.svg";
    import arrowUp from "../../../icons/forms/arrow-up.svg";
    import {onMount} from "svelte";
    import {isEmpty} from "../../../util/utils";
    import {badgeClassTypes} from "../../../util/badgeClassTypes";

    export let studyLoad = null;
    export let disabled = false;
    export let badgeClassType =  badgeClassTypes.EXTRA_CURRICULAR;
    export let isOptional = false;

    let minValue = 1;

    onMount(() => {
        minValue = badgeClassType === badgeClassTypes.MICRO_CREDENTIAL ? 240 : 1;
    });

    const decrement = () => {
        studyLoad = Math.max((studyLoad || 0) - 1, minValue);
    }

    const increment = () => {
        studyLoad = (studyLoad || 0) + 1;
    }

    const onInput = e => {
        const value = e.target.value;
        if (isEmpty(value) && isOptional) {
            studyLoad = null;
            e.target.value = null;
        } else {
            const val = isEmpty(value) ? minValue : parseInt(value, 10);
            if (val < minValue) {
                studyLoad = minValue;
            } else {
                studyLoad = val;
            }
        }
    }

    const onBlur = e => {
        let emptyValue = isEmpty(e.target.value);
        if (emptyValue && isOptional) {
            studyLoad = null;
        } else if (emptyValue && !isOptional) {
            studyLoad = minValue;
            e.target.value = minValue;
        } else {
            const val = Math.round(parseInt(e.target.value, 10));
            const valFloat = parseFloat(e.target.value);
            if (val < minValue || val !== valFloat) {
                studyLoad = minValue;
                e.target.value = minValue;
            }
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
           min={minValue}
           step="1"
           placeholder={I18n.t(`placeholders.badgeClass.studyLoad${badgeClassType.toUpperCase()}`)}
           class="value"
           value={studyLoad === 0 ? null : studyLoad}
           on:blur={onBlur}
           on:change={onInput}/>
    <span class="control" on:click={increment}>{@html arrowUp}</span>
</div>
<p class="info">{@html I18n.t(`models.badgeclass.info.studyLoad${badgeClassType.toUpperCase()}`)}</p>