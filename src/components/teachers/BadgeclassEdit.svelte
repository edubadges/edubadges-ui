<script>
  import {onMount} from "svelte";
  import {BadgeclassForm} from "../teachers";
  import {queryData} from "../../api/graphql";
  import {deduceExpirationPeriod, expirationPeriods} from "../extensions/badges/expiration_period";

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
      publicUrl,
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
      }
    },
    issuers {
      name,
      entityId
    },
  }`;


  let badgeclass = {issuer: {faculty: {}}, extensions: []};
  let issuers = [];

  onMount(() => {
    queryData(query).then(res => {
      badgeclass = res.badgeClass;
      deduceExpirationPeriod(badgeclass);

      issuers = res.issuers;
    });
  });
</script>

<BadgeclassForm {issuers} {badgeclass} {entityId}/>
