<script>
    import {link, navigate} from "svelte-routing";
    import indicator from "../../icons/chevron-down-large.svg";
    import {Field, TextInput} from "../forms";
    import {editInstitution} from "../../api";
    import I18n from "i18n-js";
    import Select from "../forms/Select.svelte";
    import CheckBox from "../CheckBox.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import Spinner from "../Spinner.svelte";
    import chevronRightSmall from "../../icons/chevron-right-small.svg";

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
              nameEnglish
            }
          }
        }
      },
    }`

    export let entityId;

    let entity = "collection";
    let errors = {};
    let processing = false;
    let collection = {
        name: "", description: "", public: false, badge_instances: []
    }
    let isNew = true;
    let badges = [];
    let loaded = false;


    onMount(() => {
        isNew = entityId === "new";
        const promise = isNew ? Promise.resolve({
            badgeInstanceCollection: collection
        }) : queryData(queryBadgeInstance, {entityId});
        Promise.all([promise, queryData(queryBadges)]).then(res => {
            collection = res[0].badgeInstanceCollection;
            badges = res[1].badgeInstances.map(badge => {
                badge.name = badge.badgeclass.name;
            });
            loaded = true;
        });
    });

    function handleSubmit() {
        errors = {};
        processing = true;

        editInstitution(institution.entityId, institution)
            .then(() => navigate(`/manage/institution`))
            .catch(err => err.then(({fields}) => {
                errors = fields.error_message;
                processing = false;
                debugger;
            }));
    }
</script>
<style>
    div.collection-form-container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    div.collection-detail {
        padding: 20px 40px 10px 40px;
    }

</style>

<div class="collection-form-container">
  {#if loaded}
    <div class="bread-crumb">
      <a use:link href={`/collections`}>{I18n.t("routes.collections")}</a>
      <span class="icon">{@html chevronRightSmall}</span>
      <span class="current">{isNew ? I18n.t("collections.form.new") : collection.name}</span>
    </div>
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
          value={collection.public || false}
          inForm={true}
          adjustTop={true}
          label={I18n.t("collections.privatePublic")}
          onChange={val => collection.public = val}/>
      </Field>
      <Field {entity} attribute="badge_instances" errors={errors.badge_instances}
             tipKey="chosenBadges">
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
    </div>
  {:else}
    <Spinner/>
  {/if}

</div>