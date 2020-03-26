<script>
  import { link } from "svelte-routing";
  import { currentPath } from "../../stores/currentPath";

  export let institutionName = "";
  export let faculty;
  export let issuer;
  export let badgeclassName = "";
</script>

<style>
  div {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
  }

  a {
    color: var(--text-color-grey);
  }

  a:last-of-type {
    font-weight: bold;
  }

  a:not(:last-of-type) {
    text-decoration: underline;
  }

  span {
    margin: auto 4px;
  }
</style>

<div>
  <a use:link href="/manage/institution">{institutionName}</a>

  {#if faculty}
    <span>></span>
    <a use:link href={`/manage/faculty/${faculty.entityId}`}>{faculty.name}</a>
  {/if}

  {#if issuer}
    <span>></span>
    <a use:link href={`/manage/issuer/${issuer.entityId}`}>{issuer.name}</a>
  {/if}

  {#if badgeclassName}
    <span>></span>
    <a use:link href={$currentPath}>{badgeclassName}</a>
  {/if}
</div>
