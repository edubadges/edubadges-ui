<script>
  import { userLoggedIn, authToken } from "../stores/user";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";

  onMount(() => {
    $authToken = new URLSearchParams(window.location.search).get("authToken");
    $userLoggedIn = true;
    navigate("/");
  });
</script>

<div>
  <h1>Please wait while loading your data.</h1>
</div>
