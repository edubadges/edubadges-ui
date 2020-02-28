<script>
  export let filter;
  let numberOfMatches = 6;  // TODO
  export let active;
  export let visible;

  import Icon from 'fa-svelte'
  import { faTimesCircle } from '@fortawesome/free-regular-svg-icons/faTimesCircle'

  let icon = faTimesCircle;
</script>

<style>
  .filter-item {
  }

  .filter-active {
    border: solid dimgrey 1px;
    background-color: white;
  }

  .filter-hidden {
    visibility: hidden;
  }

  .asdf {
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-decoration: underline;
  }

  p[numberOfMatches]::after {
    text-decoration: none;
    content: '('attr(numberOfMatches)')';
    margin-left: 4px;
    display: inline-block;
  }
</style>

<div class="filter-item {active ? 'filter-active' : ''} {visible ? '' : 'filter-hidden'}">
  <div class="asdf"><p {numberOfMatches}>{filter}</p></div>
  {#if active}
    <div style="float: right"><Icon icon={faTimesCircle}/></div>
  {/if}
</div>
