<script>
  export let filter;
  export let count;
  export let active;
  export let hidden;
</script>

<style>
  .filter-item {
  }

  .filter-active {
    border: solid darkgray 2px;
    background-color: white;
  }

  .filter-hidden {
    visibility: hidden;
  }

  .filter-text-inactive {
    text-decoration: underline;
  }

  .filter-item-inner {
    width: 80%;
    margin-left: 5px;
    overflow: hidden;
    display: inline-block;
  }

  p[count]::after {
    text-decoration: none;
    content: '('attr(count)')';
    margin-left: 4px;
    display: inline-block;
  }

  .icon-holder{
    color: black;
    float: right;
    margin-top: 5px;
    margin-right: 5px;
  }
</style>

<div class="filter-item {active ? 'filter-active' : ''} {hidden ? 'filter-hidden' : ''}">
  <div class="filter-item-inner"><p class={!active ? 'filter-text-inactive' : ''} {count}>{filter}</p></div>
  {#if active}
    <div class="icon-holder">x</div>
  {/if}
</div>
