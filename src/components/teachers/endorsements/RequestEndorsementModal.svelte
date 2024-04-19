<script>
    import I18n from "i18n-js";
    import Button from "../../../components/Button.svelte";
    import Field from "../../forms/Field.svelte";
    import {TextInput} from "../../forms";
    import {isEmpty} from "../../util/utils";
    import Select from "../../forms/Select.svelte";

    export let badgeClasses;
    export let claim;
    export let description;
    export let selectedBadgeClass;
    export let cancel;
    export let submit;

    let disabled;

    $: disabled = isEmpty(description) || isEmpty(claim) || !selectedBadgeClass;

    const handleKeydown = e => {
        if (e.key === "Escape") {
            cancel();
        }
    };

    const optionLabel = option => {
        return `<div style="display: flex;"><img style="width: auto;height: 36px;margin-right: 12px" src="${option.image}" alt="">${option.name}</div>`
    }

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
    p.info {
      margin-bottom: 15px;
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
            <h3>{I18n.t("endorsements.request")}</h3>
        </div>
        <div class="modal-body">
            <p class="info">{I18n.t("endorsements.info")}</p>
            <Field entity="endorsements" attribute="claim" tipKey="endorsementClaim">
                <TextInput bind:value={claim}
                           size="60"
                           area={true}
                           placeholder={I18n.t("endorsements.claimPlaceholder")}/>
            </Field>
            <Field entity="endorsements" attribute="description" tipKey="endorsementDescription">
                <TextInput bind:value={description}
                           size="60"
                           area={true}
                           placeholder={I18n.t("endorsements.descriptionPlaceholder")}/>
            </Field>
            <Field entity="endorsements" attribute="badgeClass" tipKey="endorsementBadgeClass">
                <Select
                        bind:value={selectedBadgeClass}
                        clearable={false}
                        isSearchable={true}
                        getOptionLabel={optionLabel}
                        getSelectionLabel={optionLabel}
                        placeholder={I18n.t("endorsements.badgeClassPlaceholder")}
                        optionIdentifier="entityId"
                        items={badgeClasses}/>
            </Field>

        </div>
        <div class="options">
            <Button secondary={true} action={cancel} text={I18n.t("modal.cancel")}/>
            <Button action={submit} text={I18n.t("endorsements.submit")} disabled={disabled}/>
        </div>
    </div>
</div>

