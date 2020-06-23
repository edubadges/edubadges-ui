<script>
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

<div>
  {#if !authError}
    <Spinner/>
  {:else}
    <h1></h1>
  {/if}
</div>
