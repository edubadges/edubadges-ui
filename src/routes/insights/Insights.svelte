<script>
    import {onMount} from "svelte";
    import Spinner from "../../components/Spinner.svelte";
    import {insights} from "../../api";

    let data = null;
    let loaded = false;

    onMount(() => {
        insights().then(res => {
            data = res;
            //https://layercake.graphics/guide
            loaded = true;
        });
    });

</script>

<style lang="scss">
  .page-container {
    display: flex;
  }

  .content {
    flex: 1;
    padding: 30px 20px;
  }

  div.insights {
    --badge-margin-right: 20px;


  }


</style>

<div class="page-container">
  {#if loaded}
    <!--    <SideBarCatelog/>-->

    <div class="content">
      <!--      <CatalogToolBar bind:sorting={$sortTarget} bind:view={view}/>-->

      <div class="insights">
        {JSON.stringify(data)}
      </div>
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>
