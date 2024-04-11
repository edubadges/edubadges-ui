<script>
    import I18n from "i18n-js";
    import Tooltip from "../Tooltip.svelte";
    import Error from "./Error.svelte";

    export let entity;
    export let attribute;
    export let disabled;
    export let errors;
    export let tipKey;
    export let required = false;
    export let full = false;
    export let isSelect = false;

</script>

<style lang="scss">
  div.field.full {
    width: 100%;
  }

  div.input {
    margin: 8px 0;
    min-width: 200px;
  }

  /* Disabled */
  div[disabled] * {
    color: var(--text-grey-light);
  }

</style>

<div class="field" {disabled} class:full>
  <Tooltip label={I18n.t(['models', entity, attribute])}
           required={required}
           isSelect={isSelect}
           tipKey={tipKey}/>

  <div class="input">
    <slot/>
  </div>

  {#if errors}
    {#each errors as {error_code, error_message}}
      <Error {error_code} {error_message}/>
    {/each}
  {/if}
</div>
