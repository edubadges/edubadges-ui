<script>
    import I18n from "i18n-js";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {EntityForm} from "../teachers";
    import {AddButton, Field, File, Select, TextInput} from "../forms";
    import {createBadgeclass, editBadgeclass} from "../../api";
    import ExpirationSettings from "./ExpirationSettings.svelte";
    import indicator from "../../icons/chevron-down-large.svg";
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
        timeInvestment,
    } from "../extensions/badges/extensions";
    import EctsCreditPoints from "../extensions/badges/EctsCreditPoints.svelte";
    import {setExpirationPeriod} from "../extensions/badges/expiration_period";
    import {trash} from '../../icons';
    import {entityType} from "../../util/entityTypes";
    import {toHttpOrHttps} from "../../util/Url";
    import {CheckBox} from "../index";
    import {translateProperties} from "../../util/utils";
    import MarkdownField from "../forms/MarkdownField.svelte";

    export let entityId;
    export let badgeclass = {extensions: [], issuer: {}, alignments: []};
    export let issuers = [];
    export let mayDelete;
    export let mayEdit;
    export let hasUnrevokedAssertions;
    export let institution = {};
    export let publicInstitutions = [];
    export let action;

    const isCreate = !entityId;
    const isCopy = !entityId && action === "copy";
    const entity = entityType.BADGE_CLASS;

    let expireValueSet = false;
    let loaded = false;
    let processing = false;
    let publicInstitutionsChosen = undefined;

    let showStudyLoad = false;
    let showTimeInvestment = false;
    let isInstitutionMBO = false;
    let showEducationalIdentifiers = false;
    let showAlignment = false;
    let showAddAlignmentButton = true;
    let initialToggle = true;

    onMount(() => {
        if (!badgeclass.alignments) {
            badgeclass.alignments = []
        }
        const allowForInstitutions = institution.awardAllowAllInstitutions || institution.awardAllowedInstitutions.length > 0;
        if (allowForInstitutions) {
            publicInstitutions = institution.awardAllowAllInstitutions ?
                publicInstitutions.filter(ins => ins.identifier !== institution.identifier) :
                publicInstitutions.filter(ins => institution.awardAllowedInstitutions.includes(ins.identifier));
        } else {
            publicInstitutions = [];
        }
        publicInstitutions.forEach(ins => translateProperties(ins));
        if (publicInstitutions.length > 0 && badgeclass.awardAllowedInstitutions.length > 0) {
            publicInstitutionsChosen = publicInstitutions.filter(ins => badgeclass.awardAllowedInstitutions.includes(ins.identifier))
        }

        badgeclass.alignments = badgeclass.alignments.map(alignment => ({
            target_name: alignment.targetName,
            target_url: alignment.targetUrl,
            target_description: alignment.targetDescription,
            target_framework: alignment.targetFramework,
            target_code: alignment.targetCode,
            existing: true
        }));
    });

    if (!isEmpty(badgeclass.alignments)) {
        showAlignment = true;
    }

    let errors = {};

    const languages = [{value: "en_EN", name: I18n.t("language.en_EN")}, {
        value: "nl_NL",
        name: I18n.t("language.nl_NL")
    }];
    let languageSelection = languages[0];
    if (!isCreate || isCopy) {
        languageSelection = languages.find(x => x.value === extensionValue(badgeclass.extensions, language));
    }

    const eqfItems = [...Array(8).keys()].map(i => {
        return {name: `NLQF ${i + 1}`, value: i + 1}
    });

    let extensions = {};

    const addStudyLoad = () => {
        extensions[ects.name] = 2.5;
        showStudyLoad = true;
        extensions[timeInvestment.name] = 0;
        showTimeInvestment = false;
        badgeclass.awardNonValidatedNameAllowed = false;
        if (!isInstitutionMBO) {
            showEducationalIdentifiers = true;
        }
    }

    const removeStudyLoad = () => {
        showStudyLoad = false;
        if (initialToggle) {
            addTimeInvestment();
            initialToggle = false;
        }
    }

    const addTimeInvestment = () => {
        showTimeInvestment = true;
        showStudyLoad = false;
    }

    const removeTimeInvestment = () => {
        extensions[timeInvestment.name] = null;
        showTimeInvestment = false;
    }

    function addEmptyAlignment() {
        showAlignment = true
        badgeclass.alignments.push({
            target_name: "",
            target_url: "",
            target_description: "",
            target_framework: "",
            target_code: ""
        })
        if (badgeclass.alignments.length > 7) {
            showAddAlignmentButton = false
        }
        if (Object.keys(errors).length > 0) {
            if (errors.alignments) {
                errors.alignments.push({})
            }
        }
        badgeclass.alignments = badgeclass.alignments
        badgeclass = badgeclass
    }

    const removeAllAlignment = () => {
        badgeclass.alignments = [];
        showAlignment = false
    }

    const removeAlignment = (i) => {
        badgeclass.alignments.splice(i, 1)
        if (Object.keys(errors).length > 0) {
            errors.alignments.splice(i, 1)
            errors = errors
        }
        if (!badgeclass.alignments || badgeclass.alignments.length == 0) {
            showAlignment = false
        } else if (badgeclass.alignments.length < 8) {
            showAddAlignmentButton = true
        }
        badgeclass.alignments = badgeclass.alignments
    }

    $: if (badgeclass.extensions.length > 0 && !loaded) {
        isInstitutionMBO = institution.institutionType === "MBO";
        const studyLoadValue = extensionValue(badgeclass.extensions, studyLoad);
        let ectsValue = extensionValue(badgeclass.extensions, ects);
        extensions = {
            [language.name]: extensionValue(badgeclass.extensions, language) || "en_EN",
            [ects.name]: ectsValue || (isCreate ? 2.5 : ""),
            [eqf.name]: extensionValue(badgeclass.extensions, eqf) || {name: "NLQF 5", value: 5},
            [learningOutcome.name]: extensionValue(badgeclass.extensions, learningOutcome) || "",
            [educationProgramIdentifier.name]: extensionValue(badgeclass.extensions, educationProgramIdentifier) || "",
            [studyLoad.name]: studyLoadValue || "",
        };
        if (extensions[eqf.name] && typeof extensions[eqf.name] === "number") {
            extensions[eqf.name] = {name: `NLQF ${extensions[eqf.name]}`, value: extensions[eqf.name]}
        }

        if (extensions[educationProgramIdentifier.name]) {
            showEducationalIdentifiers = true;
        }
        if (institution.grondslagFormeel !== null && (ectsValue || extensions[studyLoad.name] || (isCreate && !isCopy))) {
            showStudyLoad = true;
            if (!isInstitutionMBO) {
                showEducationalIdentifiers = true;
            }
        }
        if (!showStudyLoad) {
            const timeInvestmentValue = extensionValue(badgeclass.extensions, timeInvestment) || 0;
            if ((isCreate && !isCopy) || timeInvestmentValue) {
                extensions[timeInvestment.name] = timeInvestmentValue;
                showTimeInvestment = true;
            }
        }
        loaded = true;
    }

    function onSubmit() {
        errors = {};
        processing = true;
        let newBadgeclass = {
            ...badgeclass,
            criteria_text: badgeclass.criteriaText,
            is_private: badgeclass.isPrivate,
            evidence_required: badgeclass.evidenceRequired,
            narrative_required: badgeclass.narrativeRequired,
            award_non_validated_name_allowed: badgeclass.awardNonValidatedNameAllowed,
            criteria_url: toHttpOrHttps(badgeclass.criteriaUrl),
        };
        setExpirationPeriod(newBadgeclass);

        if (!showAlignment) {
            newBadgeclass.alignments = [];
        }
        if (newBadgeclass.alignments) {
            for (let alignment of newBadgeclass.alignments) {
                alignment.target_url = toHttpOrHttps(alignment.target_url)
                delete alignment.existing
            }
        }
        newBadgeclass.extensions = extensionToJson([
            {name: language.name, value: languageSelection.value}
        ]);
        const learningOutcomeValue = extensions[learningOutcome.name];
        if (learningOutcomeValue) {
            const learningOutcomeExt = extensionToJson([
                {name: learningOutcome.name, value: learningOutcomeValue}
            ]);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...learningOutcomeExt}
        }
        if (showEducationalIdentifiers) {
            const educationalIdentifiers = extensionToJson([
                {name: eqf.name, value: extensions[eqf.name].value},
                {
                    name: educationProgramIdentifier.name,
                    value: parseInt(extensions[educationProgramIdentifier.name], 10)
                }]);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...educationalIdentifiers};
        }
        if (showStudyLoad) {
            if (isInstitutionMBO) {
                newBadgeclass.extensions = {
                    ...newBadgeclass.extensions,
                    ...extensionToJson([{name: studyLoad.name, value: parseInt(extensions[studyLoad.name])}])
                }
            } else {
                newBadgeclass.extensions = {
                    ...newBadgeclass.extensions,
                    ...extensionToJson([{name: ects.name, value: extensions[ects.name]}])
                }
            }
            newBadgeclass.formal = true;
        } else {
            newBadgeclass.formal = false;
            if (showTimeInvestment) {
                newBadgeclass.extensions = {
                    ...newBadgeclass.extensions,
                    ...extensionToJson([{name: timeInvestment.name, value: parseInt(extensions[timeInvestment.name])}])
                }
            }
        }
        if (badgeclass.issuer) {
            newBadgeclass.issuer = badgeclass.issuer.entityId;
        }
        newBadgeclass.award_allowed_institutions = (!newBadgeclass.formal && publicInstitutionsChosen) ? publicInstitutionsChosen.map(ins => ins.id) : [];

        const args = isCreate ? [newBadgeclass] : [entityId, newBadgeclass];
        const apiCall = isCreate ? createBadgeclass : editBadgeclass;
        apiCall(...args)
            .then(res => {
                navigate(`/manage/badgeclass/${res.entity_id}`)
            })
            .catch(err => err.then(({fields}) => {
                processing = false;
                errors = fields.error_message;
                if (errors.extensions) {
                    for (const ext of errors.extensions) {
                        const ext_name = ext.error_message.split(' ')[1].split(':')[1];
                        if (ext_name === "StudyLoadExtension") {
                            errors[ext_name] = [{'error_code': 906}];
                        }
                        if (ext_name === "TimeInvestmentExtension") {
                            errors[ext_name] = [{'error_code': 935}];
                        }
                        if (ext_name === "EducationProgramIdentifierExtension") {
                            if (showStudyLoad && !isInstitutionMBO && !extensions[educationProgramIdentifier.name]) {
                                errors[ext_name] = [{'error_code': 934}];
                            } else {
                                errors[ext_name] = [{'error_code': 909}];
                            }
                        }
                    }
                }
            }));
    }
