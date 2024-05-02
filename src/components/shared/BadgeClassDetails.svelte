<script>
    import I18n from "i18n-js";
    import moment from "moment";

    import {
        ects,
        educationProgramIdentifier,
        eqf,
        extensionValue,
        language,
        learningOutcome,
        studyLoad,
        timeInvestment
    } from "../extensions/badges/extensions";
    import {onMount} from "svelte";
    import {fallBackValue} from "../../util/forms";
    import languageIcon from "../../icons/messages-bubble-square-text.svg";
    import schoolTrophyIcon from "../../icons/school-book-trophy.svg";
    import badgeIcon from "../../icons/badgeclass.svg";
    import issuedIcon from "../../icons/issued.svg";
    import calendarIcon from "../../icons/calendar-1.svg";
    import participationIcon from "../../icons/forms/presentation-audience.svg";
    import stackableIcon from "../../icons/overview.svg";
    import supervisionIcon from "../../icons/forms/focus-eye.svg";
    import assessmentIcon from "../../icons/forms/checklist.svg";
    import programmeIcon from "../../icons/forms/certified-diploma-1.svg";
    import awardIcon from "../../icons/award-ribbon-star-1.svg";
    import gradeIcon from "../../icons/award-ribbon-star-1.svg";
    import expiredIcon from "../../icons/connections.svg";
    import {isEmpty, translateBadgeClassProperties, translateProperties} from "../../util/utils";
    import MarkdownField from "../forms/MarkdownField.svelte";
    import Endorsement from "../teachers/endorsements/Endorsement.svelte";
    import {endorsementStatus} from "../../util/endorsements";
    import {config} from "../../util/config";
    import Spinner from "../Spinner.svelte";

    export let badgeclass;
    export let publicInstitutions;
    export let badge;

    let cutoffInstitutionThreshold = 5;
    let showAllInstitutions = false;
    let showEndorsementDetails = [];
    let endorsementsAccepted = [];
    let loading = true;

    onMount(() => {
        //The component is used by public pages where the data structure is different
        if (!badgeclass.ignoreExtensions) {
            let identifiers = extensionValue(badgeclass.extensions, educationProgramIdentifier);
            if (!isEmpty(identifiers) && !Array.isArray(identifiers)) {
                identifiers = [identifiers]
            }
            badgeclass.educationProgramIdentifier = identifiers;
            badgeclass.learningOutcome = extensionValue(badgeclass.extensions, learningOutcome);
            badgeclass.eqf = extensionValue(badgeclass.extensions, eqf);
            badgeclass.studyLoad = extensionValue(badgeclass.extensions, studyLoad);
            badgeclass.timeInvestment = extensionValue(badgeclass.extensions, timeInvestment);
            badgeclass.ects = extensionValue(badgeclass.extensions, ects);
            badgeclass.language = extensionValue(badgeclass.extensions, language);
        }
        if (publicInstitutions) {
            publicInstitutions.forEach(ins => translateProperties(ins))
        }
        if (badgeclass.awardAllowedInstitutions && publicInstitutions) {
            badgeclass.awardAllowedInstitutions = badgeclass.awardAllowedInstitutions
                .map(identifier => publicInstitutions.find(ins => ins.identifier === identifier))
                .sort((a, b) => a.name.localeCompare(b.name));
        }
        badgeclass.studyLoadValue = badgeclass.studyLoad ? I18n.t("teacher.badgeclasses.hours", {value: badgeclass.studyLoad}) : badgeclass.ects ?
            I18n.t("teacher.badgeclasses.ects", {value: badgeclass.ects}) : null;
        badgeclass.timeInvestmentValue = badgeclass.timeInvestment ? I18n.t("teacher.badgeclasses.hours", {value: badgeclass.timeInvestment}) : null;
        if (badgeclass.endorsements) {
            badgeclass.endorsements.forEach(endorsement => translateBadgeClassProperties(endorsement.endorser));
            endorsementsAccepted = badgeclass.endorsements.filter(e => e.status.toLowerCase() === endorsementStatus.ACCEPTED);
        }
        loading = false;
    });

    const toggleEndorsement = index => {
        const newShowEndorsementDetails = [...showEndorsementDetails];
        newShowEndorsementDetails[index] = !newShowEndorsementDetails[index];
        showEndorsementDetails = newShowEndorsementDetails;
        // Force re-render
        badgeclass = {...badgeclass}
    }

    const getSuperVisionOption = () => {
        if (badgeclass.assessmentSupervised && badgeclass.assessmentIdVerified) {
            return "o1";
        }
        if (badgeclass.assessmentSupervised && !badgeclass.assessmentIdVerified) {
            return "o1";
        }
        if (!badgeclass.assessmentSupervised && badgeclass.assessmentIdVerified) {
            return "o1";
        }
        return "o4";
    }

