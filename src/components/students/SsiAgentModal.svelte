<script>
  // This should eventually go into config.wwwalletBaseUrl. But that would require us to add
  // configuration to the global config which is also required in production and other environments
  // that don't use this feature at all yet. Hence we hardcode it here. For now.
  const WWWALLET_BASE_URL = "https://wwwallet.dev.eduwallet.nl/cb/"
  import I18n from "i18n-js";
  import {Modal} from '../../components/forms';
  import QRCode from 'qrcode';

  export let offer = "";
  export let showModal = false;
  export let walletName = "";
  export let submit;

  let importWwwalletText = I18n.t("models.badge.ob3SsiAgentOpen", {
    name: I18n.t("models.badge.ob3SsiAgentNames.wwwallet")
  })
  let wwwalletLink = new URL(WWWALLET_BASE_URL);
  let linkClass = 'disabled';
  let qrCodeDataUrl = '';

  $: if (offer) updateQRCode();

  async function updateQRCode() {
    console.debug(`Generate QR for offer: ${offer}`);

    // extract the actual URL from the offer, wwwallet cannot handle actual credential_offers yet.
    // So only if we have this uri, can we show an import link
    const offerURI = new URL(offer);
    const offerURIParams = offerURI.searchParams;
    console.debug(`params: ${offerURIParams}`);

    if (offerURIParams.get("credential_offer_uri") !== null) {
      wwwalletLink.searchParams.set('credential_offer_uri', offerURIParams.get("credential_offer_uri"));
      linkClass = '';
    } else {
      linkClass = 'disabled';
      wwwalletLink = new URL("about:blank");
    }

    qrCodeDataUrl = await QRCode.toDataURL(offer);
  }

</script>

<style lang="scss">
    .qr-code-container {
        display: flex;
        flex-flow: column;

        img {
            width: 240px;
            height: auto;
            margin: auto;
        }
        a {
            display: block;
            margin: auto;
        }
        a.disabled {
           display: none;
        }
    }
</style>

{#if showModal}
<Modal
        question={I18n.t("models.badge.ob3SsiAgentQRCodeQuestion")}
        title={I18n.t("models.badge.ob3SsiAgent", {
          name: I18n.t(`models.badge.ob3SsiAgentNames.${walletName}`)
        })}

        submit={() => submit()}
        submitLabel={I18n.t("error.close")}>
    <div class="qr-code-container">
        <img alt="QR code" src={qrCodeDataUrl}/>
        <a href="{wwwalletLink}" target="_blank" rel="noopener noreferrer" class="{linkClass}" title="{importWwwalletText}">{importWwwalletText}</a>
    </div>
</Modal>
{/if}
