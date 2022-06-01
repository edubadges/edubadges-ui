<script>
    import Tooltip from "./Tooltip.svelte";

    export let text = "";
    export let maxLength = 100;

    let showTooltip = text.length > maxLength;
    let textToDisplay = text.substring(0, maxLength);

</script>
<style lang="scss">

</style>
<span>
    {textToDisplay}
    {#if showTooltip}
        ...
        <Tooltip tooltipText={text}/>
    {/if}
</span>