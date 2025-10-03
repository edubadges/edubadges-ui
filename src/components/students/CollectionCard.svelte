<script>
    import {chevronDown, chevronUp, pencilIcon, shieldLock, shieldUnlock, trash} from "../../icons";
    import Button from "../Button.svelte";
    import I18n from "i18n-js";
    import {navigate} from "svelte-routing";
    import BadgePanel from "./BadgePanel.svelte";
    import {deleteBadgeInstanceCollection, editBadgeInstanceCollection} from "../../api";
    import {flash} from "../../stores/flash";
    import Modal from "../forms/Modal.svelte";

    export let collection = {};
    export let view;
    export let refresh;

    let showDetails = true;
    let showDeleteModal = false;

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
        <div class="inner-header" 
            on:click={() => showDetails = !showDetails}
            on:keypress={() => showDetails = !showDetails}>
                {@html showDetails ? chevronUp : chevronDown}
                <h3>{collection.name}</h3>
        </div>
        <section class="buttons-container">
            <section class="buttons">
                <div class="trash collection-action" 
                    on:click={deleteCollection(true)}
                    on:keypress={deleteCollection(true)}>
                        {@html trash}
                    </div>
                    <div class="pencil collection-action"
                        on:click={() => navigate(`/edit-collection/${collection.entityId}`)}
                        on:keypress={() => navigate(`/edit-collection/${collection.entityId}`)}>
                            {@html pencilIcon}
                        </div>
            </section>
        </section>
    </div>
    {#if showDetails}
        <section class="card-content">
            <section class="card-content-header">
                <p>{collection.description}</p>
            </section>
            <BadgePanel badges={collection.badgeInstances} view={view} linksEnabled={true}/>
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