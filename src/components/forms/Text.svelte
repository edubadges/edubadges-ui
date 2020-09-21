<script>
  export let value = "";
  export let type = "text";
  export let max = "999999999999999";
  export let disabled;
  export let error;
  export let size;
  export let full;
  export let placeholder;

  export let area;
</script>

<style>
  /* Disabled */
  div[disabled] * {
    color: var(--color-text-light-grey);
  }

  div[disabled] input,
  div[disabled] textarea {
    cursor: not-allowed;
    background-color: var(--grey-2) ;
    color: var(--grey-10);
  }

  input:hover {
    cursor: pointer;
    background-color: var(--grey-1) ;
  }
</style>

<div {disabled} {error}>
  {#if area}
    <textarea {placeholder} class="input-field" style="{size ? 'height:' + size + 'px' : ''}" class:full class:error bind:value rows="4" {disabled}/>
  {:else if type === "text"}
    <input type="text" {placeholder} class="input-field" class:error bind:value {disabled}/>
  {:else}
    <input type="number" {placeholder} max={max} min="0" oninput="validity.valid||(value='');" class="input-field" class:error bind:value {disabled}/>
  {/if}
</div>
