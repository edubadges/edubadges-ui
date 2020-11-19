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

  const entity = entityType.INSTITUTION;
  const query = `query {
    currentInstitution {
      entityId,
      name,
      descriptionEnglish,
      descriptionDutch
      image,
      brin,
      gradingTable
    },
  }`;

  let institution = {};
  let errors = {};
  let loaded = false;
  let processing = false;

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

    if (!institution.image) delete institution.image;
    editInstitution(institution.entityId, institution)
      .then(() => navigate(`/manage/institution`))
      .catch(err => err.then(({fields}) => {
        errors = fields.error_message;
        processing = false;
      }));
  }
</script>

{#if loaded}
  <EntityForm entityTypeName={entity} submit={handleSubmit} {processing}>
    <Field {entity} attribute="image" errors={errors.image}>
      <File bind:value={institution.image} error={errors.image} removeAllowed={false}/>
    </Field>

    <Field {entity} attribute="name" errors={errors.name}>
      <TextInput bind:value={institution.name} error={errors.name}  placeholder={I18n.t("placeholders.institution.name")}/>
    </Field>

    <Field {entity} attribute="description_english" errors={errors.description}>
      <TextInput
          bind:value={institution.description_english}
          error={errors.description}
          placeholder={I18n.t("placeholders.institution.description")}
          size="100"
          area/>
    </Field>

    <Field {entity} attribute="description_dutch" errors={errors.description}>
      <TextInput
          bind:value={institution.description_dutch}
          error={errors.description}
          placeholder={I18n.t("placeholders.institution.description")}
          size="100"
          area/>
    </Field>

    <Field {entity} attribute="brin" errors={errors.brin}>
      <TextInput
          bind:value={institution.brin}
          error={errors.brin}
          placeholder={I18n.t("placeholders.institution.brin")}
          disabled={true}/>
    </Field>

    <Field {entity} attribute="grading_table" errors={errors.grading_table}>
      <TextInput
          bind:value={institution.grading_table}
          placeholder={I18n.t("placeholders.institution.gradingTable")}
          error={errors.grading_table}/>
    </Field>

  </EntityForm>
{:else}
  <Spinner/>
{/if}
