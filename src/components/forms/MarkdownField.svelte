<script>
    import {Editor, Viewer} from 'bytemd';
    import gfm from '@bytemd/plugin-gfm';
    import 'bytemd/dist/index.min.css'

    export let value;
    export let disabled;

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

<template class="markdown">
    {#if disabled}
        <Viewer {value} {plugins}/>
    {:else}
        <Editor {value} {plugins} mode="split" on:change={e => value = e.detail.value}/>
    {/if}

</template>