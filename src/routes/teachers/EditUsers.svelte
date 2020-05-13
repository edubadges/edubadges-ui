<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Breadcrumb, EditUserHeader, EditUserWidget } from "../../components/teachers";

  export let userId;

  let user;

  const query = `{
    user(id: "${userId}") {
      firstName,
      lastName,
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


  onMount(() => {
    queryData(query).then(res => {
      user = res.user;
      console.log(user);
    });
  });
</script>

<style>
  div {
    margin-bottom: 10px;
  }

  .container {
    display: flex;
  }
</style>

{#if user}
  <Breadcrumb user={user}/>
  <EditUserHeader />
  <div class="container">
    <EditUserWidget entity={'faculty'} />
    <EditUserWidget entity={'issuer'} />
    <EditUserWidget entity={'badgeclass'} />
    Admin Issuer Groups:
    {#each user.facultyStaffs as facultyMembership}
      <div>
        {facultyMembership.faculty.name}
        {#if facultyMembership.mayAdministrateUsers}
          Admin
        {/if}
      </div>
    {/each}
  </div>
  <div>
    Admin Issuers:
    {#each user.issuerStaffs as issuerMembership}
      <div>
        {issuerMembership.issuer.name}
        {#if issuerMembership.mayAdministrateUsers}
          Admin
        {/if}
      </div>
    {/each}
  </div>
  <div>
    Badge classes:
    {#each user.badgeclassStaffs as badgeClassMembership}
      <div>
        {badgeClassMembership.badgeclass.name}
        {#if badgeClassMembership.mayAdministrateUsers}
          Owner
        {:else if badgeClassMembership.mayAward}
          Awarder
        {/if}
      </div>
    {/each}

  </div>

{/if}