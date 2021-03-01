<script>

  export let error;
  export let active;
  export let switchTab;

</script>

<style lang="scss">
  span.tab-choice {
    background: none;
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    color: var(--grey-7);
    margin: 0;
    cursor: pointer;

    &:first-child {
      margin-left: auto;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }

    &.selected {
      border-bottom: 2px solid purple;
      color: var(--black);
      cursor: default;
    }

    &.error {
      color: var(--red-dark);
      border-bottom: 2px solid var(--red-dark);

      &:not(.selected) {
        border-bottom: none;
      }
    }
  }


</style>
<span class="tab-choice" class:error={error} class:selected={active} on:click="{switchTab}">
		<slot/>
</span>
