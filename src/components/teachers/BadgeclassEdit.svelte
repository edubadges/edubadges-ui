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

  const query = `{
    badgeClass(id: "${entityId}") {
      entityId,
      name,
      image,
      description,
      createdAt,
      criteriaUrl,
      criteriaText,
      expirationPeriod,
      alignments {
        targetName,
        targetUrl,
        targetCode,
        targetFramework
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
  let loaded = false;

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      deduceExpirationPeriod(badgeclass);

      issuers = res.issuers;
      permissions = res.badgeClass.permissions;
      loaded = true;
    });
  });
</script>
{#if loaded}
  <BadgeclassForm {issuers} {badgeclass} {entityId}
                  mayDelete={permissions && permissions.mayDelete && badgeclass.badgeAssertions.length === 0}/>
{:else}
  <Spinner/>
{/if}

