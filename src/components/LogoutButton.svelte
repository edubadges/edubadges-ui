<script>
  import { navigate } from "svelte-routing";
  import I18n from "i18n-js";

  import { Button } from "../components";
  import { userLoggedIn, userRole, authToken, userVerifiedByInstitution, userInVerificationFlow } from "../stores/user";

  const logoutUser = () => {
    $userLoggedIn = "";
    $userRole = "";
    $authToken = "";
    $authToken = "";
    $userVerifiedByInstitution = false;
    $userInVerificationFlow = false;
    navigate("/");
  };
</script>

{#if $userLoggedIn}
  <Button
    label={I18n.t('header.logout')}
    onClick={logoutUser}
    className="cancel xs align-right" />
{/if}
