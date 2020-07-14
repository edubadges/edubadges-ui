<script>
  import I18n from "i18n-js";
  import { link } from "svelte-routing";
  import chevronRightSmall from "../../icons/chevron-right-small.svg";

  export let isProfile = true;

</script>

<style>
  div.user-bread-crumb {
    padding: var(--ver-padding-m) var(--hor-padding-m);
    min-height: 47px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  a {
    color: var(--text-grey-dark);
    text-decoration: underline;
  }

  span.path {
    font-weight: var(--semi-bold);
  }

  span.icon {
    height: 14px;
    width: 14px;
    margin: auto 4px;
  }

</style>

<div class="user-bread-crumb">
    <a use:link href={"/"}>{I18n.t("user.home")}</a>
    <span class="icon">{@html chevronRightSmall}</span>
    <span class="path">{isProfile ? I18n.t("user.profile") : I18n.t("user.permissions")}</span>
</div>
