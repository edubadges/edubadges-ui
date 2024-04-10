<script>
    import I18n from "i18n-js";
    import {link} from "svelte-routing";
    import Button from "../Button.svelte";
    import {badgeClassType} from "../../util/badgeClassTypes";
    import closeIcon from "../../icons/close_smll.svg";

    export let create;
    export let cancel;
    export let entityId;

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
            <h3>{I18n.t("newBadgeClassForm.modal.choose")}</h3>
            <span class="close" on:click={cancel}>{@html closeIcon}</span>
        </div>
        <div class="modal-body">
            <div class="tip">
                <span>{I18n.t("newBadgeClassForm.modal.tipPre")}</span>
                <a use:link
                   href={`/manage/badgeclass/${entityId}/edit/copy`}>{I18n.t("newBadgeClassForm.modal.tipAction")}</a>
            </div>
            <div class="card-container">
                {#each Object.values(badgeClassType) as type}

                    <div class="card">
                        <h3>{I18n.t(`newBadgeClassForm.modal.types.${type}`)}</h3>
                        <p class="info">{I18n.t(`newBadgeClassForm.modal.info.${type}`)}</p>
                        <p>{I18n.t("newBadgeClassForm.modal.shortCopy")}</p>
                        <div class="action-container">
                            <Button action={() => create(type)} text={I18n.t("newBadgeClassForm.modal.create")}/>
                        </div>
                    </div>
                {/each}
            </div>
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
        max-width: 64em;
        max-height: calc(100vh - 4em);
        border-radius: 8px;
        background: white;

        .card-container {
            display: flex;
            gap: 25px;
            margin-top: 15px;
        }

        .card {
            padding: 15px 25px 25px 25px;
            max-width: 240px;
            display: flex;
            flex-direction: column;

            h3 {
                margin-bottom: 15px;
            }

            p {
                margin-bottom: 15px;
            }

            .action-container {
                margin: auto auto 0 auto;
                max-width: 120px;
            }
        }

        .modal-header {
            padding: 18px 32px;
            background-color: #dfe3e8;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            display: flex;

            span.close {
                margin-left: auto;
                cursor: pointer;
            }
        }

        .modal-body {
            padding: 18px 32px;
        }
    }


</style>
