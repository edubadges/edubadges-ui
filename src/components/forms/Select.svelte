<script>
  import Select from "svelte-select";
  import {TextInput} from "../forms";
  import indicator from "../../icons/chevron-down.svg";

  export let value;
  export let items = [];

  export let disabled = false;
  export let nonEditable = false;
  export let clearable = true;
  export let error;

  export let optionIdentifier = "entityId";

  export let handleSelect = () => {
  };
</script>

<style lang="scss">
  div :global(.selectContainer) {
    padding: 0 0 0 16px !important;
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
    right: 0;
    top: 0;
    background-color: var(--purple);
    cursor: pointer;
  }

  div :global(.selectContainer .indicator svg) {
    fill: white;
    margin-top: 3px;
  }

  div :global(.selectContainer .listContainer .listItem .item.active) {
    background-color: var(--purple);
  }

  div :global(.selectContainer .listContainer .listItem .item.hover:not(.active)) {
    background-color: var(--purple-1);
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
  <div class="select-field" {error} {disabled}>
    <Select
        on:select={() => handleSelect(value)}
        {items}
        bind:selectedValue={value}
        {optionIdentifier}
        getOptionLabel={({ name }) => name}
        getSelectionLabel={({ name }) => name}
        placeholder={''}
        showChevron={true}
        showIndicator={true}
        isDisabled={disabled}
        indicatorSvg={indicator}
        isClearable={clearable} />
  </div>
{/if}
