<script>
    import {navigate} from "svelte-routing";
    import {EntityForm} from "../teachers";
    import {Field, File, Select, TextInput} from "../forms";
    import {createIssuer, editIssuer} from "../../api";
    import {entityType} from "../../util/entityTypes";
    import I18n from "i18n-js";
    import {toHttpOrHttps} from "../../util/Url";
    import {onMount} from "svelte";
    import MultiLanguageField from "../forms/MultiLanguageField.svelte";
    import {isEmpty} from "../../util/utils";

    export let entityId;
    export let issuer = {faculty: {}, badgeclasses: []};
    export let faculties = [];
    export let facultyChooseAllowed;
    export let mayDelete;
    export let hasUnrevokedAssertions;
    export let defaultLanguage;

    const entity = entityType.ISSUER;
    let errors = {};
    let isCreate = !entityId;
    let processing = false;
    let englishValueError = false;
    let dutchValueError = false;

    function onSubmit() {
        errors = {};
        processing = true;

        let parent = issuer.faculty;
        let newIssuer = issuer;
        if (issuer.faculty) {
            newIssuer.faculty = issuer.faculty.entityId;
        }

        if (newIssuer.image_english === '') {
            newIssuer.imageEnglish = null;
        }
        if (newIssuer.image_dutch === '') {
            newIssuer.imageDutch = null;
        }

        newIssuer.description_english = issuer.descriptionEnglish;
        newIssuer.description_dutch = issuer.descriptionDutch;
        newIssuer.image_english = issuer.imageEnglish;
        newIssuer.image_dutch = issuer.imageDutch;
        newIssuer.name_english = issuer.nameEnglish;
        newIssuer.name_dutch = issuer.nameDutch;
        newIssuer.url_english = toHttpOrHttps(issuer.urlEnglish);
        newIssuer.url_dutch = toHttpOrHttps(issuer.urlDutch);

        const args = isCreate ? [newIssuer] : [entityId, newIssuer];
        const apiCall = isCreate ? createIssuer : editIssuer;
        apiCall(...args)
            .then(res => {
                entityId = createIssuer ? res.entity_id : entityId;
                navigate(`/manage/issuer/${entityId}`)
            })
            .catch(err => err.then(({fields}) => {
                issuer.faculty = parent;
                errors = fields.error_message;
                processing = false;
                if (errors.image_english || errors.name_english ||
                    errors.description_english || errors.url_english) {
                    englishValueError = true;
                } else {
                    englishValueError = false;
                }
                if (errors.image_dutch || errors.name_dutch ||
                    errors.description_dutch || errors.url_dutch) {
                    dutchValueError = true;
                } else {
                    dutchValueError = false;
                }
            }));
    }
</script>
<style>
    .issuer-form {
        max-width: 780px;
    }

</style>

<EntityForm entityTypeName={entity} faculty={isCreate ? null : issuer.faculty} {mayDelete} {entityId}
            {hasUnrevokedAssertions}
            issuer={isCreate ? null : issuer} submit={onSubmit} create={isCreate} {processing}>
    <div class="issuer-form">
        <MultiLanguageField errorEnglish={englishValueError}
                            errorDutch={dutchValueError}
                            initialTab={defaultLanguage == 'en-US'? "en" : "nl"}>

            <div slot='before'>
                <Field {entity} attribute="faculty" errors={errors.faculty} tipKey="issuerFaculty">
                    <Select
                            bind:value={issuer.faculty}
                            disabled={!facultyChooseAllowed}
                            error={errors.faculty}
                            items={faculties}/>
                </Field>
            </div>

            <div slot="en">
                <Field {entity} attribute="image_english" errors={errors.image_english} tipKey="issuerImageEn">
                    <File bind:value={issuer.imageEnglish} error={errors.image_english} removeAllowed={true}/>
                </Field>

                <Field {entity} attribute="name_english" errors={errors.name_english} tipKey="issuerNameEn">
                    <TextInput bind:value={issuer.nameEnglish} error={errors.name_english}
                               placeholder={I18n.t("placeholders.issuer.name")}/>
                </Field>
                <Field {entity} attribute="description_english" errors={errors.description_english}
                       tipKey="issuerDescriptionEn">
                    <TextInput bind:value={issuer.descriptionEnglish} error={errors.description_english} area size="100"
                               placeholder={I18n.t("placeholders.issuer.description")}/>
                </Field>
                <Field {entity} attribute="url_english" errors={errors.url_english} tipKey="issuerURLEn">
                    <TextInput bind:value={issuer.urlEnglish} error={errors.url_english}
                               placeholder={I18n.t("placeholders.issuer.url")}/>
                </Field>
            </div>

            <div slot="nl">
                <Field {entity} attribute="image_dutch" errors={errors.image_dutch} tipKey="issuerImageNl">
                    <File bind:value={issuer.imageDutch} error={errors.image_dutch} removeAllowed={true}/>
                </Field>

                <Field {entity} attribute="name_dutch" errors={errors.name_dutch} tipKey="issuerNameNl">
                    <TextInput bind:value={issuer.nameDutch} error={errors.name_dutch}
                               placeholder={I18n.t("placeholders.issuer.name")}/>
                </Field>
                <Field {entity} attribute="description_dutch" errors={errors.description_dutch}
                       tipKey="issuerDescriptionNl">
                    <TextInput bind:value={issuer.descriptionDutch} error={errors.description_dutch} area size="100"
                               placeholder={I18n.t("placeholders.issuer.description")}/>
                </Field>
                <Field {entity} attribute="url_dutch" errors={errors.url_dutch} tipKey="issuerURLNl">
                    <TextInput bind:value={issuer.urlDutch} error={errors.url_dutch}
                               placeholder={I18n.t("placeholders.issuer.url")}/>
                </Field>
            </div>
            <div slot='after'>
                <Field {entity} attribute="email" errors={errors.email} tipKey="issuerEmail">
                    <TextInput bind:value={issuer.email} error={errors.email}
                               placeholder={I18n.t("placeholders.issuer.email")}/>
                </Field>
            </div>

        </MultiLanguageField>
    </div>
</EntityForm>
