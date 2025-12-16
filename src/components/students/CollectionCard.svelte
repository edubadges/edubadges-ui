<script>
    import {chevronDown, chevronUp, pencilIcon, shieldLock, shieldUnlock, trash} from "../../icons";
    import Button from "../Button.svelte";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import BadgePanel from "./BadgePanel.svelte";
    import {deleteBadgeInstanceCollection, editBadgeInstanceCollection} from "../../api";
    import {flash} from "../../stores/flash";
    import Modal from "../forms/Modal.svelte";
    import ShareDialog from "../../routes/students/ShareDialog.svelte";

    export let collection = {};
    export let view;
    export let refresh;
    export let readOnly = false;

    let showDetails = true;
    let showShareDialog = false;
    let showDeleteModal = false;
    let showTogglePublicModal = false;
    let showPublicCollectionRequiresModal = false;

    const togglePublic = showConfirmation => () => {
        //Show informative modal explaining that public badges are required
        if (collection.badgeInstances.filter(badge => badge.public).length === 0) {
            showPublicCollectionRequiresModal = true;
            return;
        }
        if (showConfirmation) {
            showTogglePublicModal = true;
        } else {
            const newCollection = {
                public: !collection.public,
                name: collection.name,
                description: collection.description,
                badge_instances: collection.badgeInstances.map(bi => bi.id),
                entity_id: collection.entityId
            }
            editBadgeInstanceCollection(newCollection).then(() => {
                flash.setValue(I18n.t("collections.editFlash", {
                    name: collection.name,
                    status: collection.public ? "collections.private" : "collections.public"
                }));
                refresh();
            });
        }
    }

    const publicUrl = () => {
        const currentUrl = window.location.href;
        return currentUrl.replace("/collections", `/public/collections/${collection.entityId}`);
    }

    const deleteCollection = showConfirmation => () => {
        if (showConfirmation) {
            showDeleteModal = true;
        } else {
            deleteBadgeInstanceCollection(collection).then(() => {
                flash.setValue(I18n.t("collections.deleteFlash", {name: collection.name}));
                refresh();
            });
        }
    }

    const copiedLink = () => showShareDialog = false;

</script>
<style lang="scss">
  .collection-card {
    display: flex;
    flex-direction: column;
    margin-top: 25px;

    .header {
      display: flex;
      align-items: center;
      padding: 15px 0 6px 0;

      @media (max-width: 820px) {
        flex-direction: column;
        align-items: start;
      }


      div.inner-header {
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      h3 {
        margin: 0 0 0 25px;
      }

      :global(svg.chevron-down), :global(svg.chevron-up) {
        width: 28px;
        fill: var(--purple);
      }

      .buttons-container {
        padding: 5px 0;
        margin-left: auto;
      }

      .buttons {
        color: var(--purple);
        display: flex;

        div.collection-action {
          border-radius: 2px;
          padding: 8px;
          border: 1px solid var(--purple);
          display: flex;
          margin-right: 15px;
          cursor: pointer;

          &.shield {
            padding: 0;
            border: none;

          }
        }

        :global(div.collection-action svg) {
          width: 18px;
          height: 18px;
          fill: var(--purple);
        }

        :global(div.collection-action.shield svg) {
          width: 38px;
          height: 38px;
          margin: auto;
        }
      }
    }

    .card-content {
      background: var(--grey-2);
      border-top: var(--card-border);
      padding: 15px;

      .card-content-header {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        p {
          margin-right: auto;
        }
      }
    }
  }
</style>
<section class="collection-card">
    <div class="header">
        {#if !readOnly}
            <div class="inner-header" on:click={() => showDetails = !showDetails}>
                {@html showDetails ? chevronUp : chevronDown}
                <h3>{collection.name}</h3>
            </div>
            <section class="buttons-container">
                <section class="buttons">
                    <div class="trash collection-action" on:click={deleteCollection(true)}>
                        {@html trash}
                    </div>
                    <div class="pencil collection-action"
                         on:click={() => navigate(`/edit-collection/${collection.entityId}`)}>
                        {@html pencilIcon}
                    </div>
                    <div class="shield collection-action" on:click={togglePublic(true)}>
                        {@html collection.public ? shieldUnlock : shieldLock}
                    </div>
                </section>
            </section>
        {/if}
    </div>
    {#if showDetails}
        <section class="card-content">
            <section class="card-content-header">
                {#if !readOnly}
                    <p>{collection.description}</p>
                    <div class="share-container">
                        <Button text={I18n.t("student.share")} action={() => showShareDialog = true}
                                disabled={!collection.public || collection.badgeInstances.filter(badge => badge.public).length === 0}/>
                    </div>
                {/if}
            </section>
            <BadgePanel badges={collection.badgeInstances}
                        view={view}
                        linksEnabled={readOnly}
                        isPublic={readOnly}/>
            {#if collection.badgeInstances.length === 0}
                <p>{I18n.t("collections.zeroStateBadges")}</p>
            {/if}
        </section>
    {/if}
</section>
{#if showDeleteModal}
    <Modal
            submit={deleteCollection(false)}
            warning={true}
            cancel={() => showDeleteModal = false}
            question={I18n.t("collections.deleteConfirmationQuestion", {name: collection.name})}
            title={I18n.t("collections.deleteConfirmation", {name: collection.name})}/>
{/if}
{#if showTogglePublicModal}
    <Modal
            submit={togglePublic(false)}
            cancel={() => showTogglePublicModal = false}
            evaluateQuestion={true}
            question={I18n.t(`collections.share.${collection.public ? "privateConfirmation" : "publishConfirmation"}`, {name: collection.name})}
            title={I18n.t(`collections.share.${collection.public ? "private" : "publish"}`, {name: collection.name})}
    />
{/if}
{#if showPublicCollectionRequiresModal}
    <Modal
            submit={() => showPublicCollectionRequiresModal = false}
            cancel={() => showPublicCollectionRequiresModal = false}
            question={I18n.t("collections.requiresPublicBadgePresent")}
            cancelLabel={"Ok"}
            hideSubmit={true}
            title={I18n.t("collections.share.title")}
    />
{/if}
{#if showShareDialog}
    <ShareDialog
            copied={copiedLink}
            cancel={copiedLink}
            publicUrl={publicUrl()}
            title={I18n.t("shareDialog.titleCollections")}
            copyPublicUrl={I18n.t("shareDialog.copyPublicUrlCollections")}/>
{/if}
