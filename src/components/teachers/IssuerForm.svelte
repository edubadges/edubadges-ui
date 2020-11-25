<script>
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, Select, File, TextInput} from "../forms";
  import {createIssuer, editIssuer} from "../../api";
  import {entityType} from "../../util/entityTypes";
  import I18n from "i18n-js";
  import {toHttpOrHttps} from "../../util/Url";
  import {onMount} from "svelte";

  export let entityId;
  export let issuer = {faculty: {}, badgeclasses: []};
  export let faculties = [];
  export let facultyChooseAllowed;
  export let mayDelete;

  const entity = entityType.ISSUER;
  let errors = {};
  let isCreate = !entityId;
  let processing = false;
  let hasAssertions = false;

  onMount(() => {
    hasAssertions = (issuer.badgeclasses || []).some(badgeClass => (badgeClass.badgeAssertions || []).length > 0)
  });

  function onSubmit() {
    errors = {};
    processing = true;

    let parent = issuer.faculty;
    let newIssuer = issuer;
    if (issuer.faculty) {
      newIssuer.faculty = issuer.faculty.entityId;
    }

    newIssuer.url = toHttpOrHttps(issuer.url);

    if (newIssuer.image === '') newIssuer.image = null;

    newIssuer.description_english = issuer.descriptionEnglish;
    newIssuer.description_dutch = issuer.descriptionDutch;

    const args = isCreate ? [newIssuer] : [entityId, newIssuer];
    const apiCall = isCreate ? createIssuer : editIssuer;

    apiCall(...args)
      .then(res => {
        entityId = createIssuer ? res.entity_id : entityId;
        navigate(`/manage/issuer/${entityId}`)
      })
      .catch(err => err.then(({fields}) => {
        issuer.faculty = parent;
        errors = fields.error_message;
        processing = false;
      }));
  }
</script>

<EntityForm entityTypeName={entity} faculty={isCreate ? null : issuer.faculty} {mayDelete} {entityId}
            issuer={isCreate ? null : issuer} submit={onSubmit} create={isCreate} {processing}>
  <Field {entity} attribute="faculty" errors={errors.faculty}>
    <Select
        bind:value={issuer.faculty}
        disabled={!facultyChooseAllowed}
        error={errors.faculty}
        items={faculties}/>
  </Field>

  <Field {entity} attribute="image" errors={errors.image}>
    <File bind:value={issuer.image} error={errors.image} removeAllowed={true}/>
  </Field>

  <Field {entity} attribute="name" errors={errors.name}>
  <!--  TODO: Need to refactor the CSS to use disabled=true, now disabled although false renders as disabled  -->
    {#if hasAssertions}
      <TextInput bind:value={issuer.name} error={errors.name} placeholder={I18n.t("placeholders.issuer.name")}
                 disabled={true}/>
    {:else}
      <TextInput bind:value={issuer.name} error={errors.name} placeholder={I18n.t("placeholders.issuer.name")}/>
    {/if}
  </Field>

  <Field {entity} attribute="description_english" errors={errors.description_english}>
    <TextInput bind:value={issuer.descriptionEnglish} error={errors.description_english} area size="100"
               placeholder={I18n.t("placeholders.issuer.description")}/>
  </Field>

  <Field {entity} attribute="description_dutch" errors={errors.description_dutch}>
    <TextInput bind:value={issuer.descriptionDutch} error={errors.description_dutch} area size="100"
               placeholder={I18n.t("placeholders.issuer.description")}/>
  </Field>

  <Field {entity} attribute="url" errors={errors.url}>
    <TextInput bind:value={issuer.url} error={errors.url} placeholder={I18n.t("placeholders.issuer.url")}/>
  </Field>

  <Field {entity} attribute="email" errors={errors.email}>
    <TextInput bind:value={issuer.email} error={errors.email} placeholder={I18n.t("placeholders.issuer.email")}/>
  </Field>
</EntityForm>
