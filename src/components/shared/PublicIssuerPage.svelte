<script>
  import {onMount} from "svelte";
  import I18n from "i18n-js";
  import {getPublicIssuer} from "../../api";
  import {BadgeClassHeader} from "../teachers";
  import {Spinner} from "../index";
  import {entityType} from "../../util/entityTypes"
  import {navigate} from "svelte-routing";
  import {queryData} from "../../api/graphql";

  export let entityId;
  export let visitorRole;

  let issuer = {};
  let loaded;

  const currentLanguage = I18n.locale;

  const query = `query ($entityId: String){
    publicIssuer(id: $entityId) {
      name,
      descriptionEnglish,
      descriptionDutch,
      image,
      entityId,
      faculty {
        name,
        institution {
          name,
          entityId
        }
      },
      publicBadgeclasses {
        name,
        image,
        entityId,
        assertionsCount,
        createdAt,
        extensions {
          name,
          originalJson
        }
      }
    }
  }`

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      debugger;
      issuer = res.publicIssuer;
      issuer.description = currentLanguage === "en" ? issuer.descriptionEnglish : issuer.descriptionDutch;
      issuer.publicBadgeclasses.forEach(badgeClass => {
        badgeClass.issuer = issuer;
        badgeClass.issuer.faculty = issuer.faculty;
        badgeClass.issuer.faculty.institution = issuer.faculty.institution;
        //TODO parse extensions for both badgeClass as issuer
      });
      loaded = true;
    });
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
      padding: 20px !important;
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
        {currentLanguage === 'en' ? issuer.description_english : issuer.description_dutch}
      </p>
      <h3>{I18n.t('models.issuer.email')}</h3>
      <p class="info">
        {issuer.email}
      </p>
      <h3>{I18n.t('models.issuer.url')}</h3>
      <p class="info">
        <a href={issuer.url} rel="noreferrer noopener" target="_blank">{issuer.url}</a>
      </p>
      {#if issuer.gradingTableURL}
        <h3>{I18n.t('models.issuer.gradingTable')}</h3>
        <p class="info">
          <a href={issuer.gradingTableURL} rel="noreferrer noopener" target="_blank">{issuer.gradingTableURL}</a>
        </p>
      {/if}
      {#if issuer.institutionName}
        <h3>{I18n.t('models.issuer.institutionName')}</h3>
        <a href="/public/institutions/{issuer.faculty.institution.entityId}"><p
          class="info">{issuer.institutionName}</p></a>
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
