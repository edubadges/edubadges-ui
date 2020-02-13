<script>
  import I18n from "i18n-js";
  import { Badge } from "../../components";
  import {onMount} from "svelte";
  import {getBadges} from "../../api";

  let badges = [];

  onMount(() => {
    getBadges().then(res => {
      console.log(res);
      badges = [...badges, res];
      console.log(badges);
    });

  })
</script>

<div>
  <h3>{I18n.t('backpack.title')}</h3>
  <Badge />
  {#each badges as badge}
    <Badge data={badge}/>
  {/each}
</div>