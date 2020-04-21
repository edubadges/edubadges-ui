<script>
  import I18n from "i18n-js";
  import { navigate } from "svelte-routing";
  import { EntityForm } from "../teachers";
  import { Field, Select, File, TextInput } from "../forms";
  import { createBadgeclass, editBadgeclass } from "../../api";
  import ExpirationSettings from "./ExpirationSettings.svelte";
  import {
    ects,
    educationProgramIdentifier,
    eqf,
    extensionToJson,
    extensionValue,
    language,
    learningOutcome
  } from "../extensions/badges/extensions";
  import EctsCreditPoints from "../extensions/badges/EctsCreditPoints.svelte";
  import { setExpirationPeriod } from "../extensions/badges/expiration_period";

  export let entityId;
  export let badgeclass = { extensions: [] };
  export let issuers = [];

  let expireValueSet = false;
  let loaded = false;

  const entity = "badgeclass";
  let errors = {};
  const isCreate = !entityId;

  const languages = [{ name: "Nl_Nl" }, { name: "En_En" }];

  const eqfItems = [...Array(8).keys()].map(i => ({ name: `EQF ${i + 1}` }));

  let extensions = {};

  $: if (badgeclass.extensions.length > 0 && !loaded)  {
    extensions = {
      [language.name]: extensionValue(badgeclass.extensions, language) || {name: "En_En"},
      [ects.name]: extensionValue(badgeclass.extensions, ects) || 2.5,
      [eqf.name]: extensionValue(badgeclass.extensions, eqf) || {name: "EQF 6"},
      [learningOutcome.name]: extensionValue(badgeclass.extensions, learningOutcome) || "",
      [educationProgramIdentifier.name]: extensionValue(badgeclass.extensions, educationProgramIdentifier) || ""
    }
    loaded = true;
  }

  function onSubmit() {
    errors = {};

    let newBadgeclass = {
      ...badgeclass,
      criteria_text: badgeclass.criteriaText,
      criteria_url: badgeclass.criteriaUrl
    };
    setExpirationPeriod(newBadgeclass);
    newBadgeclass.extensions = extensionToJson([
      { name: language.name, value: extensions[language.name].name },
      { name: ects.name, value: extensions[ects.name] },
      { name: eqf.name, value: extensions[eqf.name].name },
      { name: learningOutcome.name, value: extensions[learningOutcome.name] },
      {
        name: educationProgramIdentifier.name,
        value: extensions[educationProgramIdentifier.name]
      }
    ]);

    if (badgeclass.issuer) {
      newBadgeclass.issuer = badgeclass.issuer.entityId;
    }
    const args = isCreate ? [newBadgeclass] : [entityId, newBadgeclass];
    const apiCall = isCreate ? createBadgeclass : editBadgeclass;

    apiCall(...args)
      .then(res => navigate(`/manage/badgeclass/${res.entityId}`))
      .catch(err => err.then(({ fields }) => (errors = fields)));
  }
</script>

<style>
  div.form {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-row: auto;
    grid-column-gap: 40px;
    grid-row-gap: 20px;
    padding-right: 40px;
  }

  @media (max-width: 820px) {
    div.form {
      grid-template-columns: 100%;
    }
  }

  h4 {
    color: var(--purple);
    border-left: 3px solid var(--purple-2);
    padding: var(--ver-padding-s);
    margin: var(--ver-padding-l) 0;
  }

  span.info {
    display: inline-block;
    margin-bottom: 6px;
    font-size: 14px;
  }
</style>

<EntityForm
  {entity}
  issuer={isCreate ? null : badgeclass.issuer}
  faculty={isCreate ? null : badgeclass.issuer.faculty}
  badgeclassName={isCreate ? null : badgeclass.name}
  submit={onSubmit}
  create={isCreate}>

  <h4>{I18n.t("models.badgeclass.headers.basicInformation")}</h4>

  <div class="form">

    <Field {entity} attribute="image" errors={errors.image}>
      <File
        bind:value={badgeclass.image}
        error={errors.image}
        removeAllowed={false} />
    </Field>

    <ExpirationSettings
      bind:expireValueSet={badgeclass.expireValueSet}
      disabled={false}
      className=""
      bind:number={badgeclass.expirationDuration}
      bind:period={badgeclass.expirationPeriod} />

    <Field {entity} attribute="name" errors={errors.name}>
      <TextInput bind:value={badgeclass.name} error={errors.name} />
    </Field>

    <Field {entity} attribute="language" errors={errors.language}>
      <Select
        bind:value={extensions[language.name]}
        items={languages}
        optionIdentifier="name"
        clearable={false} />
    </Field>

    <Field {entity} attribute="description" errors={errors.description}>
      <TextInput
        bind:value={badgeclass.description}
        error={errors.description}
        area />
    </Field>

    <Field {entity} attribute="learningOutcome" errors={errors.learningOutcome}>
      <TextInput
        bind:value={extensions[learningOutcome.name]}
        error={errors.learningOutcome}
        area />
    </Field>

    <Field {entity} attribute="issuer" errors={errors.issuer}>
      <Select
        bind:value={badgeclass.issuer}
        error={errors.issuer}
        disabled={!isCreate}
        items={issuers} />
    </Field>

  </div>

  <h4>{I18n.t('models.badgeclass.headers.earningCriteria')}</h4>

  <div class="form">

    <Field {entity} attribute="criteria_text" errors={errors.criteria_text}>
      <TextInput
        area
        bind:value={badgeclass.criteriaText}
        error={errors.criteria_text} />
    </Field>

    <Field {entity} attribute="criteria_url" errors={errors.criteria_url}>
      <TextInput
        bind:value={badgeclass.criteriaUrl}
        error={errors.criteria_url} />
    </Field>
  </div>

  <h4>{I18n.t('models.badgeclass.headers.creditPoints')}</h4>

  <Field {entity} attribute="ectsLong" errors={errors.ectsLong}>
    <EctsCreditPoints bind:ectsValue={extensions[ects.name]} />
  </Field>

  <div class="form">

    <Field
      {entity}
      attribute="educationProgramIdentifierLong"
      errors={errors.educationProgramIdentifierLong}>
      <TextInput
        bind:value={extensions[educationProgramIdentifier.name]}
        error={errors.educationProgramIdentifierLong} />
      <span class="info">
        {@html I18n.t('models.badgeclass.info.educationProgramIdentifier')}
      </span>
    </Field>

    <Field {entity} attribute="eqf" errors={errors.eqf}>
      <Select
        bind:value={extensions[eqf.name]}
        items={eqfItems}
        optionIdentifier="name"
        clearable={false} />
      <span class="info">
        {@html I18n.t('models.badgeclass.info.eqf')}
      </span>
    </Field>

  </div>
</EntityForm>
