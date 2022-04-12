<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {BadgeclassForm} from "../teachers";
  import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
  import Spinner from "../Spinner.svelte";
  import {translateProperties} from "../../util/utils";
  import {entityId} from "./IssuerEdit.svelte";

  export let issuerEntityId;

  const query = `query ($entityId: String) {
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
      awardAllowAllInstitutions,
      alternativeIdentifier,
      defaultLanguage,
      directAwardingEnabled
    },
    issuer(id: $entityId) {
      nameEnglish,
      nameDutch,
      entityId,
      faculty {
        nameEnglish,
        nameDutch,
        onBehalfOf,
        onBehalfOfDisplayName,
        onBehalfOfUrl,
        entityId,
      }
    },
  }`;

  let issuer = {};
  let badgeclass = deduceExpirationPeriod({awardAllowedInstitutions:[], extensions: [{}]});
  let currentInstitution;
  let publicInstitutions;

  let loaded = false;

  onMount(() => {
    queryData(query, {entityId: issuerEntityId}).then(res => {
      issuer = res.issuer;
      translateProperties(issuer)
      translateProperties(issuer.faculty)
      badgeclass.issuer = issuer;
      currentInstitution = res.currentInstitution;
      publicInstitutions = res.publicInstitutions;
      loaded = true;
    })
  });

</script>
{#if loaded}
  <BadgeclassForm issuers={[issuer]} {badgeclass} institution={currentInstitution} {publicInstitutions} mayEdit={true}/>
{:else}
  <Spinner/>
{/if}

