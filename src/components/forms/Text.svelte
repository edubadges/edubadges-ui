<script>
  export let value = "";

  export let disabled;
  export let error;

  export let area;
  export let fullWidth = false;
</script>

<div {disabled} {error}>
  {#if area}
    <textarea class="input-field" class:error bind:value rows="4" {disabled} class:full-width={fullWidth}/>
  {:else}
    <input class="input-field" class:error bind:value {disabled} class:full-width={fullWidth}/>
  {/if}
</div>
