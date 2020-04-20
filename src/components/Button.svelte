<script>
  import { link } from "svelte-routing";

  export let text;
  export let href;
  export let label;
  export let action;
  export let secondary;
  export let disabled;
</script>

<style lang="scss">
  a,
  label {
    display: inline-block;

    height: fit-content;
    min-width: 140px;
    padding: 8px 18px;

    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--purple);

    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    text-align: center;

    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;

    &:focus {
      outline: 1px solid var(--purple);
      box-shadow: 1px 1px 3px var(--purple), -1px -1px 3px var(--purple);
    }

    &[disabled] {
      cursor: not-allowed;
    }
  }

  a:not(.secondary),
  label:not(.secondary) {
    background-color: var(--purple);
    color: white;

    &:not([disabled]):hover {
      background-color: var(--purple-8);
      color: var(--purple-1);
    }

    &[disabled] {
      background: var(--grey-2);
      border-color: var(--grey-2);
      color: var(--grey-4);
    }
  }

  a.secondary,
  label.secondary {
    background: white;
    color: var(--purple);

    &:not([disabled]):hover {
      background-color: var(--grey-2);
      color: var(--purple-8);
    }

    &[disabled] {
      color: var(--grey-4);
      border-color: var(--grey-3);
    }
  }
</style>

{#if label}
  <label for={label} {disabled} class:secondary>{text}</label>
{:else if action}
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a href="#" on:click|preventDefault={action} {disabled} class:secondary>
    {text}
  </a>
{:else if href}
  <a use:link {href} {disabled} class:secondary>{text}</a>
{/if}
