<script>
  import I18n from "i18n-js";
  import {Modal} from '../../components/forms';
  import QRCode from 'qrcode';

  export let offer = "";
  export let showModal = false;
  export let walletName = "";
  export let submit;

  let qrCodeDataUrl = '';

  $: if (offer) updateQRCode();

  async function updateQRCode() {
    console.debug(`Generate QR for offer: ${offer}`);
    qrCodeDataUrl = await QRCode.toDataURL(offer);
  }

</script>

<style lang="scss">
    .qr-code-container {
        display: flex;

        img {
            width: 240px;
            height: auto;
            margin: auto;
        }
    }
</style>

{#if showModal}
<Modal
        question={I18n.t("models.badge.ob3SsiAgentQRCodeQuestion")}
        title={I18n.t("models.badge.ob3SsiAgentQRCode", { name: walletName })}
        submit={() => submit()}
        submitLabel={I18n.t("error.close")}>
    <div class="qr-code-container">
        <img alt="QR code" src={qrCodeDataUrl}/>
    </div>
</Modal>
{/if}
