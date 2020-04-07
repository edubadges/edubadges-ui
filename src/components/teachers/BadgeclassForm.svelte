<script>
  import { EntityForm } from "../teachers";
  import { Field, Select, File, TextInput } from "../forms";

  export let create;
  export let badgeclass = {};
  export let issuers = [];
  export let errors = {};
  export let handleSubmit;

  const entity = "badgeclass";
</script>

<EntityForm {entity} submit={handleSubmit} {create}>
  {#if create}
    <Field {entity} attribute="issuer" errors={errors.issuer}>
      <Select
        bind:value={badgeclass.issuer}
        error={errors.issuer}
        items={issuers} />
    </Field>
  {/if}

  <Field {entity} attribute="image" errors={errors.image}>
    <File bind:value={badgeclass.image} error={errors.image} />
  </Field>

  <Field {entity} attribute="name" errors={errors.name}>
    <TextInput bind:value={badgeclass.name} error={errors.name} />
  </Field>

  <Field {entity} attribute="description" errors={errors.description}>
    <TextInput
      bind:value={badgeclass.description}
      error={errors.description}
      area />
  </Field>

  <Field {entity} attribute="criteria_text" errors={errors.criteria_text}>
    <TextInput
      bind:value={badgeclass.criteria_text}
      error={errors.criteria_text} />
  </Field>

  <Field {entity} attribute="criteria_url" errors={errors.criteria_url}>
    <TextInput
      bind:value={badgeclass.criteria_url}
      error={errors.criteria_url} />
  </Field>
</EntityForm>
