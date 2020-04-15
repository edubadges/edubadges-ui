<script>
  import { navigate } from "svelte-routing";
  import { EntityForm } from "../teachers";
  import { Field, Select, File, TextInput } from "../forms";
  import { createBadgeclass, editBadgeclass } from "../../api";

  export let entityId;
  export let badgeclass = {issuer:{}};
  export let issuers = [];

  const entity = "badgeclass";
  let errors = {};
  let isCreate = !entityId;

  function onSubmit() {
    errors = {};

    let newBadgeclass = {
      ...badgeclass,
      criteria_text: badgeclass.criteriaText,
      criteria_url: badgeclass.criteriaUrl
    };

    if (badgeclass.issuer) {
      newBadgeclass.issuer = badgeclass.issuer.entityId;
    }

    const args = isCreate ? [newBadgeclass] : [entityId, newBadgeclass];
    const apiCall = isCreate ? createBadgeclass : editBadgeclass;

    apiCall(...args)
      .then(res => navigate(`/manage/badgeclass/${entityId}`))
      .catch(err => err.then(({ fields }) => (errors = fields)));
  }
</script>

<EntityForm {entity} issuer={isCreate ? null : badgeclass.issuer} faculty={isCreate ? null : badgeclass.issuer.faculty}
            submit={onSubmit} create={isCreate}>
  <Field {entity} attribute="issuer" errors={errors.issuer}>
    <Select
      bind:value={badgeclass.issuer}
      error={errors.issuer}
      items={issuers} />
  </Field>

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
      bind:value={badgeclass.criteriaText}
      error={errors.criteria_text} />
  </Field>

  <Field {entity} attribute="criteria_url" errors={errors.criteria_url}>
    <TextInput
      bind:value={badgeclass.criteriaUrl}
      error={errors.criteria_url} />
  </Field>
</EntityForm>
