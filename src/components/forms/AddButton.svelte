<script>
  export let text;
  export let handleClick;
  export let visibility;
  export let disabled = false;
</script>

<style>
  .invisible {
    display: none;
  }

  .add {
    color: var(--green-medium);
    border: none;
    background-color: inherit;
    font-size: 16px;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }

  .disabled {
    cursor: not-allowed !important;
    color: var(--grey-7);
  }

</style>

{#if disabled}
  <button class="add disabled {visibility ? '' : 'invisible'}" on:click={handleClick}>+ {text}</button>
{:else}
  <button class="add {visibility ? '' : 'invisible'}" on:click={handleClick}>+ {text}</button>
{/if}