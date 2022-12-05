<script>
    import I18n from "i18n-js";
    import Button from "../Button.svelte";
    import {onDestroy, onMount} from "svelte";

    export let submit;
    export let cancel;
    export let title;
    export let question;
    export let evaluateQuestion = false;
    export let warning = false;
    export let hideSubmit = false;

    export let submitLabel = I18n.t("modal.confirm");
    export let cancelLabel = I18n.t("modal.cancel");
    export let disabled = false;

    let modal;

    onMount(() => {
        document.body.classList.add("modal-open");
    })

    onDestroy(() => {
        document.body.classList.remove("modal-open");
    })

    const handle_keydown = e => {
        if (e.key === "Escape") {
            cancel && cancel();
        }
    };
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal">
    <div class="modal-content">
        <div class="modal-header" class:warning>
            <h3>{title}</h3>
        </div>
        {#if question}
            <div class="modal-body">
                {#if evaluateQuestion}
                    <p>{@html question}</p>
                {:else}
                    <p>{question}</p>
                {/if}
            </div>
        {/if}
        <div class="slots">
            <slot/>
        </div>
        <div class="options" class:hideSubmit>
            {#if cancel}
                <Button secondary={true} action={cancel} text={cancelLabel}/>
            {/if}
            {#if !hideSubmit}
                <Button warning={warning} action={submit} text={submitLabel} disabled={disabled}/>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
  .modal {
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
    margin: auto;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    border-radius: 8px;
    background: white;
    overflow: scroll;
  }

  .modal-header {
    padding: 18px 32px;
    background-color: #dfe3e8;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .modal-header.warning {
    background-color: var(--red-strong-dark);
    color: white;

    h3 {
      color: white;
    }
  }

  .modal-body {
    padding: 18px 32px;
  }

  div.slots {
    padding: 18px 32px;
  }

  div.options {
    padding: 18px;
    text-align: center;

    &.hideSubmit {
      text-align: right;
    }

    :global(a:last-child) {
      margin-left: 25px;

      @media (max-width: 820px) {
        margin-left: 0;

      }

    }
  }
</style>
