<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import I18n from "i18n-js";

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
  {I18n.t('editUsers.headerControl')} {institution.name}
</h2>
