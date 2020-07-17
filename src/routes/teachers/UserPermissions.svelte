<script>
  import {Router, Route, navigate} from "svelte-routing";
  import {onMount} from "svelte";
  import {queryData} from "../../api/graphql";
  import {
    UsersInstitution,
    UsersBadgeclass,
    UsersIssuer,
    UsersIssuerGroup,
    Breadcrumb,
    PermissionsHeader
  } from "../../components/teachers";
  import {issuerIcon, facultyIcon, badgeclassIcon, institutionIcon} from "../../icons";

  export let userId;
  export let entity;

  let user = {};

  const query = `{
    user(id: "${userId}") {
      firstName,
      lastName
    }
   }`;

  const tabs = [
    {
      entity: "institution",
      href: `/users/${userId}/institution`,
      icon: institutionIcon
    },
    {
      entity: "faculties",
      href: `/users/${userId}/issuerGroups`,
      icon: facultyIcon
    },
    {
      entity: "issuers",
      href: `/users/${userId}/issuers`,
      icon: issuerIcon
    },
    {
      entity: "badgeclasses",
      href: `/users/${userId}/badgeclasses`,
      icon: badgeclassIcon
    },
  ];

  $: headerItems = [
    {
      'attr': 'memberSince',
      'type': 'date',
      'value': user.dateJoined
    },
    {
      'attr': 'email',
      'type': 'email',
      'value': user.email
    },
  ];


  onMount(() => {
    queryData(query).then(res => {
      user = res.user;
    });
  });
</script>

<style>
  div {
    flex: 1;
  }
</style>

{#if user}
  <Breadcrumb user={user}/>

  <PermissionsHeader
      {user}
      {tabs}
      {headerItems}
  />
{/if}

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
