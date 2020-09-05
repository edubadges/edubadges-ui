<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {BadgeclassForm} from "../teachers";
  import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";
  import Spinner from "../Spinner.svelte";

  export let issuerEntityId;

  const query = `query {
    issuers {
      name,
      entityId
    },
  }`;

  let issuers = [];
  let badgeclass = deduceExpirationPeriod({extensions: [{}]});
  let loaded = false;

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
      badgeclass.issuer = issuers.find(issuer => issuer.entityId === issuerEntityId);
      loaded = true;
    })
  });

</script>
{#if loaded}
  <BadgeclassForm {issuers} {badgeclass}/>
{:else}
  <Spinner/>
{/if}

