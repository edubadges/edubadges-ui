<script>
    import JSONTree from 'svelte-json-tree';

    export let launchData;

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex: 1;
  }

  .content {
    padding: 0;
  }

  h3 {
    font-size: 22px;
    font-weight: var(--semi-bold);
    margin: 10px 0 20px 0;
  }

</style>
<div class="page-container">
    <div class="content">
        <h3>LTI message launch</h3>
        <JSONTree value={launchData}/>
    </div>
</div>



