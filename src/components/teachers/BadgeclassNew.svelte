<script>
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {BadgeclassForm} from "../teachers";
  import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";

  export let issuerEntityId;

  const query = `{
    issuers {
      name,
      entityId
    },
  }`;

  let issuers = [];
  let badgeclass = deduceExpirationPeriod({extensions: [{}]});

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
      badgeclass.issuer = issuers.find(issuer => issuer.entityId === issuerEntityId);
    })
  });

</script>

<BadgeclassForm {issuers} {badgeclass}/>
