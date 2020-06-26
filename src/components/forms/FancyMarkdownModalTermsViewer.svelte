<script context="module">
  const cache = {};
</script>

<script>
  import I18n from "i18n-js";
  import Button from "../Button.svelte";
  import {onMount} from "svelte";
  import marked from "marked";
  import Spinner from "../Spinner.svelte";

  export let title;
  export let submit;
  export let cancel;
  export let url;
  export let showAgree = false;

  let modal;
  let htmlTerms;
  let loaded = false;

  const fetchOptions = {
    method: "GET",
    credentials: "same-origin"
  };

  onMount(() => {
    if (cache[url]) {
      htmlTerms = cache[url];
      loaded = true;
    } else {
      fetch(url, fetchOptions).then(res => res.text()).then(text => {
        htmlTerms = marked(text);
        htmlTerms = htmlTerms.replace(/<a href=/g, "<a target=\"_blank\" href=");
        cache[url] = htmlTerms;
        loaded = true;
      });
    }
  });

  const handleKeydown = e => {
    if (e.key === "Escape") {
      cancel();
    }
  };

</script>

<style lang="scss">
  div.modal-terms-body :global(h1), div.modal-terms-body :global(h2),
  div.modal-terms-body :global(h3), div.modal-terms-body :global(h4) {
    margin: 15px 0 5px 0;
  }

  div.modal-terms-body :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 15px 0;
  }

  div.modal-terms-body :global(thead) {
    color: var(--purple);
    border-bottom: 3px solid var(--grey-3);
    text-align: left;
    padding: 5px;
  }

  div.modal-terms-body :global(td) {
    padding: 5px;
  }

  div.modal-terms-body :global(tr:nth-child(even)) {
    background: var(--grey-1);
  }

  div.modal-terms-body :global(ul) {
    margin: 15px 0 15px 25px;
    list-style: circle;
    line-height: 22px;
  }

  div.modal-terms-body :global(ol) {
    margin: 15px 0 15px 25px;
    list-style: circle;
    line-height: 22px;
  }

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
      <div class="modal-terms-body">
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

