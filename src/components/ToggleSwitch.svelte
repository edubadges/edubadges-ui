<script>

  export let value;
  export let onChange;

</script>

<style lang="scss">
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--grey-2);
    transition: .4s;

    &::before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
    }

    &.round {
      border-radius: 34px;
    }

    &.round::before {
      border-radius: 50%;
    }

    &.round:not(.checked)::before {
      border: 1px solid var(--grey-4);
    }

  }

  input:checked + .slider.checked {
    background-color: var(--purple);
  }

  input:focus + .slider.checked {
    box-shadow: 0 0 1px var(--purple);
  }

  input:checked + .slider.checked:before {
    transform: translateX(26px);
  }

</style>

<label class="switch">
  <input type="checkbox" checked={value}
         disabled={true}>
  <span class:checked={value} class="slider round" on:click={() => onChange(!value)}></span>
</label>