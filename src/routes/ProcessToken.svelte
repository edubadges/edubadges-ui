<script>
  import I18n from "i18n-js";
  import {userLoggedIn, authToken, userRole, redirectPath} from "../stores/user";
  import {navigate} from "svelte-routing";
  import {onMount} from "svelte";
  import tip from "../icons/tip.svg";
  import Spinner from "../components/Spinner.svelte";

  let authError;
  let code = 1;
  let adminEmail;

  onMount(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    authError = urlSearchParams.get("authError");
    const role = urlSearchParams.get("role");
    if(role) $userRole = role;

    if (!authError) {
      $authToken = urlSearchParams.get("authToken");
      $userLoggedIn = true;
      let redirectTo = $redirectPath || "/";
      if (redirectTo === "/login") {
        redirectTo = "/";
      }
      navigate(redirectTo);
    } else {
      $userLoggedIn = false;
      code = urlSearchParams.get("code") || "1";
      adminEmail = urlSearchParams.get("admin_email");
    }

  });
</script>

<style>
  .content-auth-error-container {
    display: flex;
    margin: 10vh auto;
    max-width: 420px;
  }

  .content-auth-error {
    display: flex;
    flex-direction: column;
  }

  h1 {
    color: var(--grey-9);
    margin-bottom: 25px;
  }

  div.info {
    display: flex;
    align-items: center;
    background-color: #fef49a;
    border: 1px solid #dabc28;
    border-bottom: 2px solid #dabc28;
    padding: 15px 25px;
    margin: 25px 0;
    border-radius: 8px;
  }

  span.tip {
    margin: 0 25px 0 10px;
    font-weight: bold;
    word-break: normal;
  }


</style>

{#if !authError}
  <div>
    <Spinner/>
  </div>
{:else}
  <div class="content-auth-error-container">
    <div class="content-auth-error">
      <h1>{I18n.t("authError.title")}</h1>
      <p>{@html I18n.t(`authError.code.${code}`)}</p>
      {#if adminEmail && code === "2"}
        <div class="info">
          <span>{@html tip}</span>
          <span class="tip">{I18n.t("authError.tip")}</span>
          <span>{@html I18n.t("authError.adminEmail",{email:adminEmail})}</span>

        </div>
      {/if}

    </div>
  </div>
{/if}
