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

  export let badgeclass;

</script>

<style>

  div.badge-class-detail {
    padding: 40px 140px;
  }

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
    border-top: 1px solid var(--color-background-grey-dark);
    border-bottom: 1px solid var(--color-background-grey-dark);
    padding: 15px 0px;
  }

  table.extensions th, table.extensions td {
    text-align: left;

  }

</style>

<div class="badge-class-detail">
  <h3>{I18n.t("models.badgeclass.language")}</h3>
  <p class="info">{fallBackValue(extensionValue(badgeclass.extensions, language))}</p>
  <h3>{I18n.t("models.badgeclass.learningOutcome")}</h3>
  <p class="info">{fallBackValue(extensionValue(badgeclass.extensions, learningOutcome))}</p>
  <h3>{I18n.t("models.badgeclass.criteria_text")}</h3>
  <div class="info">
    <p>{fallBackValue(badgeclass.criteriaText)}</p>
    <p class="green">{I18n.t("models.badgeclass.criteria_url_value")}
      {#if badgeclass.criteriaUrl}
        <a href={badgeclass.criteriaUrl} target="_blank">{I18n.t("models.badgeclass.notSet")}</a>
      {:else}
        <span>{I18n.t("models.badgeclass.notSet")}</span>
      {/if}
    </p>
    <table class="extensions">
      <thead class="purple">
      <th>{I18n.t("models.badgeclass.ects")}</th>
      <th>{I18n.t("models.badgeclass.eqf")}</th>
      <th>{I18n.t("models.badgeclass.educationProgramIdentifier")}</th>
      </thead>
      <tbody>
      <tr>
        <td>{fallBackValue(extensionValue(badgeclass.extensions, ects))}</td>
        <td>{fallBackValue(extensionValue(badgeclass.extensions, eqf))}</td>
        <td>{fallBackValue(extensionValue(badgeclass.extensions, educationProgramIdentifier))}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <h3>{I18n.t("models.badgeclass.publicUrl")}</h3>
  <p class="info"><a href={badgeclass.publicUrl} target="_blank">TODO - Link to public page {badgeclass.publicUrl}</a>
  </p>

</div>