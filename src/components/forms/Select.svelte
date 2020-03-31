<script>
  import Select from "svelte-select";

  export let value;
  export let items;

  export let disabled;
  export let error;
</script>

<style>
  div {
    max-width: 250px;
    font-size: large;
    color: var(--color-text-grey);

    /* select */
    --border: 1px solid var(--color-text-grey);
    --borderRadius: 4px;
    --inputFontSize: large;

    --disabledColor: var(--color-text-light-grey);
    --disabledBorderColor: var(--color-text-light-grey);
    --disabledBackground: white;
  }

  div :global(.selectContainer input) {
    cursor: text !important;
  }

  div :global(.selectContainer.focused) {
    cursor: text;
    outline: 1px solid var(--outline-blue);
    box-shadow: 1px 1px 3px var(--outline-blue),
      -1px -1px 3px var(--outline-blue);
  }

  /* Disabled */
  div[disabled] :global(.selectContainer input) {
    cursor: not-allowed !important;
  }

  /* Invalid */
  div[error] {
    --background: var(--color-background-red);
    --border: 1px solid var(--color-text-red);
    --borderFocusColor: var(--color-text-red);
    --borderHoverColor: var(--color-text-red);
  }
</style>

<div {error} {disabled}>
  <Select
    {items}
    bind:selectedValue={value}
    optionIdentifier="entityId"
    placeholder=""
    isDisabled={disabled} />
</div>
