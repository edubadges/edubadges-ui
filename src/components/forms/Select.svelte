<script>
  import Select from "svelte-select";

  export let value;
  export let items;

  export let disabled = false;
  export let clearable = true;
  export let error;

  export let optionIdentifier = "entityId";
  export let fullWidth = false;

</script>

<style>
  div {
    max-width: var(--field-max-width);
    font-size: var(--field-font-size);
    color: var(--field-color);

    /* select */
    --border: var(--field-border);
    --borderHoverColor: var(--field-border-color);
    --borderFocusColor: var(--field-border-color);
    --borderRadius: var(--field-border-radius);
    --inputFontSize: var(--field-font-size);

    --disabledColor: var(--field-color-disabled);
    --disabledBorderColor: var(--field-border-color-disabled);
    --disabledBackground: var(--field-background);
  }

  div.full-width {
    width: 100%;
    max-width: 100%;
  }

  div :global(.selectContainer input) {
    cursor: var(--field-cursor) !important;
  }

  div :global(.selectContainer.focused) {
    cursor: var(--field-cursor);
    outline: var(--outline-fallback);
    box-shadow: var(--field-outline-shadow);
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

<div class="input-field" {error} {disabled} class:full-width={fullWidth}>

  <Select
    {items}
    bind:selectedValue={value}
    optionIdentifier={optionIdentifier}
    getOptionLabel={({ name }) => name}
    getSelectionLabel={({ name }) => name}
    placeholder={""}
    showChevron={true}
    isDisabled={disabled}
    isClearable={clearable} />

</div>
