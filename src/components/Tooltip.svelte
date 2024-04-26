<script>
    import I18n from "i18n-js";
    import {isEmpty} from "../util/utils";
    import question from "../icons/question.svg";

    export let label = "";
    export let tipKey = "";
    export let marginBottom = false;
    export let marginTop = false;
    export let placement = "top";
    export let required = false;
    export let isSelect = false;
    export let absolute = true;
    export let tooltipText;

    const translations = I18n.translations[I18n.locale];
    const exists = !isEmpty(translations.tooltips[tipKey]) || tooltipText;

</script>

<style lang="scss">

    span.title {
        font-weight: bold;
        position: relative;
        display: inline-block;

        &.absolute {
            width: 100%;
        }


        &.marginBottom {
            display: block;
            margin-bottom: 10px;
        }

        &.marginTop {
            display: block;
            margin-top: 15px;
        }
    }

    sup {
        line-height: 0;
    }

    .tooltip-wrapper {
        position: absolute;
        display: inline-block;
        font-size: 14px;
        color: #0062b0;
        right: 0;
        top: 4px;

        &:not(.absolute) {
            position: initial;
        }

        &.adjust-top {
            top: -2;
        }
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

        &.right {
            transform: translate(10%, -40%);
        }
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

    .tooltip.right:after {
        border-left: solid transparent 8px;
        border-right: solid var(--purple-1) 8px;
        border-top: solid transparent 8px;
        border-bottom: solid transparent 8px;
        bottom: -8px;
        content: " ";
        height: 0;
        left: -4px;
        margin-left: -12px;
        position: absolute;
        width: 0;
        top: 42%;
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

<span class="title" class:marginBottom class:marginTop class:absolute={absolute}>
    {#if label}
        {label}
        {#if required}
            <sup>*</sup>
        {/if}
    {/if}
    {#if exists}
        <div class="tooltip-wrapper" class:adjust-top={isSelect} class:absolute={absolute}>
            <span class="tooltip-slot">
              {@html question}
            </span>
            <div class="tooltip top" class:right={placement === "right"}>
                {#if tooltipText}
                    {@html tooltipText}
                {:else}
                    {@html translations.tooltips[tipKey]}
                {/if}
            </div>
        </div>
    {/if}
</span>


