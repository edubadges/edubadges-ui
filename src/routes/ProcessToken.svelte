<script>
  import I18n from "i18n-js";
  import {
    userLoggedIn,
    authToken,
    userRole,
    userVerifiedByInstitution,
    redirectPath
  } from "../stores/user";
  import {navigate} from "svelte-routing";
  import {onMount} from "svelte";
  import {getSocialAccount} from "../api";
  import {role} from "../util/role";
  import Spinner from "../components/Spinner.svelte";

  let authError;

  onMount(() => {
    $authToken = new URLSearchParams(window.location.search).get("authToken");
    authError = new URLSearchParams(window.location.search).get("authError");
    $userLoggedIn = true;

    getSocialAccount().then(res => {
      let redirectTo = $redirectPath || "/";
      if (redirectTo === "/login") {
        redirectTo = "/";
      }
      $userVerifiedByInstitution = res[0].verified_by_institution;
      navigate(redirectTo);
    });
  });
</script>

<style>
  .content-auth-error {
    display: flex;
    justify-content: space-around;
  }

  .auth-error-texts {
    text-align: center;
  }
</style>

{#if !authError}
  <div>
    <Spinner/>
  </div>
{:else}
  <div class="content-auth-error">
    <div class="auth-error-texts">
      <h1>{I18n.t(['authError', 'title'])}</h1>
      <p>{I18n.t(['authError', 'subtitle'])}</p>
      <p>{I18n.t(['authError', 'tip'])}</p>
    </div>
  </div>
{/if}
