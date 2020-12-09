<script>
  import {getPublicInstitution} from "../../api";
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {BadgeClassHeader} from "../teachers";
  import {entityType} from "../../util/entityTypes"

  export let entityId;
  export let visitorRole;

  let institution = {};

  const currentLanguage = I18n.locale;

  onMount(() => {
    getPublicInstitution(entityId).then(res => {
      institution = res;
    })
  })
</script>

<style>
  div.page-container {
    width: 100%;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  div.institution-detail {
    padding: 40px 140px;
  }
</style>

<div class="page-container">
  <BadgeClassHeader
    entity={entityType.INSTITUTION}
    object={institution}
    visitorRole={visitorRole}
    entityId={entityId}>
  </BadgeClassHeader>
  <div class="institution-detail">
    <h3>{I18n.t('models.institution.description')}</h3>
    {currentLanguage === "en" ? institution.description_english : institution.description_dutch}
  </div>
</div>
