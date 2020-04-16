<script>
  import Select from "svelte-select";

  export let value;
  export let items;

  export let disabled;
  export let error;
</script>

<style lang="scss">

</style>

<div class="select-field" {error} {disabled}>
  <Select
    {items}
    bind:selectedValue={value}
    optionIdentifier="entityId"
    getOptionLabel={({ name }) => name}
    getSelectionLabel={({ name }) => name}
    placeholder=""
    showChevron
    isDisabled={disabled} />
</div>
