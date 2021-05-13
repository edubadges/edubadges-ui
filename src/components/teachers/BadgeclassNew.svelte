<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {BadgeclassForm} from "../teachers";
  import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
  import Spinner from "../Spinner.svelte";
  import {translateProperties} from "../../util/utils";

  export let issuerEntityId;

  const query = `query {
    publicInstitutions {
      id,
      identifier,
      nameEnglish,
      nameDutch
    },
    currentInstitution {
      grondslagFormeel,
      grondslagInformeel,
      institutionType,
      identifier,
      awardAllowedInstitutions,
      awardAllowAllInstitutions
    },
    issuers {
      nameEnglish,
      nameDutch,
      entityId
    },
  }`;

  let issuers = [];
  let badgeclass = deduceExpirationPeriod({awardAllowedInstitutions:[], extensions: [{}]});
  let currentInstitution;
  let publicInstitutions;

  let loaded = false;

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
      issuers.forEach(issuer => translateProperties(issuer));
      badgeclass.issuer = issuers.find(issuer => issuer.entityId === issuerEntityId);
      currentInstitution = res.currentInstitution;
      publicInstitutions = res.publicInstitutions;
      loaded = true;
    })
  });

</script>
{#if loaded}
  <BadgeclassForm {issuers} {badgeclass} institution={currentInstitution} {publicInstitutions} mayEdit={true}/>
{:else}
  <Spinner/>
{/if}