</script>

<style lang="scss">
  div.form {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-row: auto;
    grid-column-gap: 40px;
    grid-row-gap: 16px;
    padding-right: 40px;

  }

  @media (max-width: 820px) {
    div.form {
      grid-template-columns: 100%;
    }
  }

  h4 {
    color: var(--purple);
    padding: var(--ver-padding-s) var(--ver-padding-m);
    font-size: 20px;
    border-left: 3px solid var(--purple-2);
    margin: var(--ver-padding-l) 0;
  }

  span.info {
    display: inline-block;
    margin-bottom: 6px;
    font-size: 14px;
  }

  .deletable-title {
    display: inline-block;
  }

  .add-buttons {
    margin-bottom: 30px;
  }

  .add-button {
    margin-right: 20px;
  }

  .rm-icon-container {
    border: none;
    background-color: inherit;
    color: purple;
    display: inline-block;
    height: 30px;
    width: 30px;
    margin: 0 0 5px 0;
    align-self: center;
    cursor: pointer;
  }

  .disabled {
    cursor: not-allowed !important;
    color: var(--grey-7);
  }
</style>

<EntityForm
        entityTypeName={entity}
        parentId={badgeclass.issuer.entityId}
        {mayDelete}
        mayEdit={true}
        {action}
        {hasUnrevokedAssertions}
        entityId={entityId}
        issuer={badgeclass.issuer}
        faculty={badgeclass.issuer.faculty}
        badgeclass={isCreate ? null : badgeclass}
        badgeclassName={isCreate ? null : badgeclass.name}
        submit={onSubmit}
        create={isCreate}
        {processing}>

    <h4>{I18n.t("models.badgeclass.headers.basicInformation")}</h4>

    <div class="form">

        <Field {entity} attribute="image" errors={errors.image} tipKey="badgeClassImage">
            <File
                    bind:value={badgeclass.image}
                    disabled={!mayEdit && !isCopy}
                    error={errors.image}
                    removeAllowed={false}/>
        </Field>

        <ExpirationSettings
                bind:expireValueSet={badgeclass.expireValueSet}
                disabled={false}
                className=""
                bind:number={badgeclass.expirationDuration}
                bind:period={badgeclass.expirationPeriod}/>

        <Field {entity} attribute="name" errors={errors.name} tipKey="badgeClassName">
            <TextInput bind:value={badgeclass.name} disabled={!mayEdit && !isCopy} error={errors.name}
                       placeholder={I18n.t("placeholders.badgeClass.name")}/>
        </Field>

        <Field {entity} attribute="language" errors={errors.language} tipKey="badgeClassLanguageOfInstruction">
            <Select
                    bind:value={languageSelection}
                    items={languages}
                    disabled={!mayEdit && !isCopy}
                    optionIdentifier="value"
                    clearable={false}/>
        </Field>

        <div style="grid-column: span 1;">
            <Field {entity} attribute="description" errors={errors.description} tipKey="badgeClassDescription">
                <MarkdownField
                        bind:value={badgeclass.description}
                        disabled={!mayEdit && !isCopy}
                />
            </Field>
        </div>
        <div style="grid-column: span 1;">
            <Field {entity} attribute="learningOutcome" errors={errors.learningOutcome}
                   tipKey="badgeClassLearningOutcome">
                <MarkdownField
                        bind:value={extensions[learningOutcome.name]}
                        disabled={!mayEdit && !isCopy}
                />
            </Field>
        </div>

        <Field {entity} attribute="issuer" errors={errors.issuer} tipKey="badgeClassLearningIssuer">
            <Select
                    bind:value={badgeclass.issuer}
                    error={errors.issuer}
                    disabled={issuers.length === 1 || (!mayEdit && !isCopy)}
                    clearable={false}
                    optionIdentifier="entityId"
                    items={issuers}/>
        </Field>

        <Field {entity} attribute="extraOptions">
            <CheckBox
                    value={badgeclass.isPrivate || false}
                    inForm={true}
                    adjustTop={true}
                    label={I18n.t(['models', entity, 'isPrivate'])}
                    tipKey="badgeClassIsPrivate"
                    disabled={hasUnrevokedAssertions}
                    onChange={val => badgeclass.isPrivate = val}/>
            <CheckBox
                    value={badgeclass.evidenceRequired || false}
                    inForm={true}
                    adjustTop={true}
                    label={I18n.t(['models', entity, 'evidenceRequired'])}
                    tipKey="badgeClassEvidenceRequired"
                    onChange={val => badgeclass.evidenceRequired = val}/>
            <CheckBox
                    value={badgeclass.narrativeRequired || false}
                    inForm={true}
                    adjustTop={true}
                    label={I18n.t(['models', entity, 'narrativeRequired'])}
                    tipKey="badgeClassNarrativeRequired"
                    onChange={val => badgeclass.narrativeRequired = val}/>
            <CheckBox
                    value={badgeclass.awardNonValidatedNameAllowed || false}
                    inForm={true}
                    disabled={showStudyLoad}
                    adjustTop={true}
                    label={I18n.t(['models', entity, 'awardNonValidatedNameAllowed'])}
                    tipKey="badgeClassAwardNonValidatedNameAllowed"
                    onChange={val => badgeclass.awardNonValidatedNameAllowed = val}/>
        </Field>
    </div>

    <h4>{I18n.t('models.badgeclass.headers.earningCriteria')}</h4>

    <div class="form">
        <div style="grid-column: span 1;">
            <Field {entity} attribute="criteria_text" errors={errors.criteria_text}
                   tipKey="badgeClassCriteriaRequirements">
                <MarkdownField
                        bind:value={badgeclass.criteriaText}
                        disabled={!mayEdit && !isCopy}
                />
            </Field>
        </div>
        <Field {entity} attribute="criteria_url" errors={errors.criteria_url} tipKey="badgeClassCriteriaUrl">
            <TextInput
                    bind:value={badgeclass.criteriaUrl}
                    disabled={!mayEdit && !isCopy}
                    placeholder={I18n.t("placeholders.badgeClass.criteriaUrl")}
                    error={errors.criteria_url}/>
        </Field>
    </div>

    {#if publicInstitutions.length > 0 && !showStudyLoad}

        <h4>{I18n.t('models.badgeclass.headers.allowedInstituions')}</h4>

        <Field {entity} attribute="award_allowed_institutions" errors={errors.award_allowed_institutions}
               tipKey="badgeclassAwardAllowedInstitutions">
            <Select
                    bind:value={publicInstitutionsChosen}
                    items={publicInstitutions}
                    isMulti={true}
                    customIndicator={indicator}
                    showIndicator={false}
                    showChevron={true}
                    clearable={true}
                    placeholder={I18n.t("placeholders.institution.allowedInstitutions")}
                    optionIdentifier="id"
            />
        </Field>
    {/if}

    {#if showStudyLoad}
        <div style="display: flex">
            <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.studyLoad')}</h4></div>
            {#if institution.grondslagInformeel !== null}
                {#if mayEdit}
                    <button class="rm-icon-container" on:click={removeStudyLoad}>{@html trash}</button>
                {:else}
                    <button class="rm-icon-container disabled">{@html trash}</button>
                {/if}
            {/if}
        </div>

        <div class="form">
            {#if isInstitutionMBO}
                <Field {entity} attribute="hours" errors={errors.StudyLoadExtension} tipKey="badgeClassStudyLoadNumber">
                    <TextInput
                            type="number"
                            bind:value={extensions[studyLoad.name]}
                            error={errors.StudyLoadExtension}
                            disabled={!mayEdit && !isCopy}
                            placeholder={I18n.t("placeholders.badgeClass.studyLoad")}/>
                </Field>
            {:else}
                <Field {entity} attribute="ects.creditPoints" errors={errors.ectsLong} tipKey="badgeClassStudyLoadEcts">
                    <EctsCreditPoints
                            bind:ectsValue={extensions[ects.name]}
                            disabled={!mayEdit && !isCopy}
                    />
                </Field>
            {/if}
        </div>
    {/if}

    {#if showTimeInvestment}
        <div style="display: flex">
            <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.timeInvestment')}</h4></div>
            {#if mayEdit}
                <button class="rm-icon-container" on:click={removeTimeInvestment}>{@html trash}</button>
            {:else}
                <button class="rm-icon-container disabled">{@html trash}</button>
            {/if}
        </div>

        <div class="form">
            <Field {entity} attribute="hours" errors={errors.TimeInvestmentExtension}
                   tipKey="badgeClassTimeInvestmentNumber">
                <TextInput
                        type="number"
                        bind:value={extensions[timeInvestment.name]}
                        error={errors.TimeInvestmentExtension}
                        disabled={!mayEdit && !isCopy}
                        placeholder={I18n.t("placeholders.badgeClass.timeInvestment")}/>
            </Field>
        </div>
    {/if}

    {#if showEducationalIdentifiers}
        <div style="display: flex">
            <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.educationalIdentifiers')}</h4></div>
            {#if mayEdit && (!showStudyLoad || isInstitutionMBO)}
                <button class="rm-icon-container"
                        on:click={() => showEducationalIdentifiers = false}>{@html trash}</button>
            {/if}
        </div>

        <div class="form">
            <Field
                    {entity}
                    attribute="educationProgramIdentifierLong"
                    errors={errors.EducationProgramIdentifierExtension}
                    tipKey="badgeClassProgrammeIdentifier">
                <TextInput
                        type="text"
                        bind:value={extensions[educationProgramIdentifier.name]}
                        disabled={!mayEdit && !isCopy}
                        placeholder={I18n.t("placeholders.badgeClass.educationProgramIdentifier")}
                        error={errors.EducationProgramIdentifierExtension}/>
                <span class="info">
          {@html I18n.t('models.badgeclass.info.educationProgramIdentifier')}
        </span>
            </Field>

            <Field {entity} attribute="eqf" errors={errors.eqf} tipKey="badgeClassNLQFLevel">
                <Select
                        bind:value={extensions[eqf.name]}
                        items={eqfItems}
                        disabled={!mayEdit && !isCopy}
                        optionIdentifier="value"
                        clearable={false}/>
                <span class="info">
          {@html I18n.t('models.badgeclass.info.eqf')}
        </span>
            </Field>
        </div>
    {/if}

    {#if showAlignment}
        <div style="display: flex">
            <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.alignment')}</h4></div>
            {#if mayEdit}
                <button class="rm-icon-container" on:click={() => removeAllAlignment()}>{@html trash}</button>
            {/if}
        </div>

        {#each badgeclass.alignments as alignment, i}
            {#if (mayEdit || !alignment.existing) && badgeclass.alignments.length > 1}
                <div>
                    <button style="float:right;" class="rm-icon-container"
                            on:click={() => removeAlignment(i) }>{@html trash}</button>
                </div>
            {/if}
            <div class="form">
                <Field {entity} attribute="alignmentName"
                       errors={errors.alignments? errors.alignments[i].target_name: [] }
                       tipKey="badgeClassRelatedFrameworkName">
                    <TextInput
                            bind:value={alignment.target_name}
                            disabled={(!mayEdit && alignment.existing) && !isCopy}
                            error={errors.target_name}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentName")}
                    />
                </Field>
                <Field {entity} attribute="alignmentFramework"
                       errors={errors.alignments? errors.alignments[i].target_framework: [] }
                       tipKey="badgeClassRelatedFrameworkFramework">
                    <TextInput
                            bind:value={alignment.target_framework}
                            disabled={(!mayEdit && alignment.existing) && !isCopy}
                            error={errors.target_framework}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentFramework")}
                    />
                </Field>
                <Field {entity} attribute="alignmentUrl" errors={errors.alignments? errors.alignments[i].target_url: []}
                       tipKey="badgeClassRelatedFrameworkURL">
                    <TextInput
                            bind:value={alignment.target_url}
                            disabled={(!mayEdit && alignment.existing) && !isCopy}
                            error={errors.target_url}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentUrl")}
                    />
                </Field>
                <Field {entity} attribute="alignmentCode"
                       errors={errors.alignments? errors.alignments[i].target_code: []}
                       tipKey="badgeClassRelatedFrameworkCode">
                    <TextInput
                            bind:value={alignment.target_code}
                            disabled={(!mayEdit && alignment.existing) && !isCopy}
                            error={errors.target_code}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentCode")}
                    />
                </Field>
                <div style="grid-column: span 1;">
                    <Field {entity} attribute="alignmentDescription"
                           errors={errors.alignments? errors.alignments[i].target_description: []}
                           tipKey="badgeClassRelatedFrameworkDescription">
                        <MarkdownField
                                bind:value={alignment.target_description}
                                disabled={(!mayEdit && alignment.existing) && !isCopy}
                        />
                    </Field>
                </div>
            </div>
        {/each}
        <span class="add-button">
        <AddButton
                text={I18n.t('models.badgeclass.addButtons.alignmentAddition')}
                handleClick={() => addEmptyAlignment()}
                visibility={showAddAlignmentButton}
                disabled={false}
        />
      </span>
    {/if}

    {#if !(showStudyLoad && showEducationalIdentifiers && showAlignment)}
        <h4>{I18n.t('models.badgeclass.headers.additionalSections')}</h4>

        <div class="add-buttons">
      <span class="add-button">
        <AddButton
                text={I18n.t('models.badgeclass.addButtons.educationalIdentifiers')}
                handleClick={() => showEducationalIdentifiers = true}
                visibility={!showEducationalIdentifiers}
                disabled={!mayEdit && !isCopy}
        />
      </span>
            {#if institution.grondslagFormeel !== null}
        <span class="add-button">
          <AddButton
                  text={I18n.t('models.badgeclass.addButtons.studyLoad')}
                  handleClick={addStudyLoad}
                  visibility={!showStudyLoad}
                  disabled={!mayEdit && !isCopy}
          />
        </span>
            {/if}
            {#if !showTimeInvestment && institution.grondslagInformeel !== null}
        <span class="add-button">
          <AddButton
                  text={I18n.t('models.badgeclass.addButtons.timeInvestment')}
                  handleClick={addTimeInvestment}
                  visibility={!showTimeInvestment}
                  disabled={!mayEdit && !isCopy}
          />
        </span>
            {/if}
            <span class="add-button">
        <AddButton
                text={I18n.t('models.badgeclass.addButtons.alignment')}
                handleClick={() => addEmptyAlignment()}
                visibility={!showAlignment}
                disabled={false}
        />
      </span>
        </div>
    {/if}
</EntityForm>
