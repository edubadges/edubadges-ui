<script>
  import I18n from "i18n-js";
  import { Badge } from "../../components";
  import { getBadges } from "../../api";

  let badgesPromise = getBadges();
</script>

<div>
  <h3>{I18n.t('backpack.title')}</h3>

  {#await badgesPromise}
    <p>...loading badges</p>
  {:then badges}
    {#each badges as badge}
      <Badge data={badge} />
    {/each}
  {:catch error}
    <p>error loading badges</p>
  {/await}
</div>
