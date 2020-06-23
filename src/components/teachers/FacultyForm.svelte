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
      .then(res => {
        entityId = isCreate ? res.entity_id : entityId;
        navigate(`/manage/faculty/${entityId}`)
      })
      .catch(err => err.then(({ fields }) => (errors = fields)));
  }
</script>

<EntityForm {entity} faculty={ {...faculty, entityId} } submit={onSubmit} create={isCreate}>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={faculty.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={faculty.description} error={errors.description} area/>
  </Field>

</EntityForm>
