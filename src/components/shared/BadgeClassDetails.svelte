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

  export let badgeclass;
  export let withInstitution;

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

  table.extensions {
    width: 100%;
    margin: 40px 0;
    border-top: 1px solid var(--text-grey-dark);
    border-bottom: 1px solid var(--text-grey-dark);
    padding: 15px 0;

    th, td {
      text-align: left;
      width: 33%;

    }
  }

  div.issued {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      span.issuer {
          font-size: 16px;
      }

      span.faculty {
          font-size: 13px;
          color: var(--grey-8);
          margin-top: 5px;
      }
  }

  thead.purple {
    color: var(--purple);
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
<div class="badge-class-detail">
  <h3>{I18n.t('models.badgeclass.description')}</h3>
  <p class="info markdown">
    {@html DOMPurify.sanitize(marked(badgeclass.description))}
  </p>
  {#if withInstitution}
    <h3>{I18n.t('models.badge.associatedInstitution')}</h3>
    <a href="/public/institutions/{badgeclass.issuer.faculty.institution.entityId}"><p>{badgeclass.issuer.faculty.institution.name}</p></a>
    <div class="issued">
        <h3>{I18n.t("models.badge.issuedBy")}</h3>
        {#if badgeclass.issuer.id}
          <a href={badgeclass.issuer.id}><span class="issuer">{badgeclass.issuer.name}</span></a>
        {:else}
          <span class="issuer">{badgeclass.issuer.name}</span>
        {/if}
        <span class="faculty">({badgeclass.issuer.faculty.name})</span>
    </div>
  {/if}
  <h3>{I18n.t('models.badgeclass.language')}</h3>
  <p class="info">
    {I18n.t(`language.${badgeclass.language}`)}
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
  <table class="extensions">
    <thead class="purple">
    <th>{I18n.t("teacher.badgeclasses.studyLoad")}</th>
    <th>{I18n.t('models.badgeclass.educationProgramIdentifier')}</th>
    <th>{I18n.t('models.badgeclass.eqf')}</th>
    </thead>
    <tbody>
    <tr>
      <td>{fallBackValue(badgeclass.studyLoadValue)}</td>
      <td>
        {fallBackValue(badgeclass.educationProgramIdentifier)}
      </td>
      <td>{badgeclass.eqf ? `EQF ${badgeclass.eqf}` : fallBackValue(null)}</td>
    </tr>
    </tbody>
  </table>
  {#if badgeclass.alignments && badgeclass.alignments.length > 0}
    {#if badgeclass.alignments[0].targetName}
      <h3>{I18n.t('models.badgeclass.alignment')}</h3>
      <h4>{I18n.t('models.badgeclass.alignmentName')}</h4>
      <p class="sub-info">{badgeclass.alignments[0].targetName}</p>
    {/if}
    {#if badgeclass.alignments[0].targetCode}
      <h4>{I18n.t('models.badgeclass.alignmentCode')}</h4>
      <p class="sub-info">{badgeclass.alignments[0].targetCode}</p>
    {/if}
    {#if badgeclass.alignments[0].targetFramework}
      <h4>{I18n.t('models.badgeclass.alignmentFramework')}</h4>
      <p class="sub-info">{badgeclass.alignments[0].targetFramework}</p>
    {/if}
    {#if badgeclass.alignments[0].targetUrl}
      <h4>{I18n.t('models.badgeclass.alignmentUrl')}</h4>
      <p class="sub-info">
        <a href="{badgeclass.alignments[0].targetUrl}" rel="noreferrer noopener"
           target="_blank">{badgeclass.alignments[0].targetUrl}</a>
      </p>
    {/if}
    {#if badgeclass.alignments[0].targetDescription}
      <h4>{I18n.t('models.badgeclass.alignmentDescription')}</h4>
      <p class="sub-info">{badgeclass.alignments[0].targetDescription}</p>
    {/if}
  {/if}
</div>
