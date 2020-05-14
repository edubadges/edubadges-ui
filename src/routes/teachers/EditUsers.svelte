<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Breadcrumb, EditUserHeader, EditUserWidget } from "../../components/teachers";
  import { makeUserFacultyAdmin } from "../../api";

  export let userId;

  let user;
  let faculties;
  let institutionId;

  const query = `{
    currentInstitution {
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
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      console.log(res);
    });
  });

  const makeInstitutionAdmin = () => {

  };

  const removeAdmin = (entityId) => {

  };

  const makeFacultyAdmin = (facultyId) => {
    makeUserFacultyAdmin(institutionId, facultyId, userId).then(resp => {
      console.log(resp);
      queryData(query).then(res => {
          institutionId = res.currentInstitution.entityId;
          faculties = res.currentInstitution.faculties;
          user = res.user;
          console.log(res);
      });
    });
  };
</script>

<style>
  div {
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

</style>

{#if user}
  <Breadcrumb user={user}/>
  <div class="container">
    <h3>Edit user permissions</h3>
    <div>
      Admin institution:
      {#if user.institutionStaff && user.institutionStaff.mayAdministrateUsers}
        Admin
      {:else}
        <button on:click={() => makeInstitutionAdmin()}>make admin</button>
      {/if}
    </div>
    <div>
      <h4>Faculties</h4>
      <ul>
        {#each faculties as faculty}
          <li>
            {faculty.name} -
            {#if user.facultyStaffs.some(_faculty => _faculty.entityId === faculty.entityId)}
              admin
            {:else}
              <button on:click={() => makeFacultyAdmin(faculty.entityId)}>make admin</button>
            {/if}
          </li>
        {/each}
      </ul>
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
  </div>

{/if}