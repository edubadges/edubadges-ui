<script>
  import I18n from "i18n-js";
  import Button from "../Button.svelte";
  import {onMount} from "svelte";
  import Spinner from "../Spinner.svelte";
  import {fetchMarkdown} from "../../api/markdown";

  export let title;
  export let submit;
  export let cancel;
  export let url;
  export let showAgree = false;

  let modal;
  let htmlTerms;
  let loaded = false;

  onMount(() => {
    fetchMarkdown(url).then(res => {
      htmlTerms = res;
      loaded = true;
    });
  });

  const handleKeydown = e => {
    if (e.key === "Escape") {
      cancel();
    }
  };

</script>

<style lang="scss">

  div.modal-terms {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 57, 128, 0.8);
    z-index: 999;
    display: flex;
  }

  .modal-content {
    overflow-y: scroll;
    margin: 40px auto;
    width: calc(100vw - 20vw);
    max-height: calc(100vh - 10vw);
    border-radius: 8px;
    background: white;
    height: fit-content;
  }

  .modal-header {
    padding: 18px 32px;
    background-color: #dfe3e8;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .modal-terms-body {
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

<svelte:window on:keydown={handleKeydown}/>

<div class="modal-terms">
  <div class="modal-content">
    {#if loaded}
      <div class="modal-header">
        <h3>{title}</h3>
      </div>
      <div class="modal-terms-body markdown-body">
        {@html htmlTerms}
      </div>
      <div class="actions">
        {#if showAgree}
          <div class="first">
            <Button secondary={true} action={cancel} text={I18n.t("modalTerms.disagree")}/>
          </div>
          <div class="last">
            <Button action={submit} text={I18n.t("modalTerms.agree")}/>
          </div>
        {:else}
          <div class="first">
            <Button action={cancel} text={I18n.t("modalTerms.ok")}/>
          </div>
        {/if}
      </div>
    {:else}
      <Spinner/>
    {/if}
  </div>
</div>

