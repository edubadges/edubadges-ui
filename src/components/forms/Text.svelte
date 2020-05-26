<script>
  export let value = "";
  export let type = "text";
  export let max = "999999999999999"
  export let disabled = false;
  export let error;

  export let area;
</script>

<div {disabled} {error}>
  {#if area}
    <textarea class="input-field" class:error bind:value rows="4" {disabled}/>
  {:else if type === "text"}
    <input type="text" class="input-field" class:error bind:value {disabled}/>
  {:else}
    <input type="number" max={max} class="input-field" class:error bind:value {disabled}/>
  {/if}
</div>
