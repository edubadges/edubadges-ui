<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import I18n from "i18n-js";
  import {translateProperties} from "../../util/utils";

  let institution = {};

  const query = `query {
    currentInstitution {
        nameDutch,
        nameEnglish,
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      institution = res.currentInstitution
      translateProperties(institution);
    })
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
