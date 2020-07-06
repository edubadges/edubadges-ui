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
  import {fallBackValue} from "../../util/forms";
  import {onMount} from "svelte";

  export let badgeclass;

</script>

<style lang="scss">
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .info {
    margin-bottom: 30px;
    word-break: break-all;
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
    width: 33%;
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
  <p class="info">
    {badgeclass.description}
  </p>
  <h3>{I18n.t('models.badgeclass.language')}</h3>
  <p class="info">
    {fallBackValue(I18n.t(`language.${badgeclass.language || extensionValue(badgeclass.extensions, language)}`))}
  </p>
  <h3>{I18n.t('models.badgeclass.learningOutcome')}</h3>
  <p class="info">
    {fallBackValue(badgeclass.learningOutcome || extensionValue(badgeclass.extensions, learningOutcome))}
  </p>
  <h3>{I18n.t('models.badgeclass.criteria_text')}</h3>
  <div class="info">
    {#if badgeclass.criteriaText}
      <p>{fallBackValue(badgeclass.criteriaText || badgeclass.criteriaText)}</p>
    {/if}
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
      <th class="ects">{I18n.t('models.badgeclass.ects.creditPoints')}</th>
      <th class="epi">{I18n.t('models.badgeclass.educationProgramIdentifier')}</th>
      <th class="eqf">{I18n.t('models.badgeclass.eqf')}</th>
      </thead>
      <tbody>
      <tr>
        <td>{fallBackValue(badgeclass.ects || extensionValue(badgeclass.extensions, ects))}</td>
        <td>
          {fallBackValue(badgeclass.educationProgramIdentifier || extensionValue(badgeclass.extensions, educationProgramIdentifier))}
        </td>
        <td>{`EQF ${fallBackValue(badgeclass.eqf || extensionValue(badgeclass.extensions, eqf))}`}</td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
