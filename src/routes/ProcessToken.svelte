<script>
  import {
    userLoggedIn,
    authToken,
    userRole,
    userVerifiedByInstitution
  } from "../stores/user";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { getSocialAccount } from "../api";
  import { role } from "../util/role";

  onMount(() => {
    $authToken = new URLSearchParams(window.location.search).get("authToken");
    $userLoggedIn = true;

    getSocialAccount().then(res => {
      $userVerifiedByInstitution = res[0].verified_by_institution;
      navigate("/");
    });
  });
</script>

<div>
  <h1>Please wait while loading your data.</h1>
</div>
