<script>
    import I18n from "i18n-js";
    import Spinner from "../../components/Spinner.svelte";
    import {onMount} from "svelte";
    import {confirmImportedAssertion, importAssertion, importedAssertions} from "../../api";
    import ImportBadgeHeader from "../../components/students/imported/ImportBadgeHeader.svelte";
    import Button from "../../components/Button.svelte";
    import Modal from "../../components/forms/Modal.svelte";
    import Field from "../../components/forms/Field.svelte";
    import File from "../../components/forms/File.svelte";
    import {TextInput} from "../../components/forms";
    import {queryData} from "../../api/graphql";
    import BadgePanel from "../../components/students/BadgePanel.svelte";
    import ViewSelector from "../../components/shared/ViewSelector.svelte";

    const entity = "importedBadges";

    let loaded = false;
    let importedBadges = [];
    let assertion = {};
    let view = "cards";
    let showImportModal = false;
    let showCodeConfirmationModal = false;
    let errors = {};
    let error = false;
    let emailError = false;
    let duplicateError = false;
    let codeMismatch = false;
    let currentUser = {};
    let newImport = {};

    const query = `query {
      currentUser {
        email
      },
    }`;

    const initData = () => {
        codeMismatch = false;
        error = false;
        emailError = false;
        newImport = {
            image: null,
            import_url: null,
            email: currentUser.email,
            code: null
        }
    }

    const refresh = () => {
        loaded = false;
        importedBadges = [];
        Promise.all([importedAssertions(), queryData(query)]).then(res => {
            importedBadges = res[0];
            currentUser = res[1].currentUser;
            initData();
            loaded = true;
        });
    }


    onMount(() => refresh());

    const doImportBadge = () => {
        loaded = false;
        importAssertion(newImport).then(res => {
            showImportModal = false;
            if (res.verified) {
                refresh();
            } else {
                loaded = true;
                showCodeConfirmationModal = true;
                newImport = {...res, ...newImport};
            }
        }).catch(e => {
            e.then(j => {
                if (j.fields && j.fields.error_message && j.fields.error_message.import_url &&
                    j.fields.error_message.import_url.length > 0 && j.fields.error_message.import_url[0].error_code === '936') {
                    error = false;
                    loaded = true;
                    emailError = false;
                    duplicateError = true;
                } else if (j.length === 1 && j[0] === "email mismatch") {
                    error = false;
                    loaded = true;
                    emailError = true;
                    duplicateError = false;
                } else {
                    error = true;
                    emailError = false;
                    duplicateError = false;
                    loaded = true;
                }
            })
        });
    }

    const confirm = () => {
        loaded = false;
        confirmImportedAssertion(newImport).then(() => {
            showCodeConfirmationModal = false;
            refresh();
        }).catch(() => {
            codeMismatch = true;
            loaded = true;
            newImport.code = '';
        });
    }


</script>

<style lang="scss">

  .view-container {
    display: flex;
    margin-bottom: 10px;
  }

  .error {
    color: var(--red-dark);
  }

  div.modal-info-divider {
    margin-top: 20px;
    padding: 20px 0 10px 0;
    border-top: 1px solid var(--purple-1);
  }

</style>

<div>
    {#if loaded}
        <div class="container">
            <ImportBadgeHeader {importedBadges}>
                <Button action={() => showImportModal = true} text={I18n.t("importedBadges.import")}/>
            </ImportBadgeHeader>
            {#if importedBadges.length === 0}
                <p>{I18n.t("importedBadges.zeroState")}</p>
            {:else}
                <div class="view-container">
                    <ViewSelector bind:view={view}/>
                </div>
                <BadgePanel badges={importedBadges} view={view}/>
            {/if}
        </div>
    {:else}
        <Spinner/>
    {/if}
</div>
{#if showImportModal}
    <Modal
            submit={doImportBadge}
            title={I18n.t("importedBadges.importWindow.title")}
            question={I18n.t("importedBadges.importWindow.question")}
            cancel={() => {
        showImportModal = false;
        initData();
    }}
            submitLabel={I18n.t("importedBadges.importWindow.submit")}
            disabled={(!newImport.image && !newImport.import_url) || !newImport.email || !loaded}>

        <Field {entity} attribute="image" errors={errors.image} tipKey="importedBadgeImage">
            <File
                    bind:value={newImport.image}
                    error={errors.image}
                    removeAllowed={true}
                    disclaimer={I18n.t("importedBadges.importWindow.disclaimer")}/>
        </Field>

        <div class="modal-info-divider">
            <p>{I18n.t("importedBadges.importWindow.urlInfo")}</p>
        </div>

        <Field {entity} attribute="url" errors={errors.url} tipKey="importedBadgeImageUrl">
            <TextInput
                    bind:value={newImport.import_url}
                    placeholder={I18n.t("importedBadges.importWindow.urlPlaceholder")}
                    error={errors.criteria_url}/>
        </Field>
        {#if duplicateError}
            <div class="error">
                <p>{I18n.t("importedBadges.error.duplicate")}</p>
            </div>
        {/if}

        <div class="modal-info-divider">
            <p>{I18n.t("importedBadges.importWindow.emailInfo")}</p>
        </div>
        {#if error}
            <div class="error">
                <p>{I18n.t(`importedBadges.error.${newImport.import_url ? 'url' : 'image'}`)}</p>
            </div>
        {/if}

        <Field {entity} attribute="email" errors={errors.email} tipKey="importedBadgeEmail">
            <TextInput
                    bind:value={newImport.email}
                    placeholder={currentUser.email}
                    error={errors.email}/>
        </Field>
        {#if emailError}
            <div class="error">
                <p>{I18n.t("importedBadges.error.email")}</p>
            </div>
        {/if}

    </Modal>
{/if}
{#if showCodeConfirmationModal }
    <Modal
            submit={confirm}
            title={I18n.t("importedBadges.codeWindow.title")}
            question={I18n.t("importedBadges.codeWindow.question", {email: newImport.email})}
            cancel={() => {
        showCodeConfirmationModal = false;
        initData();

    }}
            submitLabel={I18n.t("importedBadges.codeWindow.submit")}
            disabled={!newImport.code || newImport.code.length < 6 || !loaded}>
        <Field {entity} attribute="code" errors={errors.code} tipKey="importedBadgeCode">
            <TextInput
                    bind:value={newImport.code}
                    placeholder={I18n.t("importedBadges.codeWindow.codePlaceholder")}
                    error={errors.code}/>
        </Field>

        {#if codeMismatch}
            <div class="error">
                <p>{I18n.t("importedBadges.codeMismatch")}</p>
            </div>
        {/if}

    </Modal>
{/if}