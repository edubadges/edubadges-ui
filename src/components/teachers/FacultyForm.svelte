<script>
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, File, TextInput} from "../forms";
  import {createFaculty, editFaculty} from "../../api";
  import {entityType} from "../../util/entityTypes";
  import I18n from "i18n-js";
  import MultiLanguageField from "../forms/MultiLanguageField.svelte";

  export let entityId;
  export let faculty = {};
  export let mayDelete;
  export let hasUnrevokedAssertions;
  export let defaultLanguage;

  const entity = entityType.ISSUER_GROUP;

  let errors = {};
  let isCreate = !entityId;
  let showRemoveModal = false;
  let processing = false;
  let englishValueError = false;
  let dutchValueError = false

  function onSubmit() {
    processing = true;
    errors = {};

    faculty.description_english = faculty.descriptionEnglish;
    faculty.description_dutch = faculty.descriptionDutch;
    faculty.name_english = faculty.nameEnglish;
    faculty.name_dutch = faculty.nameDutch;

    const args = isCreate ? [faculty] : [entityId, faculty];
    const apiCall = isCreate ? createFaculty : editFaculty;

    apiCall(...args)
      .then(res => {
        entityId = isCreate ? res.entity_id : entityId;
        navigate(`/manage/faculty/${entityId}`)
      })
      .catch(err => err.then(({fields}) => {
        errors = fields.error_message;
        if (errors.name_english || errors.description_english) {
          englishValueError = true;
        } else {
          englishValueError = false;
        }
        if (errors.name_dutch || errors.description_dutch) {
          dutchValueError = true;
        } else {
          dutchValueError = false;
        }
        processing = false;

      }));
  }
</script>

<EntityForm faculty={ {...faculty, entityId} } submit={onSubmit} create={isCreate} {processing}
            {mayDelete} entityTypeName={entity} entityId={entityId} {hasUnrevokedAssertions}>
  <MultiLanguageField errorEnglish={englishValueError} 
                      errorDutch={dutchValueError}
                      initialTab={defaultLanguage == 'en-US'? "en" : "nl"}>
    <div slot='en'>
      <Field {entity} attribute="name_english" errors={errors.name_english} tipKey="facultyNameEn">
        <TextInput bind:value={faculty.nameEnglish} error={errors.name_english} placeholder={I18n.t("placeholders.faculty.name")}/>
      </Field>
      <Field {entity} attribute="description_english" errors={errors.description_english} tipKey="facultyDescriptionEn">
        <TextInput bind:value={faculty.descriptionEnglish} error={errors.description_english} area size="100"  placeholder={I18n.t("placeholders.faculty.description")}/>
      </Field>
    </div>
    <div slot='nl'>
      <Field {entity} attribute="name_dutch" errors={errors.name_dutch} tipKey="facultyNameNl">
        <TextInput bind:value={faculty.nameDutch} error={errors.name_dutch} placeholder={I18n.t("placeholders.faculty.name")}/>
      </Field>
      <Field {entity} attribute="description_dutch" errors={errors.description_dutch} tipKey="facultyDescriptionNl">
        <TextInput bind:value={faculty.descriptionDutch} error={errors.description_dutch} area size="100"  placeholder={I18n.t("placeholders.faculty.description")}/>
      </Field>
    </div>
  </MultiLanguageField>
</EntityForm>

