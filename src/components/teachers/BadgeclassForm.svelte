<script>
  import I18n from "i18n-js";
  import { navigate } from "svelte-routing";
  import { EntityForm } from "../teachers";
  import { Field, Select, File, TextInput, AddButton } from "../forms";
  import { createBadgeclass, editBadgeclass } from "../../api";
  import ExpirationSettings from "./ExpirationSettings.svelte";
  import {isEmpty} from "lodash";
  import {
    ects,
    educationProgramIdentifier,
    eqf,
    extensionToJson,
    extensionValue,
    language,
    learningOutcome,
    studyLoad,
  } from "../extensions/badges/extensions";
  import EctsCreditPoints from "../extensions/badges/EctsCreditPoints.svelte";
  import { setExpirationPeriod } from "../extensions/badges/expiration_period";
  import { addAlignment } from "../extensions/badges/alignment";

  export let entityId;
  export let badgeclass = {extensions: []};
  export let issuers = [];

  let expireValueSet = false;
  let loaded = false;

  let showStudyLoad = false;
  let showEducationalIdentifiers = false;
  let showAlignment = false;

  let alignment = {
    target_name: "",
    target_url: "",
    target_framework: "",
    target_code: ""
  };

  $: if (!isEmpty(badgeclass.alignments)) {
    alignment = {
      target_name: badgeclass.alignments[0].targetName,
      target_url: badgeclass.alignments[0].targetUrl,
      target_framework: badgeclass.alignments[0].targetFramework,
      target_code: badgeclass.alignments[0].targetCode
    };
    showAlignment = true;
  }

  let EctsOrHours = [
      {name: I18n.t(['models', 'badgeclass', 'ects','creditPoints']), value:'creditPoints'},
      {name: I18n.t(['models', 'badgeclass', 'ects','hours']), value:'hours'},
  ];
  let EctsOrHoursSelection = EctsOrHours[0];

  const entity = "badgeclass";
  let errors = {};
  const isCreate = !entityId;

  const languages = [{name: "Nl_Nl"}, {name: "En_En"}];

  const eqfItems = [...Array(8).keys()].map(i => {
    return {name: `EQF ${i + 1}`, value: i}
  });

  let extensions = {};

  $: if (badgeclass.extensions.length > 0 && !loaded) {
    extensions = {
      [language.name]: extensionValue(badgeclass.extensions, language) || {name: "En_En"},
      [ects.name]: extensionValue(badgeclass.extensions, ects) || 2.5,
      [eqf.name]: extensionValue(badgeclass.extensions, eqf) || {name: "EQF 6", value: 6},
      [learningOutcome.name]: extensionValue(badgeclass.extensions, learningOutcome) || "",
      [educationProgramIdentifier.name]: extensionValue(badgeclass.extensions, educationProgramIdentifier) || "",
      [studyLoad.name]: extensionValue(badgeclass.extensions, studyLoad) || "",
    };
    if (extensions[eqf.name] && typeof extensions[eqf.name] === "number") {
      extensions[eqf.name] = {name: `EQF ${extensions[eqf.name]}`, value: extensions[eqf.name]}
    }
    loaded = true;
  }

  function onSubmit() {
    errors = {};

    let newBadgeclass = {
      ...badgeclass,
      criteria_text: badgeclass.criteriaText,
      criteria_url: badgeclass.criteriaUrl,
    };
    setExpirationPeriod(newBadgeclass);
    addAlignment(newBadgeclass, alignment);
    newBadgeclass.extensions = extensionToJson([
      {name: language.name, value: extensions[language.name].name},
      {name: ects.name, value: extensions[ects.name]},
      {name: eqf.name, value: extensions[eqf.name].value},
      {name: learningOutcome.name, value: extensions[learningOutcome.name]},
      {
        name: educationProgramIdentifier.name,
        value: parseInt(extensions[educationProgramIdentifier.name], 10)
      },
      {name: studyLoad.name, value: parseInt(extensions[studyLoad.name])}
    ]);
    if (badgeclass.issuer) {
      newBadgeclass.issuer = badgeclass.issuer.entityId;
    }
    const args = isCreate ? [newBadgeclass] : [entityId, newBadgeclass];
    const apiCall = isCreate ? createBadgeclass : editBadgeclass;

    apiCall(...args)
      .then(res => {
        navigate(`/manage/badgeclass/${res.entity_id}`)
      })
      .catch(err => err.then(({fields}) => (errors = fields)));
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

  .deletable-title{
    display: inline-block;
  }

  .add-buttons {
    margin-bottom: 30px;
  }

  .add-button {
    margin-right: 20px;
  }
</style>

<EntityForm
  {entity}
  issuer={isCreate ? null : badgeclass.issuer}
  faculty={isCreate ? null : badgeclass.issuer.faculty}
  badgeclass={isCreate ? null : badgeclass}
  badgeclassName={isCreate ? null : badgeclass.name}
  submit={onSubmit}
  create={isCreate}>

  <h4>{I18n.t("models.badgeclass.headers.basicInformation")}</h4>

  <div class="form">

    <Field {entity} attribute="image" errors={errors.image}>
      <File
        bind:value={badgeclass.image}
        error={errors.image}
        removeAllowed={false}/>
    </Field>

    <ExpirationSettings
      bind:expireValueSet={badgeclass.expireValueSet}
      disabled={false}
      className=""
      bind:number={badgeclass.expirationDuration}
      bind:period={badgeclass.expirationPeriod}/>

    <Field {entity} attribute="name" errors={errors.name}>
      <TextInput bind:value={badgeclass.name} error={errors.name}/>
    </Field>

    <Field {entity} attribute="language" errors={errors.language}>
      <Select
        bind:value={extensions[language.name]}
        items={languages}
        optionIdentifier="name"
        clearable={false}/>
    </Field>

    <Field {entity} attribute="description" errors={errors.description}>
      <TextInput
        bind:value={badgeclass.description}
        error={errors.description}
        area/>
    </Field>

    <Field {entity} attribute="learningOutcome" errors={errors.learningOutcome}>
      <TextInput
        bind:value={extensions[learningOutcome.name]}
        error={errors.learningOutcome}
        area/>
    </Field>

    <Field {entity} attribute="issuer" errors={errors.issuer}>
      <Select
        bind:value={badgeclass.issuer}
        error={errors.issuer}
        disabled={!isCreate}
        items={issuers}/>
    </Field>

  </div>

  <h4>{I18n.t('models.badgeclass.headers.earningCriteria')}</h4>

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

  {#if showEducationalIdentifiers}
    <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.educationalIdentifiers')}</h4></div><button on:click={() => showEducationalIdentifiers = false}>rm</button>

    <div class="form">
      <Field
        {entity}
        attribute="educationProgramIdentifierLong"
        errors={errors.educationProgramIdentifierLong}>
        <TextInput
          type="number"
          max="999999999999999"
          bind:value={extensions[educationProgramIdentifier.name]}
          error={errors.educationProgramIdentifierLong}/>
        <span class="info">
          {@html I18n.t('models.badgeclass.info.educationProgramIdentifier')}
        </span>
      </Field>

      <Field {entity} attribute="eqf" errors={errors.eqf}>
        <Select
          bind:value={extensions[eqf.name]}
          items={eqfItems}
          optionIdentifier="value"
          clearable={false}/>
        <span class="info">
          {@html I18n.t('models.badgeclass.info.eqf')}
        </span>
      </Field>
    </div>
  {/if}

  {#if showStudyLoad}
    <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.studyLoad')}</h4></div><button on:click={() => showStudyLoad = false}>rm</button>

    <div class="form">
      <Field {entity} attribute="typeOfStudyLoad" errors={errors.type}>
        <Select
            bind:value={EctsOrHoursSelection}
            items={EctsOrHours}
            optionIdentifier="value"
            clearable={false}
        />
      </Field>

      {#if EctsOrHoursSelection.value === 'creditPoints'}
        <Field {entity} attribute="amount" errors={errors.ectsLong}>
          <EctsCreditPoints bind:ectsValue={extensions[ects.name]}/>
        </Field>
      {:else}
        <Field {entity} attribute="amount" errors={errors.ectsLong}>
          <TextInput bind:ectsValue={extensions[ects.name]}/>
        </Field>
      {/if}
    </div>
  {/if}


  {#if showAlignment}
    <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.alignment')}</h4></div><button on:click={() => showAlignment = false}>rm</button>
    <div class="form">
      <Field {entity} attribute="alignmentName">
        <TextInput
            bind:value={alignment.target_name}
            error={errors.alignmentName}
            area
          />
      </Field>
      <Field {entity} attribute="alignmentFramework">
        <TextInput
            bind:value={alignment.target_framework}
            error={errors.alignment_framework}
            area
        />
      </Field>
      <Field {entity} attribute="alignmentUrl">
        <TextInput
            bind:value={alignment.target_url}
            error={errors.alignment_framework}
            area
        />
      </Field>
      <Field {entity} attribute="alignmentCode">
        <TextInput
            bind:value={alignment.target_code}
            error={errors.alignmentCode}
            area
        />
      </Field>
    </div>
  {/if}

  {#if !(showStudyLoad && showEducationalIdentifiers && showAlignment)}
    <h4>{I18n.t('models.badgeclass.headers.additionalSections')}</h4>
    <div class="add-buttons">
      <span class="add-button">
        <AddButton
            text={I18n.t('models.badgeclass.addButtons.educationalIdentifiers')}
            handleClick={() => showEducationalIdentifiers = true}
            visibility={!showEducationalIdentifiers}
        />
      </span>
      <span class="add-button">
        <AddButton
            text={I18n.t('models.badgeclass.addButtons.studyLoad')}
            handleClick={() => showStudyLoad = true}
            visibility={!showStudyLoad}
        />
      </span>
      <span class="add-button">
        <AddButton
            text={I18n.t('models.badgeclass.addButtons.alignment')}
            handleClick={() => showAlignment = true}
            visibility={!showAlignment}
        />
      </span>
    </div>
  {/if}
</EntityForm>
