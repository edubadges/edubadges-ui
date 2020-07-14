<script>
  import I18n from "i18n-js";
  import {Profile} from "../../routes/students/";
  import UserBreadcrumb from "./UserBreadcrumb.svelte";
  import {onMount} from "svelte";
  import Spinner from "../Spinner.svelte";
  import {getProfile} from "../../api";
  import {userManagementIcon} from "../../icons";

  let profile;
  let loaded;

  onMount(() => {
    getProfile().then(res => {
      profile = res;
      loaded = true;
    });
  });
</script>

<style lang="scss">
  .profile-container {
    padding: 25px 80px;
  }

  @media (max-width: 820px) {
    .profile-container {
      padding: 25px 15px;
    }
  }

  .banner {
    background-color: var(--grey-2);
    padding: 5px 0 25px;
    margin: 15px 0;
  }

  .header {
    display: flex;
    align-content: center;
    align-items: center;
    margin: 25px 0;
  }

  h1 {
    color: var(--black)
  }

  .svg-container {
    width: 30px;
    margin: 0 25px;
  }

  span.logged-in {
    display: inline-block;
    margin-left: 80px;
    color: var(--grey-7);
  }

</style>

{#if loaded}

  <UserBreadcrumb isProfile={true}/>
  <div class="banner">
    <div class="header">
      <div class="svg-container">
        {@html userManagementIcon}
      </div>
      <h1>{I18n.t("user.banner", {firstName: profile.first_name, lastName: profile.last_name})}</h1>
    </div>
    <span class="logged-in">{I18n.t("user.loggedIn")}</span>
  </div>
  <div class="profile-container">
    <Profile isStudent={false}/>
  </div>
{:else}
  <Spinner/>
{/if}