<script>
    import I18n from "i18n-js";
    import info from "../../icons/informational.svg";
    import Modal from "../forms/Modal.svelte";
    import {flash} from "../../stores/flash";
    import {sendFeedback} from "../../api";
    import {onMount} from "svelte";

    export let close;
    let message = '';
    let elm;

    onMount(function() {
        elm.focus();
    });

    const doClose = () => {
        close();
        setTimeout(() => message = '', 500);
    }

    const feedBack = () => {
        sendFeedback(message).then(() => {
            close();
            flash.setValue(I18n.t('feedback.flash'));
        });
    }

    const init = e => e.focus();

</script>
<style lang="scss">

  h2 {
    font-size: 20px;
    line-height: 24px;
    margin: 15px 0 10px 0;

  }

  section.info {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;

    .svg {
      margin-right: 15px;
    }

    background-color: #95d7e4;
  }

  textarea {
    display: block;
    width: 100%;
    border: 1px solid var(--grey-5);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 10px;

    &:focus {
      outline: none;
      box-shadow: 3px 3px 3px var(--blue-light), -3px -3px 1px var(--blue-light);
    }

  }

  section.disclaimer {
    font-size: 13px;
    margin-top: 25px;
  }

</style>
<Modal
  submit={feedBack}
  cancel={close}
  disabled={!message}
  title={I18n.t("feedback.title")}>
  <h2>{@html I18n.t("feedback.subTitle")}</h2>
  <section class="info">
    <span class="svg">{@html info}</span>
    <span>{@html I18n.t("feedback.info")}</span>
  </section>
  <section class="feedback">
                <textarea name="feedback"
                          id="feedback"
                          bind:value={message}
                          bind:this={elm}
                          rows="10"
                          {init}></textarea>
  </section>
  <section class="disclaimer">
    <span>{@html I18n.t("feedback.disclaimer")}</span>
  </section>

</Modal>


