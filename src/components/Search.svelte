<script>
  import { searchIcon } from "../icons";

  export let value;
</script>

<style lang="scss">
  div {
    position: relative;
    width: 100%;
    min-width: 100px;
    max-width: 250px;
    height: 42px;
    min-height: 30px;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      border: var(--card-border);
      padding-right: 30px;
      padding-left: 10px;
    }

    :global(svg.search) {
      position: absolute;
      right: 5px;
      height: 100%;
      width: 20px;
      fill: var(--purple);
    }
  }
</style>

<div>
  <input bind:value class="input-field" />
  {@html searchIcon}
</div>
