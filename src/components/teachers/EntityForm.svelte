<script>
    import I18n from "i18n-js";
    import {Button} from "../../components";
    import Breadcrumb from "./Breadcrumb.svelte";
    import RemovalConfirmation from "../forms/RemovalConfirmation.svelte";
    import {Spinner} from "../index";
    import focusEye from "../../icons/eye-icon.svg";
    import {entityType} from "../../util/entityTypes";

    export let faculty;
    export let issuer;
    export let badgeclass;
    export let badgeclassName = "";
    export let badgeclassPostfix = null;
    export let mayDelete;
    export let hasUnrevokedAssertions;
    export let hasAnyAssertions;
    export let archived;
    export let mayEdit = true;

    export let create;
    export let cancel = () => window.history.back();
    export let action;
    export let entityTypeName;
    export let entityId;
    export let parentId;
    export let submit;
    export let processing;

    export let submitText = I18n.t(['manage', create ? 'new' : 'edit', 'save']);
    export let cancelText = I18n.t(['manage', create ? 'new' : 'edit', 'cancel']);
    export let previewAction = null;

    let showRemoveModal = false;
    let deleting = false;

</script>

<style lang="scss">

    .main-content-margin {
        max-width: 780px;

        &.badge-class {
            max-width: 1020px;
        }
    }

    h2 {
        background: var(--purple-1);
        padding: var(--ver-padding-l) var(--hor-padding-l);
        margin: 0;
    }

    .offset {
        margin: 0;
    }

    div.actions {
        display: flex;
        padding-top: 25px;
        margin-top: 20px;
        border-top: 2px solid var(--purple);

        .button-group {
            margin-left: auto;
            display: flex;
            gap: 20px;
        }

        .button-container {
            &.delete {
                display: flex;
                flex-direction: column;
            }
        }

        .preview {
            display: flex;
            gap: 20px;
            align-items: center;
            color: var(--green-medium);
            margin-right: 15px;
            cursor: pointer;

            a {
                text-decoration: underline;
            }

            :global(svg) {
                width: 24px;
                height: auto;

            }
        }
    }

    div.warnings {
        max-width: 240px;

        span {
            display: inline-block;
            margin-top: 10px;
            color: var(--grey-7);
            font-style: italic;
            font-size: 14px;
        }

    }
</style>

<Breadcrumb
        {faculty}
        {issuer}
        {badgeclass}
        {badgeclassName}
        badgeclassPostfix={badgeclassPostfix}
        edit={!create}
        {create}
        copy={action === "copy"}
        entity={entityTypeName}/>

<h2>
    {I18n.t(['manage', action === "copy" ? 'copy' : create ? 'new' : 'edit', entityTypeName], {name: badgeclassName})}
    {#if badgeclassPostfix}
        {badgeclassPostfix}
    {/if}
</h2>
<div class="main-content-margin" class:badge-class={entityType.BADGE_CLASS === entityTypeName}>
    <div class="offset">
        <slot/>

        <div class="actions">
            {#if !create}
                <div class="button-container delete">
                    <Button
                            warning={true}
                            disabled={!mayDelete || processing || deleting || hasUnrevokedAssertions || archived}
                            action={() => showRemoveModal = true}
                            text={I18n.t(`manage.${(!hasUnrevokedAssertions && hasAnyAssertions && !archived) ? "archive.archive" : "delete.delete"}`)}/>
                </div>
            {/if}
            <div class="button-group">
                {#if previewAction}
                    <div class="preview" on:click={previewAction}>
                        {@html focusEye}
                        <a href="#"
                           on:click|preventDefault|stopPropagation={previewAction}>{I18n.t("newBadgeClassForm.preview")}</a>
                    </div>
                {/if}

                <div class="button-container">
                    <Button
                            secondary
                            disabled={processing || deleting || (!mayEdit && action  !== "copy")}
                            action={cancel}
                            text={cancelText}/>
                </div>
                <div class="button-container">
                    <Button
                            disabled={processing || deleting || (!mayEdit && action  !== "copy")}
                            action={submit}
                            text={submitText}/>
                </div>
            </div>
        </div>
    </div>
    <div class="warnings">
        {#if mayDelete && hasUnrevokedAssertions}
            <span class="may-not-delete">{I18n.t(`manage.delete.info.assertionsBlock.${entityTypeName}`)}</span>
        {:else if mayDelete && hasAnyAssertions && archived}
            <span class="may-not-delete">{I18n.t(`manage.archive.info.assertionsBlock.${entityTypeName}`)}</span>
        {:else if !mayDelete}
            <span class="may-not-delete">{I18n.t(`manage.delete.info.noPermission.${entityTypeName}`)}</span>
        {/if}
    </div>
</div>

{#if mayDelete && hasUnrevokedAssertions === false}
    <RemovalConfirmation {entityTypeName}
                         entityId={entityId}
                         parentId={parentId}
                         archived={hasAnyAssertions}
                         {showRemoveModal}
                         cancel={() => showRemoveModal=false}
                         deleting={v => deleting = v}/>
{/if}
{#if processing || deleting}
    <Spinner/>
{/if}
