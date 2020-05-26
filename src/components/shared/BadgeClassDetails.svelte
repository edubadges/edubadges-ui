<script>
  import I18n from "i18n-js";
  import {
    ects,
    educationProgramIdentifier,
    eqf,
    extensionValue,
    language,
    learningOutcome
  } from "../extensions/badges/extensions";
  import { fallBackValue } from "../../util/forms";

  export let badgeclass;

</script>

<style>
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .info {
    margin-bottom: 40px;
  }

  table.extensions {
    width: 100%;
    margin: 40px 0;
    border-top: 1px solid var(--text-grey-dark);
    border-bottom: 1px solid var(--text-grey-dark);
    padding: 15px 0;
  }

  table.extensions th,
  table.extensions td {
    text-align: left;
  }

  @media (max-width: 1120px) {
    .badge-class-detail {
      padding: 40px 0 !important;
    }
  }
</style>

<div class="badge-class-detail">
  <h3>{I18n.t('models.badgeclass.language')}</h3>
  <p class="info">
    {fallBackValue(badgeclass.language || extensionValue(badgeclass.extensions, language))}
  </p>
  <h3>{I18n.t('models.badgeclass.learningOutcome')}</h3>
  <p class="info">
    {fallBackValue(badgeclass.learningOutcome || extensionValue(badgeclass.extensions, learningOutcome))}
  </p>
  <h3>{I18n.t('models.badgeclass.criteria_text')}</h3>
  <div class="info">
    <p>{fallBackValue(badgeclass.criteriaText || badgeclass.criteriaText)}</p>
    <p class="green">
      {I18n.t('models.badgeclass.criteria_url_value')}
      {#if badgeclass.criteriaUrl}
        <a href={badgeclass.criteriaUrl} target="_blank">
          {badgeclass.criteriaUrl}
        </a>
      {:else}
        <span>{I18n.t('models.badgeclass.notSet')}</span>
      {/if}
    </p>
    <table class="extensions">
      <thead class="purple">
        <th>{I18n.t('models.badgeclass.ects')}</th>
        <th>{I18n.t('models.badgeclass.eqf')}</th>
        <th>{I18n.t('models.badgeclass.educationProgramIdentifier')}</th>
      </thead>
      <tbody>
        <tr>
          <td>{fallBackValue(badgeclass.ects || extensionValue(badgeclass.extensions, ects))}</td>
          <td>{`EQF ${fallBackValue(badgeclass.eqf || extensionValue(badgeclass.extensions, eqf))}`}</td>
          <td>
            {fallBackValue(badgeclass.educationProgramIdentifier || extensionValue(badgeclass.extensions, educationProgramIdentifier))}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
