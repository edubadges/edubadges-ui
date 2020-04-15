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

  onMount(() => {
    $authToken = new URLSearchParams(window.location.search).get("authToken");
    $userLoggedIn = true;

    getSocialAccount().then(res => {
      const redirectTo = $redirectPath || "/";
      $userVerifiedByInstitution = res[0].verified_by_institution;
      navigate(redirectTo);
    });
  });
</script>

<div>
  <Spinner/>
</div>
