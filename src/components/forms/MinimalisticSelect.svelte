<script>
  import Select from "svelte-select";
  import indicator from "../../icons/chevron-down.svg";

  export let value;
  export let items = [];

  export let disabled = false;
  export let clearable = true;

  export let optionIdentifier = "entityId";

  export let handleSelect = () => {
  };
</script>

<style lang="scss">

  div.select-minimal :global(.selectContainer input) {
    cursor: var(--field-cursor) !important;
    border: none;
  }

  div.select-minimal :global(.selectContainer.focused) {
    cursor: var(--field-cursor);
    outline: var(--outline-fallback);
    box-shadow: var(--field-outline-shadow);
  }

  div.select-minimal :global(.selectContainer.minimalistic .indicator svg) {
    fill: var(--purple);
  }

  div.select-minimal :global(.selectContainer.minimalistic .indicator) {
    position: relative;
    margin-left: auto;
    height: 100%;
    width: 26px;
    right: 7px;
    top: 8px;
    background-color: transparent;
    cursor: pointer;
  }

  div.select-minimal :global(.selectContainer.minimalistic .listContainer .listItem .item.active) {
    background-color: var(--purple);
  }

  div.select-minimal :global(.selectContainer.minimalistic .listContainer .listItem .item.hover:not(.active)) {
    background-color: var(--purple-1);
    cursor: pointer;
  }

</style>
<div class="select-minimal">
  <Select
    on:select={() => handleSelect(value)}
    {items}
      containerStyles="border:none;font-weight:bold;font-size:18px;color:#772583;"
      containerClasses="minimalistic"
      bind:selectedValue={value}
      {optionIdentifier}
      getOptionLabel={({ name }) => name}
      getSelectionLabel={({ name }) => name}
      placeholder={''}
      showChevron={true}
      showIndicator={true}
      indicatorSvg={indicator}
      isDisabled={disabled}
      isClearable={clearable} />

</div>
