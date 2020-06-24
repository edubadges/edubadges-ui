<script>
  import {
    userLoggedIn,
    authToken,
    userRole,
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

    let redirectTo = $redirectPath || "/";
    if (redirectTo === "/login") {
      redirectTo = "/";
    }
    navigate(redirectTo);
  });
</script>

<div>
  {#if !authError}
    <Spinner/>
  {:else}
    <h1></h1>
  {/if}
</div>
