<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {BadgeclassForm} from "../teachers";
  import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
  import Spinner from "../Spinner.svelte";

  export let issuerEntityId;

  const query = `query {
    currentInstitution {
      grondslagFormeel,
      grondslagInformeel,
    },
    issuers {
      name,
      entityId
    },
  }`;

  let issuers = [];
  let badgeclass = deduceExpirationPeriod({extensions: [{}]});
  let currentInstitution;
  let loaded = false;

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
      badgeclass.issuer = issuers.find(issuer => issuer.entityId === issuerEntityId);
      currentInstitution = res.currentInstitution;
      console.log(res.currentInstitution);
      loaded = true;
    })
  });

</script>
{#if loaded}
  <BadgeclassForm {issuers} {badgeclass} institution={currentInstitution}/>
{:else}
  <Spinner/>
{/if}

