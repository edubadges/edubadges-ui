<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getIssuer, getTeacherBadges } from "../../api";
  import { collectFilters, toggleFilter, filteredData, filterCounts } from "../../util/filter";
  import { isEmpty } from "../../util/emptyObject";

  export let filteredBadges = [];

  export let scope = "";
</script>

<style>
  h2 span {
    color: var(--color-text-blue);
  }

  .badges {
    --badge-margin-right: 20px;

    display: flex;
    flex-wrap: wrap;

    margin-right: calc(var(--badge-margin-right) * -1);
  }

  div.badge {
    margin-bottom: 20px;
    margin-right: var(--badge-margin-right);
  }

  div.image {
    width: 200px;
    height: 200px;

    padding: 12px;
    margin-bottom: 6px;

    border: var(--card-border);
    border-radius: 7px;
  }
</style>


<div class="badges" style="display: inline-block">
  <h2>
    {I18n.t('teacher.badges.title')}
    {#if scope}
      <span>in</span>
      {scope}
    {/if}
  </h2>
  {#each filteredBadges as badge}
    <div class="badge">
      <div class="image">
        <img src={badge.image} alt={`image for ${badge.name}`} />
      </div>
      <b>{badge.name}</b>
    </div>
  {/each}
</div>
