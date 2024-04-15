<script>
    import Select from "svelte-select";
    import {TextInput} from "../forms";
    import indicator from "../../icons/chevron-down.svg";

    export let value;
    export let items = [];

    export let disabled = false;
    export let nonEditable = false;
    export let clearable = true;
    export let isMulti = false;
    export let full = false;
    export let isSearchable = false;
    export let listOpen = false;
    export let error;
    export let showChevron = true;
    export let showIndicator = true;
    export let placeholder = "";
    export let customIndicator = null;
    export let getOptionLabel = option => option.name;
    export let getSelectionLabel = option => option.name;

    export let optionIdentifier = "entityId";

    export let handleSelect = () => {
    };
</script>

<style lang="scss">
    div :global(.selectContainer) {
        padding: 0 0 0 0 !important;
    }

    div :global(.selectContainer.focused) {
        z-index: 9;
    }

    div :global(.selectContainer .selectedItem) {
        padding: 0 0 0 16px !important;
    }

    div :global(.selectContainer.multiSelect input) {
        padding: 0 0 0 16px !important;
        font-size: 16px;
    }

    div :global(.selectContainer.focused) {
        outline: var(--outline-fallback);
        box-shadow: var(--field-outline-shadow);
    }

    div :global(.selectContainer .indicator) {
        position: relative;
        margin-left: auto;
        height: 100%;
        width: 36px;
        max-width: 36px;
        right: 0;
        top: 0;
        background-color: var(--purple);
        cursor: pointer;
    }

    div :global(.selectContainer .clearSelect) {
        cursor: pointer;
    }

    div :global(.selectContainer .indicator svg) {
        fill: white;
        width: 32px;
        height: 26px;
        margin-top: 5px;
        margin-left: 2px;
    }

    div :global(.selectContainer .indicator svg.chevron-down-large) {
        height: 32px;
    }

    div :global(.multiSelectItem_label) {
        color: black;
    }

    div :global(.multiSelectItem) {
        border: 1px solid var(--grey-4);
        color: black;
    }

    div :global(.selectContainer .listContainer .listItem .item.active) {
        background-color: var(--purple);
    }

    div :global(.selectContainer .multiSelectItem) {
        margin: 5px 8px;
    }

    div :global(.selectContainer .multiSelectItem:hover) {
        background-color: var(--grey-2);
    }

    div :global(.selectContainer .listContainer .listItem .item.hover:not(.active)) {
        background-color: var(--purple-1);
        cursor: pointer;
    }

    div :global(.multiSelectItem_clear) {
        cursor: pointer;
    }

    div :global(.selectContainer.disabled .indicator) {
        background-color: var(--text-grey-light);
    }

    /* Disabled */
    div[disabled="true"] :global(.selectContainer input) {
        cursor: not-allowed !important;
    }

    /* Invalid */
    div[error] {
        --background: var(--field-background-error);
        --border: var(--field-border-error);
        --borderFocusColor: var(--field-border-color-error);
        --borderHoverColor: var(--field-border-color-error);
    }
</style>

{#if nonEditable || disabled}
    <TextInput disabled={true} value={value ? value.name : ""}/>
{:else}
    <div class="select-field" {error} {disabled} class:full>
        <Select
                on:select={() => handleSelect(value)}
                {items}
                bind:selectedValue={value}
                {optionIdentifier}
                getOptionLabel={getOptionLabel}
                getSelectionLabel={getSelectionLabel}
                placeholder={placeholder}
                showChevron={showChevron}
                showIndicator={showIndicator}
                isMulti={isMulti}
                listOpen={listOpen}
                isSearchable={isSearchable}
                on:clear={() => handleSelect(null)}
                isDisabled={disabled}
                indicatorSvg={customIndicator || indicator}
                isClearable={clearable}/>
    </div>
{/if}
