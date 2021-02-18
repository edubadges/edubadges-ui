<script>
  import {onMount} from "svelte";
  import {BadgeclassForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import {
    deduceExpirationPeriod,
    expirationPeriods
  } from "../extensions/badges/expiration_period";
  import Spinner from "../Spinner.svelte";

  export let entityId;

  const query = `query ($entityId: String){
    currentInstitution {
      grondslagFormeel,
      grondslagInformeel,
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
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework,
        targetDescription
      },
      issuer {
        name,
        entityId,
        faculty {
          name,
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
      name,
      entityId
    },
  }`;

  let badgeclass = {issuer: {faculty: {}}, extensions: []};
  let issuers = [];
  let permissions = {};
  let currentInstitution;
  let loaded = false;
  let mayDelete = false;
  let mayEdit = false;
  let hasUnrevokedAssertions = true;

  onMount(() => {
    queryData(query, {entityId}).then(res => {
      badgeclass = res.badgeClass;
      deduceExpirationPeriod(badgeclass);
      issuers = res.issuers;
      permissions = res.badgeClass.permissions;
      currentInstitution = res.currentInstitution;
      loaded = true;
      hasUnrevokedAssertions = badgeclass.badgeAssertions.some(assertion => !assertion.revoked);
      mayDelete = permissions && permissions.mayDelete
      mayEdit = permissions && permissions.mayUpdate && badgeclass.badgeAssertions.length === 0
    });
  });
</script>
{#if loaded}
  <BadgeclassForm {issuers} {badgeclass} {entityId} institution={currentInstitution}
                  mayDelete={mayDelete} mayEdit={mayEdit} hasUnrevokedAssertions={hasUnrevokedAssertions}/>
{:else}
  <Spinner/>
{/if}

