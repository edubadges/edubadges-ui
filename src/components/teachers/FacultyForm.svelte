<script>
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, File, TextInput} from "../forms";
  import {createFaculty, editFaculty} from "../../api";
  import {entityType} from "../../util/entityTypes";
  import I18n from "i18n-js";

  export let entityId;
  export let faculty = {};
  export let mayDelete;

  const entity = entityType.ISSUER_GROUP;

  let errors = {};
  let isCreate = !entityId;
  let showRemoveModal = false;
  let processing = false;

  function onSubmit() {
    processing = true;
    errors = {};

    faculty.description_english = faculty.descriptionEnglish;
    faculty.description_dutch = faculty.descriptionDutch;

    const args = isCreate ? [faculty] : [entityId, faculty];
    const apiCall = isCreate ? createFaculty : editFaculty;

    apiCall(...args)
      .then(res => {
        entityId = isCreate ? res.entity_id : entityId;
        navigate(`/manage/faculty/${entityId}`)
      })
      .catch(err => err.then(({fields}) => {
        errors = fields.error_message;
        processing = false;

      }));
  }
</script>

<EntityForm faculty={ {...faculty, entityId} } submit={onSubmit} create={isCreate} {processing}
            {mayDelete} entityTypeName={entity} entityId={entityId}>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={faculty.name} error={errors.name} placeholder={I18n.t("placeholders.faculty.name")}/>
  </Field>

  <Field {entity} attribute="description_english" errors={errors.description_english}>
    <TextInput bind:value={faculty.descriptionEnglish} error={errors.description_english} area size="100"  placeholder={I18n.t("placeholders.faculty.description")}/>
  </Field>

  <Field {entity} attribute="description_dutch" errors={errors.description_dutch}>
    <TextInput bind:value={faculty.descriptionDutch} error={errors.description_dutch} area size="100"  placeholder={I18n.t("placeholders.faculty.description")}/>
  </Field>

</EntityForm>

