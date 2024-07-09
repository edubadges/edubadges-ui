<script>
    import I18n from "i18n-js";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {EntityForm} from "../teachers";
    import {AddButton, Field, File, Select, TextInput} from "../forms";
    import {createBadgeclass, editBadgeclass} from "../../api";
    import ExpirationSettings from "./ExpirationSettings.svelte";
    import indicator from "../../icons/chevron-down-large.svg";
    import {isEmpty, translateProperties} from "../../util/utils";
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
    import MarkdownField from "../forms/MarkdownField.svelte";
    import {microCredentialsFramework} from "../../util/microcredentials";
    import {microCredentialsFrameworkMBO} from "../../util/microcredentials_MBO";
    import {markDownTemplate} from "../../util/markDownTemplate";
    import MarkDownExample from "./badgeclass/MarkDownExample.svelte";
    import Switch from "../forms/Switch.svelte";
    import {badgeClassTypes} from "../../util/badgeClassTypes";
    import StudyLoad from "../extensions/badges/StudyLoad.svelte";
    import {constructErrors, isRequired} from "../../util/requiredAttributes";
    import PreviewBadgeClassModal from "./PreviewBadgeClassModal.svelte";
    import TimeInvestment from "../extensions/badges/TimeInvestment.svelte";
    import Spinner from "../Spinner.svelte";
    import {addProtocolToURL} from "../../util/forms";

    export let entityId;
    export let badgeclass = {extensions: [], issuer: {}, alignments: [], criteriaText: ""};
    export let issuers = [];
    export let mayDelete;
    export let mayEdit;
    export let hasUnrevokedAssertions;
    export let institution = {};
    export let publicInstitutions = [];
    export let action;
    export let upgradeKeysDisabled = {
        qualityAssuranceDescription: true,
        qualityAssuranceName: true,
        qualityAssuranceUrl: true,
        assessmentType: true,
        assessmentSupervised: true,
        assessmentIdVerified: true,
        participation: true
    }

    const isCreate = !entityId;
    const isCopy = !entityId && action === "copy";
    const entity = entityType.BADGE_CLASS;

    let expireValueSet = false;
    let processing = false;
    let publicInstitutionsChosen = undefined;
    let internalTags = undefined;
    let loading = true;

    // Toggle's for MicroCredentials
    let showStudyLoad = false;
    let isInstitutionMBO = false;
    let isMicroCredential = false;
    let showAddAlignmentButton = true;
    let participationOptions = [];
    let assessmentOptions = [];
    let showMicroCredentialQualityDescription = false;

    let errors = {};
    let extensions = {};
    let initial = true;
    let showPreview = false;
    let previewBadgeCopy = {};

    const languages = [
        {value: "en_EN", name: I18n.t("language.en_EN")},
        {value: "nl_NL", name: I18n.t("language.nl_NL")},
        {value: "de_DE", name: I18n.t("language.de_DE")},
        {value: "fr_FR", name: I18n.t("language.fr_FR")},
        {value: "es_ES", name: I18n.t("language.es_ES")},
    ];

    const eqfItems = [...Array(8).keys()].map(i => {
        return {name: `EQF ${i + 1}`, value: i + 1}
    });


    onMount(() => {
        isInstitutionMBO = institution.institutionType === "MBO";
        isMicroCredential = badgeclass.badgeClassType === badgeClassTypes.MICRO_CREDENTIAL;
        const studyLoadValue = extensionValue(badgeclass.extensions, studyLoad);
        const ectsValue = extensionValue(badgeclass.extensions, ects);
        let eqfValue = extensionValue(badgeclass.extensions, eqf);
        if (isCreate && !isCopy) {
            eqfValue = null; //{name: "EQF 5", value: 5};
        } else if (eqfValue !== null) {
            eqfValue = eqfItems.find(item => item.value === eqfValue)
        }
        let programmeIdentifiers = extensionValue(badgeclass.extensions, educationProgramIdentifier) || (isCreate && !isCopy ? [""] : []);
        //Draft regular badge classes need a programmeIdentifier
        if ((!isCreate || isCopy) && !isEmpty(programmeIdentifiers) && !Array.isArray(programmeIdentifiers)) {
            //Bugfix for older badge classes with one, non-array programmeIdentifier
            programmeIdentifiers = [programmeIdentifiers]
        }
        if (Array.isArray(programmeIdentifiers) && programmeIdentifiers.length === 0 && badgeclass.badgeClassType === badgeClassTypes.REGULAR) {
            programmeIdentifiers = [""];
        }
        extensions = {
            [language.name]: extensionValue(badgeclass.extensions, language) || "en_EN",
            [ects.name]: ectsValue || (isCreate ? (badgeclass.isMicroCredentials ? 5 : badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR ? 3 : null) : null),
            [eqf.name]: eqfValue,
            [learningOutcome.name]: extensionValue(badgeclass.extensions, learningOutcome) || "",
            [educationProgramIdentifier.name]: programmeIdentifiers,
            [studyLoad.name]: studyLoadValue || null,
        };
        if (extensions[eqf.name] && typeof extensions[eqf.name] === "number") {
            extensions[eqf.name] = {name: `EQF ${extensions[eqf.name]}`, value: extensions[eqf.name]}
        }
        const timeInvestmentValue = extensionValue(badgeclass.extensions, timeInvestment) || null;
        extensions[timeInvestment.name] = timeInvestmentValue === 0 ? null : timeInvestmentValue;

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
        participationOptions = Object.keys(participationTranslation)
            .map(key => ({
                value: key,
                name: participationTranslation[key]
            }))
            .sort((opt1, opt2) => opt1.name.localeCompare(opt2.name));

        const assessmentTranslation = I18n.translations[I18n.locale].newBadgeClassForm.form.assessment.options;
        assessmentOptions = Object.keys(assessmentTranslation)
            .map(key => ({
                value: key,
                name: assessmentTranslation[key]
            }))
            .sort((opt1, opt2) => opt1.name.localeCompare(opt2.name));

        if (isCreate) {
            //All type badgeClasses can have educational frameworks
            badgeclass.alignments = [{
                target_name: "",
                target_url: "",
                target_description: "",
                target_framework: "",
                target_code: "",
            }];
        }
        if (isMicroCredential) {
            badgeclass.isMicroCredentials = true;
            const framework = isInstitutionMBO ? microCredentialsFrameworkMBO : microCredentialsFramework;
            badgeclass.qualityAssuranceName = framework.name;
            badgeclass.qualityAssuranceUrl = framework.url;
            badgeclass.qualityAssuranceDescription = framework.description;
        }
        badgeclass.formal = badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR;
        if (!isCreate || isCopy) {
            if (isMicroCredential) {
                showStudyLoad = isEmpty(extensions[ects.name]);
            }
            if (!isEmpty(badgeclass.participation)) {
                badgeclass.participation = badgeclass.participation.split(",")
                    .map(type => participationOptions.find(opt => opt.value === type))
                    .filter(type => !isEmpty(type));
            }
            if (!isEmpty(badgeclass.assessmentType)) {
                badgeclass.assessmentType = badgeclass.assessmentType.split(",")
                    .map(type => assessmentOptions.find(opt => opt.value === type))
                    .filter(type => !isEmpty(type));
            }

        } else {
            badgeclass.stackable = false;
            badgeclass.gradeAchievedRequired = false;
            badgeclass.selfEnrollmentDisabled = false;
            badgeclass.directAwardingDisabled = false;
            if (isInstitutionMBO) {
                extensions[studyLoad.name] = 240;
            } else {
                switch (badgeclass.badgeClassType) {
                    case badgeClassTypes.MICRO_CREDENTIAL: {
                        badgeclass.formal = false;
                        extensions[ects.name] = 5;
                        break;
                    }
                    case badgeClassTypes.REGULAR: {
                        badgeclass.formal = true;
                        extensions[ects.name] = 3;
                        break;
                    }
                    case badgeClassTypes.EXTRA_CURRICULAR: {
                        badgeclass.formal = false;
                        extensions[timeInvestment.name] = null;
                        break;
                    }
                }
            }
        }

        Object.keys(upgradeKeysDisabled).forEach(key => {
            const val = badgeclass[key];
            upgradeKeysDisabled[key] = !mayEdit && !isEmpty(val) && !isCopy;
        });
        loading = false;
    });

    const performValidation = isPrivate => {
        badgeclass.isPrivate = isPrivate;
        const allErrors = constructErrors(badgeclass, extensions);
        //Hack for micro_credentials, that has an option between StudyLoadExtension and ECTSExtension
        if (isMicroCredential) {
            if (showStudyLoad) {
                delete allErrors[`extensions.${ects.name}`]
            } else {
                delete allErrors[`extensions.${studyLoad.name}`]
            }
        }
        return allErrors;
    }

    let languageSelection = languages[0];
    if (!isCreate || isCopy) {
        languageSelection = languages.find(x => x.value === extensionValue(badgeclass.extensions, language));
    } else {
        const language = institution.defaultLanguage;
        languageSelection = languages.find(x => x.value === language);
    }

    const checkErrors = (e, name) => {
        if (!initial) {
            if (isRequired(badgeclass, name)) {
                if (isEmpty(e.target.value)) {
                    errors[name] = [{"error_code": "903"}];
                } else {
                    delete errors[name];
                }
                errors = {...errors};
            }
        }
    }

    const markDownExample = attribute => {
        badgeclass[attribute] = markDownTemplate;
    }

    const switchStudyLoad = val => {
        showStudyLoad = !val;
        if (showStudyLoad) {
            extensions[studyLoad.name] = isInstitutionMBO ? 240 : 84;
            delete extensions[ects.name];

        } else {
            extensions[ects.name] = badgeclass.isMicroCredentials ? 5 : 3;
            delete extensions[studyLoad.name];
        }
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

    const convertAlignments = () => {
        return badgeclass.alignments.map(alignment => ({
            targetName: alignment.target_name,
            targetUrl: alignment.target_url,
            targetDescription: alignment.target_description,
            targetFramework: alignment.target_framework,
            targetCode: alignment.target_code
        }));
    }

    const doShowPreview = () => {
        previewBadgeCopy = constructBadgeClassForServer(false, false);
        previewBadgeCopy.alignments = convertAlignments();
        previewBadgeCopy.educationProgramIdentifier = extensions[educationProgramIdentifier.name];
        previewBadgeCopy.learningOutcome = extensions[learningOutcome.name];
        previewBadgeCopy.eqf = extensions[eqf.name];
        if (previewBadgeCopy.eqf) {
            previewBadgeCopy.eqf = previewBadgeCopy.eqf.value;
        }
        previewBadgeCopy.studyLoad = extensions[studyLoad.name];
        previewBadgeCopy.timeInvestment = extensions[timeInvestment.name];
        previewBadgeCopy.ects = extensions[ects.name];
        previewBadgeCopy.language = extensions[language.name];
        previewBadgeCopy.ignoreExtensions = true;
        if (!isEmpty(previewBadgeCopy.assessmentType)) {
            previewBadgeCopy.assessmentType = previewBadgeCopy.assessmentType
                .map(t => t.value).sort().join(",");
        }
        //To enable scrolling in the modal, is removed again in the close
        document.body.classList.add("modal-open");
        showPreview = true;
    }

    const constructBadgeClassForServer = (isPrivate, removeUpperCaseAttributes = true) => {
        let newBadgeclass = {
            ...badgeclass,
            criteria_text: badgeclass.criteriaText,
            is_private: isPrivate,
            evidence_required: badgeclass.evidenceRequired,
            award_non_validated_name_allowed: badgeclass.awardNonValidatedNameAllowed,
            narrative_required: badgeclass.narrativeRequired,
            narrative_student_required: badgeclass.narrativeStudentRequired,
            evidence_student_required: badgeclass.evidenceStudentRequired,
            is_micro_credentials: badgeclass.isMicroCredentials,
            badge_class_type: badgeclass.badgeClassType,
            typeBadgeClass: badgeclass.badgeClassType,
            participation: isEmpty(badgeclass.participation) ? null :
                badgeclass.participation.map(t => t.value).sort().join(","),
            assessment_type: isEmpty(badgeclass.assessmentType) ? null :
                badgeclass.assessmentType.map(t => t.value).sort().join(","),
            assessment_supervised: badgeclass.assessmentSupervised,
            assessment_id_verified: badgeclass.assessmentIdVerified,
            quality_assurance_name: badgeclass.qualityAssuranceName,
            quality_assurance_url: badgeclass.qualityAssuranceUrl,
            quality_assurance_description: badgeclass.qualityAssuranceDescription,
            grade_achieved_required: badgeclass.gradeAchievedRequired,
            stackable: badgeclass.stackable,
            direct_awarding_disabled: badgeclass.directAwardingDisabled,
            self_enrollment_disabled: badgeclass.selfEnrollmentDisabled
        };
        setExpirationPeriod(newBadgeclass);
        if (newBadgeclass.alignments) {
            newBadgeclass.alignments = newBadgeclass.alignments.filter(alignment =>
                !isEmpty(alignment.target_name) || !isEmpty(alignment.target_url) || !isEmpty(alignment.target_description) ||
                !isEmpty(alignment.target_framework) || !isEmpty(alignment.target_code))
            newBadgeclass.alignments.forEach(alignment => {
                alignment.target_url = toHttpOrHttps(alignment.target_url)
                delete alignment.existing
            });
        }
        newBadgeclass.extensions = extensionToJson([
            {name: language.name, value: languageSelection.value}
        ]);
        const learningOutcomeValue = extensions[learningOutcome.name];
        if (!isEmpty(learningOutcomeValue)) {
            const learningOutcomeExt = extensionToJson([
                {name: learningOutcome.name, value: learningOutcomeValue}
            ]);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...learningOutcomeExt}
        }
        const extensionValues = []
        const programIdentifiers = (extensions[educationProgramIdentifier.name] || [])
            .filter(identifier => !isEmpty(identifier));
        if (programIdentifiers.length > 0) {
            extensionValues.push({
                name: educationProgramIdentifier.name,
                value: programIdentifiers.map(identifier => parseInt(identifier, 10))
            });
            const educationalIdentifiers = extensionToJson(extensionValues);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...educationalIdentifiers};
        }
        const extension = extensions[eqf.name];
        if (!isEmpty(extension)) {
            extensionValues.push({name: eqf.name, value: extension.value})
            const eqfIdentifiers = extensionToJson(extensionValues);
            newBadgeclass.extensions = {...newBadgeclass.extensions, ...eqfIdentifiers};
        }
        const timeInvestmentValue = extensions[timeInvestment.name];
        if (badgeclass.badgeClassType === badgeClassTypes.EXTRA_CURRICULAR && !isEmpty(timeInvestmentValue)) {
            newBadgeclass.extensions = {
                ...newBadgeclass.extensions,
                ...extensionToJson([{
                    name: timeInvestment.name,
                    value: parseInt(timeInvestmentValue)
                }])
            }
        } else {
            if (showStudyLoad || isInstitutionMBO) {
                newBadgeclass.extensions = {
                    ...newBadgeclass.extensions,
                    ...extensionToJson([{name: studyLoad.name, value: parseInt(extensions[studyLoad.name])}])
                };
            } else if (!isEmpty(extensions[ects.name])) {
                newBadgeclass.extensions = {
                    ...newBadgeclass.extensions,
                    ...extensionToJson([{name: ects.name, value: extensions[ects.name]}])
                };
            }
        }
        if (removeUpperCaseAttributes) {
            Object.keys(newBadgeclass).filter(key => /[A-Z]/.test(key)).forEach(key => delete newBadgeclass[key]);
        }

        return newBadgeclass;
    }

    const saveDraft = () => onSubmit(true);

    const onSubmit = (isPrivate = false) => {
        errors = {};
        processing = true;
        initial = false;
        const allErrors = performValidation(isPrivate);
        errors = allErrors;
        if (Object.keys(allErrors).length > 0) {
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

    a.info {
        font-size: 14px;
    }

    span.info {
        display: inline-block;
        margin: 6px 0;
        font-size: 14px;

        &.not-last {
            margin-bottom: 8px;
        }
    }

    .separator {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    div.mark-down-container {
        &.disabled {
            background-color: var(--grey-2);
            border: 1px solid var(--text-grey-dark);
            padding: 5px;
            border-radius: 4px;
        }

        &.error {
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
        gap: 8px;

        a.less {
            margin-bottom: 12px;
        }
    }

    .warnings {
        display: flex;
        width: 100%;

        p {
            margin-left: auto;
            color: var(--red-dark);
        }
    }

</style>
{#if loading}
    <Spinner/>
{:else}
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
            badgeclassName={isCreate ? "" : badgeclass.name}
            badgeclassPostfix={" - " + I18n.t(`newBadgeClassForm.modal.types.${badgeclass.badgeClassType}`)}
            submit={onSubmit}
            create={isCreate}
            cancel={mayEdit ? saveDraft :  window.history.back}
            cancelText={mayEdit ? I18n.t("newBadgeClassForm.saveAsDraft") : I18n.t("manage.edit.cancel")}
            submitText={(isCreate || badgeclass.isPrivate) ? I18n.t("newBadgeClassForm.publish") : I18n.t("manage.edit.save")}
            previewAction={() => doShowPreview()}
            {processing}>

        <div class="form">
            <!--            <p>{JSON.stringify(errors)}</p>-->
            <!--            <p></p>-->
            <!--            <p>{JSON.stringify(badgeclass.name)}</p>-->
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
                               onInput={e => checkErrors(e, "name")}
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
                {#if mayEdit || isCopy}
                    <MarkDownExample onClick={() => markDownExample("description")} tipKey="badgeClassDescription"/>
                {/if}
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
                {#if mayEdit || isCopy}
                    <MarkDownExample onClick={() => extensions[learningOutcome.name] = markDownTemplate}
                                     tipKey="badgeClassLearningOutcome"/>
                {/if}
                <Field entity={entity}
                       attribute="learningOutcome"
                       errors={errors[`extensions.${learningOutcome.name}`]}
                       tipKey="badgeClassLearningOutcome"
                       required={isRequired(badgeclass, `extensions.${learningOutcome.name}`)}>
                    <div class="mark-down-container"
                         class:disabled={!mayEdit && !isCopy}
                         class:error={errors[`extensions.${learningOutcome.name}`]}>
                        <MarkdownField
                                bind:value={extensions[learningOutcome.name]}
                                disabled={!mayEdit && !isCopy}
                        />
                    </div>
                </Field>
            </div>

            <div class="one-row">
                {#if mayEdit || isCopy}
                    <MarkDownExample onClick={() => markDownExample("criteriaText")}
                                     tipKey="badgeClassCriteriaRequirements"/>
                {/if}
                <Field entity={entity}
                       attribute="criteria_text"
                       errors={errors.criteriaText}
                       tipKey="badgeClassCriteriaRequirements"
                       required={isRequired(badgeclass, "criteriaText")}>
                    <div class="mark-down-container"
                         class:disabled={!mayEdit && !isCopy}
                         class:error={errors.criteriaText}>
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
            {#if isInstitutionMBO}
                <Field entity={entity}
                       attribute="hours"
                       errors={errors[`extensions.${studyLoad.name}`]}
                       tipKey="badgeClassStudyLoadNumber"
                       required={isRequired(badgeclass, `extensions.${studyLoad.name}`)}>
                    <StudyLoad
                            bind:studyLoad={extensions[studyLoad.name]}
                            isInstitutionMBO={isInstitutionMBO}
                            disabled={!mayEdit && !isCopy}
                    />
                </Field>
            {:else if isMicroCredential}
                {#if showStudyLoad}
                    <Field entity={entity}
                           attribute="hours"
                           errors={errors[`extensions.${studyLoad.name}`]}
                           tipKey="badgeClassStudyLoadNumber"
                           required={isRequired(badgeclass, `extensions.${studyLoad.name}`)}>
                        <StudyLoad
                                bind:studyLoad={extensions[studyLoad.name]}
                                isInstitutionMBO={isInstitutionMBO}
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
                           errors={errors[`extensions.${ects.name}`]}
                           tipKey="badgeClassStudyLoadEcts"
                           required={isRequired(badgeclass, `extensions.${ects.name}`)}>
                        <EctsCreditPoints
                                isMicroCredentials={true}
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
            {:else if badgeclass.badgeClassType === badgeClassTypes.REGULAR}
                <Field entity={entity}
                       attribute="ects.creditPoints"
                       errors={errors[`extensions.${ects.name}`]}
                       tipKey="badgeClassStudyLoadEcts"
                       required={isRequired(badgeclass, `extensions.${ects.name}`)}>
                    <EctsCreditPoints
                            isMicroCredentials={false}
                            bind:ectsValue={extensions[ects.name]}
                            disabled={!mayEdit && !isCopy}
                    />
                </Field>
            {:else}
                <Field entity={entity}
                       attribute="hours"
                       errors={errors[`extensions.${timeInvestment.name}`]}
                       tipKey="badgeClassTimeInvestmentNumber"
                       required={isRequired(badgeclass, `extensions.${timeInvestment.name}`)}>
                    <TimeInvestment
                            bind:timeInvestment={extensions[timeInvestment.name]}
                            disabled={!mayEdit && !isCopy}
                    />
                </Field>

            {/if}

            <Field entity={entity}
                   attribute="eqf"
                   errors={errors[`extensions.${eqf.name}`]}
                   isSelect={true}
                   tipKey="badgeClassNLQFLevel"
                   required={isRequired(badgeclass, `extensions.${eqf.name}`)}>
                <Select
                        bind:value={extensions[eqf.name]}
                        items={eqfItems}
                        disabled={!mayEdit && !isCopy}
                        optionIdentifier="value"
                        placeholder={I18n.t("newBadgeClassForm.form.placeHolder")}
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
                        disabled={upgradeKeysDisabled.participation}
                        optionIdentifier="value"
                        isMulti={true}
                        placeholder={I18n.t("newBadgeClassForm.form.placeHolder")}
                        showIndicator={false}
                        customIndicator={indicator}
                        showChevron={false}
                        clearable={!isRequired(badgeclass, "participation")}/>
            </Field>

            <Field entity={entity}
                   attribute="educationProgramIdentifierLong"
                   errors={errors[`extensions.${educationProgramIdentifier.name}`]}
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
                {#if mayEdit || isCopy}
                    <AddButton
                            text={I18n.t('models.badgeclass.addButtons.educationProgramIdentifier')}
                            handleClick={addEducationProgramIdentifier}
                            visibility={true}
                            disabled={!mayEdit && !isCopy}/>
                {/if}
            </Field>

            <h4 class="one-row">{I18n.t("newBadgeClassForm.form.assessmentInformation")}</h4>

            <Field entity={entity}
                   attribute="assessment"
                   errors={errors.assessmentType}
                   tipKey="badgeClassAssessmentType"
                   isSelect={true}
                   required={isRequired(badgeclass, "assessmentType")}>
                <Select
                        bind:value={badgeclass.assessmentType}
                        items={assessmentOptions}
                        disabled={upgradeKeysDisabled.assessmentType}
                        optionIdentifier="value"
                        isMulti={true}
                        placeholder={I18n.t("newBadgeClassForm.form.placeHolder")}
                        showIndicator={false}
                        customIndicator={indicator}
                        showChevron={false}
                        clearable={!isRequired(badgeclass, "assessmentType")}/>
            </Field>
            <div>
                <Switch value={badgeclass.assessmentSupervised}
                        disabled={upgradeKeysDisabled.assessmentType || isEmpty(badgeclass.assessmentType)}
                        label={I18n.t("newBadgeClassForm.form.assessment.supervision")}
                        question={I18n.t("newBadgeClassForm.form.assessment.supervised")}
                        onChange={() => badgeclass.assessmentSupervised = !badgeclass.assessmentSupervised}/>
                <Switch value={badgeclass.assessmentIdVerified}
                        disabled={upgradeKeysDisabled.assessmentType || isEmpty(badgeclass.assessmentType)}
                        question={I18n.t("newBadgeClassForm.form.assessment.idVerification")}
                        onChange={() => badgeclass.assessmentIdVerified = !badgeclass.assessmentIdVerified}/>
            </div>

            <h4 class="one-row">{I18n.t("newBadgeClassForm.form.qualityAssurance")}</h4>

            <Field entity={entity}
                   attribute="qualityAssuranceName"
                   errors={errors.qualityAssuranceName}
                   tipKey="qualityAssuranceName"
                   required={isRequired(badgeclass, "qualityAssuranceName")}>
                <TextInput bind:value={badgeclass.qualityAssuranceName}
                           disabled={upgradeKeysDisabled.qualityAssuranceName || isMicroCredential}
                           error={errors.qualityAssuranceName}
                           placeholder={I18n.t("placeholders.badgeClass.qualityAssuranceName")}/>
            </Field>

            <Field entity={entity}
                   attribute="qualityAssuranceUrl"
                   errors={errors.qualityAssuranceUrl || errors.quality_assurance_url}
                   tipKey="qualityAssuranceUrl"
                   required={isRequired(badgeclass, "qualityAssuranceUrl")}>
                <TextInput bind:value={badgeclass.qualityAssuranceUrl}
                           disabled={upgradeKeysDisabled.qualityAssuranceUrl || isMicroCredential}
                           onBlur={e => badgeclass.qualityAssuranceUrl = addProtocolToURL(e.target.value)}
                           error={errors.qualityAssuranceUrl || errors.quality_assurance_url}
                           placeholder={I18n.t("placeholders.badgeClass.qualityAssuranceUrl")}/>
            </Field>

            <div class="one-row">
                {#if !upgradeKeysDisabled.qualityAssuranceDescription && !isMicroCredential }
                    <MarkDownExample onClick={() => markDownExample("qualityAssuranceDescription")}
                                     tipKey="qualityAssuranceDescription"/>
                {/if}
                <Field entity={entity}
                       attribute="qualityAssuranceDescription"
                       errors={errors.qualityAssuranceDescription}
                       tipKey="qualityAssuranceDescription"
                       required={isRequired(badgeclass, "qualityAssuranceDescription")}>
                    {#if isMicroCredential}
                        <div class="required-micro-credential-framework">
                            <p>{I18n.t(`newBadgeClassForm.requiredMicroCredentialFramework${isInstitutionMBO ? "MBO" : ""}`)}</p>
                            <a class:less={showMicroCredentialQualityDescription}
                               href="/toggle"
                               on:click|preventDefault|stopPropagation={() => showMicroCredentialQualityDescription = !showMicroCredentialQualityDescription}>
                                {I18n.t(`toggle.${!showMicroCredentialQualityDescription ? "showMore" : "showLess"}`) }
                            </a>
                        </div>
                    {/if}
                    {#if showMicroCredentialQualityDescription || !isMicroCredential}
                        <div class="mark-down-container"
                             class:disabled={upgradeKeysDisabled.qualityAssuranceDescription || isMicroCredential}
                             class:error={errors.qualityAssuranceDescription}>
                            <MarkdownField
                                    bind:value={badgeclass.qualityAssuranceDescription}
                                    disableToggle={isMicroCredential}
                                    disabled={upgradeKeysDisabled.qualityAssuranceDescription || isMicroCredential}
                            />
                        </div>
                    {/if}
                </Field>
            </div>

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
                {#if alignment.target_name !== microCredentialsFramework.name}
                    <Field entity={entity}
                           attribute="alignmentName"
                           errors={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_name: [] }
                           tipKey="badgeClassRelatedFrameworkName">
                        <TextInput
                                bind:value={alignment.target_name}
                                disabled={!mayRemoveAlignment(alignment) && !isCopy}
                                error={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_name: null}
                                placeholder={I18n.t("placeholders.badgeClass.alignmentName")}
                        />
                    </Field>
                    <Field entity={entity}
                           attribute="alignmentFramework"
                           errors={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_framework: [] }
                           tipKey="badgeClassRelatedFrameworkFramework">
                        <TextInput
                                bind:value={alignment.target_framework}
                                disabled={!mayRemoveAlignment(alignment) && !isCopy}
                                error={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_framework: null }
                                placeholder={I18n.t("placeholders.badgeClass.alignmentFramework")}
                        />
                    </Field>
                    <Field entity={entity}
                           attribute="alignmentUrl"
                           errors={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_url: []}
                           tipKey="badgeClassRelatedFrameworkURL">
                        <TextInput
                                bind:value={alignment.target_url}
                                disabled={!mayRemoveAlignment(alignment) && !isCopy}
                                onBlur={e => alignment.target_url = addProtocolToURL(e.target.value)}
                                error={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_url: null}
                                placeholder={alignment.target_name !== microCredentialsFramework.name ? I18n.t("placeholders.badgeClass.alignmentUrl") : ""}
                        />
                    </Field>
                    <Field {entity} attribute="alignmentCode"
                           errors={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_code: []}
                           tipKey="badgeClassRelatedFrameworkCode">
                        <TextInput
                                bind:value={alignment.target_code}
                                disabled={!mayRemoveAlignment(alignment) && !isCopy}
                                error={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_code: null}
                                placeholder={I18n.t("placeholders.badgeClass.alignmentCode")}
                        />
                    </Field>
                    <div class="one-row">
                        {#if mayRemoveAlignment(alignment)}
                            <MarkDownExample
                                    onClick={() => badgeclass.alignments[i].target_description = markDownTemplate}
                                    tipKey="badgeClassDescription"/>
                        {/if}
                        <Field entity={entity}
                               attribute="alignmentDescription"
                               errors={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_description: []}
                               tipKey="badgeClassRelatedFrameworkDescription">
                            <div class="mark-down-container"
                                 class:disabled={!mayRemoveAlignment(alignment) && !isCopy}
                                 class:error={errors.alignments && errors.alignments[i] ? errors.alignments[i].target_description: null}>
                                <MarkdownField
                                        bind:value={alignment.target_description}
                                        disabled={!mayRemoveAlignment(alignment) && !isCopy}
                                />
                            </div>
                        </Field>
                        {#if showAddAlignmentButton && i === badgeclass.alignments.length - 1}
                            <AddButton
                                    text={I18n.t('models.badgeclass.addButtons.alignmentAddition')}
                                    handleClick={() => addEmptyAlignment()}
                                    visibility={showAddAlignmentButton}
                                    disabled={!mayEdit && !isCopy}
                            />
                        {/if}

                    </div>
                {/if}
            {/each}
            {#if isEmpty(badgeclass.alignments)}
                <AddButton
                        text={I18n.t('models.badgeclass.addButtons.alignmentInitialAddition')}
                        handleClick={() => addEmptyAlignment()}
                        visibility={showAddAlignmentButton}
                        disabled={!mayEdit && !isCopy}
                />
            {/if}

            <h4 class="one-row">{I18n.t("newBadgeClassForm.form.awardSettings")}</h4>
            <Switch value={!badgeclass.directAwardingDisabled}
                    label={I18n.t("newBadgeClassForm.form.directAward.title")}
                    question={I18n.t("newBadgeClassForm.form.directAward.directAwardAllowed")}
                    onChange={() => badgeclass.directAwardingDisabled = !badgeclass.directAwardingDisabled}/>

            <div class="separator">
                <Switch value={badgeclass.evidenceRequired}
                        disabled={badgeclass.directAwardingDisabled}
                        label={I18n.t("newBadgeClassForm.form.directAward.details")}
                        question={I18n.t("newBadgeClassForm.form.directAward.evidenceURL")}
                        onChange={() => badgeclass.evidenceRequired = !badgeclass.evidenceRequired}/>
                <Switch value={badgeclass.narrativeRequired}
                        disabled={badgeclass.directAwardingDisabled}
                        question={I18n.t("newBadgeClassForm.form.directAward.narrative")}
                        onChange={() => badgeclass.narrativeRequired = !badgeclass.narrativeRequired}/>
            </div>

            <div class="line-separator"/>

            <Switch value={!badgeclass.selfEnrollmentDisabled}
                    label={I18n.t("newBadgeClassForm.form.selfEnrollment.title")}
                    question={I18n.t("newBadgeClassForm.form.selfEnrollment.selfEnrollmentAllowed")}
                    onChange={() => badgeclass.selfEnrollmentDisabled = !badgeclass.selfEnrollmentDisabled}/>

            <div class="separator">
                {#if badgeclass.badgeClassType === badgeClassTypes.EXTRA_CURRICULAR}
                    <Switch value={badgeclass.awardNonValidatedNameAllowed}
                            disabled={badgeclass.selfEnrollmentDisabled}
                            label={I18n.t("newBadgeClassForm.form.selfEnrollment.details")}
                            question={I18n.t("newBadgeClassForm.form.directAward.awardNonValidatedNameAllowed")}
                            onChange={() => badgeclass.awardNonValidatedNameAllowed = !badgeclass.awardNonValidatedNameAllowed}/>
                {/if}

                <Switch value={badgeclass.evidenceStudentRequired}
                        disabled={badgeclass.selfEnrollmentDisabled}
                        label={badgeclass.badgeClassType === badgeClassTypes.EXTRA_CURRICULAR ? null : I18n.t("newBadgeClassForm.form.selfEnrollment.details")}
                        question={I18n.t("newBadgeClassForm.form.selfEnrollment.evidenceURL")}
                        onChange={() => badgeclass.evidenceStudentRequired = !badgeclass.evidenceStudentRequired}/>
                <Switch value={badgeclass.narrativeStudentRequired}
                        disabled={badgeclass.selfEnrollmentDisabled}
                        question={I18n.t("newBadgeClassForm.form.selfEnrollment.narrative")}
                        onChange={() => badgeclass.narrativeStudentRequired = !badgeclass.narrativeStudentRequired}/>
                {#if publicInstitutions.length > 0 && badgeclass.badgeClassType === badgeClassTypes.EXTRA_CURRICULAR}
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
                                disabled={badgeclass.selfEnrollmentDisabled}
                                clearable={true}
                                placeholder={I18n.t("placeholders.institution.allowedInstitutions")}
                                optionIdentifier="id"
                        />
                    </Field>
                {/if}

            </div>

            <div class="line-separator"/>

            <ExpirationSettings
                    bind:expireValueSet={badgeclass.expireValueSet}
                    disabled={false}
                    className=""
                    errors={errors.expirationSetting}
                    bind:number={badgeclass.expirationDuration}
                    bind:period={badgeclass.expirationPeriod}/>

            <Field entity={entity}
                   attribute="internal_tags"
                   errors={errors.internal_tags}
                   isSelect={true}
                   tipKey="badgeclassInternalTags">
                <Select
                        bind:value={internalTags}
                        items={(institution.tags || []).filter(tag => !tag.archived).sort((t1,t2)=> t1.name.localeCompare(t2.name))}
                        isMulti={true}
                        customIndicator={indicator}
                        showIndicator={false}
                        showChevron={true}
                        clearable={true}
                        placeholder={I18n.t("placeholders.badgeClass.internalTags")}
                        optionIdentifier="id"
                />
            </Field>
            <Switch value={badgeclass.stackable}
                    label={I18n.t("newBadgeClassForm.stackable")}
                    question={I18n.t("newBadgeClassForm.isStackable")}
                    onChange={() => badgeclass.stackable = !badgeclass.stackable}/>

            {#if badgeclass.badgeClassType !== badgeClassTypes.EXTRA_CURRICULAR}
                <Switch value={badgeclass.gradeAchievedRequired}
                        label={I18n.t("models.badgeclass.isGradeAchieved")}
                        question={I18n.t("models.badgeclass.gradeAchieved")}
                        onChange={() => badgeclass.gradeAchievedRequired = !badgeclass.gradeAchievedRequired}/>
            {/if}

            {#if !isEmpty(errors)}
                <div class="warnings one-row">
                    <p>{I18n.t("newBadgeClassForm.errors")}</p>
                </div>
            {/if}
        </div>

    </EntityForm>
{/if}
{#if showPreview}
    <PreviewBadgeClassModal badgeclass={previewBadgeCopy}
                            publicInstitutions={publicInstitutions}
                            close={() => {
                             document.body.classList.remove("modal-open");
                             showPreview = false;
                            }
                            }/>
{/if}

