<script>
  import I18n from "i18n-js";
  import Spinner from "../../components/Spinner.svelte";
  import {onMount} from "svelte";
  import {
    userVerifiedByInstitution,
    userInVerificationFlow,
    userLoggedIn,
    userRole,
    authToken
  } from "../../stores/user";
  import {Button} from "../../components";
  import {Welcome} from "../../components/students";
  import {queryData} from "../../api/graphql";
  import {studentBadgeInstances} from "../../api/queries";
  import BadgeCard from "../../components/shared/BadgeCard.svelte";

  let loaded = false;
  let badges = [];

  onMount(() => {
    queryData(studentBadgeInstances).then(res => {
      badges = res.badgeInstances;
      loaded = true;
    });
  });


  $: userIdentity =
    $userVerifiedByInstitution === true || $userVerifiedByInstitution === "true"
      ? true
      : false;
  $: userVerification =
    $userInVerificationFlow === true || $userInVerificationFlow === "true"
      ? true
      : false;


</script>
<style>
  h3 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  div.content {
    display: grid;
    grid-template-columns: 31% 31% 31%;
    grid-row: auto;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
  }

  @media (max-width: 1120px) {
    div.content {
      grid-template-columns: 48% 48%;
    }
  }

  @media (max-width: 820px) {
    div.content {
      grid-template-columns: 100%;
    }
  }

</style>
<div>
  <h3>{I18n.t('backpack.title')}</h3>
  {#if !userIdentity}
    <Welcome activeStep={2}/>
  {/if}
  {#if userVerification}
    <Welcome activeStep={3}/>
  {/if}
  {#if loaded}
    <div class="content">
      {#each badges as badge}
        <BadgeCard badge={badge} badgeClass={badge.badgeclass}/>
      {/each}
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
