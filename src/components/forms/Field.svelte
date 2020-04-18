<script>
  import I18n from "i18n-js";
  import { Select } from "../forms";
  import { warningIcon } from "../../icons";

  export let entity;
  export let attribute;
  export let disabled;
  export let errors;
</script>

<style>
  div.field {
    margin-bottom: var(--ver-padding-l);
  }

  label {
    font-weight: bold;
  }

  div.input {
    margin: 8px 0;
  }

  /* Disabled */
  div[disabled="true"] * {
    color: var(--color-text-light-grey);
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

<div class="field" {disabled} error={errors}>
  <label for={attribute}>{I18n.t(['models', entity, attribute])}</label>

  <div class="input">
    <slot />
  </div>

  {#if errors}
    {#each errors as { error_code, error_message }}
      <div class="error">
        {@html warningIcon}
        <span>
          {I18n.t(['error', error_code], { defaultValue: error_message })}
        </span>
      </div>
    {/each}
  {/if}
</div>
