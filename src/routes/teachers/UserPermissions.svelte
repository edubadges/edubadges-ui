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
  let faculties;
  let institutionId;

  const query = `{
    currentInstitution {
      name,
      entityId,
      faculties {
        name,
        entityId,
        issuers {
          name,
          entityId,
        }
      }
    },
    user(id: "${userId}") {
      firstName,
      lastName,
      email,
      dateJoined,
      badgeclassStaffs {
        entityId,
        badgeclass {
          name,
          entityId
        },
        mayAdministrateUsers,
        mayAward
      }
      issuerStaffs {
        entityId,
        issuer {
          name,
          entityId,
        },
        mayAdministrateUsers
      }
      facultyStaffs {
        entityId,
        faculty {
          name,
          entityId
        },
        mayAdministrateUsers
      }
      institutionStaff {
        entityId,
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
    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
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
