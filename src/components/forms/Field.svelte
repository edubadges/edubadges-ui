<script>
  import I18n from "i18n-js";
  import {Select} from "../forms";
  import {warningIcon} from "../../icons";
  import Tooltip from "../Tooltip.svelte";

  export let entity;
  export let attribute;
  export let disabled;
  export let errors;
  export let tipKey;

</script>

<style>

  div.input {
    margin: 8px 0;
    min-width: 200px;
  }

  /* Disabled */
  div[disabled] * {
    color: var(--text-grey-light);
  }

  div.error {
    display: flex;
    color: var(--red-dark);
    margin-bottom: 10px;
  }

  div.error :global(svg.icon-warning) {
    height: 1rem;
    margin-right: 10px;
    fill: var(--red-dark);
  }
</style>

<div class="field" {disabled}>
  <Tooltip label={I18n.t(['models', entity, attribute])} tipKey={tipKey}/>

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
