<script>
  import Select from "svelte-select";

  export let value;
  export let items = [];

  export let disabled = false;
  export let clearable = true;
  export let error;

  export let optionIdentifier = "entityId";

  export let handleSelect = () => {};
</script>

<style lang="scss">
  div :global(.selectContainer) {
    padding: 0 0 0 16px !important;
  }

  div :global(.selectContainer input) {
    cursor: var(--field-cursor) !important;
  }

  div :global(.selectContainer.focused) {
    cursor: var(--field-cursor);
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
  }

  div :global(.selectContainer .indicator svg) {
    fill: white;
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
    isClearable={clearable} />
</div>
