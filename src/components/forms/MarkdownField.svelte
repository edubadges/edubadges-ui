<script>
    import {Editor, Viewer} from 'bytemd';
    import gfm from '@bytemd/plugin-gfm';
    import 'bytemd/dist/index.min.css'
    import {stopEvent} from "../../util/forms";
    import I18n from "i18n-js";
    import {isEmpty} from "../../util/utils";

    export let value = "";
    export let disabled = false;
    export let onChange;
    export let disableToggle = false;

    const plugins = [gfm()];
    const cutoffNumber = 190;
    let showMore = false;

    const toggleShowMore = e => {
        stopEvent(e);
        showMore = !showMore;
    }
    value = isEmpty(value) ? "" : value;
    let txtToDisplay = isEmpty(value) ? "" : value.substring(0, cutoffNumber + value.substring(cutoffNumber).indexOf(" "));
    if (txtToDisplay.endsWith("-")) {
        txtToDisplay = txtToDisplay.substring(0, txtToDisplay.length - 2);
    }
    const showToggle = value.length !== txtToDisplay.length;

</script>
<style lang="scss">
    span.more {
        display: inline-block;
        margin-top: 10px;
        color: var(--green-medium);
        cursor: pointer;
    }

    :global(.bytemd-status) {
        display: none;
    }

    :global(.bytemd-toolbar-right) {
        display: none;
    }
</style>

{#if disabled}
    <Viewer value={(showMore || disableToggle) ? value : txtToDisplay} {plugins}/>
    {#if showToggle && !disableToggle}
        <span class="more" on:click={toggleShowMore}>
            {I18n.t(`toggle.${showMore ? "showLess" : "showMore"}`)}
        </span>
    {/if}

{:else}
    <Editor value={value || ""} {plugins} mode="split" on:change={e => {
     value = e.detail.value;
     onChange && onChange(e.detail.value);
    }
    }/>
{/if}
