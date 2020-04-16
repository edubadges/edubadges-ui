<script>
  import {navigate} from "svelte-routing";
  import {EntityForm} from "../teachers";
  import {Field, Select, File, TextInput} from "../forms";
  import {createBadgeclass, editBadgeclass} from "../../api";
  import ExpirationSettings from "./ExpirationSettings.svelte";

  export let entityId;
  export let badgeclass = {};
  export let issuers = [];

  let expireValueSet = false;

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
      .catch(err => err.then(({fields}) => (errors = fields)));
  }
</script>

<style>

  div.form {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-row: auto;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  h4 {
    border-left: 2px solid var(--color-primary-purple);
    padding: var(--ver-padding-s);
    margin: var(--ver-padding-l) 0;
  }

</style>

<EntityForm
  {entity}
  issuer={isCreate ? null : badgeclass.issuer}
  faculty={isCreate ? null : badgeclass.issuer.faculty}
  badgeclassName={isCreate ? null : badgeclass.name}
  submit={onSubmit}
  create={isCreate}>
  <h4>Basic information</h4>
  <div class="form">

    <Field {entity} attribute="image" errors={errors.image}>
      <File bind:value={badgeclass.image} error={errors.image} removeAllowed={false}/>
    </Field>

    <ExpirationSettings bind:expireValueSet={expireValueSet} disabled={false} className=""/>

    <Field {entity} attribute="name" errors={errors.name}>
      <TextInput bind:value={badgeclass.name} error={errors.name}/>
    </Field>

    <Field {entity} attribute="description" errors={errors.description}>
      <TextInput
        bind:value={badgeclass.description}
        error={errors.description}
        area/>
    </Field>

    <Field {entity} attribute="issuer" errors={errors.issuer}>
      <Select
        bind:value={badgeclass.issuer}
        error={errors.issuer}
        disabled={true}
        items={issuers}/>
    </Field>

  </div>
  <h4>Earning criteria</h4>

  <div class="form">


    <Field {entity} attribute="criteria_text" errors={errors.criteria_text}>
      <TextInput
        area
        bind:value={badgeclass.criteriaText}
        error={errors.criteria_text}/>
    </Field>

    <Field {entity} attribute="criteria_url" errors={errors.criteria_url}>
      <TextInput
        bind:value={badgeclass.criteriaUrl}
        error={errors.criteria_url}/>
    </Field>
  </div>
</EntityForm>
