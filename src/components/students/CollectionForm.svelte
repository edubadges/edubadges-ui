<script>
    import {navigate} from "svelte-routing";
    import indicator from "../../icons/chevron-down-large.svg";
    import {Field, TextInput} from "../forms";
    import {editInstitution} from "../../api";
    import I18n from "i18n-js";
    import Select from "../forms/Select.svelte";
    import CheckBox from "../CheckBox.svelte";
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";

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

    onMount(() => {
        isNew = entityId === "new";
        const promise = isNew ? Promise.resolve({
            badgeInstanceCollection: collection
        }) : queryData(queryBadgeInstance, {entityId});
        Promise.all([promise, queryData(queryBadges)]).then(res => {
            debugger;
            collection = res[0];
            badges = res[1];
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

</style>

<div class="container">
  <h2>{I18n.t(`collections.form.${collection.entityId ? "edit" : "new"}`)}</h2>
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