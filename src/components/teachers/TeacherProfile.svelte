<script>
  import I18n from "i18n-js";
  import {Profile} from "../../routes/students/";
  import UserBreadcrumb from "./UserBreadcrumb.svelte";
  import {onMount} from "svelte";
  import Spinner from "../Spinner.svelte";
  import {getProfile} from "../../api";
  import {userManagementIcon} from "../../icons";
  import PermissionsHeader from "./PermissionsHeader.svelte";

  let profile;
  let loaded;

  onMount(() => {
    getProfile().then(res => {
      profile = res;
      loaded = true;
    });
  });

  const tabs = [];

</script>

<style lang="scss">
  div.container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .header {
    margin-bottom: 25px;
  }
</style>

{#if loaded}
  <div class="container">
    <UserBreadcrumb isProfile={true}/>
    <PermissionsHeader
      {tabs}
      title={I18n.t("user.banner", {firstName: profile.first_name, lastName: profile.last_name})}
    />
    <div class="container main-content-margin">
      <div class="header">
        <h4>{I18n.t("user.loggedIn")}</h4>
      </div>
      <Profile isStudent={false}/>
    </div>
  </div>
{:else}
  <Spinner/>
{/if}