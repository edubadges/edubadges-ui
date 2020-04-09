<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { BadgeclassForm } from "../teachers";

  const query = `{
    issuers {
      name,
      entityId
    },
  }`;

  let issuers = [];

  onMount(() => {
    queryData(query).then(res => (issuers = res.issuers));
  });
</script>

<BadgeclassForm {issuers} />
