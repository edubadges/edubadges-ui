<script>
  import { warningIcon } from "../../icons";

  export let label = "";
  export let value = "";

  export let disabled;
  export let error;

  export let type;
</script>

<style>
  div.field {
    margin-bottom: var(--ver-padding-l);
  }

  label {
    font-weight: bold;
  }

  input,
  textarea {
    display: block;
    max-width: 250px;
    width: 100%;

    padding: 8px 10px;
    margin: 8px 0;

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

  div.error {
    display: flex;
    color: var(--color-text-red);
  }

  div.error :global(svg.icon-warning) {
    height: 1rem;
    margin-right: 10px;
    fill: var(--color-text-red);
  }
</style>

<div class="field" {disabled} {error}>
  <label for={label}>{label}</label>

  {#if type === 'area'}
    <textarea bind:value rows="4" {disabled} />
  {:else}
    <input bind:value {disabled} />
  {/if}

  {#if error}
    <div class="error">
      {@html warningIcon}
      <span>{error}</span>
    </div>
  {/if}
</div>
