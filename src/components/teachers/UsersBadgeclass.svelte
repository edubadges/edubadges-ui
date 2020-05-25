<script>
  import { onMount } from "svelte";
  import { queryData } from "../../api/graphql";
  import { Button } from "../../components";
  import { UsersTable } from "../teachers";
  import {sortType} from "../../util/sortData";
  import I18n from "i18n-js";

  export let userId;

  let user;
  let faculties;
  let institutionId;
  let institutionSearch;

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
      institutionId = res.currentInstitution.entityId;
      faculties = res.currentInstitution.faculties;
      user = res.user;
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
      {#each user.badgeclassStaffs as badgeclassStaffMembership}
        <tr>
          <td>{badgeclassStaffMembership.badge.name}</td>
          <td>
            {I18n.t(['editUsers', badgeclassStaffMembership.mayAdministrateUsers ? 'allRights' : 'noRights'])}
          </td>
        </tr>
      {/each}
    </UsersTable>
  </div>
{/if}