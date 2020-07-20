<script>
  import check from "../icons/check16.svg";
  import checkDisabled from "../icons/check-disabled.svg";

  export let value;
  export let onChange = () => {};
  export let disabled = false;
  export let label;


</script>
<style lang="scss">

  label.checkboxed {
    display: block;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    user-select: none;
    font-weight: 600;

    &.disabled {
      cursor: not-allowed;
    }
  }

  .checkboxed input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;

  }

  .checkmarked {
    position: absolute;
    top: -10px;
    left: 0;
    height: 18px;
    width: 18px;
    border: 1px solid var(--purple);
    border-radius: 2px;

    &:hover {
      background-color: #ebebeb;
    }

    &.active {
      background-color: var(--purple);
    }

    &.disabled {
      background-color: var(--grey-3);
      border: none;
    }
  }


</style>
<label class="checkboxed" class:disabled={disabled}>
  {#if label}
    <span>{label}</span>
  {/if}
  <input type="checkbox" checked={value}
         on:change={e => onChange(e.target.checked)}
         disabled={disabled}>
  <span class="checkmarked" class:active={value} class:disabled={disabled}>
    {#if value}
      {#if !disabled}
        {@html check}
      {/if}
    {/if}
  </span>
</label>
