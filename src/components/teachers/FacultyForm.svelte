<script>
    import {navigate} from "svelte-routing";
    import {EntityForm} from "../teachers";
    import {Field, File, Select, TextInput} from "../forms";
    import {createFaculty, editFaculty, fetchRawCurrentInstitution} from "../../api";
    import {entityType} from "../../util/entityTypes";
    import I18n from "i18n-js";
    import MultiLanguageField from "../forms/MultiLanguageField.svelte";
    import Switch from "../forms/Switch.svelte";
    import {isEmpty, translatePropertiesRawQueries} from "../../util/utils";
    import {
        currentInstitution,
    } from "../../stores/user";

    export let entityId;
    export let faculty = {};
    export let mayDelete;
    export let hasUnrevokedAssertions;
    export let hasAnyAssertions;
    export let defaultLanguage;
    export let institutionType;
    export let virtualOrganizationAllowed;

    const entity = entityType.ISSUER_GROUP;

    let errors = {};
    let isCreate = !entityId;
    let processing = false;
    let englishValueError = false;
    let dutchValueError = false;
    let activeMultiLanguageTab;

    const facultyTypes = [
        {value: "HBO", name: "HBO"},
        {value: "MBO", name: "MBO"}
    ];

    const visibilityTypes = [
        {value: "PUBLIC", name: I18n.t("models.faculty.visibility.public")},
        {value: "TEST", name: I18n.t("models.faculty.visibility.test")}
    ];

    function onSubmit() {
        processing = true;
        errors = {};

        faculty.description_english = faculty.descriptionEnglish;
        faculty.description_dutch = faculty.descriptionDutch;
        faculty.name_english = faculty.nameEnglish;
        faculty.name_dutch = faculty.nameDutch;
        faculty.on_behalf_of = faculty.onBehalfOf;
        faculty.on_behalf_of_url = faculty.onBehalfOfUrl;
        faculty.on_behalf_of_display_name = faculty.onBehalfOfDisplayName;
        faculty.faculty_type = (faculty.facultyType || {}).value;
        faculty.visibility_type = (faculty.visibilityType || {}).value;

        if (faculty.image_english === '') {
            faculty.imageEnglish = null;
        }
        if (faculty.image_dutch === '') {
            faculty.imageDutch = null;
        }
        faculty.image_english = faculty.imageEnglish;
        faculty.image_dutch = faculty.imageDutch;
        faculty.linkedin_org_identifier = faculty.linkedinOrgIdentifier;

        const args = isCreate ? [faculty] : [entityId, faculty];
        const apiCall = isCreate ? createFaculty : editFaculty;

        apiCall(...args)
            .then(res => {
                entityId = isCreate ? res.entity_id : entityId;
                navigate(`/manage/faculty/${entityId}`);
                fetchRawCurrentInstitution()
                    .then(res => {
                        const institution = res.current_institution;
                        institution.permissions = res.permissions;
                        $currentInstitution = translatePropertiesRawQueries(institution);
                    })

            })
            .catch(err => err.then(({fields}) => {
                errors = fields.error_message;
                if (errors.name_english || errors.description_english) {
                    englishValueError = true;
                } else {
                    englishValueError = false;
                }
                if (errors.name_dutch || errors.description_dutch) {
                    dutchValueError = true;
                } else {
                    dutchValueError = false;
                }
                processing = false;

            }));
    }
</script>

<style lang="scss">
    .faculty-form {
        max-width: 780px;
    }

    div.checkbox-container {
        margin-bottom: 15px;
    }
</style>

