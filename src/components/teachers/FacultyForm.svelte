<script>
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";

  export let faculty = {};
  export let errors = {};
  export let handleSubmit;

  const entity = "faculty";
</script>

<EntityForm {entity} submit={handleSubmit}>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={faculty.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={faculty.description} error={errors.description} />
  </Field>

</EntityForm>
