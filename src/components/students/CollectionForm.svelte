<script>
    import {link, navigate} from "svelte-routing";
    import indicator from "../../icons/chevron-down-large.svg";
    import {Field, TextInput} from "../forms";
    import {createBadgeInstanceCollection, deleteBadgeInstanceCollection, editBadgeInstanceCollection} from "../../api";
    import I18n from "i18n-js";
    import Select from "../forms/Select.svelte";
    import CheckBox from "../CheckBox.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";
    import chevronRightSmall from "../../icons/chevron-right-small.svg";
    import StudentBreadCrumb from "./StudentBreadCrumb.svelte";
    import BadgeHeader from "./BadgeHeader.svelte";
    import Button from "../Button.svelte";
    import {flash} from "../../stores/flash";
    import Modal from "../forms/Modal.svelte";

    const queryBadgeInstance = `query ($entityId: String) {
      badgeInstanceCollection(id: $entityId) {
        entityId,
        name,
        public,
        description,
        createdAt,
        badgeInstances {
          id
        }
      }
    }`;
    const queryBadges = `query {
      badgeInstances {
        id,
        public,
        badgeclass {
          name,
          image,
          issuer {
            nameDutch,
            nameEnglish,
            imageDutch,
            imageEnglish,
            faculty {
              nameDutch,
              nameEnglish,
              onBehalfOf,
              onBehalfOfDisplayName,
              onBehalfOfUrl
            }
          }
        }
      },
    }`

    export let entityId;

    let entity = "collections";
    let errors = {};
    let processing = false;
    let collection = {
        name: "", description: "", public: false, badgeInstances: []
    }
    let isNew = true;
    let badges = [];
    let loaded = false;
    let showRemoveModal = false;

    onMount(() => {
        isNew = entityId === "new";
        const promise = isNew ? Promise.resolve({
            badgeInstanceCollection: collection
        }) : queryData(queryBadgeInstance, {entityId});
        Promise.all([promise, queryData(queryBadges)]).then(res => {
            badges = res[1].badgeInstances.map(badge => {
                badge.name = badge.badgeclass.name;
                return badge;
            });
            res[0].badgeInstanceCollection.badgeInstances.forEach(badge => {
                badge.name = badges.find(b => b.id === badge.id).name;
            })
            collection = res[0].badgeInstanceCollection;
            loaded = true;
        });
    });

    const handleSubmit = () => {
        errors = {};
        processing = true;
        const promise = isNew ? createBadgeInstanceCollection : editBadgeInstanceCollection;
        const newCollection = {
            public: collection.public,
            name: collection.name || null,
            description: collection.description,
            badge_instances: (collection.badgeInstances || []).map(bi => bi.id),
            entity_id: collection.entityId
        }
        promise(newCollection)
            .then(() => navigate(`/collections`))
            .catch(err => err.then(({fields}) => {
                errors = fields.error_message;
                processing = false;
            }));
    }

    const deleteCollection = showConfirmation => () => {
        if (showConfirmation) {
            showRemoveModal = true;
        } else {
            deleteBadgeInstanceCollection(collection).then(() => {
                flash.setValue(I18n.t("collections.deleteFlash", {name: collection.name}));
                navigate("/collections");
            });
        }
    }

    $: publicBadgePresent = collection.badgeInstances.filter(badge => badge.public).length > 0

</script>
<style lang="scss">
  div.collection-form-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  div.collection-detail {
    padding: 20px 40px 10px 40px;
  }

  span.info {
    margin-top: 6px;
    font-size: 14px;
    font-style: italic;
    display: inline-block;
  }

  div.actions {
    display: flex;
    margin-top: 25px;

    .button-container {
      &:not(:last-child) {
        margin-right: 15px;
      }

      &.delete {
        margin-left: auto;
        margin-right: 0;
        display: flex;
        flex-direction: column;
      }
    }

  }
</style>

<div class="collection-form-container">
  {#if loaded}
    <StudentBreadCrumb>
      <a use:link href={`/collections`}>{I18n.t("routes.collections")}</a>
      <span class="icon">{@html chevronRightSmall}</span>
      <span class="current">{isNew ? I18n.t("collections.new") : collection.name}</span>
    </StudentBreadCrumb>
    <BadgeHeader title={isNew ? I18n.t("collections.new") : collection.name}/>
    <div class="collection-detail">

      <Field {entity} attribute="name" errors={errors.name}>
        <TextInput bind:value={collection.name} error={errors.name}
                   placeholder={I18n.t("collections.placeholders.name")}/>
      </Field>
      <Field {entity} attribute="description" errors={errors.description}>
        <TextInput bind:value={collection.description} error={errors.description}
                   placeholder={I18n.t("collections.placeholders.description")}/>
      </Field>
      <Field {entity} attribute="privatePublic" tipKey="toggleBadgeCollectionPublic">
        <CheckBox
          value={(publicBadgePresent && collection.public) || false}
          inForm={true}
          adjustTopFlex={true}
          disabled={!publicBadgePresent}
          label={I18n.t("collections.privatePublic")}
          onChange={val => collection.public = val}/>
        <span class="info">{I18n.t("collections.requiresPublicBadgePresent")}</span>
      </Field>

      <Field {entity} attribute="badge_instances" errors={errors.badge_instances}
             tipKey="collectionBadgeInstances">
        <Select
          bind:value={collection.badgeInstances}
          items={badges}
          isMulti={true}
          customIndicator={indicator}
          showIndicator={false}
          showChevron={true}
          clearable={true}
          placeholder={I18n.t("collections.placeholders.chosenBadges")}
          optionIdentifier="id"
        />
      </Field>
      <div class="actions">
        <div class="button-container">
          <Button
            secondary
            disabled={processing}
            action={() => window.history.back()}
            text={I18n.t(['manage', isNew ? 'new' : 'edit', 'cancel'])}/>
        </div>
        <div class="button-container">
          <Button
            disabled={processing}
            action={handleSubmit}
            text={I18n.t(['manage', isNew ? 'new' : 'edit', 'save'])}/>
        </div>
        {#if !isNew}
          <div class="button-container delete">
            <Button
              warning={true}
              disabled={processing}
              action={() => showRemoveModal = true}
              text={I18n.t("manage.delete.delete")}/>
          </div>
        {/if}
      </div>

    </div>
  {:else}
    <Spinner/>
  {/if}

</div>
{#if showRemoveModal}
  <Modal
    submit={deleteCollection(false)}
    warning={true}
    cancel={() => showRemoveModal = false}
    question={I18n.t("collections.deleteConfirmationQuestion", {name: collection.name})}
    title={I18n.t("collections.deleteConfirmation", {name: collection.name})}/>
{/if}
