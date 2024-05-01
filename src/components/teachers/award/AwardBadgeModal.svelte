<script>
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import {Field, TextInput} from "../../forms";
    import {addProtocolToURL, validUrl} from "../../../util/forms";
    import {onMount} from "svelte";
    import MarkdownField from "../../forms/MarkdownField.svelte";
    import {isEmpty} from "../../../util/utils";

    export let submit;
    export let cancel;
    export let awardMode;

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
    let showEvidence = true;
    let showGrade = true;

    onMount(() => {
        narrativeOrEvidenceRequired = narrativeRequired || evidenceRequired;
        showEvidence = narrativeOrEvidenceRequired || !isEmpty(url) || !isEmpty(description) || !awardMode;
        showGrade = gradeAchievedRequired || !awardMode;
    });

    const doSubmit = (dryrun = false) => {
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
        if (!isEmpty(url) && !dryrun) {
            if (validUrl(url)) {
                url = addProtocolToURL(url);
            } else {
                errors.url = [{error_code: 921}];
            }
        }
        if ((!isEmpty(name) || !isEmpty(description)) && isEmpty(url) && isEmpty(narrative)) {
            if (!errors.narrative) {
                errors.narrative = [{error_code: 910}];
            }
            if (!errors.url) {
                errors.url = [{error_code: 910}];
            }
        }

        if (Object.keys(errors).length === 0 && !dryrun) {
            //Prevent server-side error for empty evidence
            if (evidenceRequired || narrativeRequired || !isEmpty(name) || !isEmpty(description) || !isEmpty(url) || !isEmpty(narrative)) {
                useEvidence = true;
            } else {
                useEvidence = false;
            }
            submit();
        }
    }

    const swapUseEvidence = () => {
        errors = {};
        if (showEvidence) {
            narrative = "";
            url = "";
            name = "";
            description = "";
        }
        showEvidence = !showEvidence;
    }

    const swapUseGrade = () => {
        errors = {};
        grade = null;
        showGrade = !showGrade;
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

    div.add-sections {
        display: flex;
        gap: 40px;
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
                <div class="add-sections">
                    {#if !showEvidence}
                        <a href="/add-evidence"
                           on:click|preventDefault={swapUseEvidence}>{I18n.t("models.enrollment.addEvidence")}</a>
                    {/if}
                    {#if showEvidence && !narrativeOrEvidenceRequired}
                        <a href="/remove-evidence" disabled={!narrativeAllowed}
                           on:click|preventDefault={swapUseEvidence}>{I18n.t("models.enrollment.removeEvidence")}</a>
                    {/if}
                    {#if !showGrade}
                        <a href="/add-grade"
                           on:click|preventDefault={swapUseGrade}>{I18n.t("models.enrollment.addGrade")}</a>
                    {/if}
                    {#if showGrade && !gradeAchievedRequired}
                        <a href="/remove-grade" disabled={!narrativeAllowed}
                           on:click|preventDefault={swapUseGrade}>{I18n.t("models.enrollment.removeGrade")}</a>
                    {/if}
                </div>
            {/if}
            {#if gradeAchievedRequired || showGrade}
                <div class="evidence">
                    <Field entity={'enrollment'}
                           errors={errors.grade}
                           attribute={'grade'}
                           required={gradeAchievedRequired}
                           tipKey="enrollmentGrade">
                        <TextInput bind:value={grade}
                                   error={errors.grade}
                                   onInput={() => doSubmit(true)}
                                   placeholder={I18n.t("placeholders.enrollment.grade")}/>
                    </Field>
                </div>
            {/if}
            {#if narrativeOrEvidenceRequired || showEvidence}
                <div class="evidence">
                    <Field entity={'enrollment'}
                           errors={errors.narrative}
                           attribute={'evidenceNarrative'}
                           required={narrativeRequired}
                           tipKey="enrollmentEvidenceNarrative">
                        <MarkdownField bind:value={narrative} onChange={() => doSubmit(true)}/>
                    </Field>
                    <Field entity={'enrollment'}
                           errors={errors.url}
                           attribute={'evidenceURL'}
                           required={evidenceRequired}
                           tipKey="enrollmentEvidenceURL">
                        <TextInput bind:value={url}
                                   error={errors.url}
                                   onBlur={e => url = addProtocolToURL(e.target.value)}
                                   onInput={() => doSubmit(true)}
                                   placeholder={I18n.t("placeholders.enrollment.evidenceURL")}/>
                    </Field>
                    <Field entity={'enrollment'}
                           attribute={'evidenceName'}
                           tipKey="enrollmentEvidenceName">
                        <TextInput bind:value={name}
                                   onInput={() => doSubmit(true)}
                                   placeholder={I18n.t("placeholders.enrollment.evidenceName")}/>
                    </Field>
                    <Field entity={'enrollment'}
                           attribute={'evidenceDescription'}
                           tipKey="enrollmentEvidenceDescription">
                        <TextInput bind:value={description}
                                   onInput={() => doSubmit(true)}
                                   area={true}
                                   placeholder={I18n.t("placeholders.enrollment.evidenceDescription")} size="100"/>
                    </Field>
                </div>
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
