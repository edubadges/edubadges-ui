<script>
  import {onMount} from "svelte";
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, File, TextInput} from "../forms";
  import {queryData} from "../../api/graphql";
  import {editInstitution} from "../../api";
  import {entityType} from "../../util/entityTypes";
  import Spinner from "../Spinner.svelte";

  const entity = entityType.INSTITUTION;
  const query = `{
    currentInstitution {
      entityId,
      name,
      description,
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

    <Field {entity} attribute="name" errors={errors.name} disabled={true}>
      <TextInput bind:value={institution.name} error={errors.name} disabled={true}/>
    </Field>

    <Field {entity} attribute="description" errors={errors.description}>
      <TextInput
        bind:value={institution.description}
        error={errors.description}
        area/>
    </Field>

    <Field {entity} attribute="brin" errors={errors.brin}>
      <TextInput bind:value={institution.brin} error={errors.brin}/>
    </Field>

    <Field {entity} attribute="grading_table" errors={errors.grading_table}>
      <TextInput
        bind:value={institution.grading_table}
        error={errors.grading_table}/>
    </Field>

  </EntityForm>
{:else}
  <Spinner/>
{/if}
