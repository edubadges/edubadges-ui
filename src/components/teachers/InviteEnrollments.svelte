<script>
  import chevronLeft from "../../icons/chevron-left.svg";
  import info from "../../icons/informational.svg";
  import I18n from "i18n-js";
  import Text from "../forms/Text.svelte";
  import CopyToClipboardButton from "../CopyToClipboardButton.svelte";

  export let entityId;

  const publicUrl = () => {
    const currentUrl = window.location.origin;
    return `${currentUrl}/public/${entityId}`;
  }

</script>

<style lang="scss">
  div.nav {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;

    span {
      font-weight: bold;
    }

    :global(svg) {
      height: 16px;
    }

    > :global(*) {
      vertical-align: middle;
    }
  }

  div.public-link {
    background-color: var(--blue-light);
    margin-top: 25px;
    padding: 25px;
    border-radius: 8px;
  }

  div.info {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    span:first-child {
      margin-right: 15px;
      max-width: 100%;
    }

  }

  div.options {
    display: flex;

    input {
      margin-right: 25px;
    }
  }
</style>

<div class="nav">
  {@html chevronLeft}
  <span class="click" on:click={() => window.history.back()}>
    {I18n.t('teacher.breadcrumb.back')}
  </span>
</div>

<div class="main-content-margin">
  <h1>{I18n.t("invites.title")}</h1>
  <div class="public-link">
    <div class="info">
      <span>{@html info}</span>
      <span>{I18n.t("invites.copyPublicUrl")}</span>
    </div>
    <div class="options">
      <input class="input-field full" disabled={true} value={publicUrl()}/>
      <CopyToClipboardButton toCopy={publicUrl()} text={I18n.t("invites.copyUrl")}/>
    </div>
  </div>
</div>
