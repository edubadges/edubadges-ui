<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { IssuerForm } from "../teachers";

  const query = `{
    faculties {
      name,
      entityId
    },
  }`;

  let faculties = [];

  onMount(() => {
    queryData(query).then(res => (faculties = res.faculties));
  });
</script>

<IssuerForm {faculties} />
