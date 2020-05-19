<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Breadcrumb, EditUserHeader } from "../teachers";
  import { makeUserFacultyAdmin } from "../../api";

  export let userId;

  let user;
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
    console.log('userId');

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
    makeUserFacultyAdmin(facultyId, userId).then(() => {
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

  <EditUserHeader entityId={userId} user={user} />
{/if}