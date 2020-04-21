<script>
  import { navigate } from "svelte-routing";
  import { EntityForm } from "../teachers";
  import { Field, Select, File, TextInput } from "../forms";
  import { createIssuer, editIssuer } from "../../api";

  export let entityId;
  export let issuer = { faculty: {}};
  export let faculties = [];

  const entity = "issuer";
  let errors = {};
  let isCreate = !entityId;

  function onSubmit() {
    errors = {};

    let newIssuer = issuer;
    if (issuer.faculty) {
      newIssuer.faculty = issuer.faculty.entityId;
    }

    const args = isCreate ? [newIssuer] : [entityId, newIssuer];
    const apiCall = isCreate ? createIssuer : editIssuer;

    apiCall(...args)
      .then(res => navigate(`/manage/issuer/${entityId}`))
      .catch(err => err.then(({ fields }) => (errors = fields)));
  }
</script>

<EntityForm {entity} faculty={isCreate ? null : issuer.faculty} issuer={isCreate ? null : issuer} submit={onSubmit} create={isCreate}>
  <Field {entity} attribute="faculty" errors={errors.faculty}>
    <Select
      bind:value={issuer.faculty}
      error={errors.faculty}
      items={faculties} />
  </Field>

  <Field {entity} attribute="image" errors={errors.image}>
    <File bind:value={issuer.image} error={errors.image} />
  </Field>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={issuer.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={issuer.description} error={errors.description} area/>
  </Field>

  <Field {entity} attribute="url" errors={errors.url}>
    <TextInput bind:value={issuer.url} error={errors.url} />
  </Field>

  <Field {entity} attribute="email" errors={errors.email}>
    <TextInput bind:value={issuer.email} error={errors.email} />
  </Field>
</EntityForm>
