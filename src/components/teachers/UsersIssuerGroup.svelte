<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Button } from "../../components";
  import { UsersTable } from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";
  import { enrichUser } from "../../util/enrichUser";

  export let userId;

  let user;
  let faculties;
  let institutionId;
  let institutionSearch;
  let enrichedUser;

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
      mayAdministrateUsers,
      institution {
        name,
        entityId
      }
    }
  }
 }`;


  onMount(() => {
    queryData(query).then(res => {
      const institution = res.currentInstitution;
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
      enrichedUser = enrichUser(user, institution);
    });
  });

  const tableHeaders = [
    {
      name: I18n.t("editUsers.institution"),
      attribute: "name",
      reverse: false,
      sortType: sortType.ALPHA
    },
    {
      name: I18n.t("editUsers.role"),
      attribute: "roles",
      reverse: false,
      sortType: sortType.COLLECTION
    }
  ];

  $: table = {
    entity: "user",
    title: `${I18n.t("editUsers.institutionPermissions")}`,
    tableHeaders: tableHeaders
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
  <Button text="Add permissions" action={() => (console.log())}/>
</div>
{#if user}
  <div class="container">
    <UsersTable
        {...table}
        bind:search={institutionSearch}
    >
      {#each user.facultyStaffs as facultyStaffMembership}
        <tr>
          <td>{facultyStaffMembership.faculty.name}</td>
          <td>
            {I18n.t(['editUsers', facultyStaffMembership.mayAdministrateUsers ? 'allRights' : 'noRights'])}
          </td>
        </tr>
      {/each}
    </UsersTable>
  </div>
{/if}