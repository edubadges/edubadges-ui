<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import { queryData } from "../../api/graphql";
  import { editInstitution } from "../../api";

  const entity = "institution";
  const query = `{
	currentUser {
	  institution {
		entityId,
		name,
		image,
		brin,
		gradingTable
      }
	},
  }`;

  let institution = {};
  let errors = {};

  onMount(() => {
    queryData(query).then(({ currentUser }) => {
      const { gradingTable, ...rest } = currentUser.institution;
      institution = { grading_table: gradingTable, ...rest };
    });
  });

  function handleSubmit() {
    errors = {};

    editInstitution(institution.entityId, institution)
      .then(res => navigate(`/manage/institution`))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<EntityForm {entity} submit={handleSubmit}>
  <Field {entity} attribute="image" errors={errors.image}>
    <File bind:value={institution.image} error={errors.image} />
  </Field>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={institution.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="brin" errors={errors.brin}>
    <TextInput bind:value={institution.brin} error={errors.brin} />
  </Field>

  <Field {entity} attribute="grading_table" errors={errors.grading_table}>
    <TextInput
      bind:value={institution.grading_table}
      error={errors.grading_table} />
  </Field>

</EntityForm>
