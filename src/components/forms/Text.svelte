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
    max-width: 250px;
    width: 100%;

    padding: 8px 10px;

    font-size: large;
    color: var(--color-text-grey);

    border: 1px solid var(--color-text-grey);
    border-radius: 4px;
  }

  /* Disabled */
  div[disabled] * {
    color: var(--color-text-light-grey);
  }

  div[disabled] input,
  div[disabled] textarea {
    cursor: not-allowed;
    border-color: var(--color-text-light-grey);
  }

  /* Invalid */
  div[error] input,
  div[error] textarea {
    border-color: var(--color-text-red);
    background-color: var(--color-background-red);
  }
</style>

<div {disabled} {error}>
  {#if area}
    <textarea bind:value rows="4" {disabled} />
  {:else}
    <input bind:value {disabled} />
  {/if}
</div>
