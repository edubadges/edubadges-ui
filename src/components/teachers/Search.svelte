<script>
  import I18n from "i18n-js";
  import { searchIcon } from "../../icons";
  import { search } from "../../stores/filter";
</script>

<style lang="scss">
  div {
    position: relative;
    width: 100%;
    height: 30px;

    input {
      position: absolute;
      width: 100%;
      height: 100%;

      border: var(--card-border);
      border-radius: var(--card-border-radius);
      padding-right: 30px;
      padding-left: 10px;
    }

    :global(svg.search) {
      position: absolute;
      right: 5px;
      height: 100%;
      width: 20px;
      fill: var(--color-primary-purple);
    }
  }
</style>

<h5 class="purple">{I18n.t('teacher.sidebar.search')}</h5>

<div>
  <input bind:value={$search} />
  {@html searchIcon}
</div>
