<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { makeUserFacultyAdmin } from "../../api";
  import { Button } from "../../components";
  import Table from "./badges/Table.svelte";

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

    queryData(query).then(res => {
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
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
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
</style>

<div>
  <h4>Permissions on Institution level</h4>
  <Button text="Add permissions" action={() => (console.log())}/>
</div>
<div>
  <Table />
</div>