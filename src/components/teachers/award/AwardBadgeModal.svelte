<script>
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import {Field, TextInput} from "../../forms";
    import {validUrl} from "../../../util/forms";
    import {onMount} from "svelte";
    import MarkdownField from "../../forms/MarkdownField.svelte";
    import {isEmpty} from "../../../util/utils";

    export let submit;
    export let cancel;
    export let awardMode = true;

    export let narrative;
    export let url;
    export let name;
    export let description;
    export let grade;
    export let useEvidence = false;
    export let evidenceRequired = false;
    export let narrativeRequired = false;
    export let narrativeAllowed = true;
    export let gradeAchievedRequired = false;

    let errors = {};
    let narrativeOrEvidenceRequired = false;

    onMount(() => {
        narrativeOrEvidenceRequired = narrativeRequired || evidenceRequired;
        useEvidence = narrativeOrEvidenceRequired || !awardMode || !isEmpty(url) || !isEmpty(description);
    });

    const doSubmit = () => {
        errors = {};
        if (narrativeRequired && isEmpty(narrative)) {
            errors.narrative = [{error_code: 932}];
        }
        if (evidenceRequired && isEmpty(url)) {
            errors.url = [{error_code: 933}];
        }
        if (gradeAchievedRequired && isEmpty(grade)) {
            errors.grade = [{error_code: 944}];
        }
        if (!isEmpty(url)) {
            if (validUrl(url)) {
                if (!url.startsWith("http")) {
                    url = "https://" + url;
                }
            } else {
                errors.url = [{error_code: 921}];
            }
        }
        if (useEvidence && isEmpty(url) && isEmpty(narrative)) {
            errors.narrative= [{error_code: 910}];
            errors.url = [{error_code: 910}];
        }

        if (Object.keys(errors).length === 0) {
            submit();
        }
    }

    const swapUseEvidence = () => {
        errors = {};
        if (useEvidence) {
            narrative = "";
            url = "";
            name = "";
            description = "";
        }
        useEvidence = !useEvidence;
    }

    const handleKeydown = e => {
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
        width: calc(100vw - 4em);
        max-width: 44em;
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

        p.title {
            padding-bottom: 10px;
        }
    }

    div.evidence {
        margin-top: 10px;

        &:not(:first-child) {
            margin-top: 20px;
        }

        padding-top: 10px;
        border-top: 1px solid var(--purple);

        :global(.bytemd) {
            height: 150px;
        }
    }

    div.options {
        padding: 18px;
        text-align: center;

        :global(a:last-child) {
            margin-left: 25px;
        }
    }
</style>

<svelte:window on:keydown={handleKeydown}/>

<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h3>{awardMode ? I18n.t("models.enrollment.confirmation.award") : I18n.t("badgeAward.directAward.addEvidenceGrade")}</h3>
        </div>
        <div class="modal-body">
            {#if awardMode}
                <p class="title">{I18n.t("models.enrollment.confirmation.awardConfirmation")}</p>
            {/if}
            {#if useEvidence}
                {#if !narrativeOrEvidenceRequired && awardMode}
                    <a href="/remove-evidence" disabled={!narrativeAllowed}
                       on:click|preventDefault={swapUseEvidence}>{I18n.t("models.enrollment.removeEvidence")}</a>
                {/if}
                <div class="evidence">
                    <Field entity={'enrollment'}
                           errors={errors.grade}
                           attribute={'grade'}
                           required={gradeAchievedRequired}
                           tipKey="enrollmentGrade">
                        <TextInput bind:value={grade}
                                   error={errors.grade}
                                   placeholder={I18n.t("placeholders.enrollment.grade")}/>
                    </Field>
                </div>
                <div class="evidence">
                    <!--{#if narrativeOrEvidenceRequired}-->
                    <!--    <p>{I18n.t("models.enrollment.evidenceRequired")}</p>-->
                    <!--{:else}-->
                    <!--    <p>{I18n.t("models.enrollment.evidence")}</p>-->
                    <!--{/if}-->
                    <Field entity={'enrollment'}
                           errors={errors.narrative}
                           attribute={'evidenceNarrative'}
                           required={narrativeRequired}
                           tipKey="enrollmentEvidenceNarrative">
                        <MarkdownField bind:value={narrative}/>
                    </Field>
                    <Field entity={'enrollment'}
                           errors={errors.url}
                           attribute={'evidenceURL'}
                           required={evidenceRequired}
                           tipKey="enrollmentEvidenceURL">
                        <TextInput bind:value={url} error={errors.url}
                                   placeholder={I18n.t("placeholders.enrollment.evidenceURL")}/>
                    </Field>
                    <Field entity={'enrollment'} attribute={'evidenceName'} tipKey="enrollmentEvidenceName">
                        <TextInput bind:value={name} placeholder={I18n.t("placeholders.enrollment.evidenceName")}/>
                    </Field>
                    <Field entity={'enrollment'} attribute={'evidenceDescription'}
                           tipKey="enrollmentEvidenceDescription">
                        <TextInput bind:value={description} area={true}
                                   placeholder={I18n.t("placeholders.enrollment.evidenceDescription")} size="100"/>
                    </Field>
                </div>
            {:else if narrativeAllowed && awardMode}
                <a href="/add-evidence"
                   on:click|preventDefault={swapUseEvidence}>{I18n.t("models.enrollment.addEvidence")}</a>
            {/if}
        </div>
        <div class="options">
            <Button secondary={true} action={cancel} text={I18n.t("modal.cancel")}/>
            <Button action={doSubmit}
                    text={awardMode ? I18n.t("models.enrollment.awardButton") : I18n.t("manage.new.save")}
                    disabled={false}/>
        </div>

    </div>
</div>
