<script>
    import I18n from "i18n-js";
    import Spinner from "../../components/Spinner.svelte";
    import {onMount} from "svelte";
    import {assertionJson} from "../../api";
    import ImportBadgeHeader from "../../components/students/imported/ImportBadgeHeader.svelte";
    import Button from "../../components/Button.svelte";
    import Modal from "../../components/forms/Modal.svelte";
    import ImportBadge from "../../components/students/imported/ImportBadge.svelte";
    import Field from "../../components/forms/Field.svelte";
    import File from "../../components/forms/File.svelte";
    import {TextInput} from "../../components/forms";

    const entity="importedBadges";

    let loaded = false;
    let importedBadges = [];
    let assertion = {};
    let view = "cards";
    let showImportModal = false;
    let errors = {};
    let newImport = {
        image: null,
    }

    const query = `query {
    currentUser {
      validatedName,
    },
  }`;

    onMount(() => {
        assertionJson("https://api.eu.badgr.io/public/assertions/-kDl8isfQoKrMHrqOx5Thw").then(res => {
            loaded = true;
            assertion = res;
        })
    });

    const doImportBadge = () => {
        debugger;
    }
    //queryData(query).then(all => {-->
    //  const res = all[0];-->
    //   badges = badgeInstances;
    //   loaded = true;
    // });
    //});


</script>

<style lang="scss">

  .header {
    display: flex;
    align-content: center;
  }

  h3 {
    font-size: 22px;
    margin-bottom: 30px;
  }

  div.modal-info-divider {
    margin: 20px 0;
    padding: 20px 0;
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
        <div class="content">
          {#each importedBadges as badge}
            <ImportBadge badge={badge} view={view} refresh={refresh}/>
          {/each}
        </div>
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
    cancel={() => showImportModal = false}
    submitLabel={I18n.t("importedBadges.importWindow.submit")}
    hideSubmit={false}>

    <Field {entity} attribute="image" errors={errors.image} tipKey="importedBadgeImage">
      <File
        bind:value={newImport.image}
        disabled={false}
        error={errors.image}
        disclaimer={I18n.t("importedBadges.importWindow.disclaimer")}
        removeAllowed={false}/>
    </Field>
    <div class="modal-info-divider">
      <p>{I18n.t("importedBadges.importWindow.urlInfo")}</p>
    </div>
    <Field {entity} attribute="url" errors={errors.url} tipKey="importedBadgeImageUrl">
      <TextInput
        bind:value={newImport.url}
        disabled={false}
        placeholder={I18n.t("importedBadges.importWindow.urlPlaceholder")}
        error={errors.criteria_url}/>
    </Field>

  </Modal>
{/if}