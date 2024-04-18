<script>
    import I18n from "i18n-js";
    import Button from "../../components/Button.svelte";
    import Overview from "../../components/teachers/badgeclass/Overview.svelte";

    export let badgeclass;
    export let publicInstitutions;
    export let close;

    const handleKeydown = e => {
        if (e.key === "Escape") {
            close();
        }
    };

</script>

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
        max-width: 80vw;
        max-height: calc(100vh - 4em);
        border-radius: 8px;
        background: white;
        overflow-y: scroll;
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

<svelte:window on:keydown={handleKeydown}/>

<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>{I18n.t("newBadgeClassForm.preview")}</h3>
        </div>
        <div class="modal-body">
            <div class="overview-container">
                <Overview {badgeclass} {publicInstitutions}/>
            </div>
        </div>
        <div class="options">
            <Button action={close} text={I18n.t("modalTerms.ok")}/>
        </div>
    </div>
</div>

