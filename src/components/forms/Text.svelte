<script>
  export let value = "";

  export let disabled = false;
  export let error;

  export let area;
</script>

<div {disabled} {error}>
  {#if area}
    <textarea class="input-field" class:error bind:value rows="4" {disabled} />
  {:else}
    <input class="input-field" class:error bind:value {disabled} />
  {/if}
</div>
