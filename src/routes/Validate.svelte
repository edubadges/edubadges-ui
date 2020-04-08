<script>
  import { userRole } from "../stores/user";
  import { role } from "../util/role";
  import { getService } from "../util/getService";
  import { requestLoginToken } from "../api";
  import { onMount } from "svelte";

  let error;

  onMount(() => {
    error = new URLSearchParams(window.location.search).get("error");
    if (!error) {
      $userRole = role.STUDENT;
      const service = getService(role.STUDENT);
      requestLoginToken(service, false);
    }
  });
</script>

{error}
