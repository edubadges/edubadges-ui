<script>
  import eye from "../../icons/eye-icon.svg";
  import I18n from "i18n-js";
  import {navigate} from "svelte-routing";

  export let badgeclass = {};
  export let isAdminView = false;

  const switchNavigation = () =>  navigate(`/${isAdminView ? "" : "manage/"}badgeclass/${badgeclass.entityId}/overview`);

</script>

<style lang="scss">

  div.eye {
    margin-left: auto;
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      margin-left: 5px;
      color: var(--green-medium);
      font-weight: bold;
      font-size: 14px;
    }

    .eye-icon {
      color: var(--green-medium);
      max-height: 21px;
      max-width: 21px;
    }
  }
</style>

<div class="eye" on:click={switchNavigation}>
  <span class="eye-icon">{@html eye}</span>
  <span>{I18n.t(isAdminView ? "eye.awardView": "eye.adminView" )}</span>
</div>