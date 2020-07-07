<script>
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, File, TextInput} from "../forms";
  import {createFaculty, editFaculty} from "../../api";
  import {entityType} from "../../util/entityTypes";

  export let entityId;
  export let faculty = {};
  export let mayDelete;

  const entity = entityType.ISSUER_GROUP;

  let errors = {};
  let isCreate = !entityId;
  let showRemoveModal = false;
  let processing  = false;

  function onSubmit() {
    processing = true;
    errors = {};

    const args = isCreate ? [faculty] : [entityId, faculty];
    const apiCall = isCreate ? createFaculty : editFaculty;

    apiCall(...args)
      .then(res => {
        entityId = isCreate ? res.entity_id : entityId;
        navigate(`/manage/faculty/${entityId}`)
      })
      .catch(err => err.then(({fields}) => {
        errors = fields.error_message;
                processing = false;

      }));
  }
</script>

<EntityForm faculty={ {...faculty, entityId} } submit={onSubmit} create={isCreate} {processing}
            {mayDelete} entityTypeName={entity} entityId={entityId}>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={faculty.name} error={errors.name}/>
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={faculty.description} error={errors.description} area/>
  </Field>

</EntityForm>

