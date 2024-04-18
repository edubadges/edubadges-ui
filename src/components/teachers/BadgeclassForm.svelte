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
    import {translateProperties} from "../../util/utils";
    import MarkdownField from "../forms/MarkdownField.svelte";
    import {microCredentialsFramework} from "../../util/microcredentials";
    import {markDownTemplate} from "../../util/markDownTemplate";
    import MarkDownExample from "./badgeclass/MarkDownExample.svelte";
    import Switch from "../forms/Switch.svelte";
    import {badgeClassTypes} from "../../util/badgeClassTypes";
    import StudyLoad from "../extensions/badges/StudyLoad.svelte";
    import {isRequired} from "../../util/requiredAttributes";
    import PreviewBadgeClassModal from "./PreviewBadgeClassModal.svelte";

    export let entityId;
    export let badgeclass = {extensions: [], issuer: {}, alignments: [], criteriaText: ""};
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
    let internalTags = undefined;

    let showStudyLoad = false;
    let showTimeInvestment = false;
    let isInstitutionMBO = false;
    let showEducationalIdentifiers = false;
    let showProgrammeIdentifier = false;
    let showAddAlignmentButton = true;
    let participationOptions = [];
    let assessmentOptions = [];
    let stackableOptions = [];
    let showMicroCredentialFramework = false;

    let errors = {};
    let extensions = {};
    let initial = true;
    let showPreview = false;
    let previewBadgeCopy = {};

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
        if (badgeclass.tags && badgeclass.tags.length > 0) {
            internalTags = (institution.tags || []).filter(tag => badgeclass.tags.some(t => parseInt(t.id, 10) === parseInt(tag.id, 10)))
        }
        badgeclass.alignments = badgeclass.alignments.map(alignment => ({
            target_name: alignment.targetName,
            target_url: alignment.targetUrl,
            target_description: alignment.targetDescription,
            target_framework: alignment.targetFramework,
            target_code: alignment.targetCode,
            existing: true
        }));
        const participationTranslation = I18n.translations[I18n.locale].newBadgeClassForm.form.participation.options;
        participationOptions = Object.keys(participationTranslation).map(key => ({
            value: key,
            name: participationTranslation[key]
        }));

        const assessmentTranslation = I18n.translations[I18n.locale].newBadgeClassForm.form.assessment.options;
        assessmentOptions = Object.keys(assessmentTranslation).map(key => ({
            value: key,
            name: assessmentTranslation[key]
        }));

        const stackableTranslation = I18n.translations[I18n.locale].newBadgeClassForm.form.stackable;
        stackableOptions = Object.keys(stackableTranslation).map(key => ({
            value: key,
            name: stackableTranslation[key]
        }));

        if (badgeclass.badgeClassType === badgeClassTypes.MICRO_CREDENTIAL) {
            badgeclass.isMicroCredentials = true;
            if (isCreate) {
                badgeclass.alignments = [{
                    target_name: microCredentialsFramework.name,
                    target_url: microCredentialsFramework.url,
                    target_description: microCredentialsFramework.description,
                    target_framework: microCredentialsFramework.framework,
                    target_code: microCredentialsFramework.code,
                }];
            }
        } else if (/*badgeclass.badgeClassType === badgeClassTypes.REGULAR &&*/ isCreate) {
            badgeclass.alignments = [{
                target_name: "",
                target_url: "",
                target_description: "",
                target_framework: "",
                target_code: "",
            }];
        }

        if (!isCreate) {
            const stackable = badgeclass.stackable ? "stackable" : "notStackable";
            badgeclass.stackable = stackableOptions.find(opt => opt.value === stackable);
        }
    });

    const performValidation = () => {
        const allErrors = constructErrors(badgeclass, extensions);
        //Hack for micro_credentials, that has an option between StudyLoadExtension and ECTSExtension
        if (badgeclass.badgeClassType === badgeClassTypes.MICRO_CREDENTIAL) {
            if (showStudyLoad) {
                delete allErrors[`extensions.${ects.name}`]
            } else {
                delete allErrors[`extensions.${studyLoad.name}`]
            }
        }
        return allErrors;
    }

    const languages = [
        {value: "en_EN", name: I18n.t("language.en_EN")},
        {value: "nl_NL", name: I18n.t("language.nl_NL")},
        {value: "de_DE", name: I18n.t("language.de_DE")},
        {value: "fr_FR", name: I18n.t("language.fr_FR")},
        {value: "es_ES", name: I18n.t("language.es_ES")},
    ];
    let languageSelection = languages[0];
    if (!isCreate || isCopy) {
        languageSelection = languages.find(x => x.value === extensionValue(badgeclass.extensions, language));
    } else {
        const language = institution.defaultLanguage;
        languageSelection = languages.find(x => x.value === language);
    }

    const eqfItems = [...Array(8).keys()].map(i => {
        return {name: `EQF ${i + 1}`, value: i + 1}
    });

    const markDownExample = attribute => {
        badgeclass[attribute] = markDownTemplate;
    }

    const addStudyLoad = () => {
        extensions[ects.name] = badgeclass.isMicroCredentials ? 5 : 2.5;
        showStudyLoad = true;
        extensions[timeInvestment.name] = 0;
        showTimeInvestment = false;
        badgeclass.awardNonValidatedNameAllowed = false;
        let eqfValue = extensionValue(badgeclass.extensions, eqf);
        if (isEmpty(eqfValue)) {
            eqfValue = {name: "EQF 5", value: 5};
        } else {
            eqfValue = eqfItems.find(item => item.value === eqfValue)
        }
        extensions[eqf.name] = eqfValue;
        if (!isInstitutionMBO) {
            showEducationalIdentifiers = true;
            if (isEmpty(extensions[educationProgramIdentifier.name])) {
                extensions[educationProgramIdentifier.name] = [""];
            }
        }
    }

    const switchStudyLoad = val => {
        showStudyLoad = !val;
        // if (showStudyLoad)

    }

    const addEducationProgramIdentifier = () => {
        const newValue = extensions[educationProgramIdentifier.name] || [];
        newValue.push("")
        extensions[educationProgramIdentifier.name] = newValue;
    }

    const removeEducationProgramIdentifier = index => {
        const existingValue = extensions[educationProgramIdentifier.name] || [];
        extensions[educationProgramIdentifier.name] = existingValue.filter((val, i) => i !== index);
    }

    const addEmptyAlignment = () => {
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

    const mayRemoveAlignment = alignment => {
        return mayEdit && alignment.target_name !== microCredentialsFramework.name;
    }

    const removeAlignment = (i) => {
        badgeclass.alignments.splice(i, 1)
        if (Object.keys(errors).length > 0) {
            errors.alignments.splice(i, 1)
            errors = errors
        }
        if (badgeclass.alignments.length < 8) {
            showAddAlignmentButton = true
        }
        badgeclass.alignments = badgeclass.alignments
    }

    $: if (badgeclass.extensions.length > 0 && !loaded) {
        isInstitutionMBO = institution.institutionType === "MBO";
        const studyLoadValue = extensionValue(badgeclass.extensions, studyLoad);
        const ectsValue = extensionValue(badgeclass.extensions, ects);
        let eqfValue = extensionValue(badgeclass.extensions, eqf);
        if (isCreate && !isCopy) {
            eqfValue = {name: "EQF 5", value: 5};
        } else if (eqfValue !== null) {
            eqfValue = eqfItems.find(item => item.value === eqfValue)
        }
        extensions = {
            [language.name]: extensionValue(badgeclass.extensions, language) || "en_EN",
            [ects.name]: ectsValue || (isCreate ? (badgeclass.isMicroCredentials ? 5 : 2.5) : ""),
            [eqf.name]: eqfValue,
            [learningOutcome.name]: extensionValue(badgeclass.extensions, learningOutcome) || "",
            [educationProgramIdentifier.name]: extensionValue(badgeclass.extensions, educationProgramIdentifier) || (isCreate && !isCopy ? [""] : []),
            [studyLoad.name]: studyLoadValue || "",
        };
        if (extensions[eqf.name] && typeof extensions[eqf.name] === "number") {
            extensions[eqf.name] = {name: `EQF ${extensions[eqf.name]}`, value: extensions[eqf.name]}
        }
        if (!isEmpty(extensions[educationProgramIdentifier.name])) {
            showEducationalIdentifiers = true;
        }
        if (institution.grondslagFormeel !== null && (ectsValue || extensions[studyLoad.name] || (isCreate && !isCopy))) {
            showStudyLoad = true;
            if (!isInstitutionMBO && extensions[educationProgramIdentifier.name].length > 0) {
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

    const convertAlignments = () => {
        const alignments = badgeclass.alignments.map(alignment => ({
            targetName: alignment.target_name,
            targetUrl : alignment.target_url,
            targetDescription: alignment.target_description,
            targetFramework: alignment.target_framework,
            targetCode: alignment.target_code
        }));
        return alignments;
    }

    const doShowPreview = () => {
        previewBadgeCopy = constructBadgeClassForServer(false);
        previewBadgeCopy.ignoreExtensions = true;
        previewBadgeCopy.alignments = convertAlignments();
        showPreview = true;
    }

    const constructBadgeClassForServer = isPrivate => {
        let newBadgeclass = {
            ...badgeclass,
            criteria_text: badgeclass.criteriaText,
            is_private: isPrivate,
            evidence_required: badgeclass.evidenceRequired,
            narrative_required: badgeclass.narrativeRequired,
            narrative_student_required: badgeclass.narrativeStudentRequired,
            evidence_student_required: badgeclass.evidenceStudentRequired,
            award_non_validated_name_allowed: badgeclass.awardNonValidatedNameAllowed,
            is_micro_credentials: badgeclass.isMicroCredentials,
            badge_class_type: badgeclass.badgeClassType,
            participation: badgeclass.participation ? badgeclass.participation.value : null,
            assessment_type: badgeclass.assessmentType ? badgeclass.assessmentType.value : null,
            assessment_supervised: badgeclass.assessmentSupervised,
            assessment_id_verified: badgeclass.assessmentIdVerified,
            quality_assurance_name: badgeclass.qualityAssuranceName,
            quality_assurance_url: badgeclass.qualityAssuranceUrl,
            quality_assurance_description: badgeclass.qualityAssuranceDescription,
            grade_achieved_required: badgeclass.gradeAchievedRequired,
            stackable: badgeclass.stackable.value === "stackable",
            direct_awarding_disabled: badgeclass.directAwardingDisabled,
            self_enrollment_disabled: badgeclass.selfEnrollmentDisabled
        };
        setExpirationPeriod(newBadgeclass);
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
            const extensionValues = []
            const programIdentifiers = extensions[educationProgramIdentifier.name] || [];
            extensionValues.push({
                name: educationProgramIdentifier.name,
                value: programIdentifiers.some(identifier => identifier) ?
                    programIdentifiers.map(identifier => parseInt(identifier, 10)) : "invalid"
            })
            const extension = extensions[eqf.name];
            if (extension) {
                extensionValues.push({name: eqf.name, value: extension.value})
            }
            const educationalIdentifiers = extensionToJson(extensionValues);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...educationalIdentifiers};
        }
        if (showEducationalIdentifiers || badgeclass.isMicroCredentials) {
            const extensionValues = []
            const extension = extensions[eqf.name];
            if (extension) {
                extensionValues.push({name: eqf.name, value: extension.value})
            }
            const eqfIdentifiers = extensionToJson(extensionValues);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...eqfIdentifiers};
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
                    ...extensionToJson([{
                        name: timeInvestment.name,
                        value: parseInt(extensions[timeInvestment.name])
                    }])
                }
            }
        }
        return newBadgeclass;
    }

    const saveDraft = () => onSubmit(true);

    const onSubmit = (isPrivate = false) => {
        errors = {};
        processing = true;
        initial = false;
        const allErrors = performValidation();
        errors = allErrors;
        debugger;
        if (Object.keys(allErrors).length > 1) {
            processing = false;
            return;
        }

        const newBadgeclass = constructBadgeClassForServer(isPrivate);
        if (badgeclass.issuer) {
            newBadgeclass.issuer = badgeclass.issuer.entityId;
        }
        newBadgeclass.award_allowed_institutions = (!newBadgeclass.formal && publicInstitutionsChosen) ? publicInstitutionsChosen.map(ins => ins.id) : [];
        newBadgeclass.tags = internalTags ? internalTags.map(tag => parseInt(tag.id, 10)) : [];
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
                    errors.extensions.forEach(ext => {
                        const ext_name = ext.error_message.split(' ')[1].split(':')[1];
                        if (ext_name === "StudyLoadExtension") {
                            errors[ext_name] = [{'error_code': 906}];
                        } else if (ext_name === "TimeInvestmentExtension") {
                            errors[ext_name] = [{'error_code': 935}];
                        } else if (ext_name === "EducationProgramIdentifierExtension") {
                            if (showStudyLoad && !isInstitutionMBO &&
                                isEmpty((extensions[educationProgramIdentifier.name] || []).some(identifier => identifier))) {
                                errors[ext_name] = [{'error_code': 934}];
                            } else {
                                errors[ext_name] = [{'error_code': 909}];
                            }
                        } else if (ext_name === "ECTSExtension") {
                            errors[ext_name] = [{'error_code': 937}];
                        }
                    })
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
        grid-row-gap: 22px;
        padding-right: 40px;
        max-width: 1020px;

        :global(.select-field) {
            max-width: 100%;
        }

        :global(input) {
            max-width: 100%;
        }
    }

    @media (max-width: 820px) {
        div.form {
            grid-template-columns: 100%;
        }
    }

    .two-columns {
        grid-column-start: 2;
        grid-row-start: 2;
        grid-row-end: 3;
    }

    .one-row {
        grid-column: 1 / -1;
        position: relative;
    }

    .markup-example {
        position: absolute;
        right: 0;
        top: 10px;
        font-size: 15px;
    }

    h4 {
        color: var(--purple);
        padding: var(--ver-padding-s) 0;
        font-size: 26px;
        font-weight: lighter;
        border-bottom: 1px solid var(--purple-2);
        margin: var(--ver-padding-l) 0;
    }

    span.info, a.info {
        display: inline-block;
        margin: 6px 0;
        font-size: 14px;

        &.not-last {
            margin-bottom: 8px;
        }
    }

    div.mark-down-container {
        &.disabled {
            background-color: var(--grey-2);
            border: 1px solid var(--text-grey-dark);
            padding: 5px;
            border-radius: 4px;
        }

        &.error {
            background-color: var(--red-medium);
            border: 1px solid var(--red-dark);
            padding: 5px;
            border-radius: 4px;
        }
    }

    .award-options {
        margin: 35px 0 10px 0;
    }

    .deletable-title-container {
        display: flex;
    }

    .deletable-title {
        display: inline-block;
    }

    .add-buttons {
        margin-bottom: 30px;
    }

    .rm-icon-container {
        border: 1px solid var(--grey-3);
        border-radius: 4px;
        color: var(--grey-6);
        background-color: transparent;
        display: inline-block;
        padding: 8px 12px;
        margin: 0 0 5px 0;
        align-self: center;
        cursor: pointer;

        &.alignment {
            position: absolute;
            right: 0;
            top: -10px;
        }


        &:hover {
            color: var(--red-strong-dark);
        }

        :global(svg) {
            width: 22px;
            height: auto;
        }
    }

    .disabled {
        cursor: not-allowed !important;
        color: var(--grey-7);
    }

    div.input-block {
        display: flex;
        position: relative;

        &.not-first {
            margin-top: 20px;
        }

        button.rm-icon-container {
            position: absolute;
            right: -58px;
            top: 0;
        }

    }

    .line-separator {
        border: 1px dashed var(--purple-1);
        grid-column: 1 / -1;

    }

    .required-micro-credential-framework {
        display: flex;
        flex-direction: column;
        gap: 10px;

        p {
            font-weight: 800
        }
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
        badgeclassName={isCreate ? " - " + I18n.t(`newBadgeClassForm.modal.types.${badgeclass.badgeClassType}`) : badgeclass.name}
        submit={onSubmit}
        create={isCreate}
        cancel={saveDraft}
        cancelText={I18n.t("newBadgeClassForm.saveAsDraft")}
        submitText={I18n.t("newBadgeClassForm.publish")}
        previewAction={() => doShowPreview() }
        {processing}>

    <div class="form">
        <h4 class="one-row">{I18n.t("models.badgeclass.headers.basicInformation")}</h4>

        <div>
            <Field entity={entity}
                   attribute="name"
                   errors={errors.name}
                   tipKey="badgeClassName"
                   required={isRequired(badgeclass, "name")}>
                <TextInput bind:value={badgeclass.name}
                           disabled={!mayEdit && !isCopy}
                           error={errors.name}
                           onBlur={() => errors}
                           placeholder={I18n.t("placeholders.badgeClass.name")}/>
            </Field>
            <Field entity={entity}
                   attribute="issuer"
                   errors={errors.issuer}
                   isSelect={true}
                   tipKey="badgeClassLearningIssuer">
                <Select
                        bind:value={badgeclass.issuer}
                        error={errors.issuer}
                        disabled={issuers.length === 1 || (!mayEdit && !isCopy)}
                        clearable={false}
                        optionIdentifier="entityId"
                        items={issuers}/>
            </Field>
        </div>
        <div class="two-columns">
            <Field entity={entity}
                   attribute="image"
                   errors={errors.image}
                   tipKey="badgeClassImage"
                   required={isRequired(badgeclass, "image")}>
                <File
                        bind:value={badgeclass.image}
                        disabled={!mayEdit && !isCopy}
                        error={errors.image}
                        removeAllowed={false}/>
            </Field>
        </div>

        <div class="one-row">
            <MarkDownExample onClick={() => markDownExample("description")} tipKey="badgeClassDescription"/>
            <Field entity={entity}
                   attribute="description"
                   errors={errors.description}
                   tipKey="badgeClassDescription"
                   required={isRequired(badgeclass, "description")}>
                <div class="mark-down-container"
                     class:disabled={!mayEdit && !isCopy}
                     class:error={errors.description}>
                    <MarkdownField
                            bind:value={badgeclass.description}
                            disabled={!mayEdit && !isCopy}
                    />
                </div>
            </Field>
        </div>

        <div class="one-row">
            <MarkDownExample onClick={() => extensions[learningOutcome.name] = markDownTemplate}
                             tipKey="badgeClassLearningOutcome"/>
            <Field entity={entity}
                   attribute="learningOutcome"
                   errors={errors[learningOutcome.name]}
                   tipKey="badgeClassLearningOutcome"
                   required={isRequired(badgeclass, `extensions.${learningOutcome.name}`)}>
                <div class="mark-down-container" class:disabled={!mayEdit && !isCopy}>
                    <MarkdownField
                            bind:value={extensions[learningOutcome.name]}
                            disabled={!mayEdit && !isCopy}
                    />
                </div>
            </Field>
        </div>

        <div class="one-row">
            <MarkDownExample onClick={() => markDownExample("criteriaText")} tipKey="badgeClassCriteriaRequirements"/>
            <Field entity={entity}
                   attribute="criteria_text"
                   errors={errors.criteria_text}
                   tipKey="badgeClassCriteriaRequirements"
                   required={isRequired(badgeclass, "criteriaText")}>
                <div class="mark-down-container" class:disabled={!mayEdit && !isCopy}>
                    <MarkdownField
                            bind:value={badgeclass.criteriaText}
                            disabled={!mayEdit && !isCopy}
                    />
                </div>
            </Field>
        </div>

        <h4 class="one-row">{I18n.t("newBadgeClassForm.form.programmeInformation")}</h4>

        <Field entity={entity}
               attribute="language"
               errors={errors.language}
               isSelect={true}
               tipKey="badgeClassLanguageOfInstruction">
            <Select
                    bind:value={languageSelection}
                    items={languages}
                    disabled={!mayEdit && !isCopy}
                    optionIdentifier="value"
                    clearable={false}/>
        </Field>

        {#if badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR}
            {#if showStudyLoad}
                <Field entity={entity}
                       attribute="hours"
                       errors={errors[studyLoad.name]}
                       tipKey="badgeClassStudyLoadNumber"
                       required={isRequired(badgeclass, `extensions.${studyLoad.name}`)}>
                    <StudyLoad
                            bind:studyLoad={extensions[studyLoad.name]}
                            disabled={!mayEdit && !isCopy}
                    />
                    <a href="/#"
                       class="info"
                       on:click|preventDefault|stopPropagation={() => switchStudyLoad(true)}>
                        {I18n.t("newBadgeClassForm.form.switchToECTS") }
                    </a>
                </Field>
            {:else}
                <Field entity={entity}
                       attribute="ects.creditPoints"
                       errors={errors[ects.name]}
                       tipKey="badgeClassStudyLoadEcts"
                       required={isRequired(badgeclass, `extensions.${ects.name}`)}>
                    <EctsCreditPoints
                            isMicroCredentials={badgeclass.isMicroCredentials}
                            bind:ectsValue={extensions[ects.name]}
                            disabled={!mayEdit && !isCopy}
                    />
                    <a href="/#"
                       class="info"
                       on:click|preventDefault|stopPropagation={() => switchStudyLoad(false)}>
                        {I18n.t("newBadgeClassForm.form.switchToStudyLoad") }
                    </a>
                </Field>
            {/if}
        {:else}
            <Field entity={entity}
                   attribute="hours"
                   errors={errors[timeInvestment.name]}
                   tipKey="badgeClassTimeInvestmentNumber"
                   required={isRequired(badgeclass, `extensions.${timeInvestment.name}`)}>
                <StudyLoad
                        bind:studyLoad={extensions[timeInvestment.name]}
                        disabled={!mayEdit && !isCopy}
                />
            </Field>

        {/if}

        <Field entity={entity}
               attribute="eqf"
               errors={errors[eqf.name]}
               isSelect={true}
               tipKey="badgeClassNLQFLevel"
               required={isRequired(badgeclass, `extensions.${eqf.name}`)}>
            <Select
                    bind:value={extensions[eqf.name]}
                    items={eqfItems}
                    disabled={!mayEdit && !isCopy}
                    optionIdentifier="value"
                    showIndicator={false}
                    customIndicator={indicator}
                    showChevron={false}
                    clearable={!isRequired(badgeclass, `extensions.${eqf.name}`)}/>
            <span class="info">
                    {@html I18n.t('models.badgeclass.info.eqf')}
                </span>
        </Field>

        <Field entity={entity}
               attribute="participation"
               errors={errors.participation}
               isSelect={true}
               required={isRequired(badgeclass, "participation")}>
            <Select
                    bind:value={badgeclass.participation}
                    items={participationOptions}
                    disabled={!mayEdit}
                    optionIdentifier="value"
                    placeholder={I18n.t("newBadgeClassForm.form.placeHolder")}
                    showIndicator={false}
                    customIndicator={indicator}
                    showChevron={false}
                    clearable={!isRequired(badgeclass, "participation")}/>
        </Field>

        <Field entity={entity}
               attribute="educationProgramIdentifierLong"
               errors={errors[educationProgramIdentifier.name]}
               tipKey="badgeClassProgrammeIdentifier"
               required={isRequired(badgeclass, `extensions.${educationProgramIdentifier.name}`)}>
            {#each extensions[educationProgramIdentifier.name] as identifier, index}
                <div class="input-block" class:not-first={index !== 0}>
                    <TextInput
                            type="text"
                            bind:value={extensions[educationProgramIdentifier.name][index]}
                            disabled={!mayEdit && !isCopy}
                            maxForm={true}
                            placeholder={I18n.t("placeholders.badgeClass.educationProgramIdentifier")}
                            error={errors.EducationProgramIdentifierExtension}/>
                    {#if index !== 0}
                        <button class="rm-icon-container"
                                on:click={() => removeEducationProgramIdentifier(index)}>{@html trash}</button>
                    {/if}
                </div>
            {/each}
            <span class="info not-last">
                    {@html I18n.t('models.badgeclass.info.educationProgramIdentifier')}
                </span>
            <AddButton
                    text={I18n.t('models.badgeclass.addButtons.educationProgramIdentifier')}
                    handleClick={addEducationProgramIdentifier}
                    visibility={true}
                    disabled={!mayEdit}/>

        </Field>

        {#if badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR}

            <h4 class="one-row">{I18n.t("newBadgeClassForm.form.assessmentInformation")}</h4>

            <Field entity={entity}
                   attribute="assessment"
                   errors={errors.assessment_type}
                   tipKey="badgeClassAssessmentType"
                   isSelect={true}
                   required={isRequired(badgeclass, "assessmentType")}>
                <Select
                        bind:value={badgeclass.assessmentType}
                        items={assessmentOptions}
                        disabled={!mayEdit}
                        optionIdentifier="value"
                        placeholder={I18n.t("newBadgeClassForm.form.placeHolder")}
                        showIndicator={false}
                        customIndicator={indicator}
                        showChevron={false}
                        clearable={!isRequired(badgeclass, "assessmentType")}/>
            </Field>
            <div>
                <Switch value={badgeclass.assessmentSupervised}
                        disabled={!mayEdit || isEmpty(badgeclass.assessmentType)}
                        label={I18n.t("newBadgeClassForm.form.assessment.supervision")}
                        question={I18n.t("newBadgeClassForm.form.assessment.supervised")}
                        onChange={() => badgeclass.assessmentSupervised = !badgeclass.assessmentSupervised}/>
                <Switch value={badgeclass.assessmentIdVerified}
                        disabled={!mayEdit || isEmpty(badgeclass.assessmentType)}
                        question={I18n.t("newBadgeClassForm.form.assessment.idVerification")}
                        onChange={() => badgeclass.assessmentIdVerified = !badgeclass.assessmentIdVerified}/>
            </div>

            <h4 class="one-row">{I18n.t("newBadgeClassForm.form.qualityAssurance")}</h4>

            <Field entity={entity}
                   attribute="qualityAssuranceName"
                   errors={errors.quality_assurance_name}
                   tipKey="qualityAssuranceName"
                   required={isRequired(badgeclass, "qualityAssuranceName")}>
                <TextInput bind:value={badgeclass.qualityAssuranceName}
                           disabled={!mayEdit}
                           error={errors.quality_assurance_name}
                           placeholder={I18n.t("placeholders.badgeClass.qualityAssuranceName")}/>
            </Field>

            <Field entity={entity}
                   attribute="qualityAssuranceUrl"
                   errors={errors.quality_assurance_url}
                   tipKey="qualityAssuranceUrl"
                   required={isRequired(badgeclass, "qualityAssuranceUrl")}>
                <TextInput bind:value={badgeclass.qualityAssuranceUrl}
                           disabled={!mayEdit}
                           error={errors.qualityAssuranceUrl}
                           placeholder={I18n.t("placeholders.badgeClass.qualityAssuranceUrl")}/>
            </Field>
        {/if}
        <div class="one-row">
            <MarkDownExample onClick={() => markDownExample("qualityAssuranceDescription")}
                             tipKey="qualityAssuranceDescription"/>
            <Field entity={entity}
                   attribute="qualityAssuranceDescription"
                   errors={errors.quality_assurance_description}
                   tipKey="qualityAssuranceDescription"
                   required={isRequired(badgeclass, "qualityAssuranceDescription")}>
                <div class="mark-down-container" class:disabled={!mayEdit}>
                    <MarkdownField
                            bind:value={badgeclass.qualityAssuranceDescription}
                            disabled={!mayEdit}
                    />
                </div>
            </Field>
        </div>

        <h4 class="one-row">{I18n.t("newBadgeClassForm.form.awardSettings")}</h4>
        <Switch value={!badgeclass.directAwardingDisabled}
                disabled={!mayEdit}
                label={I18n.t("newBadgeClassForm.form.directAward.title")}
                question={I18n.t("newBadgeClassForm.form.directAward.directAwardAllowed")}
                onChange={() => badgeclass.directAwardingDisabled = !badgeclass.directAwardingDisabled}/>

        <div class="separator">
            <Switch value={badgeclass.evidenceRequired}
                    disabled={!mayEdit || badgeclass.directAwardingDisabled}
                    label={I18n.t("newBadgeClassForm.form.directAward.details")}
                    question={I18n.t("newBadgeClassForm.form.directAward.evidenceURL")}
                    onChange={() => badgeclass.evidenceRequired = !badgeclass.evidenceRequired}/>
            <Switch value={badgeclass.narrativeRequired}
                    disabled={!mayEdit || badgeclass.directAwardingDisabled}
                    question={I18n.t("newBadgeClassForm.form.directAward.narrative")}
                    onChange={() => badgeclass.narrativeRequired = !badgeclass.narrativeRequired}/>
        </div>

        <div class="line-separator"/>

        <Switch value={!badgeclass.selfEnrollmentDisabled}
                disabled={!mayEdit}
                label={I18n.t("newBadgeClassForm.form.selfEnrollment.title")}
                question={I18n.t("newBadgeClassForm.form.selfEnrollment.selfEnrollmentAllowed")}
                onChange={() => badgeclass.selfEnrollmentDisabled = !badgeclass.selfEnrollmentDisabled}/>

        <div class="separator">
            <Switch value={badgeclass.evidenceStudentRequired}
                    disabled={!mayEdit || badgeclass.selfEnrollmentDisabled}
                    label={I18n.t("newBadgeClassForm.form.selfEnrollment.details")}
                    question={I18n.t("newBadgeClassForm.form.selfEnrollment.evidenceURL")}
                    onChange={() => badgeclass.evidenceStudentRequired = !badgeclass.evidenceStudentRequired}/>
            <Switch value={badgeclass.narrativeStudentRequired}
                    disabled={!mayEdit || badgeclass.selfEnrollmentDisabled}
                    question={I18n.t("newBadgeClassForm.form.selfEnrollment.narrative")}
                    onChange={() => badgeclass.narrativeStudentRequired = !badgeclass.narrativeStudentRequired}/>
        </div>

        <div class="line-separator"/>

        <ExpirationSettings
                bind:expireValueSet={badgeclass.expireValueSet}
                disabled={false}
                className=""
                bind:number={badgeclass.expirationDuration}
                bind:period={badgeclass.expirationPeriod}/>

        <Field entity={entity}
               attribute="internal_tags"
               errors={errors.internal_tags}
               isSelect={true}
               tipKey="badgeclassInternalTags">
            <Select
                    bind:value={internalTags}
                    items={(institution.tags || []).sort((t1,t2)=> t1.name.localeCompare(t2.name))}
                    isMulti={true}
                    customIndicator={indicator}
                    showIndicator={false}
                    showChevron={true}
                    clearable={true}
                    placeholder={I18n.t("placeholders.badgeClass.internalTags")}
                    optionIdentifier="id"
            />
        </Field>

        <Field entity={entity}
               attribute="isStackable"
               errors={errors.stackable}
               tipKey="badgeClassIsStackable"
               isSelect={true}
               required={true}>
            <Select
                    bind:value={badgeclass.stackable}
                    items={stackableOptions}
                    disabled={!mayEdit}
                    optionIdentifier="value"
                    placeholder={I18n.t("newBadgeClassForm.form.placeHolder")}
                    customIndicator={indicator}
                    showIndicator={true}
                    showChevron={true}
                    clearable={false}/>
        </Field>

        {#if badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR}
            <Switch value={badgeclass.gradeAchievedRequired}
                    disabled={!mayEdit}
                    label={I18n.t("models.badgeclass.isGradeAchieved")}
                    question={I18n.t("models.badgeclass.gradeAchieved")}
                    onChange={() => badgeclass.gradeAchievedRequired = !badgeclass.gradeAchievedRequired}/>
        {/if}

        {#if publicInstitutions.length > 0 && badgeclass.badgeClassType === badgeClassTypes.EXTRA_CURRICULAR}
            <div></div>
            <Field entity={entity}
                   attribute="award_allowed_institutions"
                   errors={errors.award_allowed_institutions}
                   isSelect={true}
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


        <!--{#if badgeclass.alignments && badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR}-->
        <h4 class="one-row">{I18n.t('models.badgeclass.headers.alignment')}</h4>
        {#each badgeclass.alignments as alignment, i}
            {#if i > 0 && i !== badgeclass.alignments}
                <div class="line-separator"/>
            {/if}
            {#if mayRemoveAlignment(alignment) && (mayEdit || !alignment.existing)}
                <div class="one-row">
                    <button class="rm-icon-container alignment"
                            on:click={() => removeAlignment(i) }>{@html trash}</button>
                </div>
            {/if}
            {#if alignment.target_name === microCredentialsFramework.name}
                <div class="required-micro-credential-framework one-row">
                    <p>{I18n.t("newBadgeClassForm.requiredMicroCredentialFramework")}</p>
                    <a href="/toggle"
                       on:click|preventDefault|stopPropagation={() => showMicroCredentialFramework = !showMicroCredentialFramework}>
                        {I18n.t(`toggle.${!showMicroCredentialFramework ? "showMore" : "showLess"}`) }
                    </a>
                </div>
            {/if}
            {#if alignment.target_name !== microCredentialsFramework.name || showMicroCredentialFramework}
                <Field entity={entity}
                       attribute="alignmentName"
                       errors={errors.alignments? errors.alignments[i].target_name: [] }
                       tipKey="badgeClassRelatedFrameworkName">
                    <TextInput
                            bind:value={alignment.target_name}
                            disabled={!mayRemoveAlignment(alignment) && !isCopy}
                            error={errors.target_name}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentName")}
                    />
                </Field>
                <Field entity={entity}
                       attribute="alignmentFramework"
                       errors={errors.alignments? errors.alignments[i].target_framework: [] }
                       tipKey="badgeClassRelatedFrameworkFramework">
                    <TextInput
                            bind:value={alignment.target_framework}
                            disabled={!mayRemoveAlignment(alignment) && !isCopy}
                            error={errors.target_framework}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentFramework")}
                    />
                </Field>
                <Field entity={entity}
                       attribute="alignmentUrl"
                       errors={errors.alignments? errors.alignments[i].target_url: []}
                       tipKey="badgeClassRelatedFrameworkURL">
                    <TextInput
                            bind:value={alignment.target_url}
                            disabled={!mayRemoveAlignment(alignment) && !isCopy}
                            error={errors.target_url}
                            placeholder={alignment.target_name !== microCredentialsFramework.name ? I18n.t("placeholders.badgeClass.alignmentUrl") : ""}
                    />
                </Field>
                <Field {entity} attribute="alignmentCode"
                       errors={errors.alignments? errors.alignments[i].target_code: []}
                       tipKey="badgeClassRelatedFrameworkCode">
                    <TextInput
                            bind:value={alignment.target_code}
                            disabled={!mayRemoveAlignment(alignment) && !isCopy}
                            error={errors.target_code}
                            placeholder={I18n.t("placeholders.badgeClass.alignmentCode")}
                    />
                </Field>
                <div class="one-row">
                    {#if mayRemoveAlignment(alignment)}
                        <MarkDownExample onClick={() => markDownExample("description")}
                                         tipKey="badgeClassDescription"/>
                    {/if}
                    <Field entity={entity}
                           attribute="alignmentDescription"
                           errors={errors.alignments? errors.alignments[i].target_description: []}
                           tipKey="badgeClassRelatedFrameworkDescription">
                        <div class="mark-down-container"
                             class:disabled={!mayRemoveAlignment(alignment) && !isCopy}>
                            <MarkdownField
                                    bind:value={alignment.target_description}
                                    disabled={!mayRemoveAlignment(alignment) && !isCopy}
                            />
                        </div>
                    </Field>
                </div>
            {/if}
        {/each}
        <div class="one-row">
            <AddButton
                    text={I18n.t('models.badgeclass.addButtons.alignmentAddition')}
                    handleClick={() => addEmptyAlignment()}
                    visibility={showAddAlignmentButton}
                    disabled={false}
            />
        </div>

        <!--{/if}-->


        <!--{#if institution.grondslagFormeel !== null || isInstitutionMBO}-->
        <!--    <div style="display: flex">-->
        <!--        <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.studyLoad')}</h4></div>-->
        <!--        {#if institution.grondslagInformeel !== null}-->
        <!--            {#if mayEdit}-->
        <!--                <button class="rm-icon-container" on:click={removeStudyLoad}>{@html trash}</button>-->
        <!--            {:else}-->
        <!--                <button class="rm-icon-container disabled">{@html trash}</button>-->
        <!--            {/if}-->
        <!--        {/if}-->
        <!--    </div>-->

        <!--    <div class="form">-->
        <!--        {:else if institution.grondslagFormeel !== null}-->

        <!--        {/if}-->
        <!--    </div>-->
        <!--{/if}-->

        <!--{#if showTimeInvestment}-->
        <!--    <div style="display: flex">-->
        <!--        <div class="deletable-title"><h4>{I18n.t('models.badgeclass.headers.timeInvestment')}</h4></div>-->
        <!--        {#if mayEdit}-->
        <!--            <button class="rm-icon-container" on:click={removeTimeInvestment}>{@html trash}</button>-->
        <!--        {:else}-->
        <!--            <button class="rm-icon-container disabled">{@html trash}</button>-->
        <!--        {/if}-->
        <!--    </div>-->

        <!--    <div class="form">-->
        <!--    </div>-->
        <!--{/if}-->

        <!--{#if showEducationalIdentifiers && !badgeclass.isMicroCredentials}-->
        <!--    <div style="display: flex">-->
        <!--        <div class="deletable-title">-->
        <!--            <h4>{I18n.t('models.badgeclass.headers.educationalIdentifiers')}</h4>-->
        <!--        </div>-->
        <!--        {#if mayEdit && (!showStudyLoad || isInstitutionMBO)}-->
        <!--            <button class="rm-icon-container"-->
        <!--                    on:click={() => {-->
        <!--                    showEducationalIdentifiers = false;-->
        <!--                    showProgrammeIdentifier = false;-->
        <!--                    extensions[educationProgramIdentifier.name] = [];-->
        <!--                }}>{@html trash}</button>-->
        <!--        {/if}-->
        <!--    </div>-->
        <!--{/if}-->

        <!--<h4>{I18n.t('models.badgeclass.headers.additionalSections')}</h4>-->

        <!--<div class="add-buttons">-->
        <!--    {#if badgeclass.isMicroCredentials && !showProgrammeIdentifier}-->
        <!--        <AddButton-->
        <!--                text={I18n.t('models.badgeclass.addButtons.programmeIdentifier')}-->
        <!--                handleClick={addProgrammeIdentifier}-->
        <!--                visibility={!showProgrammeIdentifier}-->
        <!--                disabled={!mayEdit && !isCopy}-->
        <!--        />-->
        <!--    {:else}-->
        <!--        <AddButton-->
        <!--                text={I18n.t('models.badgeclass.addButtons.educationalIdentifiers')}-->
        <!--                handleClick={() => {-->
        <!--                extensions[educationProgramIdentifier.name] = [""];-->
        <!--                showEducationalIdentifiers = true;}}-->
        <!--                visibility={!showEducationalIdentifiers}-->
        <!--                disabled={!mayEdit && !isCopy}-->
        <!--        />-->
        <!--    {/if}-->
        <!--    {#if institution.grondslagFormeel !== null}-->
        <!--        <AddButton-->
        <!--                text={I18n.t('models.badgeclass.addButtons.studyLoad')}-->
        <!--                handleClick={addStudyLoad}-->
        <!--                visibility={!showStudyLoad}-->
        <!--                disabled={!mayEdit && !isCopy}-->
        <!--        />-->
        <!--    {/if}-->
        <!--    {#if !showTimeInvestment && institution.grondslagInformeel !== null}-->
        <!--        <AddButton-->
        <!--                text={I18n.t('models.badgeclass.addButtons.timeInvestment')}-->
        <!--                handleClick={addTimeInvestment}-->
        <!--                visibility={!showTimeInvestment}-->
        <!--                disabled={!mayEdit && !isCopy}-->
        <!--        />-->
        <!--    {/if}-->

        <!--    <AddButton-->
        <!--            text={I18n.t('models.badgeclass.addButtons.alignment')}-->
        <!--            handleClick={() => addEmptyAlignment()}-->
        <!--            visibility={!showAlignment}-->
        <!--            disabled={false}-->
        <!--    />-->
        <!--</div>-->
</EntityForm>
{#if showPreview}
    <PreviewBadgeClassModal badgeclass={previewBadgeCopy}
                            publicInstitutions={publicInstitutions}
                            close={() => {
                             showPreview = false;
                             debugger;
                            }
                            }/>
{/if}
