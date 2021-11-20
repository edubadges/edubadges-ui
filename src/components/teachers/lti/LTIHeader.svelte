<script>
    import I18n from "i18n-js";
    import {HeaderList} from "../../teachers";
    import EntityHeaderTabs from "../EntityHeaderTabs.svelte";
    import rainbowIcon from "../../../icons/RainbowFlagAtom2.svg";

    export let launchData = [];
    export let tabs;

</script>

<style lang="scss">
  h2 {
    margin-bottom: var(--ver-padding-m);
  }

  .lti-container {
    background: var(--purple-1);
    border-left: 2px solid var(--purple-3);
    padding: var(--ver-padding-m) var(--hor-padding-m) 0;
    display: flex;
    flex-direction: column;
  }

  .header-container {
    display: flex;
    flex-direction: row;

    .lti-icon-container {
      height: 100px;
      width: 100px;
      margin: 15px 25px 0 0;
    }

    :global(.lti-icon-container svg) {
      height: 100px;
      width: 100px;
    }

    .header {
      display: flex;
      flex-direction: column;
    }

    .content {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;

      p {
        margin-bottom: var(--ver-padding-m);
      }

      .sub-info {
        display: flex;
        flex-direction: column;
      }
    }

  }
</style>
<div class="lti-container">
    <div class="header-container">
        <div class="lti-icon-container">
            {@html rainbowIcon}
        </div>
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
        </div>
    </div>
    <EntityHeaderTabs {tabs}/>
</div>