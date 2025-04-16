<script>
    import {onMount} from "svelte";
    import I18n from "i18n-js";
    import Spinner from "../components/Spinner.svelte";
    import Button from "../components/Button.svelte";
    import {fetchMarkdown} from "../api/markdown";

    export let title;
    export let url;

    let cancel = () => {
        history.back();
    };
    let htmlTerms;
    let loaded = false;

    onMount(() => {
        fetchMarkdown(url).then(res => {
        htmlTerms = res;
        loaded = true;
        });
    });
</script>
<style lang="scss">
  .content {
    background: white;
  }

  .header {
    padding: 18px 32px;
  }

  .markdown-body {
    padding: 18px 32px;
  }

  div.actions {
    margin: 15px 25px 10px auto;
    display: flex;

    div.first {
      margin-left: auto;
    }

    div.last {
      margin: 0 25px;
    }
  }
</style>
<section class="content">
    {#if loaded}
      <div class="header">
        <h3>{title}</h3>
      </div>
      <div class="markdown-body">
        {@html htmlTerms}
      </div>
      <div class="actions">
          <div class="first">
            <Button action={cancel} text={I18n.t("navigateBack")}/>
          </div>
      </div>
    {:else}
        <Spinner/>
    {/if}
</section>

