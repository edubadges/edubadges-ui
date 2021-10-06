<script>
    import {onMount} from "svelte";
    import {queryData} from "../../api/graphql";
    import {
        Breadcrumb,
        PermissionsHeader,
        UsersBadgeclass,
        UsersInstitution,
        UsersIssuer,
        UsersIssuerGroup
    } from "../../components/teachers";
    import {badgeclassIcon, facultyIcon, institutionIcon, issuerIcon} from "../../icons";

    export let userId;
    export let entity;

    let user = {};
    let currentUser = {};

    const query = `query ($userId: String){
    user(id: $userId) {
      firstName,
      lastName,
      entityId,
      email,
      hasIssuedDirectAwardBundle
    },
    currentUser {
      institutionStaff {
        mayAdministrateUsers
      }
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
        queryData(query, {userId}).then(res => {
            user = res.user;
            currentUser = res.currentUser;
        });
    });
</script>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    div {
        flex: 1;
    }
</style>
<div class="container">
  {#if user}
    <Breadcrumb user={user}/>

    <PermissionsHeader
      {user}
      {currentUser}
      {tabs}
      {headerItems}
    />
  {/if}

  <div>
    {#if entity === 'institution'}
      <UsersInstitution userId={userId}/>
    {:else if entity === 'issuerGroups'}
      <UsersIssuerGroup userId={userId}/>
    {:else if entity === 'issuers'}
      <UsersIssuer userId={userId}/>
    {:else if entity === 'badgeclasses'}
      <UsersBadgeclass userId={userId}/>
    {/if}
  </div>
</div>