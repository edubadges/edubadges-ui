<script>
  import I18n from "i18n-js";
  import closeIcon from "../../../icons/close_smll.svg";
  import CopyToClipboardButton from "../../../components/CopyToClipboardButton.svelte";

  export let cancel;
  export let copied;
  export let publicUrl;

  const handle_keydown = e => {
    if (e.key === "Escape") {
      cancel();
    }
  };

  const actionAfterCopy = () => {
    setTimeout(copied, 650);
  }

</script>

<style lang="scss">
  .invite-dialog {
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
    display: flex;
    flex-direction: column;
    padding: 0 32px;

    span.info {

      &:last-child {
        margin: 25px 0 40px 0;
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

<div class="invite-dialog">
  <div class="content">

    <div class="header">
      <div class="close" on:click={cancel}>
        {@html closeIcon}
      </div>
      <h3>{I18n.t("inviteDialog.title")}</h3>
    </div>
    <div class="body">
      <span class="info">{@html I18n.t("inviteDialog.publicBadgePage", {publicBadgePage: publicUrl})}</span>
      <span class="info">{I18n.t("inviteDialog.intranet")}</span>
    </div>
    <div class="footer">
      <CopyToClipboardButton toCopy={publicUrl}
                             actionAfterCopy={actionAfterCopy}
                             full={true}
                             doFlash={false}
                             displayIcon={true};
                             text={I18n.t("inviteDialog.copy")}/>

    </div>
  </div>
</div>

