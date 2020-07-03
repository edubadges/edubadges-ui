<script>
  import check from "../../icons/check.svg";
  import I18n from "i18n-js";

  export let value;

</script>
<style lang="scss">
  div.verified {
    display: flex;
    flex-direction: row;
    align-items: center;

    div.marker {
      border-radius: 4px;
      padding: 4px 8px;
      background-color: #145186;
      color: whitesmoke;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }

  div.marker :global( svg.check) {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }


</style>
<div class="verified">
  <span>{value}</span>
  <div class="marker">
    {@html check} <span>{I18n.t("profile.validatedByYourInstitution")}</span>
  </div>

</div>