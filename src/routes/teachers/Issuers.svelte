<script>
  import { onMount } from "svelte";
  import I18n from "i18n-js";
  import { queryData } from "../../api/graphql";
  import { requestProfile } from "../../api";

  let scope = "";
  let issuers = [];

  const query = `{
      issuers {
        name,
      }
    }`;

  onMount(() => {
    queryData(query).then(res => {
      issuers = res.issuers;
    });

    requestProfile()
      .then(({ institution }) => (scope = institution.name))
      .catch(error => console.error(error));
  });
</script>

<h2>
  {I18n.t('teacher.issuers.title')}
  {#if scope}
    <span class="blue-text">in</span>
    {scope}
  {/if}
</h2>

<div class="issuers">
  {#each issuers as issuer}
    <div class="issuer">{issuer.name}</div>
  {/each}
</div>
