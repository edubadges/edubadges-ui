<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, File, TextInput} from "../forms";
  import {queryData} from "../../api/graphql";
  import {editInstitution} from "../../api";
  import {entityType} from "../../util/entityTypes";
  import Spinner from "../Spinner.svelte";
  import I18n from "i18n-js";
  import { toHttpOrHttps } from "../../util/Url";
  import MultiLanguageField from "../forms/MultiLanguageField.svelte";

  const entity = entityType.INSTITUTION;
  const query = `query {
    currentInstitution {
      entityId,
      defaultLanguage,
      nameEnglish,
      nameDutch,
      descriptionEnglish,
      descriptionDutch
      imageEnglish,
      imageDutch,
      brin,
      gradingTable
    },
  }`;

  let institution = {};
  let errors = {};
  let loaded = false;
  let processing = false;
  let englishValueError = false;
  let dutchValueError = false

  onMount(() => {
    queryData(query).then(({currentInstitution}) => {
      const {gradingTable, ...rest} = currentInstitution;
      institution = {grading_table: gradingTable, ...rest};
      loaded = true;
    });
  });

  function handleSubmit() {
    errors = {};
    processing = true;
    institution.grading_table = toHttpOrHttps(institution.grading_table);
    institution.description_english = institution.descriptionEnglish;
    institution.description_dutch = institution.descriptionDutch;
    institution.name_english = institution.nameEnglish;
    institution.name_dutch = institution.nameDutch;
    institution.image_english = institution.imageEnglish;
    institution.image_dutch = institution.imageDutch;

    if (!institution.image) {
      delete institution.image;
    }
    editInstitution(institution.entityId, institution)
      .then(() => navigate(`/manage/institution`))
      .catch(err => err.then(({fields}) => {
        errors = fields.error_message;
        processing = false;

        if (errors.image_english || errors.name_english || errors.description_english) {
          englishValueError = true;
        } else {
          englishValueError = false;
        }
        if (errors.image_dutch || errors.name_dutch || errors.description_dutch) {
          dutchValueError = true;
        } else {
          dutchValueError = false;
        }

      }));
  }
</script>

{#if loaded}
  <EntityForm entityTypeName={entity} submit={handleSubmit} {processing}>
    <MultiLanguageField errorEnglish={englishValueError} errorDutch={dutchValueError}
                        initialTab={institution.defaultLanguage == 'en-US'? "en" : "nl"}>
      <div slot='en'>
        <Field {entity} attribute="image_english" errors={errors.image_english} tipKey="institutionImageEn">
          <File bind:value={institution.imageEnglish} error={errors.image_english} removeAllowed={false}/>
        </Field>
        <Field {entity} attribute="name_english" errors={errors.name_english} tipKey="institutionNameEn">
          <TextInput bind:value={institution.nameEnglish} error={errors.name_english}  placeholder={I18n.t("placeholders.institution.name")}/>
        </Field>
        <Field {entity} attribute="description_english" errors={errors.description_english} tipKey="institutionDescriptionEn">
          <TextInput
              bind:value={institution.descriptionEnglish}
              error={errors.description_english}
              placeholder={I18n.t("placeholders.institution.description")}
              size="100"
              area/>
        </Field>
      </div>
      <div slot='nl'>
        <Field {entity} attribute="image_dutch" errors={errors.image_dutch} tipKey="institutionImageNl">
          <File bind:value={institution.imageDutch} error={errors.image_dutch} removeAllowed={false}/>
        </Field>
        <Field {entity} attribute="name_dutch" errors={errors.name_dutch} tipKey="institutionNameNl">
          <TextInput bind:value={institution.nameDutch} error={errors.name}  placeholder={I18n.t("placeholders.institution.name")}/>
        </Field>
        <Field {entity} attribute="description_dutch" errors={errors.description_dutch} tipKey="institutionDescriptionNl">
          <TextInput
              bind:value={institution.descriptionDutch}
              error={errors.description_dutch}
              placeholder={I18n.t("placeholders.institution.description")}
              size="100"
              area/>
        </Field>
      </div>
      <div slot='after'>
        <Field {entity} attribute="brin" errors={errors.brin} tipKey="institutionBrin">
          <TextInput
              bind:value={institution.brin}
              error={errors.brin}
              placeholder={I18n.t("placeholders.institution.brin")}
              disabled={true}/>
        </Field>
      
        <Field {entity} attribute="grading_table" errors={errors.grading_table}  tipKey="institutionGradingTable">
          <TextInput
              bind:value={institution.grading_table}
              placeholder={I18n.t("placeholders.institution.gradingTable")}
              error={errors.grading_table}/>
        </Field>
      </div>
    </MultiLanguageField>

  </EntityForm>

{:else}
  <Spinner/>
{/if}
