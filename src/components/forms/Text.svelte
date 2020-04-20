<script>
  export let value = "";

  export let disabled;
  export let error;

  export let area;
  export let fullWidth = false;
</script>

<style>
  input,
  textarea {
    display: block;
    max-width: var(--field-max-width);
    width: 100%;

    padding: 11px 10px;

    font-size: var(--field-font-size);
    color: var(--field-color);

    border: var(--field-border);
    border-radius: var(--field-border-radius);
  }

  input.full-width, textarea.full-width {
    max-width: 100%;
  }
  input:focus,
  textarea:focus {
    outline: var(--outline-fallback);
    box-shadow: var(--field-outline-shadow);
  }

  /* Disabled */
  div[disabled="true"] * {
    color: var(--field-color-disabled);
  }

  div[disabled="true"] input,
  div[disabled="true"] textarea {
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
    <textarea class="input-field" bind:value rows="4" {disabled} class:full-width={fullWidth}/>
  {:else}
    <input class="input-field" bind:value {disabled} class:full-width={fullWidth}/>
  {/if}
</div>
