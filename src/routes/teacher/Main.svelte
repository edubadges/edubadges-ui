<script>
  import { user, userRole } from "../../stores/user";
  import { onMount } from "svelte";
  import { requestProfile, requestUser } from "../../api";

  onMount(() => {
    requestProfile().then(
      profile => {
        const slug = profile["slug"];
        requestUser(slug).then(res => console.log(res));
      },
      error => {
        console.error(error);
      }
    );
  });
</script>

<div>
  {$userRole} page
  <br />
  email: {$user['email']}
</div>
