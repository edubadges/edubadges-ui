<script>
  import { onMount } from "svelte";
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import { queryData } from "../../api/graphql";

  const entity = "institution";
  const query = `{
	currentUser {
	  institution {
		name,
		image,
		brin,
		gradingTable
      }
	},
  }`;

  let institution = {};

  onMount(() => {
    queryData(query).then(({ currentUser }) => {
      institution = currentUser.institution;
    });
  });
</script>

<EntityForm {entity}>
  <Field {entity} attribute="image">
    <File bind:value={institution.image} />
  </Field>

  <Field {entity} attribute="name">
    <TextInput bind:value={institution.name} />
  </Field>

  <Field {entity} attribute="brin">
    <TextInput bind:value={institution.brin} />
  </Field>

  <Field {entity} attribute="grading_table">
    <TextInput bind:value={institution.grading_table} />
  </Field>

</EntityForm>
