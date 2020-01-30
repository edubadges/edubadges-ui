<script>
    import I18n from "i18n-js";
    import Button from "./Button.svelte";

    export let submit;
    export let cancel;
    export let title;
    export let question;

    let modal;

    const handle_keydown = e => {
        if (e.key === "Escape") {
            cancel();
        }
    };

</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>{title}</h3>
        </div>
        <div class="modal-body">
            <p>{question}</p>
        </div>

        <div class="options">
            <Button className="cancel" onClick={cancel}
                    label={I18n.ts("modal.cancel")}/>

            <Button onClick={submit}
                    label={I18n.ts("modal.confirm")}/>
        </div>
    </div>
</div>

<style>
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
    }

    .modal-header {
        padding: 18px 32px;
        background-color: #dfe3e8;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .modal-body {
        padding: 18px 32px;
    }

    div.options {
        padding: 18px;
        text-align: center;
    }
</style>
