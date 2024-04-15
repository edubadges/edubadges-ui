<script>
  export let text;
  export let handleClick;
  export let visibility;
  export let disabled = false;
</script>

<style>
  .add {
    color: var(--green-medium);
    border: none;
    background-color: inherit;
    font-size: 14px;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }

  .add-button {
    margin-right: 20px;
  }

  .disabled {
    cursor: not-allowed !important;
    color: var(--grey-7);
  }

</style>

{#if visibility}
  <span class="add-button">
    <button class="add" class:disabled on:click={e => !disabled && handleClick(e)}>+ {text}</button>
  </span>
{/if}