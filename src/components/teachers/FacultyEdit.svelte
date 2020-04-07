<script>
  import { onMount } from "svelte";
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import { queryData } from "../../api/graphql";
  import { editFaculty } from "../../api";

  export let entityId;

  const entity = "faculty";
  const query = `{
    faculty(id: "${entityId}") {
      name,
      description
    },
  }`;

  let faculty = {};
  let errors = {};

  onMount(() => {
    queryData(query).then(res => {
      faculty = res.faculty;
    });
  });

  function handleSubmit() {
    errors = {};

    editFaculty(entityId, faculty)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
</script>

<EntityForm {entity} submit={handleSubmit}>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={faculty.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={faculty.description} error={errors.description} />
  </Field>

</EntityForm>
