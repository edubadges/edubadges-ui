<script>
  import I18n from "i18n-js";
  import {
    ects,
    educationProgramIdentifier,
    eqf,
    extensionValue,
    language,
    learningOutcome,
    studyLoad
  } from "../extensions/badges/extensions";
  import {onMount} from "svelte";
  import DOMPurify from 'dompurify';
  import marked from "marked";
  import {fallBackValue} from "../../util/forms";
  import languageIcon from "../../icons/messages-bubble-square-text.svg";
  import schoolTrophyIcon from "../../icons/school-book-trophy.svg";

  export let badgeclass;

  onMount(() => {
    //The component is used by public pages where the data structure is different
    if (!badgeclass.ignoreExtensions) {
      badgeclass.educationProgramIdentifier = extensionValue(badgeclass.extensions, educationProgramIdentifier);
      badgeclass.learningOutcome = extensionValue(badgeclass.extensions, learningOutcome);
      badgeclass.eqf = extensionValue(badgeclass.extensions, eqf);
      badgeclass.studyLoad = extensionValue(badgeclass.extensions, studyLoad);
      badgeclass.ects = extensionValue(badgeclass.extensions, ects);
      badgeclass.language = extensionValue(badgeclass.extensions, language);
    }
    badgeclass.studyLoadValue = badgeclass.studyLoad ? I18n.t("teacher.badgeclasses.hours", {value: badgeclass.studyLoad}) : badgeclass.ects ?
      I18n.t("teacher.badgeclasses.ects", {value: badgeclass.ects}) : null;
  });

</script>

<style lang="scss">

  section.study-load :global(svg) {
    width: 22px;
    height: 22px;
  }

  div.badge-class-detail-container {
    display: flex;

    .right-side-nav {
      margin-left: auto;
      min-width: 30%;
      padding-left: 25px;

      section.study-load {
        display: flex;
        padding-bottom: 20px;

        &:last-child {
          border-top: 1px solid var(--grey-4);
          padding-top: 20px;
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

  section.alignments {
    border-top: 1px solid var(--grey-4);
    margin-top: 10px;
    padding-top: 10px;

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
    <h3>{I18n.t('models.badgeclass.about')}</h3>
    <p class="info markdown">
      {@html DOMPurify.sanitize(marked(badgeclass.description))}
    </p>
    <h3>{I18n.t('models.badgeclass.learningOutcome')}</h3>
    <p class="info markdown">
      {@html DOMPurify.sanitize(marked(fallBackValue(badgeclass.learningOutcome)))}
    </p>
    <h3>{I18n.t('models.badgeclass.criteria_text')}</h3>
    {#if badgeclass.criteriaText}
      <p class="info markdown">{@html DOMPurify.sanitize(marked(badgeclass.criteriaText))}</p>
    {/if}
    {#if badgeclass.criteriaUrl}
      <p class="green">
        <a href={badgeclass.criteriaUrl} target="_blank" rel="noreferrer noopener">
          {badgeclass.criteriaUrl}
        </a>
      </p>
    {/if}
    {#if badgeclass.alignments && badgeclass.alignments.length > 0}
      <section class="alignments">
        {#each badgeclass.alignments as alignment}
          {#if alignment.targetName}
            <h3>{I18n.t('models.badgeclass.alignment')}</h3>
            <h4>{I18n.t('models.badgeclass.alignmentName')}</h4>
            <p class="sub-info">{alignment.targetName}</p>
          {/if}
          {#if alignment.targetCode}
            <h4>{I18n.t('models.badgeclass.alignmentCode')}</h4>
            <p class="sub-info">{alignment.targetCode}</p>
          {/if}
          {#if alignment.targetFramework}
            <h4>{I18n.t('models.badgeclass.alignmentFramework')}</h4>
            <p class="sub-info">{alignment.targetFramework}</p>
          {/if}
          {#if alignment.targetUrl}
            <h4>{I18n.t('models.badgeclass.alignmentUrl')}</h4>
            <p class="sub-info">
              <a href="{alignment.targetUrl}" rel="noreferrer noopener"
                 target="_blank">{alignment.targetUrl}</a>
            </p>
          {/if}
          {#if alignment.targetDescription}
            <h4>{I18n.t('models.badgeclass.alignmentDescription')}</h4>
            <p class="sub-info markdown">
              {@html DOMPurify.sanitize(marked(alignment.targetDescription))}
            </p>
          {/if}
        {/each}
      </section>

    {/if}
  </div>
  <div class="right-side-nav">
    <section class="study-load">
      {@html languageIcon}
      <div>
        <h3>{I18n.t('models.badgeclass.language')}</h3>
        <span>
        {I18n.t(`language.${badgeclass.language}`)}
      </span>
      </div>
    </section>
    {#if badgeclass.studyLoadValue || badgeclass.eqf}
      <section class="study-load">
        {@html schoolTrophyIcon}
        <div>
          <h3>{I18n.t("teacher.badgeclasses.studyLoad")}</h3>
          {#if badgeclass.studyLoadValue}
            <span>{fallBackValue(badgeclass.studyLoadValue)}</span>
          {/if}
          {#if badgeclass.eqf}
            <span>{`NLQF ${badgeclass.eqf}`}</span>
          {/if}
        </div>
      </section>
    {/if}
  </div>
</div>
