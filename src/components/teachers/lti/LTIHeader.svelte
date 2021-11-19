<script>
    import I18n from "i18n-js";
    import {HeaderList} from "../../teachers";
    import EntityHeaderTabs from "../EntityHeaderTabs.svelte";

    export let launchData = [];
    export let tabs;

</script>

<style lang="scss">
  h2 {
    margin-bottom: var(--ver-padding-m);
  }

  .header {
    background: var(--purple-1);
    border-left: 2px solid var(--purple-3);
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    margin-bottom: var(--ver-padding-l);

    display: flex;
    flex-direction: column;

    .content {
      display: flex;
      flex-direction: column;

      p {
        margin-bottom: var(--ver-padding-m);
      }

      .sub-info {
        display: flex;
        flex-direction: column;
      }
    }

    div.slot {
      margin-bottom: 25px;
    }
  }
</style>

<div class="header">
    <h2>
        {I18n.t('lti.title')}
    </h2>
    <div class="content">
        <p>{I18n.t("lti.info")}</p>
        <div class="sub-info">
            <span>{@html I18n.t("lti.login", {name: launchData.name, lti: launchData.iss})}</span>
        </div>

    </div>
    <div class="slot">
        <slot/>
    </div>
    <EntityHeaderTabs {tabs}/>
</div>