</script>

<style lang="scss">

    div.badge-class-detail-container {
        display: flex;

        .badge-class-detail {
            min-width: 55%;
            padding-right: 25px;
        }

        :global(div.group-item svg) {
            width: 24px;
            height: auto;
        }

        .right-side-nav {
            display: flex;
            flex-direction: column;
            min-width: 30%;
            margin-left: auto;
            padding-left: 25px;

            div.group-items {
                display: flex;
                flex-direction: column;
                width: 100%;

                h3 {
                    margin-bottom: 0;
                    padding-top: 0;

                    .not-last {
                        margin-top: 25px;
                    }
                }
            }

            div.group-item {
                display: flex;
                padding: 20px 0;

                &:not(:last-child) {
                    border-bottom: 1px solid var(--grey-4);
                }

                section.items {
                    display: flex;
                    flex-direction: column;
                    margin-left: 22px;
                    gap: 6px;

                    span {
                        &.name {
                            font-size: 15px;
                            color: var(--grey-7);
                        }

                        &.value {
                            font-weight: bold;
                        }
                    }
                }

            }

        }

    }

    @media (max-width: 1120px) {
        div.badge-class-detail-container {
            flex-direction: column;

            .group-items {
                margin-left: 0;
                margin-top: 20px;
                padding-left: 0;
            }
        }

    }


    h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 12px;
        padding-top: 15px;

        &.border {
            border-top: 1px solid var(--purple-2);
        }

    }

    h4 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 6px;
    }

    .info {
        margin-bottom: 15px;
        word-break: break-all;
    }

    .sub-info {
        margin-bottom: 12px;
        word-break: break-all;
    }

    section.alignments, section.endorsements {
        margin-top: 10px;
        padding-top: 10px;
    }

    h2.black-header {
        margin-bottom: 25px;
    }


    section.endorsement {
        margin-top: 15px;
        padding: 15px;
        border: 1px solid var(--grey-5);
        box-shadow: 0 1px 1px var(--grey-5);
        border-radius: 8px;
    }

    section.alignment {
        margin-top: 7px;
        padding-top: 8px;
        border-bottom: 1px dotted var(--purple-2);

        span.name {
            font-weight: bold;
        }
    }

    .black-header {
        color: var(--black);
        margin: 0;
    }

    table.alignment-table {
        width: 100%;
        margin: 10px 0;

        td.key {
            width: 25%;
        }

        td.value {
            width: 75%;
        }

        border-spacing: 0;

    }

    .quality-assurance {
        display: flex;
        flex-direction: column;
        gap: 10px;

        span {
            font-weight: bold;
        }
    }

    @media (max-width: 1120px) {
        .badge-class-detail {
            padding: 30px 0 !important;
        }
    }
</style>

<div class="slots">
    <slot/>
