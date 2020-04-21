<script>
  import Select from "svelte-select";

  export let value;
  export let items = [];

  export let disabled = false;
  export let clearable = true;
  export let error;

  export let optionIdentifier = "entityId";
  export let fullWidth = false;

</script>

<style lang="scss">

  div.full-width {
    width: 100%;
    max-width: 100%;
  }

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
    background-color: var(--color-text-grey);
  }

  div :global(.selectContainer.disabled .indicator) {
    background-color: var(--color-text-light-grey);
  }

  /* Disabled */
  div[disabled="true"] :global(.selectContainer input) {
    cursor: var(--field-cursor-disabled) !important;
  }

  /* Invalid */
  div[error] {
    --background: var(--field-background-error);
    --border: var(--field-border-error);
    --borderFocusColor: var(--field-border-color-error);
    --borderHoverColor: var(--field-border-color-error);
  }
</style>


<div class="select-field" {error} {disabled} class:full-width={fullWidth}>
  <Select
    {items}
    bind:selectedValue={value}
    optionIdentifier={optionIdentifier}
    getOptionLabel={({ name }) => name}
    getSelectionLabel={({ name }) => name}
    placeholder={""}
    showChevron={true}
    isDisabled={disabled}
    isClearable={clearable}/>

</div>
