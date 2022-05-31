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
    import calendarIcon from "../../icons/calendar-1.svg";
    import awardIcon from "../../icons/award-ribbon-star-1.svg";
    import {translateProperties} from "../../util/utils";
    import MarkdownField from "../forms/MarkdownField.svelte";
    import Endorsement from "../teachers/Endorsement.svelte";

    export let badgeclass;
    export let publicInstitutions;
    export let badge;

    let cutoffInstitutionThreshold = 5;
    let showAllInstitutions = false;
    let showFrameworkDescriptions = [];
    let showEndorsementDetails = [];

    onMount(() => {
        //The component is used by public pages where the data structure is different
        if (!badgeclass.ignoreExtensions) {
            badgeclass.educationProgramIdentifier = extensionValue(badgeclass.extensions, educationProgramIdentifier);
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
        if (badgeclass.alignments && badgeclass.alignments.length > 0) {
            showFrameworkDescriptions = Array(badgeclass.alignments.length).fill(true);
        }
    });

    const toggleAlignment = index => {
        const newShowFrameworkDescriptions = [...showFrameworkDescriptions];
        newShowFrameworkDescriptions[index] = !newShowFrameworkDescriptions[index];
        showFrameworkDescriptions = newShowFrameworkDescriptions;
        // Force re-render
        badgeclass = {...badgeclass}
    }

    const toggleEndorsement = index => {
        const newShowEndorsementDetails = [...showEndorsementDetails];
        newShowEndorsementDetails[index] = !newShowEndorsementDetails[index];
        showEndorsementDetails = newShowEndorsementDetails;
        // Force re-render
        badgeclass = {...badgeclass}
    }

    const alignmentDescription = (alignment, index) => {
        return showFrameworkDescriptions[index] ? "" : fallBackValue(alignment.targetDescription);
    }
</script>

<style lang="scss">

  section.study-load :global(svg) {
    width: 22px;
    height: 22px;
  }

  div.badge-class-detail-container {
    display: flex;

    .badge-class-detail {
      min-width: 55%;
    }

    .right-side-nav {
      margin-left: auto;
      min-width: 30%;
      padding-left: 25px;

      section.study-load {
        display: flex;
        padding: 20px 0;

        &:not(:last-child) {
          border-bottom: 1px solid var(--grey-4);
        }

        div.no-icon {
          padding-left: 22px;
        }

        div {
          display: flex;
          flex-direction: column;

          h3, span {
            margin: 0 0 10px 0;
          }

          margin-left: 25px;
        }
      }

    }

  }

  @media (max-width: 1120px) {
    div.badge-class-detail-container {
      flex-direction: column;

      .right-side-nav {
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
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .info {
    margin-bottom: 30px;
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


  section.alignment, section.endorsement {
    margin-top: 15px;
    padding: 15px;
    border: 1px solid var(--grey-5);
    box-shadow: 0 1px 1px var(--grey-5);
    border-radius: 8px;
  }

  .black-header {
    color: var(--black);
    margin: 0;
  }

  .alignment-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;

    h4 {
      margin: 10px 0 0 0;
    }

    div.vertical {
      background-color: var(--grey-3);
      max-width: 1px;
    }
  }

  .alignment-item {
    &.alignmentCode {
      width: 25%;
    }

    &.alignmentFramework {
      width: 20%;
    }

    &.alignmentUrl {
      width: 45%;
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
        {#if badgeclass.criteriaUrl}
            <p class="green">
                <a href={badgeclass.criteriaUrl} target="_blank" rel="noreferrer noopener">
                    {badgeclass.criteriaUrl}
                </a>
            </p>
        {/if}
        {#if badgeclass.endorsements && badgeclass.endorsements.length > 0}
            <section class="endorsements">
                <h3 class="black-header">
                    {badgeclass.endorsements.length > 1 ? I18n.t("models.badgeclass.endorsementMultiple") : I18n.t("models.badgeclass.endorsement")}
                </h3>
                {#each badgeclass.endorsements as endorsement, index}
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
                <h3 class="black-header">
                    {badgeclass.alignments.length > 1 ? I18n.t("models.badgeclass.alignmentMultiple") : I18n.t("models.badgeclass.alignment")}
                </h3>
                {#each badgeclass.alignments as alignment, index}
                    <section class="alignment">
                        <h4 class="black-header">{alignment.targetName}</h4>
                        <div class="alignment-container">
                            <div class="alignment-item alignmentCode">
                                <h4>{I18n.t('models.badgeclass.alignmentCode')}</h4>
                                <span>{alignment.targetCode}</span>
                            </div>
                            <div class="vertical">&nbsp;</div>
                            <div class="alignment-item alignmentFramework">
                                <h4>{I18n.t('models.badgeclass.alignmentFramework')}</h4>
                                <span>{alignment.targetFramework}</span>
                            </div>
                            <div class="vertical">&nbsp;</div>
                            <div class="alignment-item alignmentUrl">
                                <h4>{I18n.t('models.badgeclass.alignmentUrl')}</h4>
                                {#if alignment.targetUrl}
                                    <a href="{alignment.targetUrl}" target="_blank">{alignment.targetUrl}</a>
                                {:else}
                                    <span>-</span>
                                {/if}
                            </div>
                        </div>
                        {#if alignment.targetDescription}
                            <div class="sub-info markdown-body">
                                <MarkdownField value={alignmentDescription(alignment, index)} disabled={true}/>
                            </div>
                            <a href="/toggle"
                               on:click|preventDefault|stopPropagation={() => toggleAlignment(index)}>
                                {I18n.t(`toggle.${showFrameworkDescriptions[index] ? "showMore" : "showLess"}`) }
                            </a>
                        {/if}
                    </section>
                {/each}
            </section>

        {/if}
    </div>
    <div class="right-side-nav">
        {#if badge}
            <section class="study-load">
                <div class="no-icon">
                    <h3>{I18n.t("models.badge.issuedOn")}</h3>
                    <span>{moment(badge.issuedOn).format('MMM D, YYYY')}</span>
                </div>
            </section>
            <section class="study-load">
                <div class="no-icon">
                    <h3>{I18n.t("models.badge.expires")}</h3>
                    <span>{badge.expiresAt ? moment(badge.expiresAt).format('MMM D, YYYY') : I18n.t("models.badge.expiresNever")}</span>
                </div>
            </section>
        {/if}
        <section class="study-load">
            {@html languageIcon}
            <div>
                <h3>{I18n.t('models.badgeclass.language')}</h3>
                <span>
                    {I18n.t(`language.${badgeclass.language || "en_EN"}`)}
                </span>
            </div>
        </section>
        {#if badgeclass.studyLoadValue}
            <section class="study-load">
                {@html schoolTrophyIcon}
                <div>
                    <h3>{I18n.t("teacher.badgeclasses.studyLoad")}</h3>
                    <span>{fallBackValue(badgeclass.studyLoadValue)}</span>
                </div>
            </section>
        {/if}
        {#if badgeclass.timeInvestmentValue}
            <section class="study-load">
                {@html schoolTrophyIcon}
                <div>
                    <h3>{I18n.t("teacher.badgeclasses.timeInvestment")}</h3>
                    <span>{fallBackValue(badgeclass.timeInvestmentValue)}</span>
                </div>
            </section>
        {/if}
        {#if badgeclass.educationProgramIdentifier || badgeclass.eqf}
            <section class="study-load">
                {@html calendarIcon}
                <div>
                    <h3>{I18n.t("teacher.badgeclasses.educationProgramIdentifier")}</h3>
                    {#if badgeclass.educationProgramIdentifier}
                        <span>{fallBackValue(badgeclass.educationProgramIdentifier)}</span>
                    {/if}
                    {#if badgeclass.eqf}
                        <span>{`EQF ${badgeclass.eqf}`}</span>
                    {/if}
                </div>
            </section>
        {/if}
        {#if publicInstitutions && badgeclass.awardAllowedInstitutions && badgeclass.awardAllowedInstitutions.length > 0}
            <section class="study-load">
                {@html awardIcon}
                <div>
                    <h3>{I18n.t("teacher.badgeclasses.awardAllowedInstitutions")}</h3>
                    {#each badgeclass.awardAllowedInstitutions as institution, i }
                        {#if i < cutoffInstitutionThreshold || showAllInstitutions}
                            <span>{institution.name}</span>
                        {/if}
                    {/each}
                    {#if badgeclass.awardAllowedInstitutions.length > cutoffInstitutionThreshold}
                        <a href="/"
                           on:click|preventDefault|stopPropagation={() => showAllInstitutions = !showAllInstitutions}>
                            {I18n.t(`teacher.badgeclasses.${showAllInstitutions ? "showLessInstitutions" : "showMoreInstitutions"}`)}
                        </a>
                    {/if}
                </div>
            </section>
        {/if}
    </div>
</div>
