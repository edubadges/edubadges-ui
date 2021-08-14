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
        studyLoad
    } from "../extensions/badges/extensions";
    import {onMount} from "svelte";
    import DOMPurify from 'dompurify';
    import marked from "marked";
    import {fallBackValue} from "../../util/forms";
    import languageIcon from "../../icons/messages-bubble-square-text.svg";
    import schoolTrophyIcon from "../../icons/school-book-trophy.svg";
    import calendarIcon from "../../icons/calendar-1.svg";

    export let badgeclass;
    export let badge;

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

  section.alignments {
    margin-top: 10px;
    padding-top: 10px;
  }

  h2.black-header {
    margin-bottom: 25px;
  }


  section.alignment {
    margin-top: 25px;
    padding: 15px;
    border: 1px solid var(--grey-5);
    box-shadow: 0 1px 1px var(--grey-5);
    border-radius: 8px;

    .black-header {
      color: var(--black);
      margin: 0;
    }

    table.alignment {
      width: 100%;
      margin-bottom: 15px;

      th {
        text-align: left;

        &.alignmentCode {
          width: 35%;
        }

        &.alignmentFramework {
          width: 25%;
        }

        &.alignmentUrl {
          width: 40%;
        }
      }

      td {
        width: 33%;
      }
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
        <h3
          class="black-header">{badgeclass.alignments.length > 1 ? I18n.t("models.badgeclass.alignmentMultiple") : I18n.t("models.badgeclass.alignment")}</h3>
        {#each badgeclass.alignments as alignment}
          <section class="alignment">
            <h4 class="black-header">{alignment.targetName}</h4>
            <table class="alignment">
              <thead>
              <tr>
                <th class="alignmentCode">
                  <h4>{I18n.t('models.badgeclass.alignmentCode')}</h4>
                </th>
                <th class="alignmentFramework">
                  <h4>{I18n.t('models.badgeclass.alignmentFramework')}</h4>
                </th>
                <th class="alignmentUrl">
                  <h4>{I18n.t('models.badgeclass.alignmentUrl')}</h4>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  {#if alignment.targetCode}
                    {alignment.targetCode}
                  {/if}
                </td>
                <td>
                  {#if alignment.targetFramework}
                    {alignment.targetFramework}
                  {/if}
                </td>
                <td>
                  {#if alignment.targetUrl}
                    <a href="{alignment.targetUrl}" target="_blank">{alignment.targetUrl}</a>
                  {/if}
                </td>
              </tr>
              </tbody>
            </table>
            {#if alignment.targetDescription}
              <p class="sub-info markdown">
                {@html DOMPurify.sanitize(marked(alignment.targetDescription))}
              </p>
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
        {I18n.t(`language.${badgeclass.language}`)}
      </span>
      </div>
    </section>
    {#if badgeclass.studyLoadValue}
      <section class="study-load">
        {@html schoolTrophyIcon}
        <div>
          <h3>{I18n.t("teacher.badgeclasses.studyLoad")}</h3>
          {#if badgeclass.studyLoadValue}
            <span>{fallBackValue(badgeclass.studyLoadValue)}</span>
          {/if}
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
            <span>{`NLQF ${badgeclass.eqf}`}</span>
          {/if}
        </div>
      </section>
    {/if}
  </div>
</div>
