<script>
  import { onMount } from "svelte";
  import { EntityForm } from "../teachers";
  import { Field, File, TextInput } from "../forms";
  import { queryData } from "../../api/graphql";
  import { editIssuer } from "../../api";

  export let entityId;

  const entity = "issuer";
  const query = `{
    issuer(id: "${entityId}") {
      name,
      description,
      image,
      url,
      email
    },
  }`;

  let issuer = {};
  let errors = {};

  onMount(() => {
    queryData(query).then(res => {
      issuer = res.issuer;
    });
  });

  function handleSubmit() {
    errors = {};

    editIssuer(entityId, issuer)
      .then(res => console.log("succes", res))
      .catch(err => err.then(res => (errors = res)));
  }
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
