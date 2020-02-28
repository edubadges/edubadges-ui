<script>
  export let filter;
  export let count;
  export let active;

  import Icon from 'fa-svelte'
  import { faTimesCircle } from '@fortawesome/free-regular-svg-icons/faTimesCircle'

  let icon = faTimesCircle;
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

  .asdf {
    width: 80%;
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-decoration: underline;
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

<div class="filter-item {active ? 'filter-active' : ''} {count !== 0 ? '' : 'filter-hidden'}">
  <div class="asdf"><p {count}>{filter}</p></div>
  {#if active}
    <div class="icon-holder"><Icon icon={faTimesCircle}/></div>
  {/if}
</div>
