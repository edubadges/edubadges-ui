<script>
  import { navigate } from "svelte-routing";
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import { createFaculty, editFaculty } from "../../api";

  export let entityId;
  export let faculty = {};

  const entity = "faculty";
  let errors = {};
  let isCreate = !entityId;

  function onSubmit() {
    errors = {};

    const args = isCreate ? [faculty] : [entityId, faculty];
    const apiCall = isCreate ? createFaculty : editFaculty;

    apiCall(...args)
      .then(res => navigate(`/manage/faculty/${res.entityId}`))
      .catch(err => err.then(({ fields }) => (errors = fields)));
  }
</script>

<EntityForm {entity} submit={onSubmit} create={isCreate}>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={faculty.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={faculty.description} error={errors.description} />
  </Field>

</EntityForm>
