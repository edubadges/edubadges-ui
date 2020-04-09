<script>
  import { onMount } from "svelte";
  import { FacultyForm } from "../teachers";
  import { queryData } from "../../api/graphql";

  export let entityId;

  const query = `{
    faculty(id: "${entityId}") {
      name,
      description
    },
  }`;

  let faculty = {};

  onMount(() => {
    queryData(query).then(res => (faculty = res.faculty));
  });
</script>

<FacultyForm {faculty} {entityId} />
