<script>
    import I18n from "i18n-js";
    import Button from "../../Button.svelte";
    import {Field, TextInput} from "../../forms";
    import {validUrl} from "../../../util/forms";
    import {onMount} from "svelte";

    export let submit;
    export let cancel;

    export let narrative;
    export let url;
    export let name;
    export let description;
    export let useEvidence;
    export let badgeClass = {};

    let errors = {};
    let narrativeOrEvidenceRequired = false;

    onMount(() => {
        narrativeOrEvidenceRequired = badgeClass.narrativeRequired || badgeClass.evidenceRequired;
        useEvidence = narrativeOrEvidenceRequired;
    });

    const doSubmit = () => {
        errors = {};
        if (narrativeOrEvidenceRequired) {
            if (url && url.trim().length > 0 && !validUrl(url)) {
                errors = {url: [{error_code: 921}]};
            }
            if (badgeClass.narrativeRequired && !narrative.trim()) {
                errors.narrative = [{error_code: 932}];
            }
            if (badgeClass.evidenceRequired && !url) {
                errors.url = [{error_code: 933}];
            }
            if (Object.keys(errors).length === 0) {
                submit();
            }
        } else if (useEvidence && url && url.trim().length > 0 && !validUrl(url)) {
            errors = {url: [{error_code: 921}]};
        } else if (useEvidence && !url.trim() && !narrative.trim()) {
            errors = {narrative: [{error_code: 910}], url: [{error_code: 910}]};
        } else {
            errors = {};
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

    p.title {
      padding-bottom: 10px;
    }
  }

  div.evidence {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--purple);

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
      <h3>{I18n.t("models.enrollment.confirmation.award")}</h3>
    </div>
    <div class="modal-body">
      <p class="title">{I18n.t("models.enrollment.confirmation.awardConfirmation")}</p>
      {#if useEvidence}
        {#if !narrativeOrEvidenceRequired}
          <a href="/remove-evidence"
             on:click|preventDefault={swapUseEvidence}>{I18n.t("models.enrollment.removeEvidence")}</a>
        {/if}
        <div class="evidence">
          {#if narrativeOrEvidenceRequired}
            <p>{I18n.t("models.enrollment.evidenceRequired")}</p>
          {:else}
            <p>{I18n.t("models.enrollment.evidence")}</p>
          {/if}
          <Field entity={'enrollment'} errors={errors.narrative} attribute={'evidenceNarrative'}
                 tipKey="enrollmentEvidenceNarrative">
            <TextInput bind:value={narrative} area={true} error={errors.narrative}
                       placeholder={I18n.t("placeholders.enrollment.evidenceNarrative")}
                       size="100"/>
          </Field>
          <Field entity={'enrollment'} errors={errors.url} attribute={'evidenceURL'} tipKey="enrollmentEvidenceURL">
            <TextInput bind:value={url} error={errors.url} placeholder={I18n.t("placeholders.enrollment.evidenceURL")}/>
          </Field>
          <Field entity={'enrollment'} attribute={'evidenceName'} tipKey="enrollmentEvidenceName">
            <TextInput bind:value={name} placeholder={I18n.t("placeholders.enrollment.evidenceName")}/>
          </Field>
          <Field entity={'enrollment'} attribute={'evidenceDescription'} tipKey="enrollmentEvidenceDescription">
            <TextInput bind:value={description} area={true}
                       placeholder={I18n.t("placeholders.enrollment.evidenceDescription")} size="100"/>
          </Field>
        </div>
      {:else}
        <a href="/add-evidence"
           on:click|preventDefault={swapUseEvidence}>{I18n.t("models.enrollment.addEvidence")}</a>
      {/if}
    </div>
    <div class="options">
      <Button secondary={true} action={cancel} text={I18n.t("modal.cancel")}/>
      <Button action={doSubmit} text={I18n.t("models.enrollment.awardButton")} disabled={false}/>
    </div>

  </div>
</div>
