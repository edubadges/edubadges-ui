<script>
    import {Editor, Viewer} from 'bytemd';
    import gfm from '@bytemd/plugin-gfm';
    import 'bytemd/dist/index.min.css'
    import {onMount} from "svelte";

    export let value = "";
    export let disabled = false;

    const plugins = [gfm()];

</script>
<style lang="scss">
  :global(.bytemd-status) {
    display: none;
  }

  :global(.bytemd-toolbar-right) {
    display: none;
  }
</style>

{#if disabled}
    <Viewer value = {value || ""} {plugins}/>
{:else}
    <Editor value = {value || ""} {plugins} mode="split" on:change={e => value = e.detail.value}/>
{/if}
