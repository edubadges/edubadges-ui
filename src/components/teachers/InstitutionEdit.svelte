<script>
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {EntityForm} from "../teachers";
    import indicator from "../../icons/chevron-down-large.svg";
    import {Field, File, TextInput} from "../forms";
    import {queryData} from "../../api/graphql";
    import {editInstitution, tagUsage} from "../../api";
    import {entityType} from "../../util/entityTypes";
    import Spinner from "../Spinner.svelte";
    import I18n from "i18n-js";
    import {toHttpOrHttps} from "../../util/Url";
    import MultiLanguageField from "../forms/MultiLanguageField.svelte";
    import Select from "../forms/Select.svelte";
    import {isEmpty, splitListSemantically, translateProperties} from "../../util/utils";
    import Creatable from "../forms/Creatable.svelte";
    import {actions, convertActionToStatus, status, tagActions} from "../../util/badgeTags";
    import Button from "../Button.svelte";

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
      tags {
        id,
        name,
        archived
      }
    },
  }`;

    let institution = {};
    let publicInstitutions = [];
    let publicInstitutionsChosen = null;
    let errors = {};
    let loaded = false;
    let processing = false;
    let institutionTags = [];
    let actionValues = [];
    let tagUsages = {};
    let newTagValue = null;
    let englishValueError = false;
    let dutchValueError = false;

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
            institutionTags = institution.tags
                .map(tag => ({
                    id: tag.id,
                    name: tag.name,
                    status: tag.archived ? status.ARCHIVED : status.ACTIVE
                }))
                .sort((t1, t2) => t1.name.localeCompare(t2.name));
            loaded = true;
        });
    });

    const addValue = e => {
        const value = e.target.value;
        const existing = institutionTags.find(tag => tag.name === value);
        //Only add a new tag if the value is unique
        if (!existing && !isEmpty(value)) {
            const newInstitutionTags = [...institutionTags];
            newInstitutionTags.push({name: value, status: status.NEW});
            institutionTags = newInstitutionTags;
        }
        newTagValue = null;
    }

    const actionChanged = (action, tag) => {
        const tagName = tag.name;
        if (["delete", "archive"].includes(action) && tag.status !== status.NEW) {
            tagUsage(tagName).then(res => {
                const newTagUsages = {...tagUsages};
                newTagUsages[tagName] = res;
                tagUsages = newTagUsages;
            })
        } else {
            const newTagUsages = {...tagUsages};
            delete newTagUsages[tagName];
            tagUsages = newTagUsages;
        }
        let newTags = [...institutionTags];
        const selectedTag = newTags.find(tag => tag.name === tagName);
        if (action === actions.DELETE && selectedTag.status === status.NEW) {
            newTags = newTags.filter(tag => tag !== selectedTag);
        } else {
            selectedTag.status = convertActionToStatus(action);
        }
        institutionTags = newTags;
        setTimeout(() => actionValues = [], 75);
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
        institution.linkedin_org_identifier = institution.linkedinOrgIdentifier;
        institution.tags = institutionTags;
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
<style lang="scss">
    .institution-form {
        max-width: 780px;

        :global(div.field) {
            margin-bottom: 20px;
        }

        .institution-tag-container {

            .institution-tag {
                margin-bottom: 25px;
            }

            .institution-tag-inner {
                display: flex;
                width: 100%;
                gap: 25px;


                input {
                    background-color: var(--grey-2);
                }

                .select-field {
                    width: 50%;
                }

                div.status {
                    display: flex;
                    padding: 4px;
                    width: 35%;

                    span {
                        display: inline-block;
                        margin: auto;
                        padding: 4px 8px;
                        border-radius: 16px;
                        word-break: keep-all;

                        &.new {
                            color: var(--purple-3);
                            border: 1px solid var(--purple-3);
                        }

                        &.active {
                            color: var(--green-medium);
                            border: 1px solid var(--green-medium);
                        }

                        &.archived {
                            color: var(--grey-8);
                            border: 1px solid var(--grey-8);
                        }

                        &.deleted {
                            color: var(--red-strong-dark);
                            border: 1px solid var(--red-strong-dark);
                        }
                    }

                }
            }

            .tag-usage em {
                color: var(--red-dark);
                font-size: 15px;
                display: inline-block;
                margin-top: 10px;
            }

            .new-tag {
                margin-bottom: 25px;
            }
        }
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
                    <div class="institution-tag-container">
                        {#each institutionTags as tag, index }
                            <div class="institution-tag">
                                <div class="institution-tag-inner">
                                    <input type="text"
                                           value={tag.name}
                                           disabled={true}
                                           class="input-field"
                                    />
                                    <Select value={actionValues[index]}
                                            clearable={false}
                                            placeholder={I18n.t("institutionTags.action")}
                                            items={tagActions(tag).map(action => ({name: I18n.t(`institutionTags.actions.${action}`), value: action}))}
                                            handleSelect={item => actionChanged(item.value, tag)}
                                    />
                                    <div class="status">
                                        <span class={tag.status}>{I18n.t(`institutionTags.status.${tag.status}`)}</span>
                                    </div>
                                </div>
                                {#if tagUsages[tag.name]}
                                    <div class="tag-usage">
                                        {#if isEmpty(tagUsages[tag.name]) && tag.status === status.ARCHIVED}
                                            <em>{I18n.t("institutionTags.noUsages")}</em>
                                        {:else if !isEmpty(tagUsages[tag.name])}
                                            <em>{I18n.t("institutionTags.usages", {badges: splitListSemantically(tagUsages[tag.name].map(t => t.name), I18n.t("institutionTags.and"))}) }</em>
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                        {#if newTagValue !== null}
                            <div class="new-tag">
                                <TextInput bind={newTagValue}
                                           onBlur={addValue}
                                           init={e => e.focus()}
                                           onKeyPress={e => e.key === "Enter" && addValue(e)}
                                />
                            </div>
                        {/if}

                        <Button text={I18n.t("institutionTags.addTag")}
                                disabled={!isEmpty(newTagValue)}
                                action={() => newTagValue = ""}
                        />
                        <p class="no-auto-flush">
                            {I18n.t("institutionTags.noAutoFlush")}
                        </p>

                    </div>
                </Field>
            {/if}
        </div>
    </EntityForm>

{:else}
    <Spinner/>
{/if}
