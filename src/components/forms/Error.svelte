<script>
    import I18n from "i18n-js";
    import {warningIcon} from "../../icons";
    import {isEmpty} from "../../util/utils";
    import {onMount} from "svelte";

    export let error_code;
    export let error_message;
    export let standAlone;
    export let ignoreEmail = false;

    onMount(() => {
        if (!ignoreEmail && !isEmpty(error_message) && error_message.indexOf("mail") > 0) {
            error_code = 509;
        }
    })

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
