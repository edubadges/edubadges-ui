<script>
    import I18n from "i18n-js";
    import {roles} from "../../../util/lti";

    export let launchData;

</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .content {
    padding: 0;
    display: grid;
    width: 100%;
    grid-template-columns: 50% 50%;
  }

  h3 {
    font-size: 22px;
    font-weight: var(--semi-bold);
    margin: 10px 0 20px 0;
  }

  div.profile-section {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    h3 {
      font-size: 18px;
      font-weight: var(--semi-bold);
      margin: 0 0 8px 0;
    }
  }


</style>
<div class="page-container">
    <h3>{I18n.t("lti.context.title")}</h3>
    <div class="content">
        <div class="profile-section">
            <h3>{I18n.t("lti.context.issuer")}</h3>
            <span>{launchData["iss"]}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.version")}</h3>
            <span>{launchData["https://purl.imsglobal.org/spec/lti/claim/version"]}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.email")}</h3>
            <span>{launchData["email"]}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.course")}</h3>
            <span>{launchData["https://purl.imsglobal.org/spec/lti/claim/context"]["title"]}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.platform.name")}</h3>
            <span>{launchData["https://purl.imsglobal.org/spec/lti/claim/tool_platform"]["name"]}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.platform.vendor")}</h3>
            <span>{launchData["https://purl.imsglobal.org/spec/lti/claim/tool_platform"]["product_family_code"]}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.roles")}</h3>
            <span>{roles(launchData["https://purl.imsglobal.org/spec/lti/claim/roles"])}</span>
        </div>
        <div class="profile-section">
            <h3>{I18n.t("lti.context.placement")}</h3>
            <span>{launchData["https://www.instructure.com/placement"]}</span>
        </div>
    </div>
</div>



