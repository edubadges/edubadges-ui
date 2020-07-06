<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {queryData} from "../../api/graphql";
  import {role} from "../../util/role";
  import {getPublicBadgeClass, getPublicIssuer} from "../../api";
  import {isEmpty} from "lodash";
  import {EntityHeader} from "../teachers";
  import {Overview} from "../teachers/badgeclass";
  import {Button, Spinner} from "../index";
  import {publicBadgeInformation} from "../extensions/badges/extensions";
  import {userLoggedIn, redirectPath} from "../../stores/user";
  import {navigate} from "svelte-routing";
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
    })
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

</style>
<div class="page-container">
  {#if loaded}
    <EntityHeader
      entity={entityType.ISSUER}
      object={issuer}
      visitorRole={visitorRole}
      entityId={entityId}>
    </EntityHeader>
    <div class="issuer-detail">
      <h3>{I18n.t('models.issuer.description')}</h3>
      <p class="info">
        {issuer.description}
      </p>
      <h3>{I18n.t('models.issuer.email')}</h3>
      <p class="info">
        <a href={`mailto:${issuer.email}`} target="_blank">{issuer.email}</a>
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