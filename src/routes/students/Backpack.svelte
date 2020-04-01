<script>
    import I18n from "i18n-js";
    import {userVerifiedByInstitution, userLoggedIn, userRole, authToken} from "../../stores/user";
    import {Badge} from "../../components/students";
    import {getBadges, verifyUserIdentity} from "../../api";
    import {onMount} from "svelte";
    import Button from "../../components/Button.svelte";
    import AccountCreationSteps from "../../components/guests/AccountCreationSteps.svelte";

    let badgesPromise = getBadges();

    const stepUp = () => {
        $userLoggedIn = "";
        $userRole = "";
        $authToken = "";
        verifyUserIdentity();
    };

    $: userIdentity = $userVerifiedByInstitution === true || $userVerifiedByInstitution === "true" ? true : false;

</script>

<div>
  <h3>{I18n.t('backpack.title')}</h3>
  <p>userIdentity: {userIdentity}</p>
  {#if !userIdentity}
    <AccountCreationSteps activeStep={2}/>
    <Button onClick={stepUp}
            label={I18n.t('login.createEduId.step2')} />
  {/if}
  {#await badgesPromise}
      <p>...loading badges</p>
  {:then badges}
    {#each badges as badge}
        <Badge data={badge}/>
    {/each}
  {:catch error}
      <p>error loading badges</p>
  {/await}
</div>
