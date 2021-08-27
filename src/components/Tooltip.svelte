<script>
  import I18n from "i18n-js";
  import {isEmpty} from "lodash";
  import question from "../icons/question.svg";

  export let label = "";
  export let tipKey = "";
  export let marginBottom = false;
  export let marginTop = false;

  const translations = I18n.translations[I18n.locale];
  const exists = !isEmpty(translations.tooltips[tipKey]);

</script>

<style lang="scss">

  label {
    font-weight: bold;

    &.marginBottom {
      display: block;
      margin-bottom: 25px;
    }
    &.marginTop {
      display: block;
      margin-top: 15px;
    }
  }

  .tooltip-wrapper {
    position: relative;
    display: inline-block;
    font-size: 14px;
    color: #0062b0;
  }

  .tooltip {
    position: absolute;
    display: inline-block;
    opacity: 0;
    visibility: hidden;
    z-index: 99;
    font-weight: lighter;
    transition: opacity 150ms, visibility 150ms;
    padding: 8px 16px;
    border-radius: 6px;
    color: var(--black);
    background-color: var(--purple-1);

  }

  .tooltip.top {
    left: 50%;
    transform: translate(-50%, -100%);
    margin-top: -6px;
    width: 280px;
  }

  .tooltip:after {
    border-left: solid transparent 8px;
    border-right: solid transparent 8px;
    border-top: solid var(--purple-1) 8px;
    bottom: -8px;
    content: " ";
    height: 0;
    left: 50%;
    margin-left: 2px;
    position: absolute;
    width: 0;
  }

  .tooltip-slot:hover + .tooltip {
    opacity: 1;
    visibility: initial;
  }

  .tooltip:hover {
    opacity: 1;
    visibility: initial;
  }

  :global(.tooltip-slot svg circle, .tooltip-slot svg path  ) {
    color: var(--purple-2);
    fill: var(--purple-2);
  }

  :global(.tooltip-slot svg:hover circle, .tooltip-slot svg:hover path  ) {
    color: var(--purple-7);
    fill: var(--purple-7);
  }

  :global(.tooltip.top a  ) {
    color: var(--blue-link);
  }

  :global(.tooltip.top ol) {
    list-style: decimal;
    margin-left: 12px;
  }

</style>

<label class:marginBottom class:marginTop>
  {#if label}
    {label}
  {/if}
  {#if exists}
    <div class="tooltip-wrapper">
    <span class="tooltip-slot">
      {@html question}
    </span>
      <div class="tooltip top">
        {@html translations.tooltips[tipKey]}
      </div>
    </div>
  {/if}
</label>


