<script>
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {EntityForm} from "../teachers";
    import indicator from "../../icons/chevron-down-large.svg";
    import {Field, File, TextInput} from "../forms";
    import {queryData} from "../../api/graphql";
    import {editInstitution} from "../../api";
    import {entityType} from "../../util/entityTypes";
    import Spinner from "../Spinner.svelte";
    import I18n from "i18n-js";
    import {toHttpOrHttps} from "../../util/Url";
    import MultiLanguageField from "../forms/MultiLanguageField.svelte";
    import Select from "../forms/Select.svelte";
    import {translateProperties} from "../../util/utils";
    import Creatable from "../forms/Creatable.svelte";

    const entity = entityType.INSTITUTION;
    const query = `query {
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    currentInstitution {
      entityId,
      identifier,
      defaultLanguage,
      nameEnglish,
      nameDutch,
      descriptionEnglish,
      descriptionDutch
      imageEnglish,
      imageDutch,
      brin,
      gradingTable,
      awardAllowedInstitutions,
      awardAllowAllInstitutions,
      linkedinOrgIdentifier,
      tags
    },
  }`;

    let institution = {};
    let publicInstitutions = [];
    let publicInstitutionsChosen = null;
    let errors = {};
    let loaded = false;
    let processing = false;
    let englishValueError = false;
    let dutchValueError = false

    onMount(() => {
        queryData(query).then(res => {
            institution = res.currentInstitution;
            publicInstitutions = res.publicInstitutions.filter(ins => ins.identifier !== institution.identifier);
            publicInstitutions.forEach(ins => translateProperties(ins));
            if (institution.awardAllowAllInstitutions) {
                publicInstitutionsChosen = [...publicInstitutions];
            } else {
                publicInstitutionsChosen = institution.awardAllowedInstitutions.length > 0 ?
                    publicInstitutions.filter(ins => institution.awardAllowedInstitutions.includes(ins.identifier)) : null;
            }
            loaded = true;
        });
    });

    const addValues = values => {
        const uniqueValues = [...new Set(institution.tags.concat(values))];
        institution = {...institution, tags: uniqueValues};
    }
    const removeValue = value => {
        const newTags = institution.tags.filter(tag => tag !== value);
        institution = {...institution, tags: newTags};
    }

    function handleSubmit() {
        errors = {};
        processing = true;
        institution.grading_table = toHttpOrHttps(institution.gradingTable);
        institution.description_english = institution.descriptionEnglish;
        institution.description_dutch = institution.descriptionDutch;
        institution.name_english = institution.nameEnglish;
        institution.name_dutch = institution.nameDutch;
        institution.image_english = institution.imageEnglish;
        institution.image_dutch = institution.imageDutch;
        institution.award_allowed_institutions = publicInstitutionsChosen ? publicInstitutionsChosen.map(ins => ins.id) : [];
        institution.tags = institution.tags.map(tag => ({name: tag}));
        institution.linkedin_org_identifier = institution.linkedinOrgIdentifier;
        if (!institution.image) {
            delete institution.image;
        }
        editInstitution(institution.entityId, institution)
            .then(() => navigate(`/manage/institution`))
            .catch(err => err.then(({fields}) => {
                errors = fields.error_message;
                processing = false;

                if (errors.image_english || errors.name_english || errors.description_english) {
                    englishValueError = true;
                } else {
                    englishValueError = false;
                }
                if (errors.image_dutch || errors.name_dutch || errors.description_dutch) {
                    dutchValueError = true;
                } else {
                    dutchValueError = false;
                }

            }));
    }
</script>
<style>
    .institution-form {
        max-width: 780px;
    }
</style>

{#if loaded}
    <EntityForm entityTypeName={entity} submit={handleSubmit} {processing}>
        <div class="institution-form">
            <MultiLanguageField errorEnglish={englishValueError} errorDutch={dutchValueError}
                                initialTab={institution.defaultLanguage == 'en-US'? "en" : "nl"}>
                <div slot='en'>
                    <Field {entity} attribute="image_english" errors={errors.image_english} tipKey="institutionImageEn">
                        <File bind:value={institution.imageEnglish} error={errors.image_english} removeAllowed={false}/>
                    </Field>
                    <Field {entity} attribute="name_english" errors={errors.name_english} tipKey="institutionNameEn">
                        <TextInput bind:value={institution.nameEnglish} error={errors.name_english}
                                   placeholder={I18n.t("placeholders.institution.name")}/>
                    </Field>
                    <Field {entity} attribute="description_english" errors={errors.description_english}
                           tipKey="institutionDescriptionEn">
                        <TextInput
                                bind:value={institution.descriptionEnglish}
                                error={errors.description_english}
                                placeholder={I18n.t("placeholders.institution.description")}
                                size="100"
                                area/>
                    </Field>
                </div>
                <div slot='nl'>
                    <Field {entity} attribute="image_dutch" errors={errors.image_dutch} tipKey="institutionImageNl">
                        <File bind:value={institution.imageDutch} error={errors.image_dutch} removeAllowed={false}/>
                    </Field>
                    <Field {entity} attribute="name_dutch" errors={errors.name_dutch} tipKey="institutionNameNl">
                        <TextInput bind:value={institution.nameDutch} error={errors.name}
                                   placeholder={I18n.t("placeholders.institution.name")}/>
                    </Field>
                    <Field {entity} attribute="description_dutch" errors={errors.description_dutch}
                           tipKey="institutionDescriptionNl">
                        <TextInput
                                bind:value={institution.descriptionDutch}
                                error={errors.description_dutch}
                                placeholder={I18n.t("placeholders.institution.description")}
                                size="100"
                                area/>
                    </Field>
                </div>
                <div slot='after'>
                    <Field {entity} attribute="brin" errors={errors.brin} tipKey="institutionBrin">
                        <TextInput
                                bind:value={institution.brin}
                                error={errors.brin}
                                placeholder={I18n.t("placeholders.institution.brin")}
                                disabled={true}/>
                    </Field>

                    <Field {entity} attribute="grading_table" errors={errors.grading_table}
                           tipKey="institutionGradingTable">
                        <TextInput
                                bind:value={institution.gradingTable}
                                placeholder={I18n.t("placeholders.institution.gradingTable")}
                                error={errors.grading_table}/>
                    </Field>
                    <Field {entity}
                           attribute="linkedin_org_identifier"
                           errors={errors.linkedin_org_identifier}
                           tipKey="institutionLinkedinOrgIdentifier">
                        <TextInput
                                bind:value={institution.linkedinOrgIdentifier}
                                placeholder={I18n.t("placeholders.institution.linkedinOrgIdentifier")}
                                error={errors.linkedin_org_identifier}/>
                    </Field>
                </div>
            </MultiLanguageField>
            <Field {entity} attribute="award_allowed_institutions" errors={errors.award_allowed_institutions}
                   tipKey="institutionAwardAllowedInstitutions">
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
            {#if !processing}
                <Field {entity}
                       attribute="badge_class_tags"
                       errors={errors.badge_class_tags}
                       tipKey="institutionBadgeClassTags">
                    <Creatable addValues={addValues}
                               removeValue={removeValue}
                               values={institution.tags}
                               placeholder={I18n.t("newBadgeClassForm.tagsPlaceholder")}
                    />

                </Field>
            {/if}
        </div>
    </EntityForm>

{:else}
    <Spinner/>
{/if}
