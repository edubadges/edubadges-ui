<script>
  import search from "../icons/search.svg";
  import I18n from "i18n-js";

  export let value;
  export let limitWidth = true;
</script>

<style lang="scss">
  div {
    position: relative;
    width: 100%;
    min-width: 100px;
    height: 42px;
    min-height: 30px;

    &.limit-width {
      max-width: 400px;

    }

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      border: var(--card-border);
      padding-right: 30px;
      padding-left: 10px;

      &:focus {
        border-color: var(--purple);
      }
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

<div class:limit-width={limitWidth}>
  <input bind:value class="input-field" placeholder={I18n.t("searchPlaceholder")}/>
  {@html search}
</div>
