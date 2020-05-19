<script>
  import { Router, Route, navigate } from "svelte-routing";
  import {
    UsersInstitution,
    UsersBadgeclass,
    UsersIssuer,
    UsersIssuerGroup
  } from "../../components/teachers";

  export let userId;
  export let entity;
</script>

<style>
  div {
    flex: 1;
  }
</style>

<div>
  {#if entity === 'institution'}
    <UsersInstitution userId={userId} />
  {:else if entity === 'issuerGroups'}
    <UsersIssuerGroup userId={userId} />
  {:else if entity === 'issuers'}
    <UsersIssuer userId={userId} />
  {:else if entity === 'badgeclasses'}
    <UsersBadgeclass userId={userId} />
  {/if}
</div>
