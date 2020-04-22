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
  import {Badge, Welcome} from "../../components/students";
  import {queryData} from "../../api/graphql";

  let loaded = false;
  let badges = [];

  const query = `{
    badgeInstances {
      entityId,
      image,
      issuedOn,
      acceptance,
      badgeclass {
        name,
        issuer {
          name,
          image,
          faculty {
            name
          }
        }
      }
    }
  }`;

  onMount(() => {
    queryData(query).then(res => {
      badges = res.badgeInstances.filter(bi => bi.acceptance !== "Rejected");
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
        <Badge badge={badge}/>
      {/each}
    </div>
  {:else}
    <Spinner/>
  {/if}
</div>
