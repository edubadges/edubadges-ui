<script>
    import I18n from "i18n-js";
    import closeIcon from "../../icons/close_smll.svg";
    import CopyToClipboardButton from "../../components/CopyToClipboardButton.svelte";
    import info from "../../icons/informational.svg";

    export let cancel;
    export let copied;
    export let publicUrl;
    export let title = I18n.t("shareDialog.title");
    export let copyPublicUrl = I18n.t("shareDialog.copyPublicUrl");

    const handle_keydown = e => {
        if (e.key === "Escape") {
            cancel();
        }
    };

    const actionAfterCopy = () => {
        setTimeout(copied, 750);
    }

</script>

<style lang="scss">
  .share-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 57, 128, 0.8);
    z-index: 999;
    display: flex;
  }

  .content {
    margin: 8vw auto auto auto;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    border-radius: 8px;
    background: white;
  }


  div.close {
    position: absolute;
    right: 17px;
    top: 5px;
    cursor: pointer;
  }

  .header {
    padding: 18px 32px;
    color: var(--purple);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    position: relative;

    h3 {
      font-weight: bold;
      font-size: 28px;
    }
  }

  .body {
    padding: 18px 32px;
    display: flex;
    flex-direction: column;

    div.public-link {
      background-color: var(--blue-light);
      margin-bottom: 10px;
      padding: 25px;
      border-radius: 8px;
    }

    div.info {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      span:first-child {
        margin-right: 15px;
        max-width: 100%;
      }

    }

  }

  div.footer {
    width: 100%;
    text-align: center;
    padding: 0 32px 18px;
  }

</style>

<svelte:window on:keydown={handle_keydown}/>

<div class="share-dialog">
  <div class="content">

    <div class="header">
      <div class="close" on:click={cancel}>
        {@html closeIcon}
      </div>
      <h3>{title}</h3>
    </div>
    <div class="body">
      <div class="public-link">
        <div class="info">
          <span>{@html info}</span>
          <span>{copyPublicUrl}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <CopyToClipboardButton toCopy={publicUrl} actionAfterCopy={actionAfterCopy} full={true}
                             text={I18n.t("shareDialog.copy")}/>

    </div>
  </div>
</div>

