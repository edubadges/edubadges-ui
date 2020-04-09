<script>
  import { onMount } from "svelte";
  import { IssuerForm } from "../teachers";
  import { queryData } from "../../api/graphql";

  export let entityId;

  const query = `{
    issuer(id: "${entityId}") {
      name,
      description,
      image,
      url,
      email
    },
  }`;

  let issuer = {};

  onMount(() => {
    queryData(query).then(res => (issuer = res.issuer));
  });
</script>

<IssuerForm {issuer} {entityId} />
