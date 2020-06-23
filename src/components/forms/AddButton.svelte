<script>
  export let text;
  export let handleClick;
  export let visibility;
</script>

<style>
  .invisible {
    visibility: hidden;
  }

  .add {
    color: green;
    border: none;
    background-color: inherit;
    font-size: 16px;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>

<button class="add {visibility ? '' : 'invisible'}" on:click={handleClick}>+ {text}</button>