<script>
  import {onMount} from "svelte";
  import {BadgeclassForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import {
    deduceExpirationPeriod,
    expirationPeriods
  } from "../extensions/badges/expiration_period";
  import Spinner from "../Spinner.svelte";
  import {translateProperties} from "../../util/utils";

  export let entityId;

  const query = `query ($entityId: String){
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    currentInstitution {
      grondslagFormeel,
      grondslagInformeel,
      identifier,
      awardAllowedInstitutions,
      awardAllowAllInstitutions
    },
    badgeClass(id: $entityId) {
      entityId,
      name,
      image,
      description,
      createdAt,
      criteriaUrl,
      criteriaText,
      expirationPeriod,
      isPrivate,
      awardAllowedInstitutions,
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework,
        targetDescription
      },
      issuer {
        nameEnglish,
        nameDutch,
        entityId,
        faculty {
          nameEnglish,
          nameDutch,
          entityId,
        }
      },
      badgeAssertions {
        entityId,
        revoked
      },
      extensions {
        name,
        originalJson
      },
      permissions {
        mayCreate
        mayUpdate,
        mayDelete

      }
    },
    issuers {
      nameEnglish,
      nameDutch,
      entityId
    },
  }`;

  let badgeclass = {issuer: {faculty: {}}, extensions: []};
  let issuers = [];
  let permissions = {};
  let currentInstitution;
  let publicInstitutions;
  let loaded = false;
  let mayDelete = false;
  let mayEdit = false;
  let hasUnrevokedAssertions = true;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      badgeclass = res.badgeClass;

      translateProperties(badgeclass.issuer);
      translateProperties(badgeclass.issuer.faculty);

      deduceExpirationPeriod(badgeclass);

      issuers = res.issuers;
      issuers.forEach(iss => translateProperties(iss));

      publicInstitutions = res.publicInstitutions;
      permissions = res.badgeClass.permissions;
      currentInstitution = res.currentInstitution;
      loaded = true;
      hasUnrevokedAssertions = badgeclass.badgeAssertions.some(assertion => !assertion.revoked);
      mayDelete = permissions && permissions.mayDelete;
      mayEdit = permissions && permissions.mayUpdate && !hasUnrevokedAssertions;
    });
  });
</script>
{#if loaded}
  <BadgeclassForm {issuers} {badgeclass} {entityId} institution={currentInstitution}
                  {publicInstitutions}
                  mayDelete={mayDelete} mayEdit={mayEdit} hasUnrevokedAssertions={hasUnrevokedAssertions}/>
{:else}
  <Spinner/>
{/if}

