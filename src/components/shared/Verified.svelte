<script>
  import check from "../../icons/check.svg";
  import I18n from "i18n-js";

  export let value;
  export let showVerified = true;  // we don't show verifications right now
  export let fromEduID = false;

</script>
<style lang="scss">
  div.verified {
    display: flex;
    flex-direction: row;
    align-items: center;

    div.marker {
      border-radius: 4px;
      padding: 4px 8px;
      background-color: var(--purple);
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
  {#if showVerified && !fromEduID}
    <div class="marker">
      {@html check} <span>{fromEduID ? I18n.t("profile.validatedByEduId") : I18n.t("profile.validatedByYourInstitution")}</span>
    </div>
  {/if}
</div>