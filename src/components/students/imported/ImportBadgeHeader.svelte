<script>
    import {onMount} from "svelte";
    import importedBadgesSvg from "../../../icons/school-bag.svg";
    import I18n from "i18n-js";
    import {HeaderList} from "../../teachers";

    export let importedBadges = [];

    let headerItems = [];

    onMount(() => {
        let lastUpdated = null;
        importedBadges.forEach(coll => {
            let createdAt = new Date(coll.createdAt);
            if (lastUpdated === null || lastUpdated < createdAt) {
                lastUpdated = createdAt;
            }
        });
        headerItems = [{
            attr: "lastUpdated",
            value: lastUpdated,
            type: "date"
        }, {
            attr: "number",
            value: importedBadges.length,
            type: "number"
        }]
    });

</script>

<style lang="scss">
  h2 {
    margin-bottom: var(--ver-padding-m);
  }

  .header {
    background: var(--purple-1);
    border-left: 2px solid var(--purple-3);

    padding: var(--ver-padding-m) var(--hor-padding-m);
    margin-bottom: var(--ver-padding-l);

    display: flex;

    .collections-icon-container {
      height: 120px;
      width: 120px;
      margin-right: 15px;
    }

    :global(.collections-icon-container svg) {
      height: 120px;
      width: 120px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        margin-bottom: var(--ver-padding-m);
      }
    }

    div.slot {
      margin: 15px 0 0 auto;
    }
  }
</style>

<h2>
  {I18n.t('importedBadges.title')}
</h2>
<div class="header">
  <div class="collections-icon-container">
    {@html importedBadgesSvg}
  </div>
  <div class="content">
    <p>{I18n.t("importedBadges.info")}</p>
    {#if importedBadgesSvg.length > 0}
      <HeaderList {headerItems} entity="collections"/>
    {/if}
  </div>
  <div class="slot">
    <slot/>
  </div>
</div>
