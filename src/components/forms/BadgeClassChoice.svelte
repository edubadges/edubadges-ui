<script>
    import I18n from "i18n-js";
    import {link} from "svelte-routing";
    import Button from "../Button.svelte";
    import {badgeClassTypes} from "../../util/badgeClassTypes";
    import closeIcon from "../../icons/close_smll.svg";
    import {onMount} from "svelte";
    import {isEmpty, translateProperties} from "../../util/utils";

    export let create;
    export let cancel;
    export let issuer;
    export let currentInstitution;

    let options = [];
    let missingOptions = [];
    let showTip = false;

    onMount(() => {
        options = Object.values(badgeClassTypes).map(type => (
            {
                type: type,
                disabled: (type === badgeClassTypes.MICRO_CREDENTIAL && (!currentInstitution.microCredentialsEnabled
                        || currentInstitution.terms.every(term => term.termsType !== "FORMAL_BADGE")))
                    || (type === badgeClassTypes.REGULAR && (isEmpty(currentInstitution.grondslagFormeel)
                        || currentInstitution.terms.every(term => term.termsType !== "FORMAL_BADGE")))
                    || (type === badgeClassTypes.EXTRA_CURRICULAR && (isEmpty(currentInstitution.grondslagInformeel)
                        || currentInstitution.terms.every(term => term.termsType !== "INFORMAL_BADGE")))
            }
        ));
        missingOptions = options.filter(option => option.disabled).map(option => option.type);
        translateProperties(currentInstitution);
    })

    const handle_keydown = e => {
        if (e.key === "Escape") {
            cancel();
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
        width: 834px;
        max-height: calc(100vh - 4em);
        border-radius: 8px;
        background: white;

        .tip {
            color: var(--grey-8);
            font-weight: lighter;

            :global(a) {
                color: var(--grey-8);
                text-decoration: underline;
            }

            .tippy {
                margin: 15px 0;
            }
        }


        .card-container {
            display: flex;
            gap: 25px;
            margin: 15px 0 15px 0;
        }

        .card {
            padding: 15px 25px 25px 25px;
            max-width: 240px;
            display: flex;
            flex-direction: column;

            &.disabled {
                background: var(--grey-1);
            }

            h3 {
                margin-bottom: 15px;
            }

            p {
                margin-bottom: 15px;
            }

            .action-container {
                margin: auto auto 0 auto;
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

    ul.missing-options {
        margin-top: 25px;
        list-style: initial;
        margin-left: 25px;
    }

</style>

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
                <a on:click|preventDefault={() => showTip = true}>
                    {I18n.t("newBadgeClassForm.modal.tipAction")}
                </a>
                {#if showTip}
                    <div class="tippy">
                        <span>{I18n.t("newBadgeClassForm.modal.tip")}</span>
                        <a use:link
                           href={`/manage/issuer/${issuer.entityId}/badgeclasses`}>{I18n.t("newBadgeClassForm.modal.issuerLink", {name: issuer.name})}</a>
                    </div>

                {/if}
            </div>
            <div class="card-container">
                {#each options as option}
                    <div class="card" class:disabled={option.disabled}>
                        <h3>{I18n.t(`newBadgeClassForm.modal.types.${option.type}`)}</h3>
                        <p class="info">{I18n.t(`newBadgeClassForm.modal.info.${option.type}`)}</p>
                        <p>{I18n.t("newBadgeClassForm.modal.shortCopy")}</p>
                        <div class="action-container">
                            <Button disabled={option.disabled} action={() => create(option.type)}
                                    text={I18n.t("newBadgeClassForm.modal.create")}/>
                        </div>
                    </div>
                {/each}
            </div>
            {#if missingOptions.length > 0}
                <ul class="missing-options">
                    {#each missingOptions as type}
                        <li>{I18n.t(`newBadgeClassForm.modal.notAvailableTypeInfo.${type}`, {name: currentInstitution.name})}</li>
                    {/each}
                </ul>
            {/if}

        </div>
    </div>
</div>
