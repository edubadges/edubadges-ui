<script>
  export let value = "";

  export let disabled;
  export let error;

  export let area;
</script>

<style>
  input,
  textarea {
    display: block;
    max-width: var(--field-max-width);
    width: 100%;

    padding: 8px 10px;

    font-size: var(--field-font-size);
    color: var(--field-color);

    border: var(--field-border);
    border-radius: var(--field-border-radius);
  }

  input:focus,
  textarea:focus {
    outline: var(--outline-fallback);
    box-shadow: var(--field-outline-shadow);
  }

  /* Disabled */
  div[disabled] * {
    color: var(--field-color-disabled);
  }

  div[disabled] input,
  div[disabled] textarea {
    cursor: var(--field-cursor-disabled);
    border-color: var(--field-border-color-disabled);
  }

  /* Invalid */
  div[error] input,
  div[error] textarea {
    border-color: var(--field-border-color-error);
    background-color: var(--field-background-error);
  }
</style>

<div {disabled} {error}>
  {#if area}
    <textarea class="input-field" bind:value rows="4" {disabled} />
  {:else}
    <input class="input-field" bind:value {disabled} />
  {/if}
</div>
