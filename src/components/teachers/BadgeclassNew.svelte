<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { BadgeclassForm } from "../teachers";
  import {deduceExpirationPeriod} from "../extensions/badges/expiration_period";

  const query = `{
    issuers {
      name,
      entityId
    },
  }`;

  let issuers = [];
  let badgeclass = deduceExpirationPeriod({extensions: [{}]});

  onMount(() => {
    queryData(query).then(res => (issuers = res.issuers));

  });
</script>

<BadgeclassForm {issuers} {badgeclass}/>
