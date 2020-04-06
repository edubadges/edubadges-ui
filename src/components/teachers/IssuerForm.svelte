<script>
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";

  export let issuer = {};
  export let errors = {};
  export let handleSubmit;

  const entity = "issuer";
</script>

<EntityForm {entity} submit={handleSubmit}>
  <Field {entity} attribute="image" errors={errors.image}>
    <File bind:value={issuer.image} error={errors.image} />
  </Field>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={issuer.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput bind:value={issuer.description} error={errors.description} />
  </Field>

  <Field {entity} attribute="url" errors={errors.url}>
    <TextInput bind:value={issuer.url} error={errors.url} />
  </Field>

  <Field {entity} attribute="email" errors={errors.email}>
    <TextInput bind:value={issuer.email} error={errors.email} />
  </Field>
</EntityForm>
