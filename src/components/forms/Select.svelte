<script>
  import Select from "svelte-select";

  export let value;
  export let items;

  export let disabled;
  export let error;
</script>

<style>
  div {
    max-width: var(--field-max-width);
    font-size: var(--field-font-size);
    color: var(--field-color);

    /* select */
    --border: var(--field-border);
    --borderRadius: var(--field-border-radius);
    --inputFontSize: var(--field-font-size);

    --disabledColor: var(--field-color-disabled);
    --disabledBorderColor: var(--field-border-color-disabled);
    --disabledBackground: var(--field-background);
  }

  div :global(.selectContainer input) {
    cursor: var(--field-cursor) !important;
  }

  div :global(.selectContainer.focused) {
    cursor: var(--field-cursor);
    outline: var(--field-outline);
    box-shadow: var(--field-outline-shadow);
  }

  /* Disabled */
  div[disabled] :global(.selectContainer input) {
    cursor: var(--field-cursor-disabled) !important;
  }

  /* Invalid */
  div[error] {
    --background: var(--field-background-error);
    --border: var(--field-border-error);
    --borderFocusColor: var(--outline-blue);
    --borderHoverColor: var(--field-border-color-error);
  }
</style>

<div class="input-field" {error} {disabled}>
  <Select
    {items}
    bind:selectedValue={value}
    optionIdentifier="entityId"
    placeholder=""
    isDisabled={disabled} />
</div>
