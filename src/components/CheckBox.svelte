<script>
    import check from "../icons/check16.svg";
    import Tooltip from "./Tooltip.svelte";

    export let value;
    export let onChange = () => {
    };
    export let disabled = false;
    export let label;
    export let tipKey;
    export let inForm = false;
    export let adjustTop = false;
    export let adjustTopFlex = false;


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

    &.in-form {
      margin-top: 15px;
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

    &.adjust-top {
      top: 5px;
    }

    &.adjust-top-flex {
      top: -1px;
    }

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
<label class="checkboxed" class:disabled={disabled} class:in-form={inForm}>
  {#if label}
    <span>{label}</span>
    {#if tipKey}
      <Tooltip tipKey={tipKey}/>
    {/if}
  {/if}
  <input type="checkbox" checked={value}
         on:change={e => onChange(e.target.checked)}
         disabled={disabled}>
  <span class="checkmarked" class:adjust-top={adjustTop} class:adjust-top-flex={adjustTopFlex} class:active={value}
        class:disabled={disabled}>
    {#if value && !disabled}
      {@html check}
    {/if}
  </span>
</label>
