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
    import {status} from "../../util/badgeTags";
    import Button from "../Button.svelte";
    import trash from "../../icons/trash.svg";
    import RadioButton from "../forms/RadioButton.svelte";

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
      email,
      descriptionEnglish,
      descriptionDutch
      imageEnglish,
      imageDutch,
      brin,
      gradingTable,
      awardAllowedInstitutions,
      awardAllowAllInstitutions,
      linkedinOrgIdentifier,
      permissions {
          mayUpdate
      },
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
    let tagUsages = {};
    let newTagValue = null;
    let englishValueError = false;
    let dutchValueError = false;

    onMount(() => {
        queryData(query).then(res => {
            if (!res.currentInstitution.permissions?.mayUpdate) {
                navigate("/");
                return;
            }
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

    const deleteTag = tagName => {
        institutionTags = institutionTags.filter(tag => tag.name !== tagName);
    }

    const actionChanged = (tag, tagStatus) => {
        const tagName = tag.name;
        if ([status.DELETED, status.ARCHIVED].includes(tagStatus)) {
            tagUsage(tagName).then(res => {
                const newTagUsages = {...tagUsages};
                if (isEmpty(res) && tagStatus === status.DELETED) {
                    delete newTagUsages[tagName];
                } else {
                    newTagUsages[tagName] = res;
                }
                tagUsages = newTagUsages;
            })
        } else {
            const newTagUsages = {...tagUsages};
            delete newTagUsages[tagName];
            tagUsages = newTagUsages;
        }
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
            width: 100%;
            display: grid;
            grid-template-columns: 4fr 3fr;
            grid-template-rows: auto;
            grid-row-gap: 1.1em;
            grid-column-gap: 1.5em;
            align-items: center;

            input:disabled {
                background-color: var(--grey-2);
            }

            .radio-buttons {
                display: flex;
                align-items: center;
                justify-content: space-around;
            }

            .trash {
                grid-column: 2 / -1;
                cursor: pointer;

                :global(svg) {
                    width: 22px;
                    height: auto;
                    margin: 5px 0 0 18px;
                    color: var(--red-strong-dark)
                }
            }

            .tag-usage {
                grid-column: 1 / -1;
                color: var(--red-dark);
                font-size: 15px;
                margin-top: -10px;
            }

            .temp-tag-status {
                grid-column: 1 / -1;
            }

            .new-tag {

                margin-bottom: 25px;
            }

            :global(label.container) {
                padding: 0 0 0 35px;
            }

            :global(span.checkmark ) {
                top: -4px;
            }

        }

        em.no-auto-flush {
            display: block;
            margin-top: 8px;
        }

    }

</style>

{#if loaded}
    <EntityForm entityTypeName={entity}
                submit={handleSubmit}
                {processing}>
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
                    <Field {entity} attribute="email"
                           errors={errors.email}
                           tipKey="issuerEmail">
                        <TextInput bind:value={institution.email}
                                   error={errors.email}
                                   placeholder={I18n.t("placeholders.institution.email")}/>
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
                        {#each institutionTags as tag }
                            <input type="text"
                                   value={tag.name}
                                   disabled={true}
                                   class="input-field"
                            />
                            {#if tag.status === status.NEW}
                                <div class="trash" on:click={() => deleteTag(tag.name)}>
                                    {@html trash}
                                </div>
                            {:else}
                                <div class="radio-buttons">
                                    {#each [status.ARCHIVED, status.DELETED, status.ACTIVE] as status}
                                        <RadioButton bind:values={tag.status}
                                                     onChange={() => actionChanged(tag, status)}
                                                     label={I18n.t(`institutionTags.status.${status}`)}
                                                     value={status}/>
                                    {/each}
                                </div>

                            {/if}
                            {#if tagUsages[tag.name]}
                                <div class="tag-usage">
                                    {#if isEmpty(tagUsages[tag.name]) && tag.status === status.ARCHIVED}
                                        <em>{I18n.t("institutionTags.noUsages")}</em>
                                    {:else if !isEmpty(tagUsages[tag.name])}
                                        <em>{I18n.t("institutionTags.usages", {badges: splitListSemantically(tagUsages[tag.name].map(t => t.name), I18n.t("institutionTags.and"))}) }</em>
                                    {/if}
                                </div>
                            {/if}
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
                    </div>
                </Field>
                <Button text={I18n.t("institutionTags.addTag")}
                        disabled={!isEmpty(newTagValue)}
                        action={() => newTagValue = ""}
                />
                <em class="no-auto-flush">
                    {I18n.t("institutionTags.noAutoFlush")}
                </em>
            {/if}
        </div>
    </EntityForm>

{:else}
    <Spinner/>
{/if}