</div>
{#if loading}
    <Spinner/>
{:else}
    <div class="badge-class-detail-container">
        <div class="badge-class-detail">
            <h2 class="black-header">{I18n.t('models.badgeclass.about')}</h2>

            <div class="info markdown-body">
                <MarkdownField value={badgeclass.description} disabled={true}/>
            </div>
            <h3>{I18n.t('models.badgeclass.learningOutcome')}</h3>
            <div class="info markdown-body">
                <MarkdownField value={fallBackValue(badgeclass.learningOutcome)} disabled={true}/>
            </div>
            <h3>{I18n.t('models.badgeclass.criteria_text')}</h3>
            {#if badgeclass.criteriaText}
                <div class="info markdown-body">
                    <MarkdownField value={fallBackValue(badgeclass.criteriaText)} disabled={true}/>
                </div>
            {/if}
            {#if badgeclass.qualityAssuranceName || badgeclass.qualityAssuranceUrl || badgeclass.qualityAssuranceDescription}
                <h3 class="border">{I18n.t('newBadgeClassForm.form.qualityAssurance')}</h3>
                <div class="quality-assurance">
                    {#if badgeclass.qualityAssuranceName}
                        <div>
                            <span>{badgeclass.qualityAssuranceName}</span>
                            {#if badgeclass.qualityAssuranceUrl}
                                <a href="{badgeclass.qualityAssuranceUrl}"
                                   target="_blank">{I18n.t("newBadgeClassForm.link") }</a>
                            {/if}
                        </div>
                    {/if}
                    {#if badgeclass.qualityAssuranceDescription}
                        <div class="info markdown-body">
                            <MarkdownField value={fallBackValue(badgeclass.qualityAssuranceDescription)}
                                           disabled={true}/>
                        </div>
                    {/if}

                </div>
            {/if}

            {#if endorsementsAccepted.length > 0 && config.features.endorsements}
                <section class="endorsements">
                    <h3 class="black-header">
                        {badgeclass.endorsements.length > 1 ? I18n.t("models.badgeclass.endorsementMultiple") : I18n.t("models.badgeclass.endorsement")}
                    </h3>
                    {#each endorsementsAccepted as endorsement, index}
                        <section class="endorsement">
                            <Endorsement endorsement={endorsement}
                                         toggleEndorsement={() => toggleEndorsement(index)}
                                         showDetails={showEndorsementDetails[index]}/>
                        </section>
                    {/each}
                </section>
            {/if}
            {#if badgeclass.alignments && badgeclass.alignments.length > 0}
                <section class="alignments">
                    <h3 class="border">
                        {badgeclass.alignments.length > 1 ? I18n.t("models.badgeclass.alignmentMultiple") : I18n.t("models.badgeclass.alignment")}
                    </h3>
                    {#each badgeclass.alignments as alignment}
                        <section class="alignment">
                            <div>
                                <span class="name">{alignment.targetName}</span>
                                {#if alignment.targetUrl}
                                    <a href="{alignment.targetUrl}"
                                       target="_blank">{I18n.t("newBadgeClassForm.link") }</a>
                                {/if}
                                <table class="alignment-table">
                                    <thead/>
                                    <tbody>
                                    {#if alignment.targetFramework}
                                        <tr>
                                            <td class="key">{I18n.t('models.badgeclass.alignmentFramework')}:</td>
                                            <td class="value">{alignment.targetFramework}</td>
                                        </tr>
                                    {/if}
                                    {#if alignment.targetCode}
                                        <tr>
                                            <td class="key">{I18n.t('models.badgeclass.alignmentCode')}:</td>
                                            <td class="value">{alignment.targetCode}</td>
                                        </tr>
                                    {/if}
                                    </tbody>
                                </table>
                                {#if alignment.targetDescription}
                                    <div class="sub-info markdown-body">
                                        <MarkdownField value={alignment.targetDescription} disabled={true}/>
                                    </div>
                                {/if}
                            </div>
                        </section>
                    {/each}
                </section>

            {/if}
        </div>
        <div class="right-side-nav">
            {#if badge}
                <div class="group_items">
                    <h3>{I18n.t("newBadgeClassForm.badge")}</h3>
                    {#if !isEmpty(badge.issuedOn)}
                        <div class="group-item">
                            {@html issuedIcon}
                            <section class="items">
                                <span class="name">{I18n.t("models.badge.issuedOn")}</span>
                                <span class="value">{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
                            </section>
                        </div>
                    {/if}
                    {#if !isEmpty(badge.entityId)}
                        <div class="group-item">
                            {@html expiredIcon}
                            <section class="items">
                                <span class="name">{I18n.t("models.badge.expires")}</span>
                                <span class="value">{badge.expiresAt ? moment(badge.expiresAt).format('MMM D, YYYY') : I18n.t("models.badge.expiresNever")}</span>
                            </section>
                        </div>
                    {/if}
                    {#if !isEmpty(badge.gradeAchieved)}
                        <div class="group-item">
                            {@html gradeIcon}
                            <section class="items">
                                <span class="name">{I18n.t("models.badge.grade")}</span>
                                <span class="value">{badge.gradeAchieved}</span>
                            </section>
                        </div>
                    {/if}
                </div>
            {/if}
            <div class="group_items">
                <h3 class="margin-top">{I18n.t("newBadgeClassForm.programme")}</h3>
                {#if badgeclass.typeBadgeClass}
                    <div class="group-item">
                        {@html badgeIcon}
                        <section class="items">
                            <span class="name">{I18n.t("newBadgeClassForm.badgeClassType")}</span>
                            <span class="value">{I18n.t(`newBadgeClassForm.modal.types.${badgeclass.typeBadgeClass}`)}</span>
                        </section>
                    </div>
                {/if}
                {#if badgeclass.studyLoadValue}
                    <div class="group-item">
                        {@html schoolTrophyIcon}
                        <section class="items">
                            <span class="name">{I18n.t("teacher.badgeclasses.studyLoad")}</span>
                            <span class="value">{fallBackValue(badgeclass.studyLoadValue)}</span>
                        </section>
                    </div>
                {/if}
                <div class="group-item">
                    {@html languageIcon}
                    <section class="items">
                        <span class="name">{I18n.t('models.badgeclass.language')}</span>
                        <span class="value">{I18n.t(`language.${badgeclass.language || "en_EN"}`)}</span>
                    </section>
                </div>
                {#if badgeclass.timeInvestmentValue}
                    <div class="group-item">
                        {@html schoolTrophyIcon}
                        <section class="items">
                            <span class="name">{I18n.t('models.badgeclass.timeInvestment')}</span>
                            <span class="value">{fallBackValue(badgeclass.timeInvestmentValue)}</span>
                        </section>
                    </div>
                {/if}
                {#if !isEmpty(badgeclass.educationProgramIdentifier) &&
                !badgeclass.educationProgramIdentifier.every(identifier => isEmpty(identifier))}
                    <div class="group-item">
                        {@html programmeIcon}
                        <section class="items">
                            <span class="name">{I18n.t('models.badgeclass.educationProgramIdentifierLong')}</span>
                            {#each badgeclass.educationProgramIdentifier as educationProgramIdentifier}
                                <span class="value">{fallBackValue(educationProgramIdentifier)}</span>
                            {/each}
                        </section>
                    </div>
                {/if}
                {#if !isEmpty(badgeclass.eqf)}
                    <div class="group-item">
                        {@html calendarIcon}
                        {#if badgeclass.eqf}
                            <section class="items">
                                <span class="name">{I18n.t("teacher.badgeclasses.educationProgramIdentifier")}</span>
                                <span class="value">{`EQF ${badgeclass.eqf}`}</span>
                            </section>
                        {/if}
                    </div>
                {/if}
                {#if badgeclass.participation}
                    <div class="group-item">
                        {@html participationIcon}
                        <section class="items">
                            <span class="name">{I18n.t("newBadgeClassForm.form.participation.name")}</span>
                            <span class="value">{I18n.t(`newBadgeClassForm.form.participation.options.${badgeclass.participation}`)}</span>
                        </section>
                    </div>
                {/if}
                {#if badgeclass.stackable !== undefined}
                    <div class="group-item">
                        {@html stackableIcon}
                        <section class="items">
                            <span class="name">{I18n.t("newBadgeClassForm.stackable")}</span>
                            <span class="value">{I18n.t(`newBadgeClassForm.form.stackable.${badgeclass.stackable ? "stackable" : "notStackable"}`)}</span>
                        </section>
                    </div>
                {/if}
                {#if publicInstitutions && badgeclass.awardAllowedInstitutions && badgeclass.awardAllowedInstitutions.length > 0}
                    <div class="group-item">
                        {@html awardIcon}
                        <section class="items">
                            <span class="name">{I18n.t("teacher.badgeclasses.awardAllowedInstitutions")}</span>
                            {#each badgeclass.awardAllowedInstitutions as institution, i }
                                {#if i < cutoffInstitutionThreshold || showAllInstitutions}
                                    <span class="value">{institution.name}</span>
                                {/if}
                            {/each}
                            {#if badgeclass.awardAllowedInstitutions.length > cutoffInstitutionThreshold}
                                <a href="/"
                                   on:click|preventDefault|stopPropagation={() => showAllInstitutions = !showAllInstitutions}>
                                    {I18n.t(`teacher.badgeclasses.${showAllInstitutions ? "showLessInstitutions" : "showMoreInstitutions"}`)}
                                </a>
                            {/if}
                        </section>
                    </div>
                {/if}
            </div>
            {#if !isEmpty(badgeclass.assessmentType) || badgeclass.gradeAchievedRequired !== undefined}
                <h3 class="margin-top">{I18n.t("newBadgeClassForm.assessment")}</h3>
            {/if}
            {#if badgeclass.gradeAchievedRequired !== undefined}
                <div class="group-item">
                    {@html gradeIcon}
                    <section class="items">
                        <span class="name">{I18n.t("newBadgeClassForm.form.gradeAchieved.name")}</span>
                        <span class="value">{I18n.t(`newBadgeClassForm.form.gradeAchieved.${badgeclass.gradeAchievedRequired ? "yes" : "no"}`)}</span>
                    </section>
                </div>
            {/if}
            {#if !isEmpty(badgeclass.assessmentType)}
                <div class="group_items">
                    <div class="group-item">
                        {@html assessmentIcon}
                        <section class="items">
                            <span class="name">{I18n.t("newBadgeClassForm.form.assessment.name")}</span>
                            {#each badgeclass.assessmentType.split(",").sort() as type}
                                <span class="value">{I18n.t(`newBadgeClassForm.form.assessment.options.${type}`)}</span>
                            {/each}
                        </section>
                    </div>
                    <div class="group-item">
                        {@html supervisionIcon}
                        <section class="items">
                            <span class="value">{I18n.t(`newBadgeClassForm.form.assessment.supervisionOptions.${getSuperVisionOption()}`)}</span>
                        </section>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}
