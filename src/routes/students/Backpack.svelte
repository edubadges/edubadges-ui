<script>
  import I18n from "i18n-js";
  import { onMount } from "svelte";
  import {
    userVerifiedByInstitution,
    userInVerificationFlow,
    userLoggedIn,
    userRole,
    authToken
  } from "../../stores/user";
  import { Button } from "../../components";
  import { Badge, Welcome } from "../../components/students";
  import { getBadges, verifyUserIdentity } from "../../api";

  let badgesPromise = getBadges();

  $: userIdentity =
    $userVerifiedByInstitution === true || $userVerifiedByInstitution === "true"
      ? true
      : false;
  $: userVerification =
    $userInVerificationFlow === true || $userInVerificationFlow === "true"
      ? true
      : false;
</script>

<div>
  <h3>{I18n.t('backpack.title')}</h3>
  {#if !userIdentity}
    <Welcome activeStep={2} />
  {/if}
  {#if userVerification}
    <Welcome activeStep={3} />
  {/if}
  {#await badgesPromise}
    <p>...loading badges</p>
  {:then badges}
    {#each badges as badge}
      <Badge data={badge} />
    {/each}
  {:catch error}
    <p>error loading badges</p>
  {/await}
</div>
