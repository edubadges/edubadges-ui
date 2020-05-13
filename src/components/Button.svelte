<script>
  import { link } from "svelte-routing";

  export let text;
  export let href;
  export let label;
  export let action;
  export let secondary;
  export let disabled = false;
  export let small;
</script>

<style lang="scss">
  a,
  label {
    display: inline-block;
    height: fit-content;

    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--purple);

    text-decoration: none;
    text-align: center;

    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;

    &:not([disabled="true"]):focus {
      outline: 1px solid var(--purple);
      box-shadow: 1px 1px 3px var(--purple), -1px -1px 3px var(--purple);
    }

    &[disabled="true"] {
      cursor: not-allowed;
    }
  }

  a:not(.small),
  label:not(.small) {
    min-width: 140px;
    padding: 8px 18px;
    font-size: 1rem;
    font-weight: bold;
  }

  a.small,
  label.small {
    padding: 5px 10px;
    font-size: 0.85rem;
  }

  a:not(.secondary),
  label:not(.secondary) {
    background-color: var(--purple);
    color: white;

    &:not([disabled="true"]):hover {
      background-color: var(--purple-8);
      color: var(--purple-1);
    }

    &[disabled="true"] {
      background: var(--grey-2);
      border-color: var(--grey-2);
      color: var(--grey-4);
    }
  }

  a.secondary,
  label.secondary {
    background: white;
    color: var(--purple);

    &:not([disabled="true"]):hover {
      background-color: var(--grey-2);
      color: var(--purple-8);
    }

    &[disabled="true"] {
      color: var(--grey-4);
      border-color: var(--grey-3);
    }
  }
</style>

{#if label}
  <label for={label} {disabled} class:small class:secondary>{text}</label>
{:else if action}
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a
    href="#"
    on:click|preventDefault={() => disabled ? false : action()}
    {disabled}
    class:small
    class:secondary>
    {text}
  </a>
{:else if href}
  <a use:link {href} {disabled} class:small class:secondary>{text}</a>
{/if}