<EntityForm faculty={ {...faculty, entityId} }
            submit={onSubmit}
            create={isCreate}
            {processing}
            {mayDelete}
            entityTypeName={entity}
            entityId={entityId}
            {hasUnrevokedAssertions}
            archived={isCreate ? false : faculty.archived}
            {hasAnyAssertions}>
    <div class="faculty-form">
        {#if institutionType === "HBO_MBO"}
            <Field entity={entity}
                   attribute="faculty_type"
                   isSelect={true}
                   errors={errors.faculty_type}
                   tipKey="facultyInstitutionType"
                   required={true}>
                <Select
                        bind:value={faculty.facultyType}
                        items={facultyTypes}
                        placeholder={I18n.t("placeholders.faculty.facultyType")}
                        error={!isEmpty(errors.faculty_type) }
                        disabled={hasUnrevokedAssertions}
                        optionIdentifier="value"
                        clearable={false}/>
            </Field>
        {/if}
        {#if institutionType === "SURF"}
            <Field entity={entity}
                   attribute="visibility_type"
                   isSelect={true}
                   errors={errors.visibility_type}
                   tipKey="facultyVisibilityType"
                   required={true}>
                <Select
                        bind:value={faculty.visibilityType}
                        items={visibilityTypes}
                        placeholder={I18n.t("placeholders.faculty.visibilityType")}
                        error={!isEmpty(errors.visibility_type) }
                        optionIdentifier="value"
                        clearable={false}/>
            </Field>
        {/if}
        <MultiLanguageField errorEnglish={englishValueError}
                            errorDutch={dutchValueError}
                            initialTab={defaultLanguage == 'en-US'? "en" : "nl"}
                            tabSwitchNotify={newTab => activeMultiLanguageTab = newTab}>
            <div slot='en'>
                <Field {entity}
                       attribute="name_english"
                       errors={errors.name_english}
                       tipKey="facultyNameEn">
                    <TextInput bind:value={faculty.nameEnglish}
                               error={errors.name_english}
                               placeholder={I18n.t("placeholders.faculty.name")}/>
                </Field>
                <Field {entity}
                       attribute="description_english"
                       errors={errors.description_english}
                       tipKey="facultyDescriptionEn">
                    <TextInput bind:value={faculty.descriptionEnglish}
                               error={errors.description_english} area
                               size="100"
                               placeholder={I18n.t("placeholders.faculty.description")}/>
                </Field>
            </div>
            <div slot='nl'>
                <Field {entity}
                       attribute="name_dutch"
                       errors={errors.name_dutch}
                       required={true}
                       tipKey="facultyNameNl">
                    <TextInput bind:value={faculty.nameDutch} error={errors.name_dutch}
                               placeholder={I18n.t("placeholders.faculty.name")}/>
                </Field>
                <Field {entity}
                       attribute="description_dutch"
                       errors={errors.description_dutch}
                       required={true}
                       tipKey="facultyDescriptionNl">
                    <TextInput bind:value={faculty.descriptionDutch} error={errors.description_dutch} area size="100"
                               placeholder={I18n.t("placeholders.faculty.description")}/>
                </Field>
            </div>
        </MultiLanguageField>
        {#if virtualOrganizationAllowed}
            <Switch
                    value={faculty.onBehalfOf || false}
                    question={I18n.t("tooltips.facultyOnBehalfOfUrl")}
                    onChange={() => faculty.onBehalfOf = !faculty.onBehalfOf}/>

            <MultiLanguageField errorEnglish={englishValueError}
                                errorDutch={dutchValueError}
                                initialTab={defaultLanguage == 'en-US'? "en" : "nl"}
                                activeTab={activeMultiLanguageTab}
                                showTabSwitch={false}>
                <div slot='en'>
                    <Field {entity}
                           attribute="image_english"
                           errors={errors.image_english}
                           tipKey="institutionImageEn">
                        <File bind:value={faculty.imageEnglish}
                              error={errors.image_english}
                              disabled={!faculty.onBehalfOf}
                              removeAllowed={true}/>
                    </Field>
                </div>
                <div slot='nl'>
                    <Field {entity}
                           attribute="image_dutch"
                           errors={errors.image_dutch}
                           tipKey="institutionImageNl">
                        <File bind:value={faculty.imageDutch}
                              error={errors.image_dutch}
                              disabled={!faculty.onBehalfOf}
                              removeAllowed={true}/>
                    </Field>
                </div>
            </MultiLanguageField>

            <Field {entity} attribute="on_behalf_of_url"
                   errors={errors.on_behalf_of_url}
                   tipKey="facultyOnBehalfOfUrl">
                <TextInput bind:value={faculty.onBehalfOfUrl}
                           error={errors.on_behalf_of_url}
                           disabled={!faculty.onBehalfOf}
                           placeholder={I18n.t("placeholders.faculty.onBehalfOfUrl")}/>
            </Field>
            <Field {entity}
                   attribute="linkedin_org_identifier"
                   errors={errors.linkedin_org_identifier}
                   tipKey="institutionLinkedinOrgIdentifier">
                <TextInput
                        bind:value={faculty.linkedinOrgIdentifier}
                        placeholder={I18n.t("placeholders.faculty.linkedinOrgIdentifier")}
                        disabled={!faculty.onBehalfOf}
                        error={errors.linkedin_org_identifier}/>
            </Field>
            {#if !isEmpty(faculty.onBehalfOfDisplayName) &&
            (faculty.onBehalfOfDisplayName !== faculty.nameDutch || faculty.onBehalfOfDisplayName !== faculty.nameEnglish)}
                <Field {entity} attribute="on_behalf_of_display_name"
                       errors={errors.on_behalf_of_display_name}
                       tipKey="facultyOnBehalfOfDisplayName">
                    <TextInput bind:value={faculty.onBehalfOfDisplayName}
                               error={errors.on_behalf_of_display_name}
                               disabled={!faculty.onBehalfOf}
                               placeholder={I18n.t("placeholders.faculty.onBehalfOfDisplayName")}/>
                </Field>
            {/if}
        {/if}
    </div>

</EntityForm>

