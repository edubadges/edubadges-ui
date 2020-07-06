<script>
  import { onMount } from "svelte";
  import { IssuerForm } from "../teachers";
  import { queryData } from "../../api/graphql";

  export let entityId;

  const query = `{
    issuer(id: "${entityId}") {
      name,
      entityId,
      description,
      image,
      url,
      email,
      faculty {
        name,
        entityId
      }
    },
  }`;

  let issuer = {};

  onMount(() => {
    queryData(query).then(res => (issuer = res.issuer));
  });
</script>

<IssuerForm {issuer} {entityId} facultyChooseAllowed={false}/>
