<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import { getPublicIssuer} from "../../api";
  import {BadgeClassHeader} from "../teachers";
  import {Button, Spinner} from "../index";
  import {entityType} from "../../util/entityTypes"

  export let entityId;
  export let visitorRole;

  let issuer = {};
  let loaded;

  onMount(() => {
    getPublicIssuer(entityId).then(res => {
      issuer = res;
      if (res['extensions:InstitutionIdentifierExtension']) {
        issuer.institutionIdentifier = res['extensions:InstitutionIdentifierExtension']['InstitutionIdentifier'];
      }
      if (res['extensions:GradingTableExtension']) {
        issuer.gradingTableURL = res['extensions:GradingTableExtension']['GradingTableURL'];
      }
      if (res['extensions:InstitutionNameExtension']) {
        issuer.institutionName = res['extensions:InstitutionNameExtension']['InstitutionName'];
      }
      loaded = true;
    }).catch(() => navigate("/404?issuer=true"));
  });
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

  @media (max-width: 1120px) {
    .issuer-detail {
      padding: 30px 0 !important;
    }
  }

  div.issuer-detail {
    padding: 40px 140px;
  }

  div.page-container {
    width: 100%;
  }
</style>

<div class="page-container">
  {#if loaded}
    <BadgeClassHeader
      entity={entityType.ISSUER}
      object={issuer}
      visitorRole={visitorRole}
      entityId={entityId}>
    </BadgeClassHeader>
    <div class="issuer-detail">
      <h3>{I18n.t('models.issuer.description')}</h3>
      <p class="info">
        {issuer.description}
      </p>
      <h3>{I18n.t('models.issuer.email')}</h3>
      <p class="info">
        {issuer.email}
      </p>
      <h3>{I18n.t('models.issuer.url')}</h3>
      <p class="info">
        <a href={issuer.url} target="_blank">{issuer.url}</a>
      </p>
      {#if issuer.gradingTableURL}
        <h3>{I18n.t('models.issuer.gradingTable')}</h3>
        <p class="info">
          <a href={issuer.gradingTableURL} target="_blank">{issuer.gradingTableURL}</a>
        </p>
      {/if}
      {#if issuer.institutionName}
        <h3>{I18n.t('models.issuer.institutionName')}</h3>
        <p class="info">{issuer.institutionName}</p>
      {/if}
      {#if issuer.institutionIdentifier}
        <h3>{I18n.t('models.issuer.institutionIdentifier')}</h3>
        <p class="info">{issuer.institutionIdentifier}</p>
      {/if}

    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
