<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";

  let institution = {};

  const query = `{
    currentInstitution {
      name,
    }
  }`;

  onMount(() => {
    queryData(query).then(res => (institution = res.currentInstitution));
  });

</script>

<style lang="scss">
  h2 {
    margin-bottom: var(--ver-padding-m);
  }
</style>

<h2>
  Users in {institution.name}
</h2>
