<script>
  import I18n from "i18n-js";
  import {warningIcon} from "../../icons";

  export let error_code;
  export let error_message;
  export let standAlone;

</script>

<style lang="scss">

  div.error {
    display: flex;
    color: var(--red-dark);
    margin-bottom: 10px;

    &.stand-alone {
      margin-top: 10px;
    }
  }

  div.error :global(svg.icon-warning) {
    height: 1rem;
    margin-right: 10px;
    fill: var(--red-dark);
  }
</style>

<div class="error" class:stand-alone={standAlone}>
  {@html warningIcon}
  <span>
          {I18n.t(['error', error_code], {defaultValue: error_message})}
        </span>
</div>
