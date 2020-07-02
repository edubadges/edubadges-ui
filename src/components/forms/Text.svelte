<script>
  export let value = "";
  export let type = "text";
  export let max = "999999999999999";
  export let disabled;
  export let error;
  export let size;

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
    border-color: var(--color-text-light-grey);
  }
</style>

<div {disabled} {error}>
  {#if area}
    <textarea class="input-field" style="{size ? 'height:' + size + 'px' : ''}" class:error bind:value rows="4" {disabled}/>
  {:else if type === "text"}
    <input type="text" class="input-field" class:error bind:value {disabled}/>
  {:else}
    <input type="number" max={max} class="input-field" class:error bind:value {disabled}/>
  {/if}
</div>
